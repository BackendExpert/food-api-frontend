import React, { useEffect } from 'react'
import { FaCheckCircle, FaInfoCircle, FaRegTimesCircle, FaExclamationCircle  } from "react-icons/fa";

const Popup = ({ title, message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className={`
                    rounded-lg w-120 p-6 relative py-24
                    ${type === "success" ? "bg-lime-400" : ""}
                    ${type === "error" ? "bg-red-500" : ""}
                    ${type === "warning" ? "bg-yellow-400" : ""}
                    ${type === "info" ? "bg-blue-400" : ""}
                `}>
                <button
                    className="absolute top-3 right-3 font-bold text-xl"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="flex items-center justify-center">
                    {
                        (() => {
                            if (type === "success") {
                                return (
                                    <FaCheckCircle className='fill-white h-20 w-20' />
                                )
                            }

                            else if (type === "error") {
                                return (
                                    <FaRegTimesCircle className='fill-white h-20 w-20' />
                                )
                            }
                            else if (type === "warning") {
                                return (
                                    <FaExclamationCircle className='fill-white h-20 w-20' />
                                )
                            }
                            else if (type === "info") {
                                return (
                                    <FaInfoCircle className='fill-white h-20 w-20' />
                                )
                            }
                        })()
                    }
                </div>

                <div className="text-center pt-10">
                    <h2 className={`
                            text-2xl font-semibold 
                            ${type === 'error' || type === 'info' ? 'text-white': 'text-black'}
                        `}>{title}</h2>
                    <p className={`
                            ${type === 'error' ? 'text-white': 'text-black'}
                        `}>{message}</p>
                </div>

            </div>
        </div>
    )
}

export default Popup
