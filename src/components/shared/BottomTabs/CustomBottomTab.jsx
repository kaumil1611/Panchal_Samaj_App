import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import Animated, {
    withTiming
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { GlobalContext } from '../../../context/globalState';
import TabItem from './TabItem';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const CustomBottomTab = ({
    state,
    descriptors,
    navigation,
}) => {
    const { progress, tHeight, animatedProps, setIsAuthScreenActive, isAuthScreenActive } = useContext(GlobalContext);
    const navigationRef = useNavigation();
    const [windowHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const unsubscribe = navigationRef.addListener('state', () => {
            const isAuthActive = state.routes[state.index]?.name === 'Auth';
            setIsAuthScreenActive(isAuthActive);
        });
        return unsubscribe;
    }, [navigationRef, state.routes]);

    const selectIcon = (routeName) => {
        switch (routeName) {
            case 'Home':
                return 'home';
            case 'Member':
                return 'users';
            case 'Auth':
                return 'log-in';
            case 'Profile':
                return 'user';
            case 'Contactus':
                return 'phone';
            case 'News':
                return 'book-open';
            default:
                return 'home';
        }
    };

    const handleTabPress = (index, tab) => {
        navigation.navigate(tab);
        progress.value = withTiming(index);
    };

    if (isAuthScreenActive) {
        return null;
    }

    return (
        <>
            <View style={styles.tabBarContainer}>
                <Svg width={SCREEN_WIDTH} height={Platform.OS == "ios" ? windowHeight > 668 ? tHeight / 1.5 : tHeight : tHeight} style={styles.shadowMd}>
                    <AnimatedPath fill={'#E5E5E5'} animatedProps={animatedProps} />
                </Svg>
                <View
                    style={[
                        styles.tabItemsContainer,
                        {
                            height: tHeight,
                        },
                    ]}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label = options.tabBarLabel ? options.tabBarLabel : route.name;
                        return (
                            <TabItem
                                key={index.toString()}
                                label={label}
                                icon={selectIcon(route.name)}
                                activeIndex={state.index + 1}
                                index={index}
                                onTabPress={() => handleTabPress(index + 1, route.name)}
                            />
                        );
                    })}
                </View>
            </View>
        </>
    );
};
export default CustomBottomTab;
const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
    },
    tabItemsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
    },
    shadowMd: {
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 3 },
    },
});