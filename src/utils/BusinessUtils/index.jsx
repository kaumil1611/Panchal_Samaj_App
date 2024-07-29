// utils/businessUtil.js

// Define the static object with the templates
const templates = {
    1: { template_id: 1, name: "BusinessTemplate1", user_templ: "BusinessUserTemplate1", show_label: "Business Template 1" },
    2: { template_id: 2, name: "BusinessTemplate2", user_templ: "BusinessUserTemplate2", show_label: "Business Template 2" },
    3: { template_id: 3, name: "BusinessTemplate3", user_templ: "BusinessUserTemplate3", show_label: "Business Template 3" },
};

// Method to return all templates as an array of objects
const getAllTemplates = () => {
    return Object.values(templates);
};

// Method to return a template based on the provided ID
const getTemplateById = (template_id) => {
    return templates[template_id] || null;
};

export { getAllTemplates, getTemplateById };
