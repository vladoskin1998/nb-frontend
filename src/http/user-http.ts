import { AxiosResponse } from "axios";
import $api from ".";
import { UserChat } from "../components/general-components/profile-info/ProfileInfoHelpCenter";
import { LocationPayload } from "../services/profile";
import { ROLES } from "../types/enum";
import { UserInitialStateInterface } from "../reducer/users";
import { FriendTypeResponse, HeaderMessageType } from "../types/types";

interface GetClosestUserInterface {
    role: ROLES;
    myLat: number;
    myLng: number
}

interface GetUsersInterface {
    _id: string,
    role: ROLES,
    searchName: string,
}


export class UserHttp {

    static async changeLocation(payload: LocationPayload) {
        return await $api.post('identity/profile-location', payload)
    }


    static async getClosestUser(payload: GetClosestUserInterface): Promise<UserChat> {
        const res: AxiosResponse<UserChat> = await $api.post('user/get-closest-user', payload)
        return res.data
    }


    static async getUserById(payload: { userId: string }): Promise<HeaderMessageType> {
        const res: AxiosResponse<HeaderMessageType> = await $api.post('user/get-user', payload)
        return res.data
    }

    static async getUsers(payload: GetUsersInterface): Promise<UserInitialStateInterface[]> {
        const res: AxiosResponse<UserInitialStateInterface[]> = await $api.post('user/get-users', payload)
        return res.data
    }

    static async getMyFriends(payload: { _id: string }): Promise<FriendTypeResponse[]> {
        const res: AxiosResponse<FriendTypeResponse[]> = await $api.post('user/get-friends', payload)
        return res.data
    }

    static async checkMyFriend(payload: { _id: string, friendId: string }): Promise<boolean> {
        const res: AxiosResponse<boolean> = await $api.post('user/check-my-friend', payload)
        return res.data
    }

    static async addMyFriend(payload: { _id: string, friendId: string }): Promise<FriendTypeResponse> {
        const res: AxiosResponse<FriendTypeResponse> = await $api.post('user/add-my-friend', payload)
        return res.data
    }

    static async deleteMyFriend(payload: { _id: string, friendId: string }): Promise<FriendTypeResponse> {
        const res: AxiosResponse<FriendTypeResponse> = await $api.post('user/delete-to-friend', payload)
        return res.data
    }



}