import React from 'react'

const TextArea = ({
    name,
    rows = 8,
    value,
    onChange,
    placeholder = '',
    required = false,
}) => {
    return (
        <div>
            <textarea
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}

                className='
                    w-full bg-white border pl-4 pt-2 border-gray-200 rounded
                    placeholder:text-gray-400
                    focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300/40
                    text-gray-500
                '
            >

            </textarea>
        </div>
    )
}

export default TextArea