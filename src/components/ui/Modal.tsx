import React, { ReactNode, useEffect, useRef } from 'react'

export const Modal = ({children, setIsOpen }: {children:ReactNode, setIsOpen: (o: boolean) => void }) => {

    const modal = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modal?.current && !modal.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsOpen]);

    return (
        <div className='ui-modal' ref={modal}>
            {children}
        </div>
    )
}
