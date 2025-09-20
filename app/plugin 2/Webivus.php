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

// Security: Add nonce for forms
add_action('init', function() {
    if (!session_id()) {
        session_start();
    }
});

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
    
    // Generate secure token
    $access_token = wp_generate_password(32, false, false); // No special chars for API compatibility
    
    // Prepare data with validation
    $body = array(
        "site_url"      => esc_url_raw($site_url),
        "admin_email"   => sanitize_email($admin_email),
        "admin_username"=> sanitize_user($admin_username),
        "access_token"  => $access_token,
         "logo"          => esc_url_raw($logo_url)
    );
    
    // Save token in WP options so we don't resend multiple times
    if (!get_option("webivus_access_token")) {
        update_option("webivus_access_token", $access_token);
        
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
    if (isset($_POST["regenerate_token"])) {
        if (!wp_verify_nonce($_POST['webivus_nonce'], 'webivus_regenerate_token')) {
            wp_die(__('Security check failed. Please refresh the page and try again.'));
        }
        
        $site_url = get_site_url();
        $new_token = wp_generate_password(32, false, false);
        
        $body = array(
            "site_url"     => esc_url_raw($site_url),
            "access_token" => $new_token
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
                    echo "<div class='notice notice-success'><p>✅ New token generated successfully!</p></div>";
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
    $nonce = wp_create_nonce('webivus_regenerate_token');
    ?>
    <div class="wrap">
        <h1>Webivus AI Connector</h1>
        
        <div class="card" style="max-width: 800px;">
            <h2>Connection Status</h2>
            <?php if ($current_token): ?>
                <p><strong>Status:</strong> <span style="color: green;">✅ Connected</span></p>
                <p><strong>Current Access Token:</strong></p>
                <code style="background: #f1f1f1; padding: 10px; display: block; margin: 10px 0; word-break: break-all; font-family: monospace;">
                    <?php echo esc_html($current_token); ?>
                </code>
            <?php else: ?>
                <p><strong>Status:</strong> <span style="color: red;">❌ Not Connected</span></p>
                <p>Please deactivate and reactivate the plugin to establish connection.</p>
            <?php endif; ?>
        </div>
        
        <div class="card" style="max-width: 800px; margin-top: 20px;">
            <h2>Actions</h2>
            <form method="post" style="margin-bottom: 15px;">
                <?php wp_nonce_field('webivus_regenerate_token', 'webivus_nonce'); ?>
                <input type="submit" name="regenerate_token" class="button button-primary" value="Connect to Webivus">
                <p class="description">Regenerate access token and update backend connection.</p>
            </form>
            
            <a href="http://localhost:3000/webapp" target="_blank" rel="noopener noreferrer" class="button button-secondary">
                 Open Webivus Dashboard
            </a>
            <p class="description">Open the Webivus dashboard in a new tab.</p>
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
 * Verify administrator token for API requests
 */
function webivus_verify_admin_token($token) {
    if (!$token) {
        error_log("Webivus Plugin API: No token provided");
        return false;
    }
    
    $stored_token = get_option("webivus_access_token");
    if (!$stored_token) {
        error_log("Webivus Plugin API: No stored token found");
        return false;
    }
    
    // Trim whitespace from both tokens
    $token = trim($token);
    $stored_token = trim($stored_token);
    
    // Log token comparison for debugging
    error_log("Webivus Plugin API: Comparing tokens - Provided: '" . $token . "' (length: " . strlen($token) . "), Stored: '" . $stored_token . "' (length: " . strlen($stored_token) . ")");
    
    $result = hash_equals($stored_token, $token);
    error_log("Webivus Plugin API: Token verification result: " . ($result ? 'SUCCESS' : 'FAILED'));
    
    return $result;
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
    if (!current_user_can('install_plugins')) {
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
    if (!current_user_can('activate_plugins')) {
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
    if (!current_user_can('activate_plugins')) {
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
    $data = json_decode($input, true);
    
    // If JSON parsing failed, try form data
    if (!$data && !empty($_POST)) {
        $data = $_POST;
    }
    
    if (!$data) {
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
            
        default:
            wp_die(json_encode(array('success' => false, 'message' => 'Invalid action. Supported actions: list, install, activate, deactivate, test')));
    }
}

/**
 * Add plugin management section to admin page
 */
function webivus_add_plugin_management_section() {
    $current_token = get_option("webivus_access_token");
    ?>
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