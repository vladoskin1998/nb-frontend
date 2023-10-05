import { ROLES } from "./enum";

export type RoleType = ROLES.ADMIN | ROLES.USER

export interface AuthResponseInterface{
    user: {
        email: string;
        role: ROLES;
        _id: string;
        fullName: string;
    };
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

export type MessageType =  { chatId:string, senderId:string, content:string, timestamp:Date, isRead:boolean }
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
    participants: ParticipantType[]
}




