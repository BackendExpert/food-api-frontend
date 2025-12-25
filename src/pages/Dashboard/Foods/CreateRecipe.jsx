import React from "react";
import Button from "../../../component/Buttons/Button";

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
            const newState = { ...prev };
            let temp = newState;
            keys.forEach((key, i) => {
                if (i === keys.length - 1) temp[key] = value;
                else {
                    temp[key] = { ...temp[key] };
                    temp = temp[key];
                }
            });
            return newState;
        });
    };

    const addIngredient = () =>
        setValues((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: "", quantity: "" }],
        }));

    const removeIngredient = (index) =>
        setValues((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index),
        }));

    const updateIngredient = (index, field, value) =>
        setValues((prev) => {
            const updated = [...prev.ingredients];
            updated[index][field] = value;
            return { ...prev, ingredients: updated };
        });

    const addStep = () =>
        setValues((prev) => ({
            ...prev,
            steps: [...prev.steps, { step: prev.steps.length + 1, text: "" }],
        }));

    const removeStep = (index) =>
        setValues((prev) => ({
            ...prev,
            steps: prev.steps
                .filter((_, i) => i !== index)
                .map((s, i) => ({ ...s, step: i + 1 })),
        }));

    const updateStep = (index, value) =>
        setValues((prev) => {
            const updated = [...prev.steps];
            updated[index].text = value;
            return { ...prev, steps: updated };
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    };

    return (
        <div className="bg-gray-50 py-12">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-10 px-6">
                <Section title="Recipe Slug">
                    <ModernInput
                        name="slug"
                        value={values.slug}
                        onChange={handleChange}
                        placeholder="recipe-slug"
                    />
                </Section>

                <Section title="Recipe Name">
                    <ModernInput
                        name="name.en"
                        value={values.name.en}
                        onChange={handleChange}
                        placeholder="English"
                    />
                    <ModernInput
                        name="name.si"
                        value={values.name.si}
                        onChange={handleChange}
                        placeholder="Sinhala"
                    />
                    <ModernInput
                        name="name.ta"
                        value={values.name.ta}
                        onChange={handleChange}
                        placeholder="Tamil"
                    />
                </Section>

                <Section title="Description">
                    <ModernTextArea
                        name="description.en"
                        value={values.description.en}
                        onChange={handleChange}
                        placeholder="English"
                    />
                    <ModernTextArea
                        name="description.si"
                        value={values.description.si}
                        onChange={handleChange}
                        placeholder="Sinhala"
                    />
                    <ModernTextArea
                        name="description.ta"
                        value={values.description.ta}
                        onChange={handleChange}
                        placeholder="Tamil"
                    />
                </Section>

                <Section title="Origin">
                    <div className="grid grid-cols-2 gap-4">
                        <ModernInput name="origin.country" value={values.origin.country} onChange={handleChange} />
                        <ModernInput name="origin.region" value={values.origin.region} onChange={handleChange} placeholder="Region" />
                    </div>
                </Section>

                <Section title="Category">
                    <ModernSelect name="category" value={values.category} onChange={handleChange} options={categoryOptions} />
                </Section>

                <Section title="Ingredients">
                    {values.ingredients.map((ing, i) => (
                        <div key={i} className="grid grid-cols-3 gap-3 items-end">
                            <ModernInput
                                value={ing.name}
                                onChange={(e) => updateIngredient(i, "name", e.target.value)}
                                placeholder="Name"
                            />
                            <ModernInput
                                value={ing.quantity}
                                onChange={(e) => updateIngredient(i, "quantity", e.target.value)}
                                placeholder="Quantity"
                            />
                            <Button label="Remove" color="#EF4444" onClick={() => removeIngredient(i)} />
                        </div>
                    ))}
                    <Button label="+ Add Ingredient" color="#3B82F6" onClick={addIngredient} />
                </Section>

                <Section title="Steps">
                    {values.steps.map((step, index) => (
                        <div key={index} className="flex flex-col gap-3 hover:bg-gray-50 rounded-xl p-3 transition">
                            <ModernTextArea
                                value={step.text}
                                onChange={(e) => updateStep(index, e.target.value)}
                                placeholder={`Step ${step.step}`}
                            />
                            <div className="self-end">
                                <Button label="Remove" color="#EF4444" onClick={() => removeStep(index)} />
                            </div>
                        </div>
                    ))}
                    <Button label="+ Add Step" color="#3B82F6" onClick={addStep} />
                </Section>

                <Section title="Cooking Time">
                    <div className="grid grid-cols-2 gap-4">
                        <ModernInput
                            type="number"
                            name="cookingTime.prepMinutes"
                            value={values.cookingTime.prepMinutes}
                            onChange={handleChange}
                            placeholder="Prep Minutes"
                        />
                        <ModernInput
                            type="number"
                            name="cookingTime.cookMinutes"
                            value={values.cookingTime.cookMinutes}
                            onChange={handleChange}
                            placeholder="Cook Minutes"
                        />
                    </div>
                </Section>

                <Section title="Spice Level">
                    <ModernInput type="number" name="spiceLevel" value={values.spiceLevel} onChange={handleChange} placeholder="1-5" />
                </Section>

                <Section title="Nutrition">
                    <div className="grid grid-cols-2 gap-4">
                        <ModernInput type="number" name="nutrition.calories" value={values.nutrition.calories} onChange={handleChange} placeholder="Calories" />
                        <ModernInput type="number" name="nutrition.protein" value={values.nutrition.protein} onChange={handleChange} placeholder="Protein" />
                        <ModernInput type="number" name="nutrition.carbs" value={values.nutrition.carbs} onChange={handleChange} placeholder="Carbs" />
                        <ModernInput type="number" name="nutrition.fat" value={values.nutrition.fat} onChange={handleChange} placeholder="Fat" />
                    </div>
                </Section>

                <Button label="Create Recipe" color="#10B981" type="submit" className="w-full py-4 text-lg font-semibold" />
            </form>
        </div>
    );
};

const Section = ({ title, children }) => (
    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition duration-300 space-y-4">
        <h2 className="font-semibold text-2xl text-gray-700">{title}</h2>
        {children}
    </div>
);

// Modern input with floating effect
const ModernInput = ({ type = "text", ...props }) => (
    <div className="relative w-full">
        <input
            type={type}
            {...props}
            className="peer w-full px-4 py-3 rounded-2xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-green-400 focus:outline-none transition"
        />
        {props.placeholder && (
            <label className="absolute left-4 top-3 text-gray-400 text-sm peer-focus:top-[-8px] peer-focus:text-green-400 peer-focus:text-xs transition-all pointer-events-none">
                {props.placeholder}
            </label>
        )}
    </div>
);

const ModernTextArea = ({ ...props }) => (
    <div className="relative w-full">
        <textarea
            {...props}
            className="peer w-full px-4 py-3 rounded-2xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition min-h-[120px]"
        />
        {props.placeholder && (
            <label className="absolute left-4 top-3 text-gray-400 text-sm peer-focus:top-[-8px] peer-focus:text-blue-400 peer-focus:text-xs transition-all pointer-events-none">
                {props.placeholder}
            </label>
        )}
    </div>
);

const ModernSelect = ({ options, ...props }) => (
    <div className="relative w-full">
        <select
            {...props}
            className="peer w-full px-4 py-3 rounded-2xl bg-gray-100 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:outline-none transition appearance-none"
        >
            <option value="">Select an option</option>
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    </div>
);

export default CreateRecipe;
