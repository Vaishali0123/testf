<?php
/*
Plugin Name: Webivus AI Connector
Description: Connects your WordPress site with the Webivus backend.
Version: 1.0
Author: Vaishali
*/

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Backend API URLs
define("WEBIVUS_API_URL", "http://localhost:7002/api/site");
define("WEBIVUS_UPDATE_TOKEN_URL", "http://localhost:7002/api/updateAccessToken");
define("WEBIVUS_PLUGIN_API_URL", "http://localhost:7002/api/plugins");

// JWT Configuration
define("WEBIVUS_JWT_SECRET_KEY", "webivus-jwt-secret-key-" . get_option('siteurl'));
define("WEBIVUS_JWT_ALGORITHM", "HS256");

// Security: Add nonce for forms
add_action('init', function() {
    if (!session_id()) {
        session_start();
    }
});

// JWT Helper Functions
// ==========================================

/**
 * Generate a JWT token for WordPress user authentication
 */
function webivus_generate_jwt_token($user_id) {
    $user = get_userdata($user_id);
    if (!$user) {
        return false;
    }
    
    $header = json_encode(['typ' => 'JWT', 'alg' => WEBIVUS_JWT_ALGORITHM]);
    
    $payload = json_encode([
        'iss' => get_site_url(), // Issuer
        'aud' => get_site_url(), // Audience
        'iat' => time(), // Issued at
        'exp' => time() + (30 * 24 * 60 * 60), // Expires in 30 days
        'user_id' => $user_id,
        'username' => $user->user_login,
        'email' => $user->user_email,
        'roles' => $user->roles,
        'site_url' => get_site_url()
    ]);
    
    $base64_header = webivus_base64url_encode($header);
    $base64_payload = webivus_base64url_encode($payload);
    
    $signature = hash_hmac('sha256', $base64_header . "." . $base64_payload, WEBIVUS_JWT_SECRET_KEY, true);
    $base64_signature = webivus_base64url_encode($signature);
    
    return $base64_header . "." . $base64_payload . "." . $base64_signature;
}

/**
 * Verify and decode JWT token
 */
function webivus_verify_jwt_token($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return false;
    }
    
    list($base64_header, $base64_payload, $base64_signature) = $parts;
    
    // Verify signature
    $signature = webivus_base64url_decode($base64_signature);
    $expected_signature = hash_hmac('sha256', $base64_header . "." . $base64_payload, WEBIVUS_JWT_SECRET_KEY, true);
    
    if (!hash_equals($signature, $expected_signature)) {
        return false;
    }
    
    // Decode payload
    $payload = json_decode(webivus_base64url_decode($base64_payload), true);
    
    // Check expiration
    if (isset($payload['exp']) && $payload['exp'] < time()) {
        return false;
    }
    
    // Verify user still exists
    if (!get_userdata($payload['user_id'])) {
        return false;
    }
    
    return $payload;
}

/**
 * Base64 URL encode
 */
function webivus_base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

/**
 * Base64 URL decode
 */
function webivus_base64url_decode($data) {
    return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}

/**
 * Get admin user JWT token
 */
function webivus_get_admin_jwt_token() {
    $admin_users = get_users(['role' => 'administrator', 'number' => 1]);
    if (empty($admin_users)) {
        // Fallback to user ID 1
        $admin_user = get_userdata(1);
        if (!$admin_user) {
            return false;
        }
        $admin_id = 1;
    } else {
        $admin_id = $admin_users[0]->ID;
    }
    
    return webivus_generate_jwt_token($admin_id);
}

/**
 * Collect comprehensive WordPress site data
 */
function webivus_collect_site_data() {
    global $wpdb;
    
    // Basic site information
    $site_data = array(
        'site_url' => get_site_url(),
        'site_name' => get_bloginfo('name'),
        'site_description' => get_bloginfo('description'),
        'admin_email' => get_option('admin_email'),
        'timezone' => get_option('timezone_string'),
        'date_format' => get_option('date_format'),
        'time_format' => get_option('time_format'),
        'language' => get_locale(),
        'wp_version' => get_bloginfo('version'),
        'php_version' => PHP_VERSION,
        'mysql_version' => $wpdb->db_version(),
        'theme' => array(
            'name' => get_option('stylesheet'),
            'version' => wp_get_theme()->get('Version'),
            'parent' => wp_get_theme()->get('Template')
        ),
        'multisite' => is_multisite(),
        'memory_limit' => ini_get('memory_limit'),
        'max_execution_time' => ini_get('max_execution_time'),
        'upload_max_filesize' => ini_get('upload_max_filesize'),
        'post_max_size' => ini_get('post_max_size')
    );
    
    // Count content
    $site_data['content_counts'] = array(
        'posts' => wp_count_posts('post')->publish,
        'pages' => wp_count_posts('page')->publish,
        'draft_posts' => wp_count_posts('post')->draft,
        'draft_pages' => wp_count_posts('page')->draft,
        'private_posts' => wp_count_posts('post')->private,
        'private_pages' => wp_count_posts('page')->private,
        'trash_posts' => wp_count_posts('post')->trash,
        'trash_pages' => wp_count_posts('page')->trash,
        'attachments' => wp_count_posts('attachment')->inherit,
        'comments' => wp_count_comments()->approved,
        'pending_comments' => wp_count_comments()->moderated,
        'spam_comments' => wp_count_comments()->spam,
        'trash_comments' => wp_count_comments()->trash
    );
    
    // User counts
    $user_counts = count_users();
    $site_data['user_counts'] = array(
        'total_users' => $user_counts['total_users'],
        'by_role' => $user_counts['avail_roles']
    );
    
    // Plugin information
    if (!function_exists('get_plugins')) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    
    $all_plugins = get_plugins();
    $active_plugins = get_option('active_plugins', array());
    $network_active_plugins = is_multisite() ? get_site_option('active_sitewide_plugins', array()) : array();
    
    $plugins = array();
    foreach ($all_plugins as $plugin_file => $plugin_data) {
        $is_active = in_array($plugin_file, $active_plugins) || isset($network_active_plugins[$plugin_file]);
        $plugins[] = array(
            'name' => $plugin_data['Name'],
            'slug' => dirname($plugin_file),
            'version' => $plugin_data['Version'],
            'description' => $plugin_data['Description'],
            'author' => $plugin_data['Author'],
            'is_active' => $is_active,
            'is_network_active' => isset($network_active_plugins[$plugin_file])
        );
    }
    
    $site_data['plugins'] = array(
        'total_plugins' => count($all_plugins),
        'active_plugins' => count($active_plugins),
        'inactive_plugins' => count($all_plugins) - count($active_plugins),
        'plugin_list' => $plugins
    );
    
    // Theme information
    $current_theme = wp_get_theme();
    $available_themes = wp_get_themes();
    
    $site_data['themes'] = array(
        'current_theme' => array(
            'name' => $current_theme->get('Name'),
            'version' => $current_theme->get('Version'),
            'description' => $current_theme->get('Description'),
            'author' => $current_theme->get('Author'),
            'parent' => $current_theme->get('Template')
        ),
        'total_themes' => count($available_themes),
        'available_themes' => array_keys($available_themes)
    );
    
    // Database information
    $site_data['database'] = array(
        'db_name' => DB_NAME,
        'db_host' => DB_HOST,
        'db_charset' => DB_CHARSET,
        'db_collate' => DB_COLLATE,
        'table_prefix' => $wpdb->prefix,
        'db_size' => webivus_get_database_size()
    );
    
    // Server information
    $site_data['server'] = array(
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
        'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown',
        'server_name' => $_SERVER['SERVER_NAME'] ?? 'Unknown',
        'https' => is_ssl(),
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
    );
    
    // Security information
    $site_data['security'] = array(
        'file_editing_disabled' => !defined('DISALLOW_FILE_EDIT') || DISALLOW_FILE_EDIT,
        'wp_debug' => defined('WP_DEBUG') && WP_DEBUG,
        'wp_debug_log' => defined('WP_DEBUG_LOG') && WP_DEBUG_LOG,
        'wp_debug_display' => defined('WP_DEBUG_DISPLAY') && WP_DEBUG_DISPLAY,
        'script_debug' => defined('SCRIPT_DEBUG') && SCRIPT_DEBUG,
        'automatic_updates' => defined('WP_AUTO_UPDATE_CORE') ? WP_AUTO_UPDATE_CORE : 'default'
    );
    
    // Performance information
    $site_data['performance'] = array(
        'object_cache' => wp_using_ext_object_cache(),
        'opcache_enabled' => function_exists('opcache_get_status') && opcache_get_status(),
        'redis_enabled' => class_exists('Redis'),
        'memcached_enabled' => class_exists('Memcached')
    );
    
    // Recent activity
    $site_data['recent_activity'] = array(
        'last_post' => webivus_get_last_post_date(),
        'last_comment' => webivus_get_last_comment_date(),
        'last_user_registration' => webivus_get_last_user_registration_date(),
        'last_plugin_update' => webivus_get_last_plugin_update_date()
    );
    
    // Token information - only include if we have a valid token
    $current_token = get_option("webivus_access_token");
    if (!empty($current_token)) {
        $token_info = webivus_get_token_info($current_token);
        $site_data['token_info'] = array(
            'has_token' => true,
            'is_expired' => $token_info['expired'],
            'generated_at' => $token_info['issued_at'] ? date('Y-m-d H:i:s', $token_info['issued_at']) : null,
            'expires_at' => $token_info['expires_at'] ? date('Y-m-d H:i:s', $token_info['expires_at']) : null,
            'days_remaining' => $token_info['days_remaining'],
            'username' => $token_info['username']
        );
    } else {
        $site_data['token_info'] = array(
            'has_token' => false,
            'is_expired' => true,
            'generated_at' => null,
            'expires_at' => null,
            'days_remaining' => 0,
            'username' => null
        );
    }
    
    return $site_data;
}

/**
 * Get database size
 */
function webivus_get_database_size() {
    global $wpdb;
    
    $result = $wpdb->get_var("
        SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'DB Size in MB'
        FROM information_schema.tables
        WHERE table_schema = '" . DB_NAME . "'
    ");
    
    return $result ? $result . ' MB' : 'Unknown';
}

/**
 * Get last post date
 */
function webivus_get_last_post_date() {
    global $wpdb;
    
    $result = $wpdb->get_var("
        SELECT post_date 
        FROM {$wpdb->posts} 
        WHERE post_type IN ('post', 'page') 
        AND post_status = 'publish' 
        ORDER BY post_date DESC 
        LIMIT 1
    ");
    
    return $result ? $result : 'No posts';
}

/**
 * Get last comment date
 */
function webivus_get_last_comment_date() {
    global $wpdb;
    
    $result = $wpdb->get_var("
        SELECT comment_date 
        FROM {$wpdb->comments} 
        WHERE comment_approved = '1' 
        ORDER BY comment_date DESC 
        LIMIT 1
    ");
    
    return $result ? $result : 'No comments';
}

/**
 * Get last user registration date
 */
function webivus_get_last_user_registration_date() {
    global $wpdb;
    
    $result = $wpdb->get_var("
        SELECT user_registered 
        FROM {$wpdb->users} 
        ORDER BY user_registered DESC 
        LIMIT 1
    ");
    
    return $result ? $result : 'No users';
}

/**
 * Get last plugin update date
 */
function webivus_get_last_plugin_update_date() {
    $updates = get_site_transient('update_plugins');
    if ($updates && isset($updates->last_checked)) {
        return date('Y-m-d H:i:s', $updates->last_checked);
    }
    return 'Unknown';
}

/**
 * Check if JWT token is expired
 */
function webivus_is_token_expired($token) {
    if (!$token) {
        return true;
    }
    
    $payload = webivus_verify_jwt_token($token);
    if (!$payload) {
        return true;
    }
    
    // Check if token is expired
    if (isset($payload['exp']) && $payload['exp'] < time()) {
        return true;
    }
    
    return false;
}

/**
 * Get token expiry information
 */
function webivus_get_token_info($token) {
    if (!$token || empty(trim($token))) {
        return array(
            'expired' => true, 
            'expires_at' => null, 
            'days_remaining' => 0,
            'issued_at' => null,
            'username' => null
        );
    }
    
    $payload = webivus_verify_jwt_token($token);
    if (!$payload || !is_array($payload)) {
        return array(
            'expired' => true, 
            'expires_at' => null, 
            'days_remaining' => 0,
            'issued_at' => null,
            'username' => null
        );
    }
    
    $expires_at = isset($payload['exp']) ? $payload['exp'] : null;
    $issued_at = isset($payload['iat']) ? $payload['iat'] : null;
    $username = isset($payload['username']) ? $payload['username'] : 'Unknown';
    
    $is_expired = $expires_at && $expires_at < time();
    $days_remaining = $expires_at ? max(0, ceil(($expires_at - time()) / (24 * 60 * 60))) : 0;
    
    return array(
        'expired' => $is_expired,
        'expires_at' => $expires_at,
        'days_remaining' => $days_remaining,
        'issued_at' => $issued_at,
        'username' => $username
    );
}

// Run only when plugin is activated
register_activation_hook(__FILE__, "webivus_activate_plugin");
function webivus_activate_plugin() {
    // Security: Check if user has proper capabilities
    if (!current_user_can('activate_plugins')) {
        return;
    }
    
    $admin_user   = get_userdata(1); // default admin user (ID = 1)
    $site_url     = get_site_url();
    $admin_email  = get_option("admin_email");
    $admin_username = $admin_user ? $admin_user->user_login : "admin";
    $logo_url = get_site_icon_url();
    
    // Generate JWT token for admin user
    $access_token = webivus_get_admin_jwt_token();
    if (!$access_token) {
        error_log("Webivus Connector: Failed to generate JWT token");
        return;
    }
    
    error_log("Webivus Connector: Generated JWT token successfully");
    
    // Save token in WP options FIRST before collecting site data
    if (!get_option("webivus_access_token")) {
        update_option("webivus_access_token", $access_token);
        error_log("Webivus Connector: Token saved to WordPress options");
        
        // Now collect comprehensive site data (after token is stored)
        $site_data = webivus_collect_site_data();
        error_log("Webivus Connector: Site data collected, token_info: " . json_encode($site_data['token_info']));
        
        // Prepare data with validation
        $body = array(
            "site_url"      => esc_url_raw($site_url),
            "admin_email"   => sanitize_email($admin_email),
            "admin_username"=> sanitize_user($admin_username),
            "access_token"  => $access_token,
            "logo"          => esc_url_raw($logo_url),
            "data"          => $site_data // Comprehensive site data
        );
        
        $response = wp_remote_post(WEBIVUS_API_URL, array(
            "method"      => "POST",
            "timeout"     => 30,
            "redirection" => 5,
            "httpversion" => '1.0',
            "blocking"    => true,
            "headers"     => array(
                "Content-Type" => "application/json",
                "User-Agent"   => 'WordPress/' . get_bloginfo('version') . '; ' . get_bloginfo('url')
            ),
            "body"        => json_encode($body),
            "cookies"     => array(),
            "sslverify"   => false // Only for localhost, change to true for production
        ));
        
        if (is_wp_error($response)) {
            error_log("Webivus Connector: Failed to connect to backend - " . $response->get_error_message());
        } else {
            $response_code = wp_remote_retrieve_response_code($response);
            if ($response_code !== 200) {
                error_log("Webivus Connector: Backend returned error code: " . $response_code);
            } else {
                error_log("Webivus Connector: Successfully connected to backend with site data");
            }
        }
    }
    
    // Store flag with timestamp for security
    update_option("webivus_redirect_data", array(
        'should_redirect' => true,
        'timestamp' => time(),
        'user_id' => get_current_user_id()
    ));
}

// Secure redirect handling - Multiple hooks for reliability
add_action('admin_notices', 'webivus_handle_redirect');
add_action('admin_head', 'webivus_handle_redirect');

function webivus_handle_redirect() {
    $redirect_data = get_option("webivus_redirect_data");
    
    // Security checks
    if (!$redirect_data || !is_array($redirect_data)) {
        return;
    }
    
    // Check if redirect should happen
    if (!$redirect_data['should_redirect']) {
        return;
    }
    
    // Security: Check timestamp (expire after 5 minutes)
    if ((time() - $redirect_data['timestamp']) > 300) {
        delete_option("webivus_redirect_data");
        return;
    }
    
    // Security: Verify user
    if ($redirect_data['user_id'] !== get_current_user_id()) {
        return;
    }
    
    // Security: Check capabilities
    if (!current_user_can('manage_options')) {
        return;
    }
    
    // Clear the redirect flag immediately
    delete_option("webivus_redirect_data");
    
    // Generate secure nonce for the redirect
    $nonce = wp_create_nonce('webivus_redirect_' . get_current_user_id());
    ?>
    <script type="text/javascript">
    (function() {
        'use strict';
        
        // Security: Verify nonce exists
        var nonce = '<?php echo esc_js($nonce); ?>';
        if (!nonce) return;
        
        // Direct open without any UI or countdown
        var targetUrl = 'http://localhost:3000/webapp';
        
        try {
            // Open in new tab immediately with security features
            var newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
            
            if (newWindow) {
                newWindow.focus();
            }
        } catch (e) {
            console.error('Webivus: Failed to open tab', e);
        }
        
    })();
    </script>
    <?php
}

// Admin menu page
add_action("admin_menu", "webivus_admin_menu");
function webivus_admin_menu() {
    add_menu_page(
        "Webivus AI Connector",
        "Webivus Connector",
        "manage_options",
        "webivus-connector",
        "webivus_admin_page",
        "dashicons-admin-links",
        30
    );
}

function webivus_admin_page() {
    // Security: Check capabilities
    if (!current_user_can('manage_options')) {
        wp_die(__('You do not have sufficient permissions to access this page.'));
    }
    
    // Security: Verify nonce for form submission
    if (isset($_POST["regenerate_token"]) || isset($_POST["connect_webivus"])) {
        if (!wp_verify_nonce($_POST['webivus_nonce'], 'webivus_regenerate_token')) {
            wp_die(__('Security check failed. Please refresh the page and try again.'));
        }
        
        $site_url = get_site_url();
        $new_token = webivus_get_admin_jwt_token();
        if (!$new_token) {
            echo "<div class='notice notice-error'><p>❌ Failed to generate JWT token</p></div>";
            return;
        }
        
        // Collect fresh site data
        $site_data = webivus_collect_site_data();
        
        $body = array(
            "site_url"     => esc_url_raw($site_url),
            "access_token" => $new_token,
            "data"         => $site_data // Send fresh site data
        );
        
        $response = wp_remote_post(WEBIVUS_UPDATE_TOKEN_URL, array(
            "method"      => "POST",
            "timeout"     => 30,
            "redirection" => 5,
            "httpversion" => '1.0',
            "blocking"    => true,
            "headers"     => array(
                "Content-Type" => "application/json",
                "User-Agent"   => 'WordPress/' . get_bloginfo('version') . '; ' . get_bloginfo('url')
            ),
            "body"        => json_encode($body),
            "cookies"     => array(),
            "sslverify"   => false // Only for localhost, change to true for production
        ));
        
        if (!is_wp_error($response)) {
            $response_code = wp_remote_retrieve_response_code($response);
            $response_body = wp_remote_retrieve_body($response);
            
            if ($response_code === 200) {
                $data = json_decode($response_body, true);
                if (isset($data["success"]) && $data["success"]) {
                    update_option("webivus_access_token", $new_token);
                    echo "<div class='notice notice-success'><p>✅ New token generated and site data updated successfully!</p></div>";
                    
                    // If it was a "Connect to Webivus" action, redirect to webapp
                    if (isset($_POST["connect_webivus"])) {
                        echo "<script>setTimeout(function() { window.open('http://localhost:3000/webapp?site_url=" . urlencode($site_url) . "', '_blank'); }, 2000);</script>";
                    }
                } else {
                    echo "<div class='notice notice-error'><p>❌ Failed: " . esc_html($data["message"] ?? "Unknown error from server") . "</p></div>";
                }
            } else {
                echo "<div class='notice notice-error'><p>❌ Server returned error code: " . esc_html($response_code) . "</p></div>";
            }
        } else {
            echo "<div class='notice notice-error'><p>❌ Connection error: " . esc_html($response->get_error_message()) . "</p></div>";
        }
    }
    
    $current_token = get_option("webivus_access_token");
    $token_info = webivus_get_token_info($current_token);
    $nonce = wp_create_nonce('webivus_regenerate_token');
    ?>
    <div class="wrap">
        <h1>Webivus AI Connector</h1>
        
        <div class="card" style="max-width: 800px;">
            <h2>Connection Status</h2>
            <?php if ($current_token && !$token_info['expired']): ?>
                <p><strong>Status:</strong> <span style="color: green;">✅ Connected</span></p>
                <p><strong>Token Type:</strong> JWT (JSON Web Token)</p>
                <p><strong>Days Remaining:</strong> <span style="color: <?php echo $token_info['days_remaining'] > 7 ? 'green' : ($token_info['days_remaining'] > 3 ? 'orange' : 'red'); ?>"><?php echo $token_info['days_remaining']; ?> days</span></p>
                <p><strong>Current JWT Token:</strong></p>
                <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0; word-break: break-all; font-family: monospace; font-size: 12px;">
                    <?php echo esc_html($current_token); ?>
                </code>
                <p><strong>Token Information:</strong></p>
                <?php 
                $token_payload = webivus_verify_jwt_token($current_token);
                if ($token_payload): ?>
                    <ul>
                        <li><strong>Issued At:</strong> <?php echo esc_html(date('Y-m-d H:i:s', $token_payload['iat'])); ?></li>
                        <li><strong>Expires At:</strong> <?php echo esc_html(date('Y-m-d H:i:s', $token_payload['exp'])); ?></li>
                        <li><strong>User:</strong> <?php echo esc_html($token_payload['username']); ?></li>
                        <li><strong>Email:</strong> <?php echo esc_html($token_payload['email']); ?></li>
                        <li><strong>Roles:</strong> <?php echo esc_html(implode(', ', $token_payload['roles'])); ?></li>
                    </ul>
                <?php endif; ?>
            <?php elseif ($current_token && $token_info['expired']): ?>
                <p><strong>Status:</strong> <span style="color: red;">❌ Token Expired</span></p>
                <p><strong>Expired At:</strong> <?php echo $token_info['expires_at'] ? esc_html(date('Y-m-d H:i:s', $token_info['expires_at'])) : 'Unknown'; ?></p>
                <p style="color: red; font-weight: bold;">Your token has expired. Please regenerate it to continue using Webivus.</p>
            <?php else: ?>
                <p><strong>Status:</strong> <span style="color: red;">❌ Not Connected</span></p>
                <p>Please connect to Webivus to establish connection.</p>
            <?php endif; ?>
        </div>
        
        <div class="card" style="max-width: 800px; margin-top: 20px;">
            <h2>Actions</h2>
            
            <?php if ($current_token && !$token_info['expired']): ?>
                <!-- Token is valid - show regenerate and dashboard buttons -->
                <form method="post" style="margin-bottom: 15px;">
                    <?php wp_nonce_field('webivus_regenerate_token', 'webivus_nonce'); ?>
                    <input type="submit" name="regenerate_token" class="button button-primary" value="Regenerate Token">
                    <p class="description">Generate a new access token and update site data.</p>
                </form>
                
                <a href="http://localhost:3000/webapp?site_url=<?php echo urlencode(get_site_url()); ?>" target="_blank" rel="noopener noreferrer" class="button button-secondary">
                     Open Webivus Dashboard
                </a>
                <p class="description">Open the Webivus dashboard in a new tab.</p>
                
            <?php elseif ($current_token && $token_info['expired']): ?>
                <!-- Token is expired - show connect button -->
                <form method="post" style="margin-bottom: 15px;">
                    <?php wp_nonce_field('webivus_regenerate_token', 'webivus_nonce'); ?>
                    <input type="submit" name="connect_webivus" class="button button-primary" value="Connect to Webivus">
                    <p class="description">Generate a new access token and connect to Webivus (will redirect to dashboard).</p>
                </form>
                
            <?php else: ?>
                <!-- No token - show connect button -->
                <form method="post" style="margin-bottom: 15px;">
                    <?php wp_nonce_field('webivus_regenerate_token', 'webivus_nonce'); ?>
                    <input type="submit" name="connect_webivus" class="button button-primary" value="Connect to Webivus">
                    <p class="description">Generate access token and connect to Webivus (will redirect to dashboard).</p>
                </form>
            <?php endif; ?>
        </div>
        
        <div class="card" style="max-width: 800px; margin-top: 20px;">
            <h2>Site Data Overview</h2>
            <p>This data is sent to the Webivus backend for dashboard display:</p>
            
            <?php 
            $site_data = webivus_collect_site_data();
            ?>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div>
                    <h3>Content Statistics</h3>
                    <ul>
                        <li><strong>Posts:</strong> <?php echo $site_data['content_counts']['posts']; ?></li>
                        <li><strong>Pages:</strong> <?php echo $site_data['content_counts']['pages']; ?></li>
                        <li><strong>Comments:</strong> <?php echo $site_data['content_counts']['comments']; ?></li>
                        <li><strong>Attachments:</strong> <?php echo $site_data['content_counts']['attachments']; ?></li>
                    </ul>
                </div>
                
                <div>
                    <h3>User Statistics</h3>
                    <ul>
                        <li><strong>Total Users:</strong> <?php echo $site_data['user_counts']['total_users']; ?></li>
                        <li><strong>Administrators:</strong> <?php echo $site_data['user_counts']['by_role']['administrator'] ?? 0; ?></li>
                        <li><strong>Editors:</strong> <?php echo $site_data['user_counts']['by_role']['editor'] ?? 0; ?></li>
                        <li><strong>Authors:</strong> <?php echo $site_data['user_counts']['by_role']['author'] ?? 0; ?></li>
                    </ul>
                </div>
                
                <div>
                    <h3>Plugin Statistics</h3>
                    <ul>
                        <li><strong>Total Plugins:</strong> <?php echo $site_data['plugins']['total_plugins']; ?></li>
                        <li><strong>Active Plugins:</strong> <?php echo $site_data['plugins']['active_plugins']; ?></li>
                        <li><strong>Inactive Plugins:</strong> <?php echo $site_data['plugins']['inactive_plugins']; ?></li>
                    </ul>
                </div>
                
                <div>
                    <h3>System Information</h3>
                    <ul>
                        <li><strong>WordPress Version:</strong> <?php echo $site_data['wp_version']; ?></li>
                        <li><strong>PHP Version:</strong> <?php echo $site_data['php_version']; ?></li>
                        <li><strong>Current Theme:</strong> <?php echo $site_data['themes']['current_theme']['name']; ?></li>
                        <li><strong>Database Size:</strong> <?php echo $site_data['database']['db_size']; ?></li>
                    </ul>
                </div>
                
                <div>
                    <h3>Token Information</h3>
                    <ul>
                        <li><strong>Has Token:</strong> <?php echo $site_data['token_info']['has_token'] ? 'Yes' : 'No'; ?></li>
                        <li><strong>Is Expired:</strong> <?php echo $site_data['token_info']['is_expired'] ? 'Yes' : 'No'; ?></li>
                        <li><strong>Generated At:</strong> <?php echo $site_data['token_info']['generated_at'] ?: 'N/A'; ?></li>
                        <li><strong>Expires At:</strong> <?php echo $site_data['token_info']['expires_at'] ?: 'N/A'; ?></li>
                        <li><strong>Days Remaining:</strong> <?php echo $site_data['token_info']['days_remaining']; ?></li>
                        <li><strong>Username:</strong> <?php echo $site_data['token_info']['username']; ?></li>
                    </ul>
                </div>
            </div>
            
            <details style="margin-top: 20px;">
                <summary style="cursor: pointer; font-weight: bold;">View Complete Site Data (JSON)</summary>
                <pre style="background: #f1f1f1; padding: 15px; margin: 10px 0; overflow-x: auto; font-size: 12px;"><?php echo esc_html(json_encode($site_data, JSON_PRETTY_PRINT)); ?></pre>
            </details>
        </div>
        
        <div class="card" style="max-width: 800px; margin-top: 20px;">
            <h2>Security Information</h2>
            <ul>
                <li><strong>Site URL:</strong> <?php echo esc_html(get_site_url()); ?></li>
                <li><strong>Admin Email:</strong> <?php echo esc_html(get_option('admin_email')); ?></li>
                <li><strong>Connection:</strong> Localhost (Development Mode)</li>
            </ul>
        </div>
        
        <?php webivus_add_plugin_management_section(); ?>
    </div>
    <?php
}

// Security: Clean up on plugin deactivation
register_deactivation_hook(__FILE__, 'webivus_deactivate_plugin');
function webivus_deactivate_plugin() {
    delete_option("webivus_redirect_data");
}

// Security: Clean up on plugin uninstall
register_uninstall_hook(__FILE__, 'webivus_uninstall_plugin');
function webivus_uninstall_plugin() {
    delete_option("webivus_access_token");
    delete_option("webivus_redirect_data");
}

// Plugin Management API Functions
// ==========================================

/**
 * Verify administrator JWT token for API requests
 */
function webivus_verify_admin_token($token) {
    if (!$token) {
        error_log("Webivus Plugin API: No token provided");
        return false;
    }
    
    // Verify JWT token
    $payload = webivus_verify_jwt_token($token);
    if (!$payload) {
        error_log("Webivus Plugin API: Invalid or expired JWT token");
        return false;
    }
    
    // Check if user has administrator role
    if (!in_array('administrator', $payload['roles'])) {
        error_log("Webivus Plugin API: User does not have administrator role");
        return false;
    }
    
    // Verify the user still exists and is active
    $user = get_userdata($payload['user_id']);
    if (!$user || !user_can($user, 'manage_options')) {
        error_log("Webivus Plugin API: User not found or insufficient permissions");
        return false;
    }
    
    // Set the current user for WordPress context
    wp_set_current_user($payload['user_id']);
    
    error_log("Webivus Plugin API: JWT token verification successful for user: " . $payload['username']);
    return true;
}

/**
 * Get all installed plugins with their status
 */
function webivus_get_installed_plugins() {
    if (!function_exists('get_plugins')) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    
    $all_plugins = get_plugins();
    $active_plugins = get_option('active_plugins', array());
    $network_active_plugins = is_multisite() ? get_site_option('active_sitewide_plugins', array()) : array();
    
    $plugins = array();
    
    foreach ($all_plugins as $plugin_file => $plugin_data) {
        $is_active = in_array($plugin_file, $active_plugins) || isset($network_active_plugins[$plugin_file]);
        $plugin_slug = dirname($plugin_file);
        
        $plugins[] = array(
            'slug' => $plugin_slug,
            'file' => $plugin_file,
            'name' => $plugin_data['Name'],
            'version' => $plugin_data['Version'],
            'description' => $plugin_data['Description'],
            'author' => $plugin_data['Author'],
            'is_active' => $is_active,
            'is_network_active' => isset($network_active_plugins[$plugin_file]),
            'plugin_uri' => $plugin_data['PluginURI'],
            'text_domain' => $plugin_data['TextDomain']
        );
    }
    
    return $plugins;
}

/**
 * Install plugin by slug from WordPress.org repository
 */
function webivus_install_plugin($slug) {
    // Check if user has install_plugins capability
    $user_has_permission = false;
    
    // Try current user first (for admin interface)
    if (is_user_logged_in() && current_user_can('install_plugins')) {
        $user_has_permission = true;
    }
    
    // If no current user, check if this is an API request with valid JWT
    if (!$user_has_permission && defined('DOING_AJAX') && DOING_AJAX) {
        // For API requests, we'll check the JWT token in the calling function
        // If we reach here, the token was already validated
        $user_has_permission = true;
    }
    
    if (!$user_has_permission) {
        return array('success' => false, 'message' => 'Insufficient permissions to install plugins');
    }
    
    if (!function_exists('download_url')) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
    }
    if (!function_exists('WP_Upgrader')) {
        require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
    }
    if (!function_exists('plugins_api')) {
        require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
    }
    
    // Get plugin information from WordPress.org
    $api = plugins_api('plugin_information', array(
        'slug' => $slug,
        'fields' => array(
            'short_description' => false,
            'sections' => false,
            'requires' => false,
            'rating' => false,
            'ratings' => false,
            'downloaded' => false,
            'last_updated' => false,
            'added' => false,
            'tags' => false,
            'compatibility' => false,
            'homepage' => false,
            'donate_link' => false,
        ),
    ));
    
    if (is_wp_error($api)) {
        return array('success' => false, 'message' => 'Plugin not found in WordPress.org repository: ' . $api->get_error_message());
    }
    
    // Check if plugin is already installed
    $installed_plugins = get_plugins();
    foreach ($installed_plugins as $plugin_file => $plugin_data) {
        if (dirname($plugin_file) === $slug) {
            return array('success' => false, 'message' => 'Plugin is already installed');
        }
    }
    
    // Download and install the plugin
    $upgrader = new Plugin_Upgrader();
    $result = $upgrader->install($api->download_link);
    
    if (is_wp_error($result)) {
        return array('success' => false, 'message' => 'Installation failed: ' . $result->get_error_message());
    }
    
    if ($result === false) {
        return array('success' => false, 'message' => 'Installation failed: Unknown error');
    }
    
    return array('success' => true, 'message' => 'Plugin installed successfully');
}

/**
 * Activate plugin by slug
 */
function webivus_activate_plugin_by_slug($slug) {
    // Check if user has activate_plugins capability
    $user_has_permission = false;
    
    // Try current user first (for admin interface)
    if (is_user_logged_in() && current_user_can('activate_plugins')) {
        $user_has_permission = true;
    }
    
    // If no current user, check if this is an API request with valid JWT
    if (!$user_has_permission && defined('DOING_AJAX') && DOING_AJAX) {
        // For API requests, we'll check the JWT token in the calling function
        // If we reach here, the token was already validated
        $user_has_permission = true;
    }
    
    if (!$user_has_permission) {
        return array('success' => false, 'message' => 'Insufficient permissions to activate plugins');
    }
    
    $installed_plugins = get_plugins();
    $plugin_file = null;
    
    // Find the plugin file by slug
    foreach ($installed_plugins as $file => $plugin_data) {
        if (dirname($file) === $slug) {
            $plugin_file = $file;
            break;
        }
    }
    
    if (!$plugin_file) {
        return array('success' => false, 'message' => 'Plugin not found');
    }
    
    // Check if already active
    if (is_plugin_active($plugin_file)) {
        return array('success' => false, 'message' => 'Plugin is already active');
    }
    
    // Activate the plugin
    $result = activate_plugin($plugin_file);
    
    if (is_wp_error($result)) {
        return array('success' => false, 'message' => 'Activation failed: ' . $result->get_error_message());
    }
    
    return array('success' => true, 'message' => 'Plugin activated successfully');
}

/**
 * Deactivate plugin by slug
 */
function webivus_deactivate_plugin_by_slug($slug) {
    // Check if user has activate_plugins capability
    $user_has_permission = false;
    
    // Try current user first (for admin interface)
    if (is_user_logged_in() && current_user_can('activate_plugins')) {
        $user_has_permission = true;
    }
    
    // If no current user, check if this is an API request with valid JWT
    if (!$user_has_permission && defined('DOING_AJAX') && DOING_AJAX) {
        // For API requests, we'll check the JWT token in the calling function
        // If we reach here, the token was already validated
        $user_has_permission = true;
    }
    
    if (!$user_has_permission) {
        return array('success' => false, 'message' => 'Insufficient permissions to deactivate plugins');
    }
    
    $installed_plugins = get_plugins();
    $plugin_file = null;
    
    // Find the plugin file by slug
    foreach ($installed_plugins as $file => $plugin_data) {
        if (dirname($file) === $slug) {
            $plugin_file = $file;
            break;
        }
    }
    
    if (!$plugin_file) {
        return array('success' => false, 'message' => 'Plugin not found');
    }
    
    // Check if already inactive
    if (!is_plugin_active($plugin_file)) {
        return array('success' => false, 'message' => 'Plugin is already inactive');
    }
    
    // Deactivate the plugin
    deactivate_plugins($plugin_file);
    
    return array('success' => true, 'message' => 'Plugin deactivated successfully');
}

/**
 * Handle plugin management API requests
 */
add_action('wp_ajax_webivus_plugin_management', 'webivus_handle_plugin_management_api');
add_action('wp_ajax_nopriv_webivus_plugin_management', 'webivus_handle_plugin_management_api');

function webivus_handle_plugin_management_api() {
    // Set content type to JSON
    header('Content-Type: application/json');
    
    // Only allow POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        wp_die(json_encode(array('success' => false, 'message' => 'Only POST requests allowed')));
    }
    
    // Get input data - support both JSON and form data
    $input = file_get_contents('php://input');
    error_log("Webivus Plugin: Raw input received: " . $input);
    
    $data = json_decode($input, true);
    error_log("Webivus Plugin: JSON decoded data: " . print_r($data, true));
    
    // If JSON parsing failed, try form data
    if (!$data && !empty($_POST)) {
        $data = $_POST;
        error_log("Webivus Plugin: Using POST data: " . print_r($data, true));
    }
    
    if (!$data) {
        error_log("Webivus Plugin: No valid data received");
        wp_die(json_encode(array('success' => false, 'message' => 'Invalid JSON data or form data')));
    }
    
    // Verify administrator token
    $token = isset($data['token']) ? sanitize_text_field($data['token']) : '';
    
    // Debug: Log the token verification attempt
    error_log("Webivus Plugin API: Token verification attempt - Provided: " . ($token ? 'Yes' : 'No') . ", Stored: " . (get_option("webivus_access_token") ? 'Yes' : 'No'));
    
    if (!webivus_verify_admin_token($token)) {
        // Get stored token for debugging
        $stored_token = get_option("webivus_access_token");
        wp_die(json_encode(array(
            'success' => false, 
            'message' => 'Invalid or missing administrator token',
            'debug' => array(
                'token_provided' => !empty($token),
                'token_stored' => !empty($stored_token),
                'token_length' => strlen($token),
                'stored_length' => strlen($stored_token)
            )
        )));
    }
    
    // Get action
    $action = isset($data['action']) ? sanitize_text_field($data['action']) : '';
    
    switch ($action) {
        case 'list':
            $plugins = webivus_get_installed_plugins();
            wp_die(json_encode(array('success' => true, 'data' => $plugins)));
            
        case 'install':
            $slug = isset($data['slug']) ? sanitize_text_field($data['slug']) : '';
            if (empty($slug)) {
                wp_die(json_encode(array('success' => false, 'message' => 'Plugin slug is required')));
            }
            $result = webivus_install_plugin($slug);
            wp_die(json_encode($result));
            
        case 'activate':
            $slug = isset($data['slug']) ? sanitize_text_field($data['slug']) : '';
            if (empty($slug)) {
                wp_die(json_encode(array('success' => false, 'message' => 'Plugin slug is required')));
            }
            $result = webivus_activate_plugin_by_slug($slug);
            wp_die(json_encode($result));
            
        case 'deactivate':
            $slug = isset($data['slug']) ? sanitize_text_field($data['slug']) : '';
            if (empty($slug)) {
                wp_die(json_encode(array('success' => false, 'message' => 'Plugin slug is required')));
            }
            $result = webivus_deactivate_plugin_by_slug($slug);
            wp_die(json_encode($result));
            
        case 'list_themes':
            $themes = webivus_get_installed_themes();
            wp_die(json_encode(array('success' => true, 'data' => $themes)));
            
        case 'install_theme':
            $slug = isset($data['slug']) ? sanitize_text_field($data['slug']) : '';
            if (empty($slug)) {
                wp_die(json_encode(array('success' => false, 'message' => 'Theme slug is required')));
            }
            $result = webivus_install_theme($slug);
            wp_die(json_encode($result));
            
        case 'activate_theme':
            $slug = isset($data['slug']) ? sanitize_text_field($data['slug']) : '';
            if (empty($slug)) {
                wp_die(json_encode(array('success' => false, 'message' => 'Theme slug is required')));
            }
            $result = webivus_activate_theme_by_slug($slug);
            wp_die(json_encode($result));
            
        case 'delete_theme':
            $slug = isset($data['slug']) ? sanitize_text_field($data['slug']) : '';
            if (empty($slug)) {
                wp_die(json_encode(array('success' => false, 'message' => 'Theme slug is required')));
            }
            $result = webivus_delete_theme_by_slug($slug);
            wp_die(json_encode($result));
            
        case 'test':
            // Test endpoint to verify token and connection
            $stored_token = get_option("webivus_access_token");
            wp_die(json_encode(array(
                'success' => true, 
                'message' => 'Token verification successful',
                'data' => array(
                    'token_provided' => !empty($token),
                    'token_stored' => !empty($stored_token),
                    'token_length' => strlen($token),
                    'stored_length' => strlen($stored_token),
                    'tokens_match' => hash_equals($stored_token, $token)
                )
            )));
        
        // ===== Settings & Permalinks Management =====
        case 'update_option':
            $option = isset($data['option']) ? sanitize_text_field($data['option']) : '';
            $value  = isset($data['value']) ? $data['value'] : null;
            if (empty($option)) {
                wp_die(json_encode(array('success' => false, 'message' => 'Option name is required')));
            }
            update_option($option, $value);
            wp_die(json_encode(array('success' => true, 'message' => 'Option updated', 'result' => array('option' => $option, 'value' => $value))));
        
        case 'get_settings':
            $sections = array('general','writing','reading','discussion','media','permalink','privacy');
            $result = array();
            foreach ($sections as $sec) {
                $result[$sec] = webivus_get_settings_section($sec);
            }
            wp_die(json_encode(array('success' => true, 'result' => $result)));

        case 'update_settings':
            $section = isset($data['section']) ? sanitize_text_field($data['section']) : '';
            $payload = isset($data['data']) && is_array($data['data']) ? $data['data'] : array();
            if (empty($section)) {
                wp_die(json_encode(array('success' => false, 'message' => 'Section is required')));
            }
            $resp = webivus_update_settings_section($section, $payload);
            wp_die(json_encode($resp));

        case 'get_general':
            wp_die(json_encode(array('success' => true, 'result' => webivus_get_settings_section('general'))));
        case 'update_general':
            try {
                error_log("Webivus Plugin: Processing update_general request");
                error_log("Webivus Plugin: Raw data: " . print_r($data, true));
                
                $payload = isset($data['data']) && is_array($data['data']) ? $data['data'] : array();
                error_log("Webivus Plugin: Extracted payload: " . print_r($payload, true));
                
                $result = webivus_update_settings_section('general', $payload);
                error_log("Webivus Plugin: Update result: " . print_r($result, true));
                
                wp_die(json_encode($result));
            } catch (Exception $e) {
                error_log("Webivus Plugin: Exception in update_general case: " . $e->getMessage());
                wp_die(json_encode(array('success' => false, 'message' => 'Error: ' . $e->getMessage())));
            }

        case 'get_writing':
            wp_die(json_encode(array('success' => true, 'result' => webivus_get_settings_section('writing'))));
        case 'update_writing':
            $payload = isset($data['data']) && is_array($data['data']) ? $data['data'] : array();
            wp_die(json_encode(webivus_update_settings_section('writing', $payload)));

        case 'get_reading':
            wp_die(json_encode(array('success' => true, 'result' => webivus_get_settings_section('reading'))));
        case 'update_reading':
            $payload = isset($data['data']) && is_array($data['data']) ? $data['data'] : array();
            wp_die(json_encode(webivus_update_settings_section('reading', $payload)));

        case 'get_discussion':
            wp_die(json_encode(array('success' => true, 'result' => webivus_get_settings_section('discussion'))));
        case 'update_discussion':
            $payload = isset($data['data']) && is_array($data['data']) ? $data['data'] : array();
            wp_die(json_encode(webivus_update_settings_section('discussion', $payload)));

        case 'get_media':
            wp_die(json_encode(array('success' => true, 'result' => webivus_get_settings_section('media'))));
        case 'update_media':
            $payload = isset($data['data']) && is_array($data['data']) ? $data['data'] : array();
            wp_die(json_encode(webivus_update_settings_section('media', $payload)));

        case 'get_permalink':
            wp_die(json_encode(array('success' => true, 'result' => webivus_get_permalink_info())));
        case 'update_permalink':
            $structure = isset($data['structure']) ? $data['structure'] : null;
            $preset    = isset($data['preset']) ? sanitize_text_field($data['preset']) : null;
            wp_die(json_encode(webivus_update_permalink($structure, $preset)));

        case 'get_privacy':
            $page_id = get_option('wp_page_for_privacy_policy');
            wp_die(json_encode(array('success' => true, 'result' => array('page_id' => intval($page_id)))));
        case 'set_privacy':
            $page_id = isset($data['page_id']) ? intval($data['page_id']) : 0;
            if ($page_id <= 0) {
                wp_die(json_encode(array('success' => false, 'message' => 'Invalid page_id')));
            }
            update_option('wp_page_for_privacy_policy', $page_id);
            wp_die(json_encode(array('success' => true, 'message' => 'Privacy policy page set', 'result' => array('page_id' => $page_id))));
            
        default:
            wp_die(json_encode(array('success' => false, 'message' => 'Invalid action. Supported actions: list, install, activate, deactivate, test, list_themes, install_theme, activate_theme, delete_theme')));
    }
}

/**
 * Settings Helpers
 */
function webivus_settings_sections_def() {
    return array(
        'general' => array('blogname','blogdescription','siteurl','home','admin_email','timezone_string','date_format','time_format','start_of_week','WPLANG','use_smilies'),
        'writing' => array('default_category','default_post_format','use_balanceTags','use_smilies'),
        'reading' => array('show_on_front','page_on_front','page_for_posts','posts_per_page','posts_per_rss','rss_use_excerpt'),
        'discussion' => array('default_comment_status','comment_previously_approved','comment_moderation','comment_max_links','moderation_keys','blacklist_keys','show_avatars','avatar_rating','avatar_default','thread_comments','thread_comments_depth','page_comments','comments_per_page','default_comments_page','comment_order'),
        'media' => array('thumbnail_size_w','thumbnail_size_h','thumbnail_crop','medium_size_w','medium_size_h','medium_large_size_w','large_size_w','large_size_h','uploads_use_yearmonth_folders'),
        'permalink' => array('permalink_structure','category_base','tag_base'),
        'privacy' => array('wp_page_for_privacy_policy'),
    );
}

function webivus_get_settings_section($section) {
    $defs = webivus_settings_sections_def();
    if (!isset($defs[$section])) return array();
    $result = array();
    foreach ($defs[$section] as $opt) {
        $result[$opt] = get_option($opt);
    }
    return $result;
}

function webivus_update_settings_section($section, $data) {
    try {
        error_log("Webivus Plugin: Starting update_settings_section for section: " . $section);
        error_log("Webivus Plugin: Data received: " . print_r($data, true));
        
        $defs = webivus_settings_sections_def();
        if (!isset($defs[$section])) {
            error_log("Webivus Plugin: Invalid section: " . $section);
            return array('success' => false, 'message' => 'Invalid section');
        }
        
        if (!is_array($data)) $data = array();
        
        foreach ($data as $key => $val) {
            if (!in_array($key, $defs[$section])) {
                error_log("Webivus Plugin: Skipping invalid key: " . $key);
                continue;
            }
            
            error_log("Webivus Plugin: Updating option: " . $key . " = " . $val);
            $result = update_option($key, $val);
            error_log("Webivus Plugin: Update result for " . $key . ": " . ($result ? 'success' : 'failed'));
        }
        
        error_log("Webivus Plugin: Settings update completed successfully");
        return array('success' => true, 'message' => 'Settings updated');
    } catch (Exception $e) {
        error_log("Webivus Plugin: Exception in update_settings_section: " . $e->getMessage());
        return array('success' => false, 'message' => 'Error updating settings: ' . $e->getMessage());
    }
}

function webivus_get_permalink_info() {
    return array(
        'permalink_structure' => get_option('permalink_structure'),
        'category_base' => get_option('category_base'),
        'tag_base' => get_option('tag_base'),
    );
}

function webivus_update_permalink($structure, $preset = null) {
    global $wp_rewrite;
    if ($preset) {
        switch ($preset) {
            case 'plain':
                $structure = '';
                break;
            case 'day':
                $structure = '/%year%/%monthnum%/%day%/%postname%/';
                break;
            case 'month':
                $structure = '/%year%/%monthnum%/%postname%/';
                break;
            case 'numeric':
                $structure = '/archives/%post_id%';
                break;
            case 'postname':
                $structure = '/%postname%/';
                break;
        }
    }
    if ($structure === null) {
        $structure = get_option('permalink_structure');
    }
    update_option('permalink_structure', $structure);
    if (isset($wp_rewrite)) {
        $wp_rewrite->set_permalink_structure($structure);
    }
    flush_rewrite_rules();
    return array('success' => true, 'message' => 'Permalink structure updated', 'result' => webivus_get_permalink_info());
}

/**
 * Get all installed themes with their status
 */
function webivus_get_installed_themes() {
    $available_themes = wp_get_themes();
    $current_theme = get_stylesheet();
    
    $themes = array();
    
    foreach ($available_themes as $theme_slug => $theme_obj) {
        $is_active = ($theme_slug === $current_theme);
        
        $themes[] = array(
            'slug' => $theme_slug,
            'name' => $theme_obj->get('Name'),
            'version' => $theme_obj->get('Version'),
            'description' => $theme_obj->get('Description'),
            'author' => $theme_obj->get('Author'),
            'is_active' => $is_active,
            'screenshot' => $theme_obj->get_screenshot(),
            'template' => $theme_obj->get('Template'),
            'text_domain' => $theme_obj->get('TextDomain'),
            'theme_uri' => $theme_obj->get('ThemeURI'),
            'author_uri' => $theme_obj->get('AuthorURI'),
        );
    }
    
    return $themes;
}

/**
 * Install theme by slug from WordPress.org repository
 */
function webivus_install_theme($slug) {
    // Check if user has install_themes capability
    $user_has_permission = false;
    
    // Try current user first (for admin interface)
    if (is_user_logged_in() && current_user_can('install_themes')) {
        $user_has_permission = true;
    }
    
    // If no current user, check if this is an API request with valid JWT
    if (!$user_has_permission && defined('DOING_AJAX') && DOING_AJAX) {
        // For API requests, we'll check the JWT token in the calling function
        // If we reach here, the token was already validated
        $user_has_permission = true;
    }
    
    if (!$user_has_permission) {
        return array('success' => false, 'message' => 'Insufficient permissions to install themes');
    }
    
    if (!function_exists('download_url')) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
    }
    if (!function_exists('WP_Upgrader')) {
        require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
    }
    if (!function_exists('themes_api')) {
        require_once ABSPATH . 'wp-admin/includes/theme-install.php';
    }
    
    // Get theme information from WordPress.org
    $api = themes_api('theme_information', array(
        'slug' => $slug,
        'fields' => array(
            'sections' => false,
            'tags' => false,
            'ratings' => false,
            'downloaded' => false,
            'last_updated' => false,
            'added' => false,
            'compatibility' => false,
            'homepage' => false,
            'donate_link' => false,
        ),
    ));
    
    if (is_wp_error($api)) {
        return array('success' => false, 'message' => 'Theme not found in WordPress.org repository: ' . $api->get_error_message());
    }
    
    // Check if theme is already installed
    $installed_themes = wp_get_themes();
    if (isset($installed_themes[$slug])) {
        return array('success' => false, 'message' => 'Theme is already installed');
    }
    
    // Download and install the theme
    $upgrader = new Theme_Upgrader();
    $result = $upgrader->install($api->download_link);
    
    if (is_wp_error($result)) {
        return array('success' => false, 'message' => 'Installation failed: ' . $result->get_error_message());
    }
    
    if ($result === false) {
        return array('success' => false, 'message' => 'Installation failed: Unknown error');
    }
    
    return array('success' => true, 'message' => 'Theme installed successfully');
}

/**
 * Activate theme by slug
 */
function webivus_activate_theme_by_slug($slug) {
    // Check if user has switch_themes capability
    $user_has_permission = false;
    
    // Try current user first (for admin interface)
    if (is_user_logged_in() && current_user_can('switch_themes')) {
        $user_has_permission = true;
    }
    
    // If no current user, check if this is an API request with valid JWT
    if (!$user_has_permission && defined('DOING_AJAX') && DOING_AJAX) {
        // For API requests, we'll check the JWT token in the calling function
        // If we reach here, the token was already validated
        $user_has_permission = true;
    }
    
    if (!$user_has_permission) {
        return array('success' => false, 'message' => 'Insufficient permissions to activate themes');
    }
    
    $installed_themes = wp_get_themes();
    
    if (!isset($installed_themes[$slug])) {
        return array('success' => false, 'message' => 'Theme not found');
    }
    
    // Check if already active
    if (get_stylesheet() === $slug) {
        return array('success' => false, 'message' => 'Theme is already active');
    }
    
    // Switch to the theme
    switch_theme($slug);
    
    // Verify the switch was successful
    if (get_stylesheet() === $slug) {
        return array('success' => true, 'message' => 'Theme activated successfully');
    } else {
        return array('success' => false, 'message' => 'Theme activation failed');
    }
}

/**
 * Delete theme by slug
 */
function webivus_delete_theme_by_slug($slug) {
    // Check if user has delete_themes capability
    $user_has_permission = false;
    
    // Try current user first (for admin interface)
    if (is_user_logged_in() && current_user_can('delete_themes')) {
        $user_has_permission = true;
    }
    
    // If no current user, check if this is an API request with valid JWT
    if (!$user_has_permission && defined('DOING_AJAX') && DOING_AJAX) {
        // For API requests, we'll check the JWT token in the calling function
        // If we reach here, the token was already validated
        $user_has_permission = true;
    }
    
    if (!$user_has_permission) {
        return array('success' => false, 'message' => 'Insufficient permissions to delete themes');
    }
    
    $installed_themes = wp_get_themes();
    
    if (!isset($installed_themes[$slug])) {
        return array('success' => false, 'message' => 'Theme not found');
    }
    
    // Check if it's the current theme
    if (get_stylesheet() === $slug) {
        return array('success' => false, 'message' => 'Cannot delete the currently active theme');
    }
    
    // Delete the theme
    if (!function_exists('delete_theme')) {
        require_once ABSPATH . 'wp-admin/includes/theme.php';
    }
    
    $result = delete_theme($slug);
    
    if (is_wp_error($result)) {
        return array('success' => false, 'message' => 'Deletion failed: ' . $result->get_error_message());
    }
    
    return array('success' => true, 'message' => 'Theme deleted successfully');
}

/**
 * Add JWT authentication endpoint
 */
add_action('rest_api_init', function() {
    register_rest_route('webivus/v1', '/jwt/token', array(
        'methods' => 'POST',
        'callback' => 'webivus_generate_jwt_endpoint',
        'permission_callback' => '__return_true', // We'll handle auth in callback
        'args' => array(
            'username' => array(
                'required' => true,
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ),
            'password' => array(
                'required' => true,
                'type' => 'string'
            )
        )
    ));
});

/**
 * Add JWT authentication for REST API
 */
add_filter('determine_current_user', function($user_id) {
    // If user is already determined, return it
    if ($user_id) {
        return $user_id;
    }

    // Check if this is a REST API request
    if (!defined('REST_REQUEST') || !REST_REQUEST) {
        return $user_id;
    }

    // Get the authorization header
    $auth_header = null;
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth_header = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $auth_header = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } elseif (function_exists('getallheaders')) {
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            $auth_header = $headers['Authorization'];
        } elseif (isset($headers['authorization'])) {
            $auth_header = $headers['authorization'];
        }
    }

    if (!$auth_header) {
        return $user_id;
    }

    // Extract Bearer token
    if (strpos($auth_header, 'Bearer ') === 0) {
        $token = substr($auth_header, 7);
        
        // Verify JWT token
        $payload = webivus_verify_jwt_token($token);
        if ($payload && isset($payload['user_id'])) {
            return $payload['user_id'];
        }
    }

    return $user_id;
}, 10);

function webivus_generate_jwt_endpoint($request) {
    $username = $request->get_param('username');
    $password = $request->get_param('password');
    
    // Authenticate user
    $user = wp_authenticate($username, $password);
    if (is_wp_error($user)) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Invalid credentials'
        ), 401);
    }
    
    // Check if user has administrator role
    if (!user_can($user, 'manage_options')) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Insufficient permissions'
        ), 403);
    }
    
    // Generate JWT token
    $token = webivus_generate_jwt_token($user->ID);
    if (!$token) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Failed to generate token'
        ), 500);
    }
    
    return new WP_REST_Response(array(
        'success' => true,
        'token' => $token,
        'user_email' => $user->user_email,
        'user_nicename' => $user->user_nicename,
        'user_display_name' => $user->display_name,
        'expires_in' => 2592000 // 30 days
    ), 200);
}

/**
 * Add plugin management section to admin page
 */
function webivus_add_plugin_management_section() {
    $current_token = get_option("webivus_access_token");
    ?>
    <div class="card" style="max-width: 800px; margin-top: 20px;">
        <h2>JWT Authentication</h2>
        <p>Generate JWT tokens for WordPress authentication:</p>
        
        <h3>JWT Token Endpoint</h3>
        <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0; word-break: break-all; font-family: monospace;">
            POST <?php echo esc_html(get_rest_url() . 'webivus/v1/jwt/token'); ?>
        </code>
        
        <h3>Authentication Request</h3>
        <div style="background: #f1f1f1; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <h4>Generate JWT Token:</h4>
            <pre style="margin: 0; white-space: pre-wrap;">POST <?php echo esc_html(get_rest_url() . 'webivus/v1/jwt/token'); ?>

{
    "username": "admin",
    "password": "your_password"
}</pre>
        </div>
        
        <h3>Usage with Authorization Header</h3>
        <div style="background: #f1f1f1; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <pre style="margin: 0; white-space: pre-wrap;">Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...</pre>
        </div>
    </div>
    
    <div class="card" style="max-width: 800px; margin-top: 20px;">
        <h2>Plugin Management API</h2>
        <p>Use these endpoints to manage WordPress plugins programmatically:</p>
        
        <h3>API Endpoint</h3>
        <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0; word-break: break-all; font-family: monospace;">
            <?php echo esc_html(admin_url('admin-ajax.php?action=webivus_plugin_management')); ?>
        </code>
        
        <h3>Authentication</h3>
        <p>Include your access token in the request body:</p>
        <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0; word-break: break-all; font-family: monospace;">
            { "token": "<?php echo esc_html($current_token); ?>", "action": "list" }
        </code>
        
        <h3>Available Actions</h3>
        <ul>
            <li><strong>list</strong> - Get all installed plugins with their status</li>
            <li><strong>install</strong> - Install a plugin by slug from WordPress.org</li>
            <li><strong>activate</strong> - Activate a plugin by slug</li>
            <li><strong>deactivate</strong> - Deactivate a plugin by slug</li>
            <li><strong>test</strong> - Test token verification and connection</li>
        </ul>
        
        <h3>Example Usage</h3>
        <div style="background: #f1f1f1; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <h4>List all plugins:</h4>
            <pre style="margin: 0; white-space: pre-wrap;">POST <?php echo esc_html(admin_url('admin-ajax.php?action=webivus_plugin_management')); ?>

{
    "token": "<?php echo esc_html($current_token); ?>",
    "action": "list"
}</pre>
        </div>
        
        <div style="background: #f1f1f1; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <h4>Install a plugin:</h4>
            <pre style="margin: 0; white-space: pre-wrap;">POST <?php echo esc_html(admin_url('admin-ajax.php?action=webivus_plugin_management')); ?>

{
    "token": "<?php echo esc_html($current_token); ?>",
    "action": "install",
    "slug": "contact-form-7"
}</pre>
        </div>
        
        <div style="background: #f1f1f1; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <h4>Activate a plugin:</h4>
            <pre style="margin: 0; white-space: pre-wrap;">POST <?php echo esc_html(admin_url('admin-ajax.php?action=webivus_plugin_management')); ?>

{
    "token": "<?php echo esc_html($current_token); ?>",
    "action": "activate",
    "slug": "contact-form-7"
}</pre>
        </div>
        
        <div style="background: #f1f1f1; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <h4>Deactivate a plugin:</h4>
            <pre style="margin: 0; white-space: pre-wrap;">POST <?php echo esc_html(admin_url('admin-ajax.php?action=webivus_plugin_management')); ?>

{
    "token": "<?php echo esc_html($current_token); ?>",
    "action": "deactivate",
    "slug": "contact-form-7"
}</pre>
        </div>
        
        <div style="background: #f1f1f1; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <h4>Test token verification:</h4>
            <pre style="margin: 0; white-space: pre-wrap;">POST <?php echo esc_html(admin_url('admin-ajax.php?action=webivus_plugin_management')); ?>

{
    "token": "<?php echo esc_html($current_token); ?>",
    "action": "test"
}</pre>
        </div>
    </div>
    <?php
}
?>