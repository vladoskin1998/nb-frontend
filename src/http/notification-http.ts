
import $api from ".";
import { NOTIFICATION_EVENT } from "../types/enum";

interface PayloadNotificationListInterface {
    userId: string
}

export interface NotificationListInterface {
    ownerId: {
        _id: string,
        fullName: string,
        avatarFileName: string
    };
    ownerIdentityId:{
        _id: string,
       
    };
    userId: string;
    title: string;
    fileName: string;
    name: string;
    event: NOTIFICATION_EVENT;
    dateNotificationCreated: Date;
}

export class NotificationHttp {

    static async getNotificationList(payload: PayloadNotificationListInterface): Promise<NotificationListInterface[]> {
        const res = await $api.post('notification/get-notification', payload)
        return res.data
    }
}