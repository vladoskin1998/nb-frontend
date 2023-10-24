import { useEffect, useState } from "react"
import ServicesItemView from "../services/ServicesItemView"
import $api from "../../../http"
import { StatisticHttp } from "../../../http/statistic-http"

export const AdminPanelShortcuts = () => {
    const [count, setCount] = useState({
        countServices: 0,
        countActivities: 0,
        countUsers: 0,
        countMessages: 0,
    })

    useEffect(() => {
        const effectBody = async () => {
            const res = await StatisticHttp.getShortcuts()
            setCount(res)
        }

        effectBody()
    }, [])

    return (
        <div className="admin__panel-short">
            <div className="admin__panel-title"> Shortcuts </div>
            <div className="services__all">
                <ServicesItemView
                    name={"Users"}
                    nextListLink={"/admin/users"}
                    numberView={count.countUsers}
                    setIsOpen={() => {}}
                />
                <ServicesItemView
                    name={"Services"}
                    nextListLink={"/admin/services"}
                    numberView={count.countServices}
                    setIsOpen={() => {}}
                />
                <ServicesItemView
                    name={"Events"}
                    nextListLink={"/admin/activities"}
                    numberView={count.countActivities}
                    setIsOpen={() => {}}
                />
                <ServicesItemView
                    name={"Messeges"}
                    nextListLink={"/admin/messeges"}
                    numberView={count.countMessages}
                    setIsOpen={() => {}}
                />
            </div>
        </div>
    )
}
