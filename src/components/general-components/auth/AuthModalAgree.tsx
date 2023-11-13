import React from "react"
import { Modal } from "../../ui/Modal"
import { AUTH_AGREE_TYPES } from "../../../types/enum"
import { CONST__POLICY, CONST__TERMS } from "../../../utils/constant"

export const AuthModalAgree = ({
    isOpen,
    setIsOpen,
    typeAgree,
}: {
    isOpen: boolean
    setIsOpen: (s: boolean) => void
    typeAgree: AUTH_AGREE_TYPES
}) => {
    return (
        <div
            className={`activities__favor-modal  ${
                isOpen ? "activities__favor-modal--open" : ""
            }`}
        >
            <Modal setIsOpen={(s: boolean) => setIsOpen(s)}>
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsOpen(false)
                    }}
                    className="activities__favor-modal-linebody"
                >
                    <button className="activities__favor-modal-line" />
                </div>
                <div className="publish__modaladd">
                    <h5 className="publish__modaladd-title">
                        {typeAgree === AUTH_AGREE_TYPES.POLICY
                            ? "Privacy Policy"
                            : "Terms of Service"}
                    </h5>
                    <div className="auth__agree-list">
                        {(typeAgree === AUTH_AGREE_TYPES.POLICY
                            ? CONST__POLICY
                            : CONST__TERMS
                        ).map((item) => (
                            <h6 className="publish__modaladd-subtitle">
                                {item}
                            </h6>
                        ))}
                    </div>
                    <button
                        className="auth__agree-button"
                        onClick={() => setIsOpen(false)}
                    >
                        Accept
                    </button>
                </div>
            </Modal>
        </div>
    )
}
