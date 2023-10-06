import { useEffect, useState } from "react"
import ServicesItemView from "../services/ServicesItemView"
import $api from "../../../http"

export const AdminPanelShortcuts = () => {
    const [count, setCount] = useState({
        countServices: 0,
        countActivities: 0,
        countUsers: 0,
        countMessages: 0,
    })

    useEffect(() => {
        $api.get("statistics/shortcuts").then((r) => setCount(r.data))
    }, [])
    return (
        <div className="admin__panel-short">
            <div className="admin__panel-title">
                <div className="services__all">
                    <ServicesItemView
                        name={"Users"}
                        link={"/admin/users"}
                        numberView={count.countUsers}
                        setIsOpen={() => {}}
                    />
                    <ServicesItemView
                        name={"Services"}
                        link={"/admin/services"}
                        numberView={count.countServices}
                        setIsOpen={() => {}}
                    />
                    <ServicesItemView
                        name={"Events"}
                        link={"/admin/activities"}
                        numberView={count.countActivities}
                        setIsOpen={() => {}}
                    />
                    <ServicesItemView
                        name={"Messeges"}
                        link={"/admin/messeges"}
                        numberView={count.countMessages}
                        setIsOpen={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}
