import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import CustomBottomSheet from '../components/CustomBottomSheet';
import ChangeLanguage from '../components/FloatingButton';
import CustomBottomTab from '../components/shared/BottomTabs/CustomBottomTab';
import ContactUs from '../screens/app/Contactus';
import Home from '../screens/app/Home';
import Member from '../screens/app/Member';
import News from '../screens/app/News';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const { t } = useTranslation();

    return (
        <>
            <Tab.Navigator
                sceneContainerStyle={{ backgroundColor: "#FCFCFC" }}
                tabBar={props => <CustomBottomTab {...props} />}
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                }}
            >
                <Tab.Group
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Tab.Screen
                        options={{ tabBarLabel: t("home") }}
                        name="Home"
                        component={Home}
                    />
                    <Tab.Screen
                        options={{ tabBarLabel: t('Members') }}
                        name="Member"
                        component={Member}
                    />
                    <Tab.Screen
                        options={{ tabBarLabel: t("news"), headerStyle: { height: 0 } }}
                        name="News"
                        component={News}
                    />
                    <Tab.Screen
                        options={{ tabBarLabel: t("Contactus") }}
                        name="Contactus"
                        component={ContactUs}
                    />
                </Tab.Group>
            </Tab.Navigator>
            <ChangeLanguage onPress={() => console.warn("Clicked")} />
            <CustomBottomSheet screenFirstPercentage="30%" screenSecondPercentage="34%" />
        </>

    );
};
export default BottomTabs;
