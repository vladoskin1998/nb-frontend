import { AdminPanelEvents } from "./AdminPanelEvents"
import { AdminPanelMap } from "./AdminPanelMap"
import { AdminPanelShortcuts } from "./AdminPanelShortcuts"
import { AdminPanelStatistic } from "./AdminPanelStatistic"

export const AdminPanel = () => {
    return (
        <div className="admin">
            <div className="admin__panel">
                <AdminPanelMap />
                <AdminPanelShortcuts />
                <AdminPanelEvents />
                <AdminPanelStatistic />
            </div>
        </div>
    )
}
