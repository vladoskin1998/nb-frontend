import { AxiosResponse } from "axios";
import $api from ".";
import { ROLES } from "../types/enum";
import { Activities } from "../types/types";



export class ActivitiesHttp {
    static async getAllActivities():Promise<Activities[]>{
       const res: AxiosResponse<Activities[]> = await $api.get("activities/all-activities")
       return res.data
    }

    static async addPublishActivitie(payload: FormData) {
        const res: AxiosResponse<Activities> = await $api.post("activities/add-publish-activities",payload)
        return res.data
    }
    

}