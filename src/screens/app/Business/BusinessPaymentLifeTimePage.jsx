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
import { GlobalContext } from '../../../context/globalState';

const BusinessPaymentLifeTimePage = ({ route, navigation }) => {



    const orderData = route.params?.response?.order;
    console.log(orderData, " ::: orderData");
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const { registerData } = useContext(GlobalContext);
    const { activeBusinessData } = useContext(ApiContext);

    const responseOfData = route.params?.response?.businessData;
    const razorpayData = route.params?.response;

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
        console.log(data, ":::::data")
        try {
            const options = {
                description: 'Pay to Panchal Samaj',
                image: 'https://samajapp.codecrewinfotech.com/uploads/appstore.png',
                currency: data?.order?.currency,
                order_id: data?.order?.id,
                key: data?.razorpay_key_id,
                amount: data?.order?.amount,
                name: 'Pay to Panchal Samaj',
                prefill: {
                    name: registerData?.firstName,
                    lastname: registerData?.lastName,
                    contact: registerData?.mobile_number,
                },
                theme: { color: '#0D5ADD' },
            };
            setLoading(true);
            const paymentResponse = await RazorpayCheckout.open(options);
            setLoading(false);
            const { razorpay_payment_id } = paymentResponse;
            const updatedRegisterData = { payment_id: razorpay_payment_id, business_id: responseOfData._id, is_recurring: false };
            await activeBusinessData(updatedRegisterData);
            navigation.navigate('BusinessPaymentSuccess', { name: responseOfData.name, businessEmail: responseOfData.businessEmail, businessName: responseOfData.businessName });
        } catch (error) {
            setLoading(false);
            console.log("error", error);
            navigation.navigate('BusinessPaymentFail', { name: responseOfData.name, businessEmail: responseOfData.businessEmail, businessName: responseOfData.businessName });
        }
        finally {
            setLoading(false);
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
                                                <View className="flex flex-row items-center">
                                                    <Text className="basis-[40%] text-[14px] text-black font-semibold mr-2">
                                                        Name:
                                                    </Text>
                                                    <Text className="basis-[60%] text-justify text-md text-black font-semibold">
                                                        {responseOfData.name}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-3 rounded-[10px]">
                                                <View className="flex flex-row items-center">
                                                    <Text className="basis-[40%] text-[14px] text-black font-semibold mr-2">
                                                        Company Name:
                                                    </Text>
                                                    <Text className="basis-[60%] text-md text-black font-semibold">
                                                        {responseOfData.businessName}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-3 rounded-[10px]">
                                                <View className="flex flex-row items-center">
                                                    <Text className="basis-[40%] text-[14px] text-black font-semibold mr-2">
                                                        Company Email:
                                                    </Text>
                                                    <Text className="basis-[60%] text-md text-black font-semibold">
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
                                        Pay Now {orderData.amount / 100} ₹
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

export default BusinessPaymentLifeTimePage;