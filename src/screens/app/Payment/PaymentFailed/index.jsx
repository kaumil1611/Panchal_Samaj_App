import React from 'react'
import { Text, View } from 'react-native'
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../../../components/Button';
import { useTranslation } from 'react-i18next';

function PaymentFailed({ navigation, route }) {
    const { t } = useTranslation();
    const data = route.params;
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);

    return (
        <View className="bg-[#fafafa] flex-1">
            <View className="flex-row mt-10 mb-5 items-center justify-center">
                <View className="w-[130px] h-[130px] rounded-[130px] bg-red-500 flex-row items-center justify-center">
                    <AnimatedFeatherIcon
                        name="x"
                        size={65}
                        color="white"
                    />
                </View>
            </View>
            <View className="relative h-full flex-1 px-5">
                <View >
                    <Text className="tracking-wider marker:text-center my-3 text-3xl font-extrabold text-neutral-700">{t('paymentFailed')}</Text>
                    <Text className="tracking-wider  mb-3 text-lg font-semibold text-neutral-700">{t("Failpaymentmessage")}</Text>
                </View>
                <View className="bg-white w-full rounded-[15px]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                    <View className="p-3">
                        <View className="flex-row mb-3 items-center justify-between" >
                            <Text className="tracking-wider text-xl text-[#acacac]">{t('name')}</Text>
                            <Text className="tracking-wider text-lg font-semibold text-neutral-700">{data?.registerData?.firstname + " " + data?.registerData?.lastname}</Text>
                        </View>
                        <View className="flex-row my-2 mb-6 items-center justify-between" >
                            <Text className="tracking-wider text-xl text-[#acacac]">{t('mobile')}</Text>
                            <Text className="tracking-wider text-lg font-semibold text-neutral-700">{data?.registerData?.mobile_number}</Text>
                        </View>
                        <View className="h-[1px] mb-3 bg-neutral-400"></View>
                        <View className="flex-row items-center justify-between" >
                            <Text className="tracking-wider text-xl  text-[#acacac]">{t('TotalAmount')}</Text>
                            <Text className="tracking-wider text-xl font-extrabold text-[#e1a58a]">{data?.amount / 100} (Unpaid)</Text>
                        </View>
                    </View>
                </View>
                <View className="absolute bottom-4 left-5 w-full mt-8">
                    <Button className="bg-[#f56f4c] py-4 rounded-[20px]" title={t('tryagain')} onPress={() => navigation.navigate('Payment')} />
                </View>
            </View>
        </View>
    )
}

export default PaymentFailed