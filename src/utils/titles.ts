export const toOneKind = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

export const headerTitle = (locationRoute: string | undefined) => {
    const key = String(locationRoute)

    console.log(key);
    
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
        case "/admin/services/services-list-sub":
            return "Sub Services"
            
        case "/admin/posts":
            return "Publications"
            case "/admin/messeges/chat":
                return "Messenger"
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
        default:
            return "All Users"
    }
}


export const profileTitle = (locationRoute: string): { tt: string, sbtt: string } => {
    const key = String(locationRoute)
    switch (key) {
        case "/profile":
            return {
                tt: "Profile Picture",
                sbtt: "Please upload a profile picture that allows other users to recognize you",
            }
        case "/profile/interest-zone":
            return {
                tt: "Interest Zone",
                sbtt: "Express and explore the things that truly captivate you",
            }
        case "/profile/privacy":
            return {
                tt: "Privacy",
                sbtt: "Please setup your privacy settings so we can personalize your experience",
            }
        case "/profile/about":
            return {
                tt: "About me",
                sbtt: "This is your opportunity to create a compelling introduction ",
            }
        case "/profile/profession":
            return {
                tt: "Profession",
                sbtt: "Let others learn more about your professional journey",
            }
        case "/profile/skills":
            return {
                tt: "Skills",
                sbtt: "Highlight your expertise: Choose & showcase your skills.",
            }
        case "/profile/interests":
            return {
                tt: "Interests",
                sbtt: "Discover like-minded individuals who share similar interests",
            }
        case "/profile/certificates":
            return {
                tt: "Certificates",
                sbtt: "You can prove your expertise by uploading certificates or documents",
            }
        case "/profile/birth":
            return {
                tt: "Date of birth",
                sbtt: "Enter your date of birth for a personalized experience",
            }
        case "/profile/nationality":
            return {
                tt: "Nationality",
                sbtt: "Embrace diversity and connect with people from all over the world",
            }
        case "/profile/sex":
            return {
                tt: "I am...",
                sbtt: "You are valued and respected for who you are",
            }

        case "/profile/education":
            return {
                tt: "Education",
                sbtt: "By showcasing your educational journey, you provide others with valuable insights",
            }

        case "/profile/family-status":
            return {
                tt: "Family Status",
                sbtt: "We appreciate the diverse forms of family and relationships",
            }
        case "/profile/stay-touch":
            return {
                tt: "I want to stay in touch",
                sbtt: "Stay connected with the community and never miss a beat",
            }
        case "/profile/welcome-neibs":
            return {
                tt: "Welcome to the Neibs",
                sbtt: "If the platform rules are violated, your participation may be subject to termination",
            }
        default:
            return {
                tt: "",
                sbtt: "",
            }
    }
}



export const getProfileInfoHederTitile = (locationRoute: string) => {
    switch (locationRoute) {
        case "/profileinfo/logout":
            return 'Log out'
        case "/profileinfo/privacypolicy":
            return 'Privacy Policy'
        case "/profileinfo/termsofservice":
            return 'Terms of Service'
        case "/profileinfo/aboutneightborharbor":
            return 'About NeightborHarbor'
        case "/profileinfo/helpsupport":
            return 'Help & Support'
        case "/profileinfo/privacy":
            return 'Privacy'
        case "/profileinfo/notifications":
            return 'Notifications'
        case "/profileinfo/interestsskills":
            return 'Interests & Skills'
        case "/profileinfo/bookmark":
            return 'Bookmark'
        case "/profileinfo/security":
            return 'Security'
        case "/profileinfo/":
            return 'Edit Profile'
        case "/profileinfo/edit":
            return 'Edit Profile'
        case "/profileinfo/settings":
            return 'Settings'
        default:
            return ""
    }
}
