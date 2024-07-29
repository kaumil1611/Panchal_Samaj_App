import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, useColorScheme } from 'react-native';
import ApiContext from '../../context/ApiContext';

const NoDataFound = ({ message }) => {

    const colorScheme = useColorScheme();
    const [noDataFound, setNoDataFound] = useState("");
    const { contactUsPageDetails } = useContext(ApiContext);

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ["nodatafound"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'nodatafound':
                            setNoDataFound(item.value);
                            break;
                        default:
                            break;
                    }
                }
            });
        })();
    }, []);

    return (
        <View className="w-screen h-full flex items-center">
            <View className="w-full h-[300px] flex items-center px-10 py-7">
                <Image className="w-full h-full object-cover rounded-lg" source={{ uri: `${process.env.IMAGE_URL}${noDataFound}` }} />
            </View>
            <View className="px-10">
                <Text className="text-black text-2xl dark:text-white font-semibold" style={{ color: colorScheme === 'dark' ? '#ffffff' : '#000000' }}>
                    {message}
                </Text>
            </View>
        </View>
    )
}

export default NoDataFound