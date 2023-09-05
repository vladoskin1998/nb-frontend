import { IconLeftChevrons } from "../svg/IconChevrons"

export const ButtonBackRoute = ({ click}: { click: () => void}) => {
    return (
        <button className="ui-button-back-route" onClick={click}>
            <IconLeftChevrons />
        </button>
    )
}
