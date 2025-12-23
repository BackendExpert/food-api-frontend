import React from 'react'

const DateInput = ({
    name,
    value,
    onChange,
    required = false
}) => {
    return (
        <div>
            <input 
                type="date"
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className='
                    w-full h-10 bg-white border pl-4 border-gray-200 rounded
                    placeholder:text-gray-400
                    focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300/40
                    text-gray-500
                '
            />
        </div>
    )
}

export default DateInput