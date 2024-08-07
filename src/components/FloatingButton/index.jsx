import React, { useContext } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../../context/globalState';
import SettingBottomSheet from '../../screens/app/Settings';

const ChangeLanguage = () => {
    const { setScreenpercentage, openBottomSheet } = useContext(GlobalContext);
    const openSettings = () => {
        setScreenpercentage({ first: "30%", second: "34%" });
        openBottomSheet(<SettingBottomSheet />);
    };
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.9];
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
    return (
        <Animated.View style={[{ transform: [{ scale }] }]}>
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={styles.button}
                onPress={() => openSettings()}
            >
                <View className="h-10 w-10">
                    <Image className="h-10 w-full object-cover scale-[1.7]" source={require('../../assets/setting.jpg')} ></Image>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 80,
        right: 10,
        zIndex: 0,
        overflow: 'hidden',
    },
});

export default ChangeLanguage;