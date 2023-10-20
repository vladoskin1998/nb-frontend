import { IconBottomChevrons, IconLeftChevrons } from "../../svg/IconChevrons"
import { SlickCategories } from "../../ui/SlickCategories"

export const AdminPanelEvents = () => {
    return (
        <div className="admin__panel-events">
            <div className="admin__panel-events-title">
                <div className="admin__panel-title"> Latest Events </div>
                <button>View All</button>
            </div>
            <SlickCategories>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <div>
                        <div className="admin__panel-events-filter">
                            Filter {item}
                            <IconBottomChevrons />
                        </div>
                    </div>
                ))}
            </SlickCategories>
        </div>
    )
}
