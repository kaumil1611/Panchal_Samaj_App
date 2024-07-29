import React, { useRef, useState } from 'react';
import {
    Animated,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';

const FlipImage = ({ route }) => {

    const [flipped, setFlipped] = useState(false);
    const flipAnim = useRef(new Animated.Value(0)).current;
    const frontImage = route.params.images.front
    const backImage = route.params.images.back
    const flipToValue = flipped ? 0 : 1;

    const handleFlip = () => {
        Animated.timing(flipAnim, {
            toValue: flipToValue,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            setFlipped(!flipped);
        });
    };

    const interpolateFrontImage = flipAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const interpolateBackImage = flipAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    const frontAnimatedStyle = {
        transform: [{ rotateY: interpolateFrontImage }],
    };

    const backAnimatedStyle = {
        transform: [{ rotateY: interpolateBackImage }],
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleFlip}>
                <View>
                    <Animated.View style={[styles.image, frontAnimatedStyle, flipped ? styles.hidden : styles.visible]}>
                        <Image source={{ uri: `${process.env.IMAGE_URL}${frontImage}?${new Date().getMinutes()}` }} style={styles.image} />
                    </Animated.View>
                    <Animated.View style={[styles.image, backAnimatedStyle, flipped ? styles.visible : styles.hidden]}>
                        <Image source={{ uri: `${process.env.IMAGE_URL}${backImage}?${new Date().getMinutes()}` }} style={styles.image} />
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 650,
        backfaceVisibility: 'hidden',
    },
    hidden: {
        position: 'absolute',
        top: 0,
    },
    visible: {
        position: 'relative',
    },
});

export default FlipImage;