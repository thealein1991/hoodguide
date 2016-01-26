console.log('setting config');

Accounts.ui.config({
    requestPermissions: {
        facebook: ['email', 'user_friends', 'user_location', 'user_events',
            'friends_events', 'friends_location', 'friends_about_me',
            'user_status', 'friends_status', 'read_friendlists', 'status_update','manage_pages', 'publish_actions', 'user_photos'],
    }
});
