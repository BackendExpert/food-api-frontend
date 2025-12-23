import React, { useState, useRef, useEffect } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const DropDown = ({ name, options = [], onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        setSelected(value);
        setIsOpen(false);
        if (onChange) onChange({ target: { name, value } });
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className="
                    w-full h-10 bg-white border pl-4 border-gray-200 rounded
                    placeholder:text-gray-400
                    focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300/40
                    text-gray-500 flex items-center justify-between cursor-pointer
                "
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected || "Select an option"}
                <span className="pr-2">
                    {
                        !isOpen ? <FaCaretDown /> : <FaCaretUp />
                    }
                </span>
            </div>

            {isOpen && (
                <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 max-h-60 overflow-auto">
                    {options.map((opt, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(opt.value || opt)}
                            className="mx-2 my-2 rounded-md hover:text-indigo-400 px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                        >
                            {opt.label || opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;
