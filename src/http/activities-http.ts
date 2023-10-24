import { AxiosResponse } from "axios";
import $api from ".";
import { ROLES } from "../types/enum";
import { Activities, GetAllPublishActivitiesInterface } from "../types/types";



export class ActivitiesHttp {
    static async getAllActivities():Promise<Activities[]>{
       const res: AxiosResponse<Activities[]> = await $api.get("activities/all-activities")
       return res.data
    }

    static async addPublishActivitie(payload: FormData) {
        const res: AxiosResponse<Activities> = await $api.post("activities/add-publish-activities",payload)
        return res.data
    }
    
    
    static async getAllPublishEvent(payload: {
        pageNumber: number
        activitiesId : string
    }): Promise<GetAllPublishActivitiesInterface> {
        const res: AxiosResponse<GetAllPublishActivitiesInterface> = await $api.post(`activities/get-publish-activities`, payload)        
        return res.data
    }

}