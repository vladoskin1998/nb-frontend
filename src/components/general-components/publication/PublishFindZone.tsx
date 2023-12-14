import { useEffect, useState } from "react";
import { InputSearch } from "../../ui/InputSearch";
import { LocationType } from "../../../types/types";
import { AxiosResponse } from "axios";
import $api from "../../../http";

export const PublishFindZone = (props:{
    search:LocationType[],
    setSearch:(o:LocationType[])=>void
}) => {
    const [MarksList, setMarksList] = useState<LocationType[]>([]);
    const [search, setSearch] = useState<string>("");
    useEffect(() => {
        const effectBody = async() => {
            const resMarksList: AxiosResponse<LocationType[]> =
            await $api.post("map/list-marks")
            // console.log(resMarksList);
            setMarksList(resMarksList.data);
        }
        effectBody()
    }, [])
    return(
        <div>
            <InputSearch
                placeholder={
                    <>
                        Search <b>NightborChats</b>
                    </>
                }
                value={search}
                changeValue={setSearch}
                onChange={()=>{
                    MarksList.map((item)=>{
                        if(item.title.includes(search)){
                            let array:LocationType[] = [...[item]]
                            props.setSearch(array);
                            console.log(array);
                        }
                    })
                }}
            />
        </div>
    );
}