import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const circleContainerSize = 50;

const AnimatedCircle = ({ circleX }) => {
    const circleContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
        };
    }, []);

    return <Animated.View style={[circleContainerStyle, styles.container]} />;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -circleContainerSize / 2.3,
        width: circleContainerSize,
        borderRadius: circleContainerSize,
        height: circleContainerSize,
        backgroundColor: '#D94934',
        justifyContent: 'center',
        alignItems: 'center',
    },
});