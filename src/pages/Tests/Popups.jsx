import React, { useEffect, useRef, useState } from 'react'
import Toast from "../../component/Popups/Toast";

export default function Popups() {
    const [notif, setNotif] = useState(null);

    const showNotif = () => {
        setNotif({
            message: "Saved successfully!",
            type: "success",
        });
    };

    const showErrorN = () => {
        setNotif({
            message: "Saved successfully!",
            type: "error",
        });
    };

    const showwarningN = () => {
        setNotif({
            message: "Saved successfully!",
            type: "warning",
        });
    };

    const showinfoN = () => {
        setNotif({
            message: "Saved successfully!",
            type: "info",
        });
    };

    return (
        <div className="p-10">
            <button
                onClick={showNotif}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow"
            >
                Show Notification
            </button>

            <button
                onClick={showErrorN}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow"
            >
                Show Notification
            </button>

            <button
                onClick={showwarningN}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow"
            >
                Show Notification
            </button>

            <button
                onClick={showinfoN}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow"
            >
                Show Notification
            </button>

            {notif && (
                <Toast
                    title={notif.message}
                    message={notif.message}
                    type={notif.type}
                    onClose={() => setNotif(null)}
                />
            )}
        </div>
    );
}
