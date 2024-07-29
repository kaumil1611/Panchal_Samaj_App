// src/context/apiHelper.js
export const apiRequest = async (apiFunction, params, setData, contextKey) => {
    try {
        const data = await apiFunction(params);
        setData(contextKey, data);
        return data;
    } catch (error) {
        console.log(error)
        // Error handled by interceptor
    }
};
