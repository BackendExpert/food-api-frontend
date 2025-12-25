import React, { useEffect, useMemo, useState } from "react";
import API from "../../../services/api";

const ManageFoodRecipes = () => {
    const [allRecipes, setAllRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const res = await API.get(
                    `/foodapi/get-all-recipes?nocache=${Date.now()}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setAllRecipes(res.data?.result || []);
            } catch (err) {
                console.error(err);
            }
        };

        if (token) fetchAllRecipes();
    }, [token]);

    const filteredRecipes = useMemo(() => {
        let data = [...allRecipes];

        if (search.trim()) {
            const q = search.toLowerCase();
            data = data.filter(
                (r) =>
                    r.name?.en?.toLowerCase().includes(q) ||
                    r.name?.si?.toLowerCase().includes(q) ||
                    r.name?.ta?.toLowerCase().includes(q)
            );
        }

        data.sort((a, b) => {
            const da = new Date(a.createdAt);
            const db = new Date(b.createdAt);
            return sortOrder === "latest" ? db - da : da - db;
        });

        return data;
    }, [allRecipes, search, sortOrder]);

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                🍽️ Manage Food Recipes
            </h1>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search recipe name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full md:w-48 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {/* ===================== DESKTOP TABLE ===================== */}
            <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left">#</th>
                            <th className="px-4 py-3 text-left">Slug</th>
                            <th className="px-4 py-3 text-left">Recipe</th>
                            <th className="px-4 py-3 text-left">Category</th>
                            <th className="px-4 py-3 text-left">Origin</th>
                            <th className="px-4 py-3 text-left">Featured</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredRecipes.map((r, i) => (
                            <tr key={r._id || i} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{i + 1}</td>
                                <td className="px-4 py-3">
                                    <code className="bg-gray-100 px-2 py-1 rounded">
                                        {r.slug}
                                    </code>
                                </td>
                                <td className="px-4 py-3">
                                    <div>
                                        <p className="font-medium">{r.name?.en}</p>
                                        <p className="text-xs text-gray-500">
                                            {r.name?.si} · {r.name?.ta}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-4 py-3 capitalize">
                                    {r.category}
                                </td>
                                <td className="px-4 py-3">
                                    {r.origin?.country}
                                    <br />
                                    <span className="text-xs text-gray-500">
                                        {r.origin?.region}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {r.isFeatured ? (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            Featured
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                            No
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 capitalize font-medium">
                                    {r.status}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <a
                                        href={`/dashboard/food/one-recipe/${r._id}`}
                                        className="text-blue-600 hover:underline font-semibold"
                                    >
                                        View
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ===================== MOBILE CARDS ===================== */}
            <div className="md:hidden space-y-4">
                {filteredRecipes.map((r, i) => (
                    <div
                        key={r._id || i}
                        className="bg-white rounded-xl shadow p-4"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {r.name?.en}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {r.name?.si} · {r.name?.ta}
                                </p>
                            </div>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                #{i + 1}
                            </span>
                        </div>

                        <div className="mt-3 text-sm space-y-1">
                            <p>
                                <span className="font-medium">Slug:</span>{" "}
                                <code className="bg-gray-100 px-1 rounded">
                                    {r.slug}
                                </code>
                            </p>
                            <p>
                                <span className="font-medium">Category:</span>{" "}
                                {r.category}
                            </p>
                            <p>
                                <span className="font-medium">Origin:</span>{" "}
                                {r.origin?.country} – {r.origin?.region}
                            </p>
                            <p>
                                <span className="font-medium">Status:</span>{" "}
                                <span className="capitalize">{r.status}</span>
                            </p>
                        </div>

                        <div className="mt-3 flex justify-between items-center">
                            {r.isFeatured ? (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                    Featured
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                    Not Featured
                                </span>
                            )}

                            <a
                                href={`/dashboard/food/one-recipe/${r._id}`}
                                className="text-blue-600 font-semibold"
                            >
                                View →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageFoodRecipes;
