import React from "react";
import Button from "../../../component/Buttons/Button";
import API from "../../../services/api";

const categoryOptions = [
    { label: "Rice", value: "rice" },
    { label: "Curry", value: "curry" },
    { label: "Seafood", value: "seafood" },
    { label: "Street Food", value: "street-food" },
    { label: "Dessert", value: "dessert" },
    { label: "Spicy", value: "spicy" },
    { label: "Hot", value: "hot" },
    { label: "Vegan", value: "vegan" },
    { label: "Meat", value: "meat" },
];

const CreateRecipe = () => {
    const [values, setValues] = React.useState({
        slug: "",
        name: { en: "", si: "", ta: "" },
        description: { en: "", si: "", ta: "" },
        origin: { country: "Sri Lanka", region: "" },
        category: "",
        ingredients: [{ name: "", quantity: "" }],
        steps: [{ step: 1, text: "" }],
        cookingTime: { prepMinutes: "", cookMinutes: "" },
        spiceLevel: 1,
        nutrition: { calories: "", protein: "", carbs: "", fat: "" },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split(".");
        setValues((prev) => {
            const copy = { ...prev };
            let temp = copy;
            keys.forEach((k, i) => {
                if (i === keys.length - 1) temp[k] = value;
                else {
                    temp[k] = { ...temp[k] };
                    temp = temp[k];
                }
            });
            return copy;
        });
    };

    const addIngredient = () =>
        setValues((p) => ({
            ...p,
            ingredients: [...p.ingredients, { name: "", quantity: "" }],
        }));

    const removeIngredient = (i) =>
        setValues((p) => ({
            ...p,
            ingredients: p.ingredients.filter((_, index) => index !== i),
        }));

    const updateIngredient = (i, field, value) =>
        setValues((p) => {
            const list = [...p.ingredients];
            list[i][field] = value;
            return { ...p, ingredients: list };
        });

    const addStep = () =>
        setValues((p) => ({
            ...p,
            steps: [...p.steps, { step: p.steps.length + 1, text: "" }],
        }));

    const removeStep = (i) =>
        setValues((p) => ({
            ...p,
            steps: p.steps
                .filter((_, index) => index !== i)
                .map((s, index) => ({ ...s, step: index + 1 })),
        }));

    const updateStep = (i, value) =>
        setValues((p) => {
            const list = [...p.steps];
            list[i].text = value;
            return { ...p, steps: list };
        });

    const token = localStorage.getItem("token")

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        try{
            const res = await API.post('/foodapi/create-recipe/', values,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if(res.data.success){
                alert(res.data.message)
                window.location.reload()
            }
            else{
                alert(res.data.message)
            }
        }
        catch(err){
            alert(err)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-14">
            <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w px-6 space-y-16"
            >
                <header className="space-y-2">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Create New Recipe
                    </h1>
                    <p className="text-gray-500">
                        Add a Sri Lankan recipe with multilingual support.
                    </p>
                </header>

                <Divider />

                <Section title="Basic Information">
                    <ModernInput
                        label="Recipe Slug"
                        name="slug"
                        value={values.slug}
                        onChange={handleChange}
                        placeholder="chicken-curry-sri-lanka"
                    />
                </Section>

                <Section title="Recipe Name">
                    <ThreeCol>
                        <ModernInput label="English" name="name.en" value={values.name.en} onChange={handleChange} />
                        <ModernInput label="Sinhala" name="name.si" value={values.name.si} onChange={handleChange} />
                        <ModernInput label="Tamil" name="name.ta" value={values.name.ta} onChange={handleChange} />
                    </ThreeCol>
                </Section>

                <Section title="Description">
                    <ModernTextArea label="English" name="description.en" value={values.description.en} onChange={handleChange} />
                    <ModernTextArea label="Sinhala" name="description.si" value={values.description.si} onChange={handleChange} />
                    <ModernTextArea label="Tamil" name="description.ta" value={values.description.ta} onChange={handleChange} />
                </Section>

                <Section title="Origin">
                    <TwoCol>
                        <ModernInput label="Country" name="origin.country" value={values.origin.country} onChange={handleChange} />
                        <ModernInput label="Region" name="origin.region" value={values.origin.region} onChange={handleChange} />
                    </TwoCol>
                </Section>

                <Section title="Category">
                    <ModernSelect
                        label="Recipe Category"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        options={categoryOptions}
                    />
                </Section>

                <Section title="Ingredients">
                    <div className="space-y-4">
                        {values.ingredients.map((ing, i) => (
                            <div key={i} className="grid grid-cols-12 gap-4">
                                <ModernInput
                                    className="col-span-5"
                                    placeholder="Ingredient"
                                    value={ing.name}
                                    onChange={(e) => updateIngredient(i, "name", e.target.value)}
                                />
                                <ModernInput
                                    className="col-span-4"
                                    placeholder="Quantity"
                                    value={ing.quantity}
                                    onChange={(e) => updateIngredient(i, "quantity", e.target.value)}
                                />
                                <Button
                                    label="Remove"
                                    color="#EF4444"
                                    className="col-span-3"
                                    onClick={() => removeIngredient(i)}
                                />
                            </div>
                        ))}
                        <Button label="+ Add Ingredient" color="#2563EB" onClick={addIngredient} />
                    </div>
                </Section>

                <Section title="Cooking Steps">
                    <div className="space-y-6">
                        {values.steps.map((step, i) => (
                            <div key={i} className="rounded-xl border border-gray-200 p-5 bg-white">
                                <ModernTextArea
                                    label={`Step ${step.step}`}
                                    value={step.text}
                                    onChange={(e) => updateStep(i, e.target.value)}
                                />
                                <div className="mt-3 text-right">
                                    <Button label="Remove Step" color="#EF4444" onClick={() => removeStep(i)} />
                                </div>
                            </div>
                        ))}
                        <Button label="+ Add Step" color="#2563EB" onClick={addStep} />
                    </div>
                </Section>

                <Section title="Cooking Time">
                    <TwoCol>
                        <ModernInput type="number" label="Prep Minutes" name="cookingTime.prepMinutes" value={values.cookingTime.prepMinutes} onChange={handleChange} />
                        <ModernInput type="number" label="Cook Minutes" name="cookingTime.cookMinutes" value={values.cookingTime.cookMinutes} onChange={handleChange} />
                    </TwoCol>
                </Section>

                <Section title="Spice Level">
                    <ModernInput type="number" label="Spice Level (1–5)" name="spiceLevel" value={values.spiceLevel} onChange={handleChange} />
                </Section>

                <Section title="Nutrition">
                    <TwoCol>
                        <ModernInput type="number" label="Calories" name="nutrition.calories" value={values.nutrition.calories} onChange={handleChange} />
                        <ModernInput type="number" label="Protein (g)" name="nutrition.protein" value={values.nutrition.protein} onChange={handleChange} />
                        <ModernInput type="number" label="Carbs (g)" name="nutrition.carbs" value={values.nutrition.carbs} onChange={handleChange} />
                        <ModernInput type="number" label="Fat (g)" name="nutrition.fat" value={values.nutrition.fat} onChange={handleChange} />
                    </TwoCol>
                </Section>

                <Divider />

                <Button
                    label="🚀 Publish Recipe"
                    color="#10B981"
                    type="submit"
                    className="w-full py-5 text-xl font-bold rounded-2xl"
                />
            </form>
        </div>
    );
};

const Section = ({ title, children }) => (
    <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <div className="space-y-4">{children}</div>
    </section>
);

const Divider = () => (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
);

const TwoCol = ({ children }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
);

const ThreeCol = ({ children }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{children}</div>
);

const ModernInput = ({ label, className = "", ...props }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        {label && <label className="text-sm font-medium text-gray-600">{label}</label>}
        <input
            {...props}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
        />
    </div>
);

const ModernTextArea = ({ label, ...props }) => (
    <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-gray-600">{label}</label>}
        <textarea
            {...props}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 min-h-[120px] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
    </div>
);

const ModernSelect = ({ label, options, ...props }) => (
    <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-gray-600">{label}</label>}
        <select
            {...props}
            className="rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
        >
            <option value="">Select</option>
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    </div>
);

export default CreateRecipe;
