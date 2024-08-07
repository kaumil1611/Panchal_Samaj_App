import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomTabs from '../containers/BottomTabs';
import Aboutus from '../screens/app/About';
import AddBusinessDetails from '../screens/app/Business/AddBusinessDetails';
import BusinessListing from '../screens/app/Business/BusinessListing';
import BusinessPaymentFail from '../screens/app/Business/BusinessPaymentFail';
import BusinessPaymentPage from '../screens/app/Business/BusinessPaymentPage';
import BusinessPaymentSuccess from '../screens/app/Business/BusinessPaymentSuccess';
import BusinessSubscription from '../screens/app/Business/BusinessSubscription';
import Template1 from '../screens/app/Business/BusinessTemplates/Template1';
import Template2 from '../screens/app/Business/BusinessTemplates/Template2';
import Template3 from '../screens/app/Business/BusinessTemplates/Template3';
import EditBusinessDetails from '../screens/app/Business/EditBusinessDetails';
import FlipImage from '../screens/app/Business/FlipImage';
import MyBusinessCards from '../screens/app/Business/MyBusinessCards';
import SelectBusinessTemplate from '../screens/app/Business/SelectBusinessTemplate';
import ChangePassword from '../screens/app/ChangePassword';
import AllUserDirectory from '../screens/app/Directory/AllUserDirectory';
import EditUserProfile from '../screens/app/EditUser';
import EmailSupport from '../screens/app/EmailSupport';
import EventsScreen from '../screens/app/Events/EventsScreen';
import ViewFamilyTree from '../screens/app/FamilyDetails';
import AddFamilyDetails from '../screens/app/FamilyDetails/AddFamilyDetails';
import EditUserFamilyDetails from '../screens/app/FamilyDetails/EditUserFamilyDetails/EditUserFamilyDetails';
import NodeDetails from '../screens/app/FamilyDetails/NodeDetails';
import Faqs from '../screens/app/Faqs';
import ForgotPassword from '../screens/app/ForgotPassword';
import SelectVillage from '../screens/app/FormWizard/SelectVillage';
import HomeScreen from '../screens/app/Home';
import Login from '../screens/app/Login';
import NewsDetailsPage from '../screens/app/News/NewsDetailsPage';
import NewsList from '../screens/app/News/NewsList';
import Payment from '../screens/app/Payment';
import PaymentFailed from '../screens/app/Payment/PaymentFailed';
import PaymentSuccess from '../screens/app/Payment/PaymentSuccess';
import ProfilePage from '../screens/app/Profile';
import Register from '../screens/app/Register';
import SettingBottomSheet from '../screens/app/Settings';
import Support from '../screens/app/Support';
import TermAndCondition from '../screens/app/TermAndCondition/TermAndCondition';
import VillageListing from '../screens/app/VillageListing';
import VillageWisePersons from '../screens/app/VillageWisePersons';
import Welcome from '../screens/app/WelcomeScreen';
import Bus_User_template1 from '../screens/app/Business/BusinessTemplates/BusinessUserTemplates/Bus_User_template1';
import Bus_User_template2 from '../screens/app/Business/BusinessTemplates/BusinessUserTemplates/Bus_User_template2';
import Bus_User_template3 from '../screens/app/Business/BusinessTemplates/BusinessUserTemplates/Bus_User_template3';
import BusinessPaymentLifeTimePage from '../screens/app/Business/BusinessPaymentLifeTimePage';

const RootStack = createNativeStackNavigator()

const RootNavigator = () => {

    const { t } = useTranslation();
    const [listingStyle, setListingStyle] = useState('grid')
    const { width } = Dimensions.get('window')
    const headerListStyle = (newListingStyle, navigation) => {
        setListingStyle(newListingStyle);
        navigation.navigate('VillageListing', { listingStyle: newListingStyle });
    };

    return (
        <>
            <RootStack.Navigator screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false
            }}>
                <RootStack.Screen name="TabNavigator" component={BottomTabs} options={{ headerShown: false, headerTitle: '' }} />
                <RootStack.Screen name='HomeScreen' component={HomeScreen} />
                <RootStack.Screen name='Profile' component={ProfilePage} />
                <RootStack.Screen name="VillageListing" component={VillageListing} initialParams={{ listingStyle }} options={({ navigation }) => ({
                    headerTitle: () => (
                        <View style={{ marginLeft: width - 220 }}>
                            <View className="flex-row p-1 rounded-full bg-slate-300 items-center">
                                <TouchableOpacity className={`text-center px-3 transition-all ${listingStyle == 'grid' ? 'bg-white rounded-full' : ''}`} onPress={() => headerListStyle('grid', navigation)}><Text className={`text-xl font-semibold text-black`}>Grid</Text></TouchableOpacity>
                                <TouchableOpacity className={`text-center px-3 transition-all ${listingStyle == 'List' ? 'bg-white rounded-full' : ''}`} onPress={() => headerListStyle('List', navigation)}><Text className={`text-xl font-semibold text-black `}>List</Text></TouchableOpacity>
                            </View>
                        </View>

                    )
                })} />
                <RootStack.Screen name="VillageWisePersons" component={VillageWisePersons} options={{ headerTitle: t("Villagewisepeople") }} />
                <RootStack.Screen name="Aboutus" component={Aboutus} options={{ headerTitle: t("aboutUs") }} />
                <RootStack.Screen name="NewsList" component={NewsList} options={{ headerTitle: t('NewsList') }} />
                <RootStack.Screen name="NewsDetailsPage" component={NewsDetailsPage} options={{ headerTitle: t("newsDetails") }} />
                <RootStack.Screen name="Support" options={{ headerTitle: t("SupportPage") }} component={Support} />
                <RootStack.Screen name="Setings" component={SettingBottomSheet} options={{ headerTitle: t("settings") }} />
                <RootStack.Screen name="EmailSupport" component={EmailSupport} options={{ headerTitle: t("EmailSupport") }} />
                <RootStack.Screen name="Faqs" component={Faqs} options={{ headerTitle: 'Faqs' }} />
                <RootStack.Screen name="TermAndCondition" component={TermAndCondition} options={{ headerTitle: 'Term & Condition' }} />
                <RootStack.Screen name="ChangePassword" component={ChangePassword} options={{ headerTitle: t("changePassword") }} />
                <RootStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerTitle: "Forgot Password" }} />
                <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <RootStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <RootStack.Screen name="Register" component={Register} options={{ headerTitle: t("RegisterPage") }} />
                <RootStack.Screen name="EditUserProfile" component={EditUserProfile} options={{ headerTitle: t("EditUserProfile") }} />
                <RootStack.Screen name="Payment" component={Payment} options={{ headerTitle: t("PaymentPage") }} />
                <RootStack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{ headerTitle: t("PaymentPage") }} />
                <RootStack.Screen name="BusinessPaymentSuccess" component={BusinessPaymentSuccess} options={{ headerTitle: "Payment Success" }} />
                <RootStack.Screen name="BusinessPaymentFail" component={BusinessPaymentFail} options={{ headerTitle: "Payment Fail" }} />
                <RootStack.Screen name="PaymentFailed" component={PaymentFailed} options={{ headerTitle: t("PaymentPage") }} />
                <RootStack.Screen name="select_village" options={{ headerTitle: t("RegisterPage") }} component={SelectVillage} />
                <RootStack.Screen name="ViewFamilyDetails" options={{ headerTitle: t("familyDetailsPage") }} component={ViewFamilyTree} />
                <RootStack.Screen name="NodeDetails" component={NodeDetails} options={{ headerTitle: t("familyDetailsPage") }} />
                <RootStack.Screen name="AddFamilyDetail" component={AddFamilyDetails} options={{ headerTitle: t("AddFamilyDetails") }} />
                <RootStack.Screen name="EditUserFamilyDetails" component={EditUserFamilyDetails} options={{ headerTitle: t("EditFamilyDetails") }} />
                <RootStack.Screen name="AllUserDirectory" component={AllUserDirectory} options={{ headerTitle: "Directory" }} />
                <RootStack.Screen name="EventsScreen" component={EventsScreen} options={{ headerTitle: t("AllEvents") }} />
                <RootStack.Screen name="BusinessScreen" component={BusinessListing} options={{ headerTitle: t("Business") }} />
                <RootStack.Screen name="MyBusinessCardScreen" component={MyBusinessCards} options={{ headerTitle: t("My Business") }} />
                <RootStack.Screen name="AddBusinessDetailsScreen" component={AddBusinessDetails} options={{ headerTitle: t("Add Business Details") }} />
                <RootStack.Screen name="EditBusinessDetails" component={EditBusinessDetails} options={{ headerTitle: "Edit Business Details" }} />
                <RootStack.Screen name="BusinessSubscription" component={BusinessSubscription} options={{ headerTitle: "Subscription" }} />
                <RootStack.Screen name="FlipImage" component={FlipImage} options={{ headerTitle: "Flip Image" }} />
                <RootStack.Screen name="BusinessPaymentPage" component={BusinessPaymentPage} options={{ headerTitle: "Business Payment" }} />
                <RootStack.Screen name="BusinessPaymentLifeTimePage" component={BusinessPaymentLifeTimePage} options={{ headerTitle: "Business Payment" }} />
                <RootStack.Screen name="SelectBusinessTemplate" component={SelectBusinessTemplate} options={{ headerTitle: "Business Template" }} />
                <RootStack.Screen name="BusinessTemplate1" component={Template1} options={{ headerTitle: "Business Template 1" }} />
                <RootStack.Screen name="BusinessTemplate2" component={Template2} options={{ headerTitle: "Business Template 2" }} />
                <RootStack.Screen name="BusinessTemplate3" component={Template3} options={{ headerTitle: "Business Template 3" }} />
                <RootStack.Screen name="BusinessUserTemplate1" component={Bus_User_template1} options={{ headerTitle: "Business Template 1" }} />
                <RootStack.Screen name="BusinessUserTemplate2" component={Bus_User_template2} options={{ headerTitle: "Business Template 2" }} />
                <RootStack.Screen name="BusinessUserTemplate3" component={Bus_User_template3} options={{ headerTitle: "Business Template 3" }} />
            </RootStack.Navigator>
        </>
    )
}

export default RootNavigator
