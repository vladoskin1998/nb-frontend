export const headerTitle = (locationRoute: string | undefined) => {
    const key = String(locationRoute)
    switch (key) {
        case "/admin/users":
            return "Users"
        case "/admin/services":
            return "Services"
        case "/admin/posts":
            return "Publications"
        case "/admin/messeges":
            return "Messenger"
        case "/admin/helpcenter":
            return "Help Center"
        case "/admin/advertisement":
            return "Advertisement"
        case "/admin/activities":
            return "Activities"
        case "/admin/activities/eventactivities":
            return "Event"
        case "/admin/adminpanel":
            return "Admin Panel"
        default:
            return "Admin Panel"
    }
}

