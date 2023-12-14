export enum ROLES {
    ALLUSERS = 'all users',
    ADMIN = "admin",
    REGIONAL_ADMIN = "regional admin",
    COORDINATORS = 'coordinators',
    TECH_SUPPORT = 'tech support',
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
    NEIBS = "Neibs",
    ONLYME = "Only me",
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

export enum SEX {
    MALE = "Male",
    FEMALE = "Female"
}

export enum EDUCATION {
    HIGHSCHOOL = "High School",
    TECHCPLLEGE = "Tech. College",
    PHDOTD = "Ph.D",
    STUDYCOLLEGE = "Study in college",
    PHD = "PhD",
    BACHERLOR = "Bachelor",
    MASTERDEGREE = "Master’s degree"
}

export enum FAMILYSTATUS {
    SINGLE = "Single",
    INRELATIONSHIP = "In a relationship",
    ENGAGED = "Engaged",
    MARRIED = "Married",
    CIVILMARIEGE = "In a civil marriage",
    COMPLICATED = "It’s Complicated",
    SEPARATETHREADING = "Separate threading",
    DIVORCED = "Divorced",
    WIDOW = "Widower/Widow",
}


export enum QUALITYENUM {
    INTERESTS = "Interests",
    SKILLS = "Skills",
    PROFESSION = "Profession",
    NATIONALITY = "Nationality"
}

export enum ACTIVITIE {
    ALL = "All",
    SERVICES = "Services",
    EVENTS = "Events",
    POSTS = "Posts"
}

export enum SOCKET_MESSENDER_EVENT {

    JOIN_ROOM = "join_room",
    LEAVE_ROOM = "leave_room",

    SEND_PRIVATE_MESSAGE = "send_private_message",
    GET_PRIVATE_MESSAGE = "get_private_message",
    DELETE_PRIVATE_MESSAGE = "delete_private_message",
    FORWARD_PRIVATE_MESSAGE = "forward_private_message",
    SEND_PRIVATE_VOICE_MESSAGE = "send_private_voice_message",
    SEND_PRIVATE_MESSAGE_LIKE = "send_private_message_like",
    DELETE_PRIVATE_MESSAGE_LIKE = "delete_private_message_like",

    NOTIFICATION = 'notification',

    NEW_CREATE_CHAT = 'new_create_chat',
    UPDATE_LIST_CHAT = 'update_list_chat',

    AUTH_SOCKET = 'auth_socket',
}

export enum SERVICES_EVENT {
    LIST = "list",
    SUB_LIST = "sub_list",
    FAVOR_LIST = "favor_list",

    ADD_SERVICES = 'add',
    EDIT_SERVICES = 'edit',
    EDIT_SUB_SERVICES = 'sub_edit',
}

export enum PHOTO_ADD_METHOD {
    CAMERA_ROLL = "CAMERA_ROLL",
    TAKE_NOW = "TAKE_NOW",
}


export enum METHOD_FORGET_PASSWORD {
    PHONE = 'phone',
    EMAIL = 'email'
}

export enum SOCKET_NOTIFICATION_EVENT {

    JOIN_ROOM_NOTIFICATION = "join_room_notification",
    LEAVE_ROOM_NOTIFICATION = "leave_room_notification",

    NOTIFICATION = "notification",
}

export enum NOTIFICATION_EVENT {
    NOTIFICATION_SERVICE = "service",
    NOTIFICATION_ACTIVITIES = "activities",
    NOTIFICATION_MESSAGE = "message",
    NOTIFICATION_NEWS = "news",
}


export enum AUTH_AGREE_TYPES {
    POLICY='policy',
    TERMS='terms'
}

export enum ONLINEOFFLINE{
    ONLINE = 'online',
    OFFLINE = 'offline'
}

export enum NOTIFICATION_POST{
    POST = 'post',
    COMMENT = 'comment'
}

export enum USER_LIST_APP{
    ALL = 'all',
    LAST = 'last'
}