import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import * as yup from 'yup';
import Button from '../../../components/Button';
import ApiContext from '../../../context/ApiContext';

function EmailSupport({ navigation }) {

    const { t } = useTranslation();
    const schema = yup.object().shape({
        subject: yup.string().required(t("Subjectisrequired")),
        message: yup.string().required(t("Messageisrequired")),
        email: yup.string().email(t("Invalidemailformat")).required(t("Emailisrequired")),
    });
    const { supportMailSend, contactUsPageDetails } = useContext(ApiContext);
    const [emailSupportImage, setEmailSupportImage] = useState("");
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await supportMailSend(data);
            navigation.navigate('Support');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ["emailSupport"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'emailSupport':
                            setEmailSupportImage(item.value);
                            break;
                        default:
                            break;
                    }
                }
            });
        })();
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View className="flex-1 w-full bg-white space-y-5 p-3" edges={['top']}>
                        <View className="w-full flex-1 h-full bg-[#F7F7FA] rounded-[10px] overflow-hidden">

                            <View className="w-full h-36 bg-[#E9EDF7] flex flex-row ">
                                <View className="basis-[35%] flex flex-row justify-center items-center">
                                    <Image className="w-[80px] h-[80px] object-cover" source={{ uri: `${process.env.IMAGE_URL}${emailSupportImage}` }} />
                                </View>
                                <View className="basis-[65%] flex flex-row justify-center items-center">
                                    <Text className="font-extrabold tracking-wider text-2xl text-rose-700 ">
                                        {t('gettouchmail')}
                                    </Text>
                                </View>
                            </View>

                            <View className="w-full mt-6 mb-3 flex flex-row justify-center">
                                <View className="w-[90%]">
                                    <Text className="font-extrabold tracking-wider mb-3 text-2xl text-neutral-700 text-center">{t('sendemail')}</Text>
                                    <Text className="tracking-wider text-lg text-neutral-700 text-center">{t('facinganissue')}</Text>
                                </View>
                            </View>

                            <View className="w-full p-3">

                                <View className="my-1">
                                    <View className="flex flex-row w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('email')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>

                                    <View className="w-full">
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 shadow-custom-elevation shadow-md ${Platform.OS == "android" ? "shadow-black" : "border border-gray-200"} `}
                                                    placeholder={t('pleaseenteremail')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                />
                                            )}
                                        />
                                        {errors.email &&
                                            <Text className="text-red-500 mb-[10px]">
                                                {errors.email.message}
                                            </Text>
                                        }
                                    </View>

                                </View>

                                <View className="w-full flex flex-row">
                                    <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('subject')}:</Text>
                                    <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                </View>

                                <View>
                                    <Controller
                                        control={control}
                                        name="subject"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 shadow-custom-elevation shadow-md ${Platform.OS == "android" ? "shadow-black" : "border border-gray-200"} `}
                                                placeholder={t('pleaseentersubject')}
                                                placeholderTextColor="grey"
                                                style={styles.input}
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                    {errors.subject &&
                                        <Text className="text-red-500 mb-[10px]">
                                            {errors.subject.message}
                                        </Text>
                                    }
                                </View>

                                <View className="w-full flex flex-row">
                                    <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('message')}:</Text>
                                    <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                </View>

                                <View>
                                    <Controller
                                        control={control}
                                        name="message"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 shadow-custom-elevation shadow-md ${Platform.OS == "android" ? "shadow-black" : "border border-gray-200"} `}
                                                placeholder={t('pleaseentermessage')}
                                                placeholderTextColor="grey"
                                                multiline
                                                style={styles.input}
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                            />
                                        )}
                                    />
                                    {errors.message &&
                                        <Text className="text-red-500">
                                            {errors.message.message}
                                        </Text>
                                    }
                                </View>
                            </View>

                            <View className="w-full p-3">
                                <Button className="bg-blue-500 py-3 rounded-lg" title="Send Email" onPress={handleSubmit(onSubmit)} />
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputError: {
        borderColor: 'red',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        color: '#333',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
    },
});

export default EmailSupport;