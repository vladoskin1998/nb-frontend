export const toOneKind = (s: string) => s.replace(/ /g, '').toLocaleLowerCase()

export const headerTitle = (locationRoute: string | undefined) => {
    const key = String(locationRoute)
    switch (key) {
        case "/admin/users":
            return "Users"
        case "/admin/users/allusers":
            return "Users"
        case "/admin/users/coordinators":
            return "Users"
        case "/admin/users/blocked":
            return "Users"
        case "/admin/users/groups":
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



export const userSubTitle = (locationRoute: string | undefined) => {
    const key = String(locationRoute)
    switch (key) {
        case "/admin/users":
            return "All Users"
        case "/admin/users/allusers":
            return "All Users"
        case "/admin/users/coordinators":
            return "Coordinators"
        case "/admin/users/blocked":
            return "Blocked"
        case "/admin/users/groups":
            return "Groups"
    }
}