export enum ROLES {
    ALLUSERS = 'all users',
    ADMIN = "admin",
    COORDINATORS = 'coordinators',
    USER = "user",
    BLOCKED = "blocked",
}

export enum METHOD_AUTH {
    REGISTRATION = "registration",
    LOGIN = "login",
    GOOGLE = "google",
    FACEBOOK = "facebook",
}

export enum PRIVACY {
    EVERYONE = "Everyone",
    ONLYME = "Only me",
    NEIBS = "Neibs",
}

export enum ORIENTATION {
    HETERO = "Hetero",
    GAY = "Gay",
    LESBIAN = "Lesbian",
    QUEER = "Queer",
    ASEXUAL = "Asexual",
    PANSEXUAL = "Pansexual",
    DEMISEXUAL = "Demisexual",
    BISEXUAL = "Bisexual",
    DIDNOTDECIDE = "Did not decide",
    OTHER = "Other"
}

export enum SEX{
    MALE="Male",
    FEMALE="Female"
}

export enum EDUCATION{
    HIGHSCHOOL="High School",
    TECHCPLLEGE="Tech. College",
    PHDOTD="Ph.D",
    STUDYCOLLEGE="Study in college",
    PHD="PhD",
    BACHERLOR="Bachelor",
    MASTERDEGREE="Master’s degree"
}

export enum FAMILYSTATUS{
    SINGLE="Single",
    INRELATIONSHIP="In a relationship",
    ENGAGED="Engaged",
    MARRIED="Married",
    CIVILMARIEGE="In a civil marriage",
    COMPLICATED="It’s Complicated",
    SEPARATETHREADING="Separate threading"
}


export enum QUALITYENUM {
    INTERESTS = "Interests",
    SKILLS = "Skills",
    PROFESSION = "Profession",
    NATIONALITY = "Nationality"
  } 

  export enum ACTIVITIE{
    ALL="All",
    SERVICES="Services",
    EVENTS="Events",
    POSTS="Posts"
  }

  export enum SOCKET_MESSENDER_EVENT{

    JOIN_ROOM="join_room",
    LEAVE_ROOM="leave_room",
  
    SEND_PRIVATE_MESSAGE="send_private_message",
    GET_PRIVATE_MESSAGE="get_private_message",
  
    NOTIFICATION='notification',
    
    NEW_CREATE_CHAT='new_create_chat',
    UPDATE_LIST_CHAT='update_list_chat',
  
    AUTH_SOCKET='auth_socket',
  }

  export enum SERVICES_EVENT{
    LIST="list",
    SUB_LIST="sub_list",
    FAVOR_LIST="favor_list",
    
    ADD_SERVICES = 'add',
    EDIT_SERVICES = 'edit',
    EDIT_SUB_SERVICES = 'sub_edit',
  }