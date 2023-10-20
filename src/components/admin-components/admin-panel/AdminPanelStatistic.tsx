import { IconBottomChevrons, IconLeftChevrons } from "../../svg/IconChevrons"
import { SlickCategories } from "../../ui/SlickCategories"
import { AdminPanelStatisticBar1 } from "./AdminPanelStatisticBar1"
import { AdminPanelStatisticBar2 } from "./AdminPanelStatisticBar2"

export const AdminPanelStatistic = () => {
    return (
        <div className="admin__panel-events">
            <div className="admin__panel-title"> Statistics </div>
            <SlickCategories>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <div>
                        <div className="admin__panel-events-filter">
                            Fil {item}
                            <IconBottomChevrons />
                        </div>
                    </div>
                ))}
            </SlickCategories>

            <div className="admin__panel__statistic-body">
                <div className="admin__panel__statistic-title">
                    <h6 className="admin__panel__statistic-title-main">
                        User Stat
                    </h6>
                    <button className="admin__panel__statistic-title-download">
                        Download
                    </button>
                </div>
                <AdminPanelStatisticBar1 />
            </div>


            <div className="admin__panel__statistic-body">
                <div className="admin__panel__statistic-title">
                    <h6 className="admin__panel__statistic-title-main">
                        User Stat
                    </h6>
                    <button className="admin__panel__statistic-title-download">
                        Download
                    </button>
                </div>
                <AdminPanelStatisticBar2 />
            </div>
        </div>
    )
}
