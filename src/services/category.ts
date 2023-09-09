import $api from "../http";

interface AddServicePayload {
    category: {
      name: string;
      file: File;
    };
    subCategory: {
      listSubCategory: {
        name: string;
        file: File;
      }[];
    };
  }

export const addCategory = 
    async (payload:AddServicePayload) => {
        const response = await $api.post('categories/add-categories', payload)
        return response.data
    }


