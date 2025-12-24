import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

import defultImg from "../../assets/user.png";
import foodlogo from "../../assets/FoodLogo1.png";
import dashboardbg from "../../assets/siteimg.jpg";

import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "./DashSide.css";


import { MdLogout } from "react-icons/md";


import { BiSolidDashboard } from "react-icons/bi";

import {
    FaCog,
    FaUsersCog,
    FaKey,
    FaFileInvoiceDollar,
    FaPizzaSlice
} from "react-icons/fa";

import { FaLink } from 'react-icons/fa6'


const DashSide = ({ closeSidebar }) => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const token = localStorage.getItem("token");

    const toggleSubmenu = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    const navitem = [
        {
            name: "Dashboard",
            icon: <BiSolidDashboard />,
            link: "/dashboard",
            roles: ["admin"],
        },

        {
            name: "Fodd API",
            icon: <FaPizzaSlice />,
            submenu: [
                { name: "API Routes", link: '/api' },
                { name: "API Usage Logs", link: "/api/usage" },
            ],
            roles: ["admin"],
        },

        {
            name: "API",
            icon: <FaLink />,
            submenu: [
                { name: "API Routes", link: '/api' },
                { name: "API Usage Logs", link: "/api/usage" },
            ],
            roles: ["admin"],
        },

        {
            name: "API Key",
            icon: <FaKey />,
            submenu: [
                { name: "API Keys", link: '/keys' },
            ],
            roles: ["admin"],
        },

        {
            name: "Plans",
            icon: <FaFileInvoiceDollar />,
            submenu: [
                { name: "View All Plans", link: '/plan' },
                { name: "Create New Plan", link: '/plan/create' },
            ],
            roles: ["admin"],
        },

        /* ===================== ADMIN ===================== */
        {
            name: "Admin Panel",
            icon: <FaUsersCog />,
            submenu: [
                { name: "Users", link: "/admin/users" },
            ],
            roles: ["admin"],
        },

        /* ===================== SETTINGS ===================== */
        {
            name: "Settings",
            icon: <FaCog />,
            submenu: [
                { name: "Profile", link: "/settings/profile" },
                { name: "Preferences", link: "/settings/preferences" },
                { name: "Privacy & Security", link: "/settings/security" },
            ],
            roles: ["user", "admin"],
        },
    ];

    const filteredNavItems = navitem.filter((item) =>
        item.roles.includes(auth?.role)
    );

    const [memberdata, setmemberdata] = useState([])

    useEffect(() => {
        const fetchmemberdata = async () => {
            try {
                const res = await API.get(`/member/get-member-data?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setmemberdata(res.data.result);
            }
            catch (err) {
                console.log(err)
            }
        }

        if (token) fetchmemberdata()
    }, [token])


    return (
        <motion.aside
            initial={{ width: 300, opacity: 0 }}
            animate={{ width: collapsed ? 96 : 280, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative h-screen flex flex-col bg-gradient-to-b from-white to-white overflow-hidden"
        >
            <div className="flex-1 overflow-y-auto custom-scrollbar">

                {/* Logo */}
                <div className="flex items-center pb-4 pt-5 sticky top-0 bg-gradient-to-b from-white to-white z-10">
                    <motion.img
                        src={foodlogo}
                        alt="Logo"
                        className="h-10 w-auto ml-4 bg-orange-500 p-2 rounded-lg"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                    />
                    {!collapsed && (
                        <motion.h1
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="ml-2 font-bold text-lg text-orange-500"
                        >
                            Food API Dashboard
                        </motion.h1>
                    )}
                </div>

                {/* Navigation */}
                <nav className="px-3 mt-4 space-y-1">
                    <h1 className="uppercase font-bold text-gray-500 text-xs mb-4">
                        main menu
                    </h1>

                    {filteredNavItems.map((item, index) => (
                        <div key={index}>
                            {item.submenu ? (
                                <>
                                    <button
                                        onClick={() => toggleSubmenu(index)}
                                        className={`group relative flex items-center justify-between w-full px-4 py-2 rounded-xl font-medium transition-all duration-300 ${openMenu === index
                                            ? "text-orange-600 bg-orange-100 shadow-sm"
                                            : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <motion.span
                                                whileHover={{ scale: 1.15, rotate: 4 }}
                                                className="text-xs"
                                            >
                                                {item.icon}
                                            </motion.span>
                                            {!collapsed && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="text-sm tracking-wide"
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </div>

                                        {!collapsed && (
                                            openMenu === index ? (
                                                <ChevronDown className="w-4 h-4 text-orange-600" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            )
                                        )}
                                    </button>

                                    {!collapsed && openMenu === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            transition={{ duration: 0.3 }}
                                            className="ml-8 mt-1 space-y-1"
                                        >
                                            {item.submenu.map((sub, subIndex) => (
                                                <NavLink
                                                    key={subIndex}
                                                    to={sub.link}
                                                    onClick={closeSidebar}
                                                    className={({ isActive }) =>
                                                        `block px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${isActive
                                                            ? "text-orange-700 font-semibold"
                                                            : "text-gray-500 hover:text-orange-600"
                                                        }`
                                                    }
                                                >
                                                    {sub.name}
                                                </NavLink>
                                            ))}
                                        </motion.div>
                                    )}
                                </>
                            ) : (
                                <NavLink
                                    to={item.link}
                                    onClick={closeSidebar}
                                    className={({ isActive }) =>
                                        `group relative flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isActive
                                            ? "text-orange-600"
                                            : "text-gray-600 hover:text-orange-600 hover:ml-1"
                                        }`
                                    }
                                >
                                    <motion.span
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        className="text-xs"
                                    >
                                        {item.icon}
                                    </motion.span>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-sm tracking-wide"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </NavLink>
                            )}
                        </div>
                    ))}

                    {/* Logout */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => logout(navigate)}
                        className="flex items-center gap-3 w-full px-4 py-3 mt-6 text-red-500 hover:text-white hover:bg-red-500/40 rounded-xl font-medium transition-all duration-300"
                    >
                        <MdLogout className="text-xl" />
                        {!collapsed && <span className="text-sm">Logout</span>}
                    </motion.button>
                </nav>

                {/* User Info */}
                {!collapsed && (
                    <div className="px-4 py-4 mt-4 border-t border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                        <div className="flex items-center gap-3 mb-3">
                            <img
                                src={
                                    memberdata?.profileimage
                                        ? `${import.meta.env.VITE_APP_API_FILES}/uploads/${memberdata.profileimage}`
                                        : defultImg
                                }
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover shadow-md"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-700">
                                    {auth?.user?.username || "User"}
                                </span>
                                <span className="text-xs text-gray-500 capitalize">
                                    {auth?.role || "intern"}
                                </span>
                            </div>
                        </div>

                        <div className="relative rounded-xl overflow-hidden">
                            <img
                                src={dashboardbg}
                                alt="Dashboard Decoration"
                                className="w-full h-20 object-cover rounded-lg opacity-80 hover:opacity-90 transition"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 text-center text-[10px] text-orange-500 border-t border-orange-100"
                >
                    {!collapsed && (
                        <>
                            © {new Date().getFullYear()} Food API - Dashboard
                            <br />
                            <span className="font-semibold text-orange-600">
                                Food API
                            </span>
                        </>
                    )}
                </motion.div>
            </div>
        </motion.aside>
    );
};

export default DashSide;
