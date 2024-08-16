import { Pressable } from 'native-base';
import React from 'react';
import {
    Animated,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../../../assets/twitter.svg';

const BusinessCard = () => {

    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);

    const renderSocialIcons = () => (
        <View className="flex flex-row justify-around mt-6">

            <TouchableOpacity>
                <Pressable>
                    <AnimatedFontistoIcon name="facebook" size={30} color="#0866ff" />
                </Pressable>
            </TouchableOpacity>

            <TouchableOpacity>
                <Pressable>
                    <AnimatedFontistoIcon name="linkedin" size={30} color="#0866ff" />
                </Pressable>
            </TouchableOpacity>

            <TouchableOpacity>
                <Pressable>
                    <AnimatedFontistoIcon name="instagram" size={30} color="#f700b2" />
                </Pressable>
            </TouchableOpacity>

            <TouchableOpacity>
                <Pressable>
                    <TwitterIcon width={30} height={30} color='red' />
                </Pressable>
            </TouchableOpacity>

        </View>
    );

    const renderCard = () => (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['#5c86f7', '#9ab1e1', "#fff"]}
                className="h-36 flex flex-row justify-between items-center gap-5"
            >
                <View className="left-4 w-24 h-24 shadow-md m-2 shadow-gray-500">
                    <Image
                        className="w-full h-full rounded-full"
                        source={require("../../../../assets/card02.png")}
                        alt='profile-img'
                    />
                </View>
                <View className="flex-1 flex-col">
                    <Text className="text-gray-700 text-xl w-64 font-bold">Asgard Tours and Travels</Text>

                </View>
            </LinearGradient>

            <View className="bg-white px-5 pb-5">

                <Text className="text-xl text-black font-bold mt-5">
                    Vishw Prajapati
                </Text>

                <Text className="text-base text-gray-800 font-semibold mt-1">
                    Owner of Asgard Tours and Travels
                </Text>

                <View className="flex flex-row items-center flex-wrap ">
                    <Text className="text-black text-base font-bold tracking-wide">Business Type: </Text>

                    <Text className="text-base text-gray-800 font-semibold mt-1">
                        Travels - Since 2002
                    </Text>
                </View>

                <View className="flex flex-row items-center flex-wrap mb-2 mt-2">
                    <Text className="text-black text-base font-bold tracking-wide">Mobile Number: </Text>
                    <TouchableOpacity>
                        <View>
                            <Text style={{ color: '#5176df', fontSize: 14, fontWeight: 'bold' }}>
                                +91 9998887776
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Text> , </Text>
                    <TouchableOpacity>
                        <View>
                            <Text className="text-[#5176df] tracking-wider text-sm font-semibold">
                                +91 3332221110
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Website: </Text>
                    <TouchableOpacity >
                        <Text className="text-[#5176df] text-sm font-semibold">https://asgardtours.com</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Company Email: </Text>
                    <TouchableOpacity >
                        <Text className="text-[#5176df] text-md font-medium">asgardtoursandtravels123@gmail.com</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Address: </Text>
                    <TouchableOpacity className="ms-2">
                        <Text className="text-[#5176df] text-md font-medium">B-382 Nishitpark aadinathnagar odhav ahmedabad</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Short Description: </Text>
                    <Text className="text-black text-sm text-justify">This is asgard tours and travels which is one of the great travel industries</Text>
                </View>

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Long Description: </Text>
                    <Text className="text-black text-sm text-justify">We are really no one travels agency in the gujarat and also in india</Text>
                </View>

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Business Opening Date:</Text>
                    <Text className="text-black text-sm text-justify">18/07/2024</Text>
                </View>

                {renderSocialIcons()}

            </View>
        </ScrollView>
    );

    return (
        <View className="bg-white flex-1 rounded-xl shadow-lg">
            {renderCard()}
        </View>
    );
};

export default BusinessCard;