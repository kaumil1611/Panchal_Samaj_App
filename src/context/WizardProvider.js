import React, { createContext, useContext, useState } from 'react';

const WizardContext = createContext();

export const WizardProvider = ({ children }) => {
    const [wizardState, setWizardState] = useState({
        fullName: "",
        age: "",
        birthPlace: "",
        maidenName: "",
        termsAccepted: "",
        privacyAccepted: "",
        progress: 0,
    });

    const updateWizardState = (updates) => {
        setWizardState((prevState) => ({
            ...prevState,
            ...updates,
        }));
    };

    return (
        <WizardContext.Provider value={{ wizardState, updateWizardState }}>
            {children}
        </WizardContext.Provider>
    );
};

export const useWizard = () => useContext(WizardContext);
