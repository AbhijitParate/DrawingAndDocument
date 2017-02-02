<% ui.decorateWith("appui", "standardEmrPage") %>

Hello, world.

<% if (context.authenticated) { %>
    <h2>This is the demo page for Version 2 of canvas editor</h2>
    ${ ui.includeFragment("annotation", "editor") }
<% } else { %>
    <h2>You are not logged in.</h2>
<% } %>