import { PRIVACY, ROLES } from "./enum";

export type RoleType = ROLES.ADMIN | ROLES.USER

export interface UserMainInterface{
    email: string;
    role: ROLES;
    _id: string;
    fullName: string;
}

export interface AuthResponseInterface{
    user: UserMainInterface;
    accessToken: string;
    refreshToken: string;
}


export interface CoordinatsInterface{
    lat: number , lng: number  
}

export type Nullable<T> = {
    [K in keyof T]?: T[K] | null;
  };


  export interface OptionsItemType{
    _id: string | number
    title: any
}
export type OptionsType = Array<OptionsItemType>

export type MessageType =  { chatId:string, senderId:string, content:string, timestamp:Date, isRead:boolean, file:string | null }
export type ParticipantType = {
        userId: string,
        avatarFileName: string,
        fullName: string,
    }

export type OpenChatData = {
    participants: ParticipantType[],
    chatId: string 
}


export type ChatType = {
    chatId: string,
    lastMessage: MessageType,
    participants: ParticipantType[],
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

export type PostUserInterface =  {
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
    privacyPost: PRIVACY,
    createdPostDate: Date,
    addressLocation: string
}

export interface GetAllPostInterface {
    allPageNumber: number
    posts: PostUserInterface[]
}

export type PublishServiceItemInterface =  {
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


export type PublishEventItemInterface =  {
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