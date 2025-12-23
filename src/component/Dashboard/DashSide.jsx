import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

import defultImg from "../../assets/user.png";
import uoplogo from "../../assets/logo.png";
import dashboardbg from "../../assets/siteimg.jpg";

import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "./DashSide.css";


import { MdLogout, MdExplore, MdPlace, MdReviews, MdArticle } from "react-icons/md";


import { BiSolidDashboard, BiBarChartSquare } from "react-icons/bi";

import {
    FaCog,
    FaRobot,
    FaUsersCog,
    FaMapMarkedAlt,
    FaRoute,
    FaMap,
    FaCloudSun,
    FaSuitcaseRolling,
    FaMoneyBillWave,
    FaUsers,
    FaPlaneDeparture,
    FaHotel,
    FaUtensils,
    FaStar,
    FaBookmark,
    FaHistory,
    FaClipboardList,
} from "react-icons/fa";


import { GiPathDistance, GiWorld } from "react-icons/gi";


import { IoMdAnalytics, IoMdTime } from "react-icons/io";



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
            roles: ["user", "admin"],
        },

        /* ===================== DISCOVER ===================== */
        {
            name: "Discover Places",
            icon: <FaMapMarkedAlt />,
            submenu: [
                { name: "Best Places", link: "/discover/best" },            // Foursquare + OSM
                { name: "Nearby Places", link: "/discover/nearby" },        // OSM + Overpass
                { name: "Top Attractions", link: "/discover/attractions" },
                { name: "Food & Cafes", link: "/discover/food" },
                { name: "Hotels & Stays", link: "/discover/stays" },
            ],
            roles: ["user", "admin"],
        },

        /* ===================== TRIP PLANNER ===================== */
        {
            name: "Trip Planner",
            icon: <FaRoute />,
            submenu: [
                { name: "Create Trip", link: "/trips/create" },
                { name: "My Trips", link: "/trips" },

                { name: "Short Trips (1 Day)", link: "/trips/type/short" },
                { name: "Mid Trips (2–5 Days)", link: "/trips/type/mid" },
                { name: "Long Trips (15+ Days)", link: "/trips/type/long" },

                { name: "AI Trip Generator", link: "/trips/ai" }, // Gemini AI
            ],
            roles: ["user", "admin"],
        },

        /* ===================== ROUTES & MAPS ===================== */
        {
            name: "Routes & Maps",
            icon: <FaMap />,
            submenu: [
                { name: "Route Planner", link: "/routes/plan" },       // OSRM
                { name: "Distance & Time", link: "/routes/estimate" },
                { name: "Offline Maps", link: "/maps/offline" },
            ],
            roles: ["user", "admin"],
        },

        /* ===================== WEATHER ===================== */
        {
            name: "Weather",
            icon: <FaCloudSun />,
            submenu: [
                { name: "Live Weather", link: "/weather/live" },      // OpenWeather
                { name: "Trip Forecast", link: "/weather/trip" },
                { name: "Best Time to Visit", link: "/weather/best-time" },
            ],
            roles: ["user", "admin"],
        },

        /* ===================== BOOKINGS (OPTIONAL) ===================== */
        {
            name: "Bookings",
            icon: <FaSuitcaseRolling />,
            submenu: [
                { name: "Saved Hotels", link: "/bookings/hotels" },
                { name: "Saved Places", link: "/bookings/places" },
                { name: "Travel Checklist", link: "/bookings/checklist" },
            ],
            roles: ["user", "admin"],
        },

        /* ===================== EXPENSES ===================== */
        {
            name: "Budget & Expenses",
            icon: <FaMoneyBillWave />,
            submenu: [
                { name: "Trip Budget", link: "/expenses/budget" },
                { name: "Expense Tracker", link: "/expenses/tracker" },
                { name: "Cost Breakdown", link: "/expenses/report" },
            ],
            roles: ["user", "admin"],
        },

        /* ===================== AI ASSISTANT ===================== */
        {
            name: "AI Assistant",
            icon: <FaRobot />,
            submenu: [
                { name: "Ask Travel AI", link: "/ai/chat" },
                { name: "Smart Itinerary", link: "/ai/itinerary" },
                { name: "Place Suggestions", link: "/ai/places" },
            ],
            roles: ["user", "admin"],
        },

        /* ===================== COMMUNITY ===================== */
        {
            name: "Community",
            icon: <FaUsers />,
            submenu: [
                { name: "Travel Stories", link: "/community/stories" },
                { name: "Reviews & Ratings", link: "/community/reviews" },
                { name: "Ask Travelers", link: "/community/questions" },
            ],
            roles: ["user", "admin"],
        },

        /* ===================== REPORTS ===================== */
        {
            name: "Reports",
            icon: <BiBarChartSquare />,
            submenu: [
                { name: "Trip Summary", link: "/reports/trips" },
                { name: "Travel History", link: "/reports/history" },
                { name: "Visited Places Map", link: "/reports/map" },
            ],
            roles: ["user", "admin"],
        },

        /* ===================== ADMIN ===================== */
        {
            name: "Admin Panel",
            icon: <FaUsersCog />,
            submenu: [
                { name: "Users", link: "/admin/users" },
                { name: "Places Moderation", link: "/admin/places" },
                { name: "Trip Analytics", link: "/admin/analytics" },
                { name: "API Usage Logs", link: "/admin/apis" },
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
                        src={uoplogo}
                        alt="Logo"
                        className="h-10 w-auto ml-4 bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 rounded-lg"
                        whileHover={{ scale: 1.1, rotate: 3 }}
                    />
                    {!collapsed && (
                        <motion.h1
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="ml-2 font-bold text-lg text-emerald-700"
                        >
                            Travel Management
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
                                            ? "text-emerald-600 bg-emerald-100 shadow-sm"
                                            : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
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
                                                <ChevronDown className="w-4 h-4 text-emerald-600" />
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
                                                            ? "text-emerald-700 font-semibold"
                                                            : "text-gray-500 hover:text-emerald-600"
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
                                            ? "text-emerald-600"
                                            : "text-gray-600 hover:text-emerald-600 hover:ml-1"
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
                    <div className="px-4 py-4 mt-4 border-t border-emerald-100 bg-gradient-to-r from-emerald-50 to-white">
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
                    className="p-3 text-center text-[10px] text-emerald-500 border-t border-emerald-100"
                >
                    {!collapsed && (
                        <>
                            © {new Date().getFullYear()} CareerAI Helper
                            <br />
                            <span className="font-semibold text-emerald-600">
                                Empowering Smart Careers
                            </span>
                        </>
                    )}
                </motion.div>
            </div>
        </motion.aside>
    );
};

export default DashSide;
