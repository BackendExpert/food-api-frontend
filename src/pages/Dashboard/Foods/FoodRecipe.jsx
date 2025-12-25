import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../services/api";

const FoodRecipe = () => {
    const { id } = useParams();
    const [recipedata, setRecipedata] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOneRecipe = async () => {
            try {
                const res = await API.get(
                    `/foodapi/get-one-recipe/${id}?nocache=${Date.now()}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setRecipedata(res.data?.result);
            } catch (err) {
                console.error(err);
            }
        };
        if (token) fetchOneRecipe();
    }, [id, token]);

    if (!recipedata) return <div className="p-6 text-center text-gray-500">Loading...</div>;

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold">{recipedata.name?.en}</h1>
                <p className="text-lg md:text-xl mt-1">{recipedata.name?.si} · {recipedata.name?.ta}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                    {recipedata.isFeatured && <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full font-semibold text-sm">Featured</span>}
                    <span className="px-3 py-1 bg-white/20 rounded-full font-semibold text-sm capitalize">{recipedata.status}</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full font-semibold text-sm">{recipedata.origin?.country} - {recipedata.origin?.region}</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full font-semibold text-sm capitalize">{recipedata.category}</span>
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-sm md:text-base">
                    <div>Prep: {recipedata.cookingTime?.prepMinutes} min</div>
                    <div>Cook: {recipedata.cookingTime?.cookMinutes} min</div>
                    <div>Spice Level: {recipedata.spiceLevel}/5</div>
                </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
                <h2 className="font-bold text-xl text-gray-800 mb-2">Description</h2>
                <p className="text-gray-700 mb-1">{recipedata.description?.en}</p>
                <p className="text-gray-600 text-sm">{recipedata.description?.si}</p>
                <p className="text-gray-600 text-sm">{recipedata.description?.ta}</p>
            </div>


            {/* Ingredients Card */}
            <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-6 shadow-md mb-6">
                <h2 className="font-bold text-xl text-green-900 mb-3">Ingredients</h2>
                <ul className="list-disc list-inside space-y-1 text-green-800">
                    {recipedata.ingredients?.map((ing) => (
                        <li key={ing._id}>
                            {ing.name} - {ing.quantity} {ing.optional && <span className="text-green-700/70">(optional)</span>}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Steps Card */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-6 shadow-md mb-6">
                <h2 className="font-bold text-xl text-blue-900 mb-3">Steps</h2>
                <ol className="list-decimal list-inside space-y-2 text-blue-800">
                    {recipedata.steps?.map((step) => (
                        <li key={step._id}>{step.text}</li>
                    ))}
                </ol>
            </div>

            {/* Nutrition Card */}
            {recipedata.nutritions && (
                <div className="bg-gradient-to-r from-pink-100 to-pink-200 rounded-2xl p-6 shadow-md mb-6">
                    <h2 className="font-bold text-xl text-pink-900 mb-3">Nutrition</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-pink-800 font-semibold">
                        <div>Calories: {recipedata.nutritions.calories}</div>
                        <div>Protein: {recipedata.nutritions.protein}g</div>
                        <div>Carbs: {recipedata.nutritions.carbs}g</div>
                        <div>Fat: {recipedata.nutritions.fat}g</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodRecipe;
