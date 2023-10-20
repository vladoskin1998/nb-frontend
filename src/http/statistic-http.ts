import { AxiosResponse } from "axios";
import $api from ".";


export type GetShortcutsResponse = {
    countServices: number,
    countActivities: number,
    countUsers: number,
    countMessages: number,
}


interface CountUserOneDayInterface{
    createdStatisticDate: Date,
    totalUsers:number,
    newUsers:number,
    activeUsers:number,
    nonActiveUsers:number,
}

export class StatisticHttp {
    static async getShortcuts(): Promise<GetShortcutsResponse> {
        const res:AxiosResponse<GetShortcutsResponse> = await $api.get("statistics/shortcuts")
        return res.data
    }

    static async getStatisticUsersOne(): Promise<CountUserOneDayInterface[]> {
        const res:AxiosResponse<CountUserOneDayInterface[]> = await $api.get("statistics/statistic-users-one")
        return res.data
    }


    
    static async getStatisticUsersTen(): Promise<CountUserOneDayInterface[]> {
        const res:AxiosResponse<CountUserOneDayInterface[]> = await $api.get("statistics/statistic-users-ten")
        return res.data
    }

}
