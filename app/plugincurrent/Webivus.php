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
?>