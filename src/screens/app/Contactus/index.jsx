import { ScrollView } from 'native-base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ContactUsCard from '../../../components/ContactUsCard';

function ContactUs({ navigation }) {

    const { t } = useTranslation();
    const [highlight, setHighlight] = useState(false);
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const scale = animation.interpolate({ inputRange, outputRange });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlight(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View className="flex-1 bg-[#E9EDF7] space-y-5 w-full">
            <View className="bg-white p-3">
                <View className="flex flex-row justify-between items-center">
                    <Text className="text-2xl tracking-wider text-neutral-700 font-extrabold">
                        {t('contactUs')}
                    </Text>
                    <Animated.View style={[{ transform: [{ scale }] }]}>
                        <Pressable
                            className="mr-4"
                            activeOpacity={1}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            onPress={() => navigation.navigate("Support")}
                        >
                            <View className={`p-[3px] rounded-full ${highlight ? 'bg-red-400' : 'bg-black'}`} >
                                <View className={`rounded-full flex-row justify-center items-center ${highlight ? 'bg-blue-200' : 'bg-[#E9EDF7]'}`} >
                                    <View className="m-3">
                                        <Image className="w-[40px] h-[40px]" source={require('../../../assets/support.png')} />
                                    </View>
                                </View>
                            </View>
                            <Text className="text-sm text-blue-500 text-center font-medium tracking-widest">{t("Support")}</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} >
                <View className="bg-white p-2 mr-2 rounded-lg mx-4 flex-1 justify-around" style={styles.shadowOfCard}>
                    <Text className="tracking-wider text-neutral-700 text-justify">{t('contactusheading')}</Text>
                </View>
                <ContactUsCard />
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    shadowOfCard: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
});

export default ContactUs;