import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import Button from '../../../components/Button';

function BusinessPaymentFail({ navigation, route }) {

    const windowHeight = Dimensions.get('window').height;
    const nameOfUser = route.params.name
    const nameOfEmail = route.params.businessEmail
    const nameOfBusinessName = route.params.businessName
    const handleredirect = () => {
        navigation.navigate("MyBusinessCardScreen");
    }

    return (
        <View className="flex-1 bg-red-200 relative">
            <View className={`w-full absolute  ${windowHeight < 670 ? "top-[90px]" : "top-[160px]"} z-10 h-16 flex-row justify-center`}>
                <View className=" w-72 rounded-xl bg-red-400 h-full flex-row justify-center items-center">
                    <Text className="text-white text-lg font-extrabold">Business Payment Unsuccessful</Text>
                </View>
            </View>
            <View className="w-full bg-white h-[75%] pt-24 px-8 rounded-t-[45px] overflow-hidden absolute bottom-0">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View className="flex-1 ">
                        <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-lg text-red-400 font-extrabold">Name :</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base text-neutral-700  font-bold">{nameOfUser}</Text>
                            </View>
                        </View>
                        <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-lg  text-red-400 font-extrabold">Business Name :</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base text-neutral-700  font-bold">{nameOfBusinessName}</Text>
                            </View>
                        </View>
                        <View className="w-full mb-3 bg-[#E9EDF7] flex-row items-center p-4 rounded-[10px]">
                            <View className="h-full basis-[37%]">
                                <Text className="text-base text-red-400 font-extrabold">Business Email :</Text>
                            </View>
                            <View className="basis-[63%]">
                                <Text className="text-base text-neutral-700  font-bold">{nameOfEmail}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View className="mb-12">
                    <Button className="bg-red-400 py-3 rounded-lg" title="Try again" onPress={handleredirect} />
                </View>
            </View>
        </View>
    );
}

export default BusinessPaymentFail;