<?php
/*
Plugin Name: Webivus AI Connector
Description: Connects your WordPress site with the Webivus backend.
Version: 1.0
Author: Vaishali
*/

// Backend API URLs
define("WEBIVUS_API_URL", "http://localhost:7002/api/saveuser");
define("WEBIVUS_UPDATE_TOKEN_URL", "http://localhost:7002/api/updateAccessToken");

// Run only when plugin is activated
register_activation_hook(__FILE__, "webivus_activate_plugin");

function webivus_activate_plugin() {
    $admin_user   = get_userdata(1); // default admin user (ID = 1)
    $site_url     = get_site_url();
    $admin_email  = get_option("admin_email");
    $admin_username = $admin_user ? $admin_user->user_login : "admin";

    // Prepare data
    $body = array(
        "site_url"      => $site_url,
        "admin_email"   => $admin_email,
        "admin_username"=> $admin_username,
        "access_token"  => wp_generate_password(32, false) // initial token
    );

    // Save token in WP options so we don’t resend multiple times
    if (!get_option("webivus_access_token")) {
        update_option("webivus_access_token", $body["access_token"]);

        $response = wp_remote_post(WEBIVUS_API_URL, array(
            "method"  => "POST",
            "timeout" => 30,
            "headers" => array("Content-Type" => "application/json"),
            "body"    => json_encode($body),
        ));

        if (is_wp_error($response)) {
            error_log("Webivus Connector: Failed to connect to backend");
        }
    }

    // Store flag to trigger redirect after activation
    update_option("webivus_do_redirect", true);
}

// Redirect after activation (new tab to localhost:3000)
add_action("admin_init", function () {
    if (get_option("webivus_do_redirect", false)) {
        delete_option("webivus_do_redirect");

        // Open in a new tab using JavaScript (avoids "link expired")
        echo "<script>window.open('http://localhost:3000','_blank');</script>";
    }
});

// Admin menu page
add_action("admin_menu", "webivus_admin_menu");
function webivus_admin_menu() {
    add_menu_page(
        "Webivus AI Connector",
        "Webivus Connector",
        "manage_options",
        "webivus-connector",
        "webivus_admin_page",
        "dashicons-admin-links"
    );
}

function webivus_admin_page() {
    if (isset($_POST["regenerate_token"])) {
        $site_url = get_site_url();
        $new_token = wp_generate_password(32, false);

        $body = array(
            "site_url"     => $site_url,
            "access_token" => $new_token
        );

        $response = wp_remote_post(WEBIVUS_UPDATE_TOKEN_URL, array(
            "method"  => "POST",
            "timeout" => 30,
            "headers" => array("Content-Type" => "application/json"),
            "body"    => json_encode($body),
        ));

        if (!is_wp_error($response)) {
            $data = json_decode(wp_remote_retrieve_body($response), true);
            if (isset($data["success"]) && $data["success"]) {
                update_option("webivus_access_token", $new_token);
                echo "<div class='updated'><p>✅ New token generated: <b>" . esc_html($new_token) . "</b></p></div>";
            } else {
                echo "<div class='error'><p>❌ Failed: " . esc_html($data["message"] ?? "Unknown error") . "</p></div>";
            }
        } else {
            echo "<div class='error'><p>❌ Connection error.</p></div>";
        }
    }

    ?>
    <div class="wrap">
        <h2>Webivus AI Connector</h2>
        <p>Current Access Token: <code><?php echo esc_html(get_option("webivus_access_token")); ?></code></p>
        <form method="post">
            <input type="submit" name="regenerate_token" class="button button-primary" value="Connect to Webivus">
        </form>
    </div>
    <?php
}
