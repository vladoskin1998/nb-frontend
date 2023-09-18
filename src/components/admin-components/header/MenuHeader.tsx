import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IconRightChevrons, IconBottomChevrons } from '../../svg/IconChevrons';
import { routesMenu as routes } from '../../../utils/constant';
import { logout } from '../../../services/auth';
import { useAppDispatch } from '../../../utils/hooks';
import { toOneKind } from '../../../utils/titles';

const MenuHeader = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (o: boolean) => void }) => {

    const [isOpenSub, setSsOpenSub] = useState<string>("")
    const munu = useRef<HTMLDivElement | null>(null);
    const changeOpenSub = (key: string) => {
        setSsOpenSub(key)
    }
    const dispatch = useAppDispatch()

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

    const handlerLogout = () => {
        dispatch(
            logout()
        )
    }


    return (
        <div className={`admin__header-menu ${isOpen ? "admin__header-menu--active" : ""}`} ref={munu}>
            {routes.map(
                (r, index) => {
                    return <div key={index}>
                        <div className='admin__header-menu-route'>
                            <div className={`admin__header-menu-route-svg
                                ${toOneKind(r.name) === isOpenSub ? 'admin__header-menu-route--fill' : ''}`
                            }>
                                {r.label()}
                            </div>
                            <Link to={toOneKind(r.name)}>
                                <div onClick={closeMenu}>
                                    {r.name}
                                </div>
                            </Link>
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
                                    s => <div onClick={closeMenu} key={s + index*100}>
                                        <Link to={`${toOneKind(r.name)}/${toOneKind(s)}`}>
                                            {s}
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                }
            )}
            <button
                onClick={handlerLogout}
            > Logout</button>
        </div>
       
    )
}

export default MenuHeader