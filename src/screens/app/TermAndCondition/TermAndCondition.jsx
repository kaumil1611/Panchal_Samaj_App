import { ScrollView, View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { useAnimatedRef } from 'react-native-reanimated';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const TermAndCondition = () => {

    const scrollRef = useAnimatedRef();
    const { defaultLanguage } = useContext(GlobalContext);
    const [termsAndCondition, setTermsAndCondition] = useState("")
    const [imageOftermAndCondition, setImageOfTermAndCondition] = useState("")
    const { termsAndConditions, contactUsPageDetails } = useContext(ApiContext);

    useEffect(() => {
        (async function () {
            const termAndCondition = await termsAndConditions();
            setTermsAndCondition(termAndCondition)
        })();
    }, []);

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ["termAndCondition"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'termAndCondition':
                            setImageOfTermAndCondition(item.value);
                            break;
                        default:
                            break;
                    }
                }
            });
        })();
    }, []);

    return (
        <View className="h-full">
            <View>
                <Image
                    source={{ uri: `${process.env.IMAGE_URL}${imageOftermAndCondition}` }}
                    style={styles.image}
                />
            </View>
            <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {termsAndCondition && termsAndCondition.map((item, index) => {
                    return (
                        <View key={index + "terms"} className="px-4 py-2">
                            <View className={`mt-2 bg-white rounded-[15px] p-5 shadow-input mx-0.5 shadow-custom-elevation shadow-md ${Platform.OS == "android" ? "shadow-black" : "border border-gray-200"}`}>
                                <Text className="text-black text-xl font-bold mb-2">
                                    {defaultLanguage == "en" ? item.titleE : item.titleG}
                                </Text>
                                <Text className="text-md font-semibold text-justify">
                                    {defaultLanguage == "en" ? item.descriptionE : item.descriptionG}
                                </Text>
                            </View>
                        </View>
                    )

                })}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 165,
        objectFit: "cover"
    },
});

export default TermAndCondition