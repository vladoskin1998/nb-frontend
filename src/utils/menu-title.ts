export const headerTitle = (locationRoute: string | undefined) => {
    const key = String(locationRoute)
    switch (key) {
        case "users":
            return "Users"
        case "services":
            return "Services"
        case "posts":
            return "Publications"
        case "messeges":
            return "Messenger"
        case "helpcenter":
            return "Help Center"
        case "advertisement":
            return "Advertisement"
        case "activities":
            return "Activities"
        case "adminpanel":
            return "Admin Panel"
        default:
            return "Admin Panel"
    }
}

