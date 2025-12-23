import React, { useState } from 'react'
import Popup from '../../component/Popups/Popup'


const ModelPopup = () => {
    const [notif, setNotif] = useState(null);

    const showNotif = () => {
        setNotif({
            message: "Saved successfully!",
            title: "Registaion Success",
            type: "success",
        });
    };

    const showErrorN = () => {
        setNotif({
            message: "Registaion Email Already in DB !",
            title: "Registaion Faild",
            type: "error",
        });
    };

    const showwarningN = () => {
        setNotif({
            message: "Registaion Warning!",
            title: "warning warning warning warning",
            type: "warning",
        });
    };

    const showinfoN = () => {
        setNotif({
            message: "Need to Registaion",
            title: "Here for Registation form",
            type: "info",
        });
    };

    return (
        <div className="p-10">
            <button
                onClick={showNotif}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Open Popup
            </button>

            <button
                onClick={showErrorN}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Open Popup Error
            </button>

            <button
                onClick={showwarningN}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Open Popup warning
            </button>

            <button
                onClick={showinfoN}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Open Popup warning
            </button>

            {notif && (
                <Popup
                    type={notif.type}
                    title={notif.title}
                    message={notif.message}
                    onClose={() => setNotif(null)}
                />
            )}
        </div>
    )
}

export default ModelPopup
