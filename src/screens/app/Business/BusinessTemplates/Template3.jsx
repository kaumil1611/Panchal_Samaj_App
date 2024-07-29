import React from 'react';
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../../../assets/twitter.svg';

const renderSocialIcons = () => {

    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);

    return (
        <>
            <Pressable>
                <AnimatedFontistoIcon name="facebook" size={30} color="#0866ff" />
            </Pressable>

            <Pressable>
                <AnimatedFontistoIcon name="linkedin" size={30} color="#0866ff" />
            </Pressable>

            <Pressable>
                <AnimatedFontistoIcon name="instagram" size={30} color="#f700b2" />
            </Pressable>

            <Pressable>
                <TwitterIcon width={30} height={30} color='red' />
            </Pressable>
        </>
    )
};

const Template3 = () => {

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.userImageContainer}>

                <View style={styles.userImage}>
                    <Image source={require('../../../../assets/hero1.jpg')} style={styles.image} />
                </View>

                <View>
                    <Text className="text-sm font-semibold">Vishw Prajapati</Text>
                    <Text className="text-black text-sm font-semibold">Owner of Asgard</Text>
                    <Text className="text-lg text-black font-semibold">Tour and Travels</Text>
                    <Text className="text-sm font-semibold text-black">Travel company - Since 2001</Text>
                </View>

            </View>

            <View className="m-3">

                <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Company Name :</Text>
                    <Text className="font-semibold text-sm text-left w-[100%] text-black">Codecrew Infotech pvt.</Text>
                </View>

                <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Mobile Number :</Text>
                    <Text className="font-semibold text-sm text-left w-[100%] text-blue-500">9425710736, 9875469232</Text>
                </View>

                <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Address :</Text>
                    <Text className="font-semibold text-sm text-left w-[100%] text-blue-500">A-29 Akash Society vastral, Ahmedabad</Text>
                </View>

                <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Email :</Text>
                    <Text className="font-semibold text-sm text-left w-[100%] text-blue-500">ccinfotech@gmail.com</Text>
                </View>

                <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Website :</Text>
                    <Text className="font-semibold text-sm text-left w-[100%] text-blue-500">http://127.0.0.1:5500/Panchal-samaj/index.html/</Text>
                </View>

                <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Short Description :</Text>
                    <Text className="font-semibold text-sm text-left w-[100%] text-black">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa fuga iusto laudantium excepturi sit.
                    </Text>
                </View>

                <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Long Description :</Text>
                    <Text className="font-semibold text-sm text-left w-[100%] text-black">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias autem ipsam deserunt minima soluta obcaecati ullam ut fuga impedit temporibus, incidunt sit iste cumque
                    </Text>
                </View>

            </View>

            <View className="flex flex-row items-center justify-around mt-3">
                {renderSocialIcons()}
            </View>

            <View>
                <Text className="text-center text-sm text-gray-400 mt-3">Created by 18 July2024</Text>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        padding: 10,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        maxWidth: '100%'
    },
    userImageContainer: {
        flexDirection: 'row',
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: '#1b83bd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    userImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 60,
    },
});

export default Template3;