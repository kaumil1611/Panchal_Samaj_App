import React, { useEffect } from 'react';
import { GlobalProvider } from './src/context/globalState';
import App from './App';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WizardProvider } from './src/context/WizardProvider';
import { ApiProvider } from './src/context/ApiContext';
import { requestUserPermission } from './src/notification/FirebaseMessagingService';

const AppWrapper = () => {
    useEffect(() => {
        requestUserPermission()
    }, [])

    return (
        <SafeAreaProvider>
            <GlobalProvider>
                <WizardProvider>
                    <ApiProvider>
                        <App />
                    </ApiProvider>
                </WizardProvider>
            </GlobalProvider>
        </SafeAreaProvider>
    )
};

export default AppWrapper;
