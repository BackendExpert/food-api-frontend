import React, { useEffect } from 'react'
import { IoCloseCircle } from "react-icons/io5";

const Toast = ({ title, message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className='fixed top-5 right-5 z-50'>
            <div
                className={`flex justify-between py-4 pl-4 border-l-4 rounded-xl
                    ${type === "success" ? "bg-green-100/30 border-green-600" : ""}
                    ${type === "error" ? "bg-red-100/30 border-red-500" : ""}
                    ${type === "warning" ? "bg-yellow-100/30 border-yellow-500" : ""}
                    ${type === "info" ? "bg-blue-100/30 border-blue-500" : ""}
                 `}
            >
                <div className='pr-16'>
                    <h1 className={`
                        font-bold
                        ${type === "success" ? "text-green-600" : ""}
                        ${type === "error" ? "text-red-600" : ""}
                        ${type === "warning" ? "text-yellow-600" : ""}
                        ${type === "info" ? "text-blue-600" : ""}
                        `}>{title}</h1>
                    <p className="text-gray-500">
                        {message}                        
                    </p>
                </div>

                <div>
                    <button onClick={onClose} className={
                        `pr-4
                        ${type === "success" ? "text-green-600" : ""}
                        ${type === "error" ? "text-red-600" : ""}
                        ${type === "warning" ? "text-yellow-600" : ""}
                        ${type === "info" ? "text-blue-600" : ""}
                        `
                    }>
                        <IoCloseCircle className='h-6 w-6' />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Toast
