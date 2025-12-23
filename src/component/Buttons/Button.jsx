import React from 'react';

const Button = ({
    label = "Click the Button",
    color = "success",
    onClick,
    type = "button",
    disabled = false,
}) => {
    // Determine if color is a custom hex code
    const isCustomColor = color.startsWith("#");

    return (
        <div>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`
                    text-black w-full h-10 rounded-lg cursor-pointer duration-500 font-semibold
                    ${!isCustomColor && color === "success" ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                    ${!isCustomColor && color === "danger" ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                    ${!isCustomColor && color === "info" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
                    ${!isCustomColor && color === "warning" ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}
                `}
                style={isCustomColor ? { backgroundColor: color, color: "white" } : {}}
            >
                {label}
            </button>
        </div>
    );
};

export default Button;
