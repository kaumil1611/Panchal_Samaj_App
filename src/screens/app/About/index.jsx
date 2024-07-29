import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, useSharedValue } from 'react-native-reanimated';
import RenderHTML from 'react-native-render-html';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const Aboutus = () => {

    const { t } = useTranslation();
    const scrollRef = useAnimatedRef();
    const scrolloffset = useScrollViewOffset(scrollRef);
    const { aboutUsContentApi } = useContext(ApiContext);
    const { defaultLanguage } = useContext(GlobalContext);
    const [titleForEn, setTitleForEn] = useState("");
    const [titleForGn, setTitleForGn] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [descriptionGn, setDescriptionGn] = useState("");
    const [aboutUsImage, setAboutUsImage] = useState("");

    useEffect(() => {
        (async function () {
            const contentAboutUs = await aboutUsContentApi();
            setTitleForEn(contentAboutUs?.AboutusData?.titleE);
            setTitleForGn(contentAboutUs?.AboutusData?.titleG);
            setDescriptionEn(contentAboutUs?.AboutusData?.descriptionE);
            setDescriptionGn(contentAboutUs?.AboutusData?.descriptionG);
            setAboutUsImage(contentAboutUs?.AboutusData?.image);
        })();
    }, []);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrolloffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(
                        scrolloffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1]
                    )
                }
            ]
        };
    });

    const scrollY = useSharedValue(0);
    const headerHeight = useSharedValue(0);
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -scrollY.value }],
            height: headerHeight.value,
            opacity: interpolate(scrollY.value, [0, IMG_HEIGHT / 2], [1, 0]),
        };
    });

    const handleScroll = (event) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
    };

    return (
        <View className="flex flex-1 bg-white">
            <Animated.ScrollView
                onScroll={handleScroll}
                ref={scrollRef}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View>
                    <Animated.Image source={{ uri: `${process.env.IMAGE_URL}${aboutUsImage}` }}
                        style={[styles.image, imageAnimatedStyle]} />
                </View>
                <View className="bg-white p-2">
                    <View className="mb-5 px-2">
                        <Text className="text-black font-bold text-2xl">{t('aboutUs')}</Text>
                        <View className="w-[50px] h-[5px] bg-red-500 my-2"></View>
                        <Text className="text-lg text-black items-center">{defaultLanguage && defaultLanguage == "en" ? titleForEn : titleForGn}</Text>
                    </View>
                    <View className="mb-5 px-2">
                        <Text className="text-black font-bold text-2xl">{t('OurPurpose')}</Text>
                        <View className="w-[50px] h-[5px] bg-red-500 my-2"></View>
                        <RenderHTML
                            contentWidth={width}
                            source={{ html: defaultLanguage && defaultLanguage == "en" ? descriptionEn : descriptionGn }}
                            tagsStyles={htmlStyles}
                        />
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
};

export default Aboutus;

const styles = StyleSheet.create({
    image: {
        width,
        height: IMG_HEIGHT,
    },
});

const htmlStyles = {
    p: {
        fontSize: 18,
        textAlign: 'justify',
        color: '#555',
    },
    strong: {
        fontWeight: 'bold',
    },
    i: {
        fontStyle: 'italic',
    },
};
