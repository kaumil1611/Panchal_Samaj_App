import { Radio } from 'native-base';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getAllTemplates } from '../../../utils/BusinessUtils';

const SelectBusinessTemplate = ({ navigation }) => {
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const [value, setValue] = useState('');
    const animation = useMemo(() => new Animated.Value(0), []);
    const [templateListing, setTemplateListing] = useState([]);
    const [visible, setIsVisible] = useState(false);

    useEffect(() => {
        fetchAllBusinessTemplate();
    }, []);

    const fetchAllBusinessTemplate = () => {
        try {
            const allBusinessTemplate = getAllTemplates();
            setTemplateListing(allBusinessTemplate);
        } catch (error) {
            console.log("Error fetching all business template:", error);
        }
    };

    const handlePress = useCallback((templateId) => {
        setValue(templateId);
    }, []);

    const onPressIn = useCallback(() => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const onPressOut = useCallback(() => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }, [animation]);

    const renderItem = ({ item }) => {
        const animationForTemplate = new Animated.Value(0);
        const template_scale = animationForTemplate.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1]
        });

        const onPresstemplateIn = () => {
            Animated.spring(animationForTemplate, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        };

        const onPresstemplateOut = () => {
            Animated.spring(animationForTemplate, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        };

        const onPreviewTemplate = () => {
            navigation.navigate(item.name); // Navigate to the specific screen
        };

        return (
            <View style={{ width: '100%', marginTop: "10px" }}>
                <Pressable
                    onPress={() => handlePress(item.template_id)}
                    onPressIn={onPresstemplateIn}
                    onPressOut={onPresstemplateOut}
                    style={[
                        styles.planCard,
                        value === item.id && styles.selectedTemplate,
                        item === templateListing[0] && styles.recommendedTemplate
                    ]}
                >
                    <Radio.Group
                        name="subscriptionPlan"
                        value={value}
                        onChange={handlePress}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <View>
                                <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>
                                    {item.show_label}
                                </Text>
                                <Animated.View style={{ transform: [{ scale: template_scale }], justifyContent: 'center', paddingTop: 10, paddingBottom: 3 }}>
                                    <TouchableOpacity
                                        onPress={onPreviewTemplate}
                                    >
                                        <Text style={{ fontSize: 14, color: 'blue' }}>Preview Template</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                            <View>
                                <Radio value={item.template_id} my={1} />
                            </View>
                        </View>
                    </Radio.Group>
                </Pressable>
            </View>
        );
    };

    const scale = animation.interpolate({ inputRange, outputRange });

    const onMoveToAddBusinessForm = () => {
        navigation.navigate('AddBusinessDetailsScreen', { templateId: value });
    }

    return (
        <>
            <View className="bg-[#E9EDF7] h-full">

                <View className="bg-white rounded-lg m-2 p-3 mb-4">
                    <Text className="text-black text-xl font-bold">Choose Your Business Template</Text>
                </View>

                <FlatList
                    data={templateListing}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.template_id.toString()}
                    contentContainerStyle={styles.flatlistContainer}
                />

                <View className="absolute bottom-0 w-screen p-2 bg-white rounded">
                    <View className="flex flex-row justify-between items-center w-full">

                        <View className="w-full">
                            <Animated.View style={[{ transform: [{ scale }] }]} className="flex items-end">
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPressIn={onPressIn}
                                    onPressOut={onPressOut}
                                    onPress={onMoveToAddBusinessForm}
                                    disabled={templateListing.length === 0}
                                    style={[
                                        styles.subscribeButton,
                                        (templateListing.length === 0) && styles.disabledButton
                                    ]}
                                >
                                    <Text className="text-white text-lg font-bold">Next</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    flatlistContainer: {
        marginTop: 2,
        padding: 1,
    },
    subscribeButton: {
        backgroundColor: '#4E63AC',
        padding: 10,
        width: 180,
        borderRadius: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    planCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 15,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    selectedTemplate: {
        marginTop: 10,
        borderColor: 'blue',
        borderWidth: 2,
        transform: [{ scale: 1.05 }],
    },
    recommendedTemplate: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});

export default SelectBusinessTemplate;
