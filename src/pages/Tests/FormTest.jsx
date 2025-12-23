import React, { useState } from 'react';
import DefultInput from '../../component/Forms/DefultInput';
import DateInput from '../../component/Forms/DateInput';
import DropDown from '../../component/Forms/DropDown';
import TextArea from '../../component/Forms/TextArea';
import Button from '../../component/Buttons/Button';

const FormTest = () => {
    const options = [
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" },
    ];

    // State for inputs
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [dropdown, setDropdown] = useState('');
    const [bio, setBio] = useState('');

    const handleSubmit = () => {
        console.log({
            email,
            birthday,
            dropdown,
            bio
        });
    };

    return (
        <div className='mx-auto max-w-4xl mt-20'>
            <DefultInput
                placeholder={"Enter Your Email Address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <p className="text-gray-500 text-sm mb-1 mt-4">BirthDay</p>
            <DateInput
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />

            <div className="mt-4"></div>
            <DropDown
                options={options}
                value={dropdown}
                onChange={(e) => setDropdown(e.target.value)}
            />

            <div className="mt-4"></div>
            <TextArea
                placeholder='Enter Your Bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <div className="mt-4"></div>
            <Button
                type='button'
                color='success'
                label='Click me'
                onClick={handleSubmit}
            />
        </div>
    );
};

export default FormTest;
