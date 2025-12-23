import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import DefultInput from '../../component/Forms/DefultInput';
import Button from '../../component/Buttons/Button';
import bgimage from '../../assets/Login.webp'
import Toast from '../../component/Popups/Toast';

const Auth = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [Loading, setLoading] = useState(false);
    const [successattempt, setsuccessattempt] = useState(false);
    const [notif, setNotif] = useState(null);

    const { values, handleChange } = useForm({ email: '' });
    const { values: passValues, handleChange: passHandleChange } = useForm({ otp: '' });

    const headleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post('/auth/create-auth', values);

            if (res.data.success) {
                setNotif({ message: res.data.message, type: 'success' });
                setsuccessattempt(true);
            } else {
                setNotif({ message: res.data.message, type: 'error' });
                setsuccessattempt(false);
            }
        } catch (err) {
            setNotif({
                message: err.response?.data?.message || 'Server error',
                type: 'error'
            });
        }
        finally {
            setLoading(false);
        }
    };

    const headleVerifyPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post('/auth/verify-password', {
                email: values.email,
                otp: passValues.otp,
            });

            if (res.data.success) {
                setNotif({ message: res.data.message, type: 'success' });
                login(res.data.token);
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setNotif({ message: res.data.message, type: 'error' });
            }
        } catch (err) {
            setNotif({
                message: err.response?.data?.message || 'Server error',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="bg-gray-50 min-h-screen pt-24"
            style={{
                backgroundImage: `url(${bgimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {notif && (
                <Toast
                    title={notif.message}
                    message={notif.message}
                    type={notif.type}
                    onClose={() => setNotif(null)}
                />
            )}

            <div className="md:mx-auto md:max-w-md mx-4 bg-white shadow-md rounded-lg p-8 border-gray-200">
                <div className="border-b pb-4 border-gray-200">
                    <h1 className="text-gray-500 font-semibold text-xl">Welcome to Travel System</h1>
                    <p className="text-gray-500 pt-1">
                        This system is designed to manage your travel plans and all related travel needs in one place.
                        It uses a secure password-less login method, so you don’t have to worry about remembering passwords.
                        Each time you log in, a unique one-time password is sent to your email.
                        This password expires immediately after use and cannot be reused for future logins.
                    </p>
                </div>

                <div className="mt-4">
                    <form onSubmit={headleAuth}>
                        <DefultInput
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email Address"
                            required
                        />
                        <div className="mt-4">
                            <Button
                                type="submit"
                                color="#238636"
                                label={Loading ? 'Sending...' : 'Request Password'}
                                disabled={Loading}
                            />
                        </div>
                    </form>

                    {successattempt && (
                        <form onSubmit={headleVerifyPassword} className="mt-4">
                            <DefultInput
                                type="text"
                                name="otp"
                                value={passValues.otp}
                                onChange={passHandleChange}
                                placeholder="Enter OTP"
                                required
                            />
                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    color="#238636"
                                    label={Loading ? 'Verifying...' : 'Login'}
                                    disabled={Loading}
                                />
                            </div>
                        </form>
                    )}
                </div>

                <p className="text-center mt-2 text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} - Travel Management System
                </p>
            </div>
        </div>
    );
};

export default Auth;
