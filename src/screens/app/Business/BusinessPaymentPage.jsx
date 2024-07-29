import { t } from 'i18next';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import ApiContext from '../../../context/ApiContext';

const BusinessPaymentPage = ({ route, navigation }) => {

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const { activeBusinessData } = useContext(ApiContext);
    const responseOfData = route.params?.response?.businessData;
    const razorpayData = route.params?.response;
    const planDetailsOfSubscription = route.params?.response?.planDetail;
    const animation = useMemo(() => new Animated.Value(0), []);
    const [loading, setLoading] = useState("");
    const scale = animation.interpolate({ inputRange, outputRange });

    const onPressIn = useCallback(() => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const onPressOut = useCallback(() => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const handlePayment = async (data) => {
        try {
            const options = {
                key: data.razorpay_id,
                subscription_id: data.subscription_id,
                plan_id: data.plan_id,
                name: 'Pay to Panchal Samaj',
                description: 'Recurring Payment to Panchal Samaj',
                image: 'https://samajapp.codecrewinfotech.com/uploads/appstore.png',
                prefill: {
                    name: responseOfData.name || '',
                    email: responseOfData.businessEmail || '',
                },
                notes: {
                    name: responseOfData.businessName || '',
                    email: responseOfData.businessEmail || '',
                },
                theme: {
                    color: '#0D5ADD',
                }
            };
            setLoading(true);
            const paymentResponse = await RazorpayCheckout.open(options);
            setLoading(false);
            const { razorpay_payment_id } = paymentResponse;
            const updatedRegisterData = { payment_id: razorpay_payment_id, business_id: responseOfData._id, is_recurring: true };
            await activeBusinessData(updatedRegisterData);
            navigation.navigate('BusinessPaymentSuccess', { name: responseOfData.name, businessEmail: responseOfData.businessEmail, businessName: responseOfData.businessName });
        } catch (error) {
            console.log("error", error);
            navigation.navigate('BusinessPaymentFail', { name: responseOfData.name, businessEmail: responseOfData.businessEmail, businessName: responseOfData.businessName });
        }
    };

    return (

        <View className="flex-1 bg-[#E9EDF7] p-2">
            <View className="bg-white mx-2 h-[80%] rounded-tl-[30px] rounded-tr-[30px] absolute bottom-0 left-0 right-0">
                <View className="absolute top-[-35] left-0 right-0 items-center">
                    <Text className="bg-[#4e63ac] text-white text-xl font-bold rounded-[18px] p-5">Payment for Business Card</Text>
                </View>
                <View className="flex flex-1 p-8 pt-12 mt-4">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        className="flex flex-1"
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View className="w-full">
                                    {responseOfData && (
                                        <>

                                            <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-3 rounded-[10px]">
                                                <View className="flex flex-row  items-center">
                                                    <Text className="w-[40%] text-[16px] text-black font-semibold mr-2">
                                                        Name:
                                                    </Text>
                                                    <Text className="w-[60%] text-justify text-md text-black font-semibold">
                                                        {responseOfData.name}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-3 rounded-[10px]">
                                                <View className="flex flex-row items-center">
                                                    <Text className="w-[40%] text-[14px] text-black font-semibold mr-2">
                                                        Company Name:
                                                    </Text>
                                                    <Text className="w-[60%] text-md text-black font-semibold">
                                                        {responseOfData.businessName}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-3 rounded-[10px]">
                                                <View className="flex flex-row items-center">
                                                    <Text className="w-[40%] text-[14px] text-black font-semibold mr-2">
                                                        Company Email:
                                                    </Text>
                                                    <Text className="w-[60%] text-md text-black font-semibold">
                                                        {responseOfData.businessEmail}
                                                    </Text>
                                                </View>
                                            </View>
                                        </>
                                    )}
                                </View>
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>

                    {loading ? (
                        <View className="bg-[#4e63ac] rounded-[10px] flex flex-row justify-center items-center p-3">
                            <Text className="mr-4 text-lg font-semibold text-white ">{t("Loading")}</Text>
                            <ActivityIndicator size="small" color="white" />
                        </View>
                    ) : (
                        <Animated.View style={[{ transform: [{ scale }] }]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                                onPress={() => handlePayment(razorpayData)}
                            >
                                <View className="bg-[#4e63ac] rounded-xl p-3">
                                    <Text className="text-white text-lg font-bold text-center">
                                        Pay Now {planDetailsOfSubscription?.[0]?.price} ₹
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default BusinessPaymentPage;