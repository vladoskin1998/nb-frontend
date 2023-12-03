import { PRIVACY, ROLES } from "./enum";

export type RoleType = ROLES.ADMIN | ROLES.USER

export interface UserMainInterface {
    email: string;
    role: ROLES;
    _id: string;
    fullName: string;
}

export interface AuthResponseInterface {
    user: UserMainInterface;
    accessToken: string;
    refreshToken: string;
}


export interface CoordinatsInterface {
    lat: number, lng: number
}

export type Nullable<T> = {
    [K in keyof T]?: T[K] | null;
};


export interface OptionsItemType {
    _id: string | number
    title: any
}
export type OptionsType = Array<OptionsItemType>

export type MessageType = { chatId: string, senderId: string, content: string, timestamp: Date, isRead: boolean, file: string | null, messageId:string }

export type HeaderMessageType = { email: string, fullName: string, avatarFileName: string }

export type ParticipantType = {
    userId: {
        _id: string,
        fullName: string,
        avatarFileName: string,
    }
}

export type OpenChatData = {
    participants: ParticipantType[],
    chatId: string
}

export type NotReadingMessageType= {
    _id: string,
    isRead: boolean,

}

export type ChatType = {
    chatId: string,
    lastMessage: MessageType,
    participants: ParticipantType[],
    notReadingMessage: [],
    isSupport: boolean
}


export interface Activities {
    _id: string
    name: string
    numberView: number
    isVisiable: boolean
    fileName: string
}

export interface PublishPostInterface {
    userId: string;
    userIdentityId: string;
    title: string;
    text: string;
    filesName: string[];
    coordinates: { lat: number; lng: number };
}

export type PostUserInterface = {
    _id: string,
    userId: {
        _id: string,
        fullName: string,
        email?: string,
        role?: RoleType,
        avatarFileName?: string,
    },
    repostedUserId: {
        _id: string,
        fullName: string,
        avatarFileName?: string,
    } | null,
    userIdentityId: {
        _id: string,  
    },
    title: string,
    text: string,
    filesName: string[]
    coordinates: CoordinatsInterface,
    privacyPost: PRIVACY,
    createdPostDate: Date,
    createdRepostDate: Date,
    addressLocation: string,
    likes: number,
    isLiked: boolean,
    likeId: string,
    countComments: number,
    countReposts:number,
    viewPost: number,
    isReposted: boolean,
    isMarked: boolean,
}

export interface GetAllPostInterface {
    allPageNumber: number
    posts: PostUserInterface[]
}

export type PublishServiceItemInterface = {
    _id: string,
    userId: {
        _id: string,
        fullName: string,
    },
    userIdentityId: {
        _id: string,
        avatarFileName: string,
    },
    title: string,
    text: string,
    filesName: string[]
    coordinates: CoordinatsInterface,
    servicesId: string,
    subServicesId: string,
    privacyPublishService: PRIVACY,
    createdPublishServiceDate: Date,
    addressLocation: string
}

export interface GetAllPublishServicetInterface {
    allPageNumber: number,
    publishServices: PublishServiceItemInterface[]
}


export type PublishEventItemInterface = {
    _id: string,
    userId: {
        _id: string,
        fullName: string,
    },
    userIdentityId: {
        _id: string,
        avatarFileName: string,
    },
    title: string,
    text: string,
    filesName: string[]
    coordinates: CoordinatsInterface,
    activitiesId: string,
    privacyEvent: PRIVACY,
    createEventDate: Date,
    startDate: Date,
    addressLocation: string
}


export interface GetAllPublishActivitiesInterface {
    allPageNumber: number,
    publishActivities: PublishEventItemInterface[]
}

export interface CommentInterface {
    _id: string
    createdDateComment: Date
    isLiked: boolean
    likeId: string
    likes: number
    postId: string
    text: string

    userId: {
        _id: string,
        fullName: string,
        avatarFileName: string,
    },
    userIdentityId: {
        _id: string,
     
    }
}

export interface CommentInterface {
    _id: string
    createdDateComment: Date
    isLiked: boolean
    likeId: string
    likes: number
    postId: string
    text: string
    userId: {
        _id: string,
        fullName: string,
        avatarFileName: string,
    },
}

export type FriendTypeResponse = {
    _id: string
    userId: string
    friendId: {
        _id: string
        fullName: string
        email: string
        phone: string
        role: ROLES
        avatarFileName: string
    }
}