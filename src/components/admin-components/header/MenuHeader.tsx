import { useRef, useState, useEffect } from 'react'
import { IconAdminMenuActivities, IconAdminMenuPanel, IconAdminMenuHelpCenter, IconAdminMenuAdvertisement, IconAdminMenuPost, IconAdminMenuMesseges, IconAdminMenuServeces, IconAdminMenuUsers } from '../../svg/IconAdminMenu'
import { Link } from 'react-router-dom';
import { IconRightChevrons, IconBottomChevrons } from '../../svg/IconChevrons';
import { routesMenu as routes } from '../../../utils/constant';

const toOneKind = (s: string) => s.replace(/ /g, '').toLocaleLowerCase()

const MenuHeader = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (o: boolean) => void }) => {

    const [isOpenSub, setSsOpenSub] = useState<string>("")
    const munu = useRef<HTMLDivElement | null>(null);
    const changeOpenSub = (key: string) => {
        setSsOpenSub(key)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (munu?.current && !munu.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className={`admin__header-menu ${isOpen ? "admin__header-menu--active" : ""}`} ref={munu}>
            {routes.map(
                r => {
                    return <>
                        <div className='admin__header-menu-route'>
                            <div className={`admin__header-menu-route-svg
                                ${toOneKind(r.name) === isOpenSub ? 'admin__header-menu-route--fill' : ''}`
                            }>
                                {r.label()}
                            </div>
                            <div onClick={closeMenu}>
                                <Link to={toOneKind(r.name)}>
                                    {r.name}
                                </Link>
                            </div>
                            <div className='admin__header-menu-route-svg'>
                                {
                                    r.subName.length ?
                                        toOneKind(r.name) === isOpenSub
                                            ?
                                            <div onClick={() => changeOpenSub("")}>
                                                <IconBottomChevrons />
                                            </div>
                                            :
                                            <div onClick={() => changeOpenSub(toOneKind(r.name))}>
                                                < IconRightChevrons />
                                            </div>

                                        : <></>
                                }
                            </div>
                        </div>
                        <div className={`admin__header-menu-subroute ${toOneKind(r.name) === isOpenSub ? "admin__header-menu-subroute--height" : ""}`}>
                            {
                                r.subName.map(
                                    s => <div onClick={closeMenu}>
                                        <Link to={toOneKind(s)}>
                                            {s}
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </>
                }
            )}
        </div>
    )
}

export default MenuHeader