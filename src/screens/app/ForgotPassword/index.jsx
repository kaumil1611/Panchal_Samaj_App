import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as yup from "yup";
import Button from "../../../components/Button";
import ApiContext from "../../../context/ApiContext";
import { useFabVisibility } from "../../../hooks/useFabVisibility";

const ForgotPassword = ({ navigation }) => {

    const { t } = useTranslation();
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [emailForgotPassword, setEmailForgotPassword] = useState("");
    const [isCurrentPasswordHidden, setCurrentPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
    const {
        sendOTPForgotPassword,
        checkOtpForForgotPassword,
        forgotPasswordApi,
    } = useContext(ApiContext);

    const emailSchema = yup.object().shape({
        EnterEmail: yup
            .string()
            .required(t("EmailIsRequired"))
            .email(t("Invalidemailaddress")),
    });

    const otpSchema = yup.object().shape({
        otp: yup.string().required(t("OTPisrequired")),
    });

    const passwordSchema = yup.object().shape({
        newPassword: yup
            .string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
        confirmPassword: yup
            .string()
            .required('Confirm password is required')
            .oneOf([yup.ref('newPassword')], 'Passwords must match'),
    });

    const {
        control: emailControl,
        handleSubmit: handleEmailSubmit,
        formState: { errors: emailErrors },
        reset: resetEmailForm,
    } = useForm({
        resolver: yupResolver(emailSchema),
        defaultValues: { EnterEmail: "" },
    });

    const {
        control: otpControl,
        handleSubmit: handleOtpSubmit,
        formState: { errors: otpErrors, isValid: isOtpValid },
        reset: resetOtpForm,
    } = useForm({
        resolver: yupResolver(otpSchema),
        mode: "onChange",
        defaultValues: { otp: "" },
    });

    const {
        control: passwordControl,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset: resetPasswordForm,
    } = useForm({
        resolver: yupResolver(passwordSchema),
        defaultValues: { newPassword: "", confirmPassword: "" },
    });

    const onEmailSubmit = async (data) => {
        try {
            const payload = { email: data.EnterEmail.toLowerCase() };
            setEmailForgotPassword(data.EnterEmail);
            setLoading(true);
            await sendOTPForgotPassword(payload);
            setEmailSent(true);
            setLoading(false);
            resetEmailForm();
        } catch (error) {
            setLoading(false);
            console.error("Error sending OTP", error);
        }
    };

    const onOtpSubmit = async (data) => {
        try {
            const payload = { email: emailForgotPassword, otp: data.otp };
            setLoading(true);
            const response = await checkOtpForForgotPassword(payload);
            if (response.status) {
                setUserId(response.user_id);
                setOtpVerified(true);
            } else {
                setOtpVerified(false);
                console.error("Invalid OTP", response.message);
            }
            setLoading(false);
            resetOtpForm();
        } catch (error) {
            setLoading(false);
            console.error("Error verifying OTP", error);
        }
    };

    const onPasswordSubmit = async (data) => {
        try {
            const payload = {
                userId: userId,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            };
            setLoading(true);
            const response = await forgotPasswordApi(payload);
            if (response.status) {
                navigation.navigate("Login");
                resetPasswordForm();
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error changing password", error);
        }
    };

    const onPressCurrentPassword = () => {
        setCurrentPasswordHidden(!isCurrentPasswordHidden);
    };

    const onPressConfirmPassword = () => {
        setConfirmPasswordHidden(!isConfirmPasswordHidden);
    };
    const [showFab, processScrollEvent] = useFabVisibility();

    return (

        <View className="flex-1 h-full bg-[#E9EDF7] relative">
            <View className=" h-[90%] mt-24 rounded-t-[30px] bg-white">
                <View className="w-full absolute top-[-60px] z-10 h-28 flex-row justify-center">
                    <View className="w-72 rounded-xl bg-[#4e63ac] h-full flex-row justify-center items-center">
                        <Text className="text-white text-xl tracking-wider font-extrabold">{t('changePassword')}</Text>
                    </View>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <View className=" h-full  pt-10 ">
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View className="h-full justify-between flex ">
                                <View className=" h-[90%]">
                                    {!emailSent && (
                                        <View className="my-9 relative flex-1 h-full px-8">
                                            <View className="w-full flex flex-row gap-1">
                                                <Text className="font-bold text-base text-neutral-700 ">
                                                    {t("PleaseEnterEmail")}
                                                </Text>
                                                <Text
                                                    style={{ color: "red", fontSize: 17, height: 13 }}
                                                >
                                                    *
                                                </Text>
                                            </View>
                                            <View
                                                className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 ${Platform.OS == "android" ? "shadow-black shadow-custom-elevation" : "border border-gray-200 shadow"}`}
                                            >
                                                <Controller
                                                    control={emailControl}
                                                    name="EnterEmail"
                                                    render={({
                                                        field: { onChange, onBlur, value },
                                                    }) => (
                                                        <TextInput
                                                            placeholder={t("PleaseEnterEmail")}
                                                            onBlur={onBlur}
                                                            placeholderTextColor="grey"
                                                            onChangeText={onChange}
                                                            value={value}
                                                            className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px] lowercase`}
                                                        />
                                                    )}
                                                />
                                            </View>
                                            {emailErrors.EnterEmail && (
                                                <Text className="text-red-500 mt-0">
                                                    {emailErrors.EnterEmail.message}
                                                </Text>
                                            )}
                                        </View>
                                    )}

                                    {emailSent && !otpVerified && (
                                        <ScrollView
                                            contentContainerStyle={{ flexGrow: 1 }}
                                            showsVerticalScrollIndicator={false}
                                        >
                                            <View className="my-9 relative flex-1 px-8">
                                                <View className="w-full flex flex-row gap-1">
                                                    <Text className="font-bold text-base text-neutral-700">
                                                        OTP
                                                    </Text>
                                                    <Text
                                                        style={{ color: "red", fontSize: 17, height: 13 }}
                                                    >
                                                        *
                                                    </Text>
                                                </View>
                                                <View
                                                    className={`w-full my-2 px-4 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 ${Platform.OS == "android" ? "shadow-black shadow-custom-elevation" : "border border-gray-200 shadow"}`}
                                                >
                                                    <Controller
                                                        control={otpControl}
                                                        name="otp"
                                                        render={({
                                                            field: { onChange, onBlur, value },
                                                        }) => (
                                                            <TextInput
                                                                placeholder={t("EnterOTP")}
                                                                onBlur={onBlur}
                                                                placeholderTextColor="grey"
                                                                onChangeText={onChange}
                                                                value={value}
                                                                className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px]`}
                                                                keyboardType="numeric"
                                                            />
                                                        )}
                                                    />
                                                </View>
                                                {otpErrors.otp && (
                                                    <Text className="text-red-500 mt-0">
                                                        {otpErrors.otp.message}
                                                    </Text>
                                                )}
                                            </View>
                                        </ScrollView>
                                    )}

                                    {otpVerified && (
                                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                            <ScrollView
                                                contentContainerStyle={{ height: "100%" }}
                                                onScroll={processScrollEvent}
                                                showsHorizontalScrollIndicator={false}
                                                showsVerticalScrollIndicator={false}

                                            >
                                                <View className="my-5 pb-[50%]  h-[90%]">
                                                    <View className=" relative  px-8">
                                                        <View className="w-full flex flex-row gap-1">
                                                            <Text className="font-bold text-base text-neutral-700">
                                                                New Password
                                                            </Text>
                                                            <Text
                                                                style={{ color: "red", fontSize: 17, height: 13 }}
                                                            >
                                                                *
                                                            </Text>
                                                        </View>
                                                        <View
                                                            className={`w-full my-1 px-4 h-12 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 ${Platform.OS == "android" ? "shadow-black shadow-custom-elevation" : "border border-gray-200 shadow "}`}
                                                        >
                                                            <Controller
                                                                control={passwordControl}
                                                                name="newPassword"
                                                                render={({
                                                                    field: { onChange, onBlur, value },
                                                                }) => (
                                                                    <TextInput

                                                                        placeholder={"New Password"}
                                                                        onBlur={onBlur}
                                                                        placeholderTextColor="grey"
                                                                        onChangeText={onChange}
                                                                        value={value}
                                                                        secureTextEntry={isCurrentPasswordHidden}
                                                                        className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px]`}
                                                                    />
                                                                )}
                                                            />
                                                            <Pressable
                                                                onPress={onPressCurrentPassword}
                                                                className="h-full justify-center"
                                                            >
                                                                <Feather
                                                                    name={isCurrentPasswordHidden ? "eye-off" : "eye"}
                                                                    size={20}
                                                                    color="#B7B7B7"
                                                                />
                                                            </Pressable>
                                                        </View>
                                                        {passwordErrors.newPassword && (
                                                            <Text className="text-red-500 mt-0">
                                                                {passwordErrors.newPassword.message}
                                                            </Text>
                                                        )}
                                                    </View>
                                                    <View className="relative flex px-8 mt-3">
                                                        <View className="w-full flex flex-row gap-1">
                                                            <Text className="font-bold text-base text-neutral-700">
                                                                Confirm Password
                                                            </Text>
                                                            <Text
                                                                style={{ color: "red", fontSize: 17, height: 13 }}
                                                            >
                                                                *
                                                            </Text>
                                                        </View>
                                                        <View
                                                            className={`w-full my-2 px-4 h-12 flex-row justify-between bg-[#F3F5F7] rounded-[15px] items-center shadow-input mx-0.5 ${Platform.OS == "android" ? "shadow-black shadow-custom-elevation" : "border border-gray-200 shadow"}`}
                                                        >
                                                            <Controller
                                                                control={passwordControl}
                                                                name="confirmPassword"
                                                                render={({
                                                                    field: { onChange, onBlur, value },
                                                                }) => (
                                                                    <TextInput
                                                                        placeholder={"Confirm Password"}
                                                                        onBlur={onBlur}
                                                                        placeholderTextColor="grey"
                                                                        onChangeText={onChange}
                                                                        value={value}
                                                                        secureTextEntry={isConfirmPasswordHidden}
                                                                        className={`basis-[85%] text-black ${Platform.OS == "ios" ? "p-3" : ""} pl-[10px]`}
                                                                    />
                                                                )}
                                                            />
                                                            <Pressable
                                                                onPress={onPressConfirmPassword}
                                                                className="h-full justify-center"
                                                            >
                                                                <Feather
                                                                    name={isConfirmPasswordHidden ? "eye-off" : "eye"}
                                                                    size={20}
                                                                    color="#B7B7B7"
                                                                />
                                                            </Pressable>
                                                        </View>
                                                        {passwordErrors.confirmPassword && (
                                                            <Text className="text-red-500 mt-0">
                                                                {passwordErrors.confirmPassword.message}
                                                            </Text>
                                                        )}
                                                    </View>
                                                </View>
                                            </ScrollView>
                                        </TouchableWithoutFeedback>
                                    )}

                                    <View className="w-full px-8">
                                        {loading ? (
                                            <View className="flex flex-row items-center justify-center  w-full bg-[#4e63ac] py-4 rounded-lg">
                                                <Text className="mr-4 text-lg text-white">
                                                    {t("Loading")}
                                                </Text>
                                                <ActivityIndicator size="small" color="white" />
                                            </View>
                                        ) : (
                                            <View className=" w-full">
                                                {!emailSent ? (
                                                    <Button
                                                        className="bg-[#4e63ac] py-4 rounded-lg"
                                                        title={t("Submit")}
                                                        onPress={handleEmailSubmit(onEmailSubmit)}
                                                    />
                                                ) : !otpVerified ? (
                                                    <Button
                                                        className={`bg-[#4e63ac] py-4 rounded-lg ${!isOtpValid ? "opacity-50" : ""}`}
                                                        title={t("Verify OTP")}
                                                        onPress={handleOtpSubmit(onOtpSubmit)}
                                                        disabled={!isOtpValid}
                                                    />
                                                ) : (
                                                    <Button
                                                        className="bg-[#4e63ac] py-4 rounded-lg"
                                                        title={t("Change Password")}
                                                        onPress={handlePasswordSubmit(onPasswordSubmit)}
                                                    />
                                                )}
                                            </View>
                                        )}
                                    </View>
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    error: {
        color: 'red',
        marginTop: 0,

    },
});

export default ForgotPassword;
