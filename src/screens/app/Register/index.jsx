import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckIcon, Radio, Select } from "native-base";
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
} from 'react-native';
import * as yup from 'yup';
import Button from "../../../components/Button";
import ApiContext from "../../../context/ApiContext";
import { GlobalContext } from "../../../context/globalState";
import toastMessage from '../../../utils/toastMessage';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = ({ navigation }) => {
    const { t } = useTranslation();
    const schema = yup.object().shape({
        firstname: yup.string().required('First Name is required'),
        lastname: yup.string().required('Last Name is required'),
        middlename: yup.string().required('Middle Name is required'),
        email: yup.string()
            .matches(emailRegex, 'Invalid email address')
            .transform(value => (value ? value.toLowerCase() : ''))
            .required('Email is required'),
        password: yup.string().required('Password is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
        mobile_number: yup.string().required('Phone Number is required').matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits'),
        address: yup.string().required('Address is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
        education: yup.string().required('Education is required'),
        job: yup.string().required('Job is required'),
        gender: yup.string().required('Gender is required'),
    });

    const { state, getLocation, numberCheckForRegisterUser } = useContext(ApiContext);
    const { setRegisterData, pushNotificationToken } = useContext(GlobalContext);
    const [locations, setLocations] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            gender: '',
        }
    });

    const dob = watch('dob') || new Date();

    useEffect(() => {
        getLocation()
    }, []);

    useEffect(() => {
        try {
            setOptions(state.locationData, "state.locationData ")
        } catch (error) {
            console.log("Error", error)
        }
    }, [state.locationData])

    const getSelectedvalue = (locations) => {
        setLocations(locations);
        setValue('locations_id', locations);
    }

    const onSubmit = async (data) => {
        const emailForCheck = data.email;
        const numberForCheck = data.mobile_number;
        const payloadForChecking = {
            email: emailForCheck,
            mobile_number: numberForCheck,
            device_token: pushNotificationToken,
        };
        setLoading(true);
        const responseOfCheckNumber = await numberCheckForRegisterUser(payloadForChecking);
        setLoading(false);
        setEmailError(responseOfCheckNumber.emailError);
        setMobileError(responseOfCheckNumber.mobileError);
        if (responseOfCheckNumber.emailError || responseOfCheckNumber.mobileError) {
            return;
        }
        setLoading(true);
        await setRegisterData(data);
        setLoading(false);
        navigation.navigate('Payment');

        // Clear the form after successful submission
        reset({
            firstname: '',
            lastname: '',
            middlename: '',
            email: '',
            password: '',
            mobile_number: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            education: '',
            job: '',
            gender: '',
            dob: new Date(),
            marital_status: '',
        });
        setLocations('');
    };

    const onDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setShowPicker(false);
            const currentDate = new Date(selectedDate);
            setValue('dob', currentDate);
        }
    };
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toastMessage("Please fill all the required fields");
        }
    }, [errors]);

    return (
        <View className="bg-[#EFF6F9] w-full flex-1 px-3">
            <View className="w-full my-4 p-1 mt-2">
                <View className="w-full">
                    <Text className="font-extrabold text-lg tracking-wider text-neutral-700">{t('selectyourvillage')}:</Text>
                </View>
                <View className="bg-white w-full mt-2 rounded-md shadow-input mx-0.5 shadow-custom-elevation shadow-md ${Platform.OS == 'android' ? 'shadow-black' : 'border border-gray-200'}">
                    <Select
                        borderWidth={0}
                        accessibilityLabel={t('selectyourvillage')}
                        placeholder={t('selectyourvillage')}
                        size={'lg'}
                        _selectedItem={{
                            bg: "blue.300",
                            endIcon: <CheckIcon size="5" />,
                        }}
                        selectedValue={locations}
                        onValueChange={(value) => {
                            getSelectedvalue(value || "")
                        }}
                        boxSize={3}
                    >
                        {options?.village?.map((value, index) => (
                            <Select.Item
                                key={`value-key-${index}`}
                                label={value.villageE}
                                value={value._id}
                            />
                        ))}
                    </Select>
                </View>
            </View>
            {locations !== "" ? (
                <View className="w-full bg-white flex-1 rounded-md p-3">
                    <Text className="font-extrabold tracking-wider ml-1 text-2xl text-rose-700">
                        {t("filldetails")}
                    </Text>
                    <View className="w-full ml-1 my-2 bg-neutral-700 h-[2px]"></View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                                <View className="my-1">
                                    <View className="w-full ml-1 flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold  text-base tracking-wider text-neutral-700">{t('firstname')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="firstname"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('firstname')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.firstname && <Text className="text-red-500 mx-1">{errors.firstname.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('lastname')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="lastname"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('lastname')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.lastname && <Text className="text-red-500 mx-1">{errors.lastname.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('middlename')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="middlename"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('middlename')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.middlename && <Text className="text-red-500 mx-1">{errors.middlename.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('email')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className="w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('email')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.email && <Text className="text-red-500 mx-1">{errors.email.message}</Text>}
                                        {emailError && <Text className="text-red-500 mx-1">{emailError}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('password')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="password"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('password')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                    secureTextEntry
                                                />
                                            )}
                                        />
                                        {errors.password && <Text className="text-red-500 mx-1">{errors.password.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('dateofbirth')}:</Text>
                                    <Pressable onPress={() => setShowPicker(true)} className="w-full mt-2">
                                        <Controller
                                            control={control}
                                            render={({ field: { onChange, onBlur, value } }) => {
                                                let dateValue;
                                                if (value instanceof Date) {
                                                    dateValue = value;
                                                } else if (typeof value === 'string' || value instanceof String) {
                                                    dateValue = new Date(value);
                                                } else {
                                                    dateValue = new Date();
                                                }

                                                return (
                                                    <TextInput
                                                        style={[
                                                            styles.input,
                                                            { color: dateValue ? 'black' : 'grey' },
                                                        ]}
                                                        placeholder={t('dateofbirth')}
                                                        placeholderTextColor="grey"
                                                        value={dateValue ? dateValue.toDateString() : ''}
                                                        onPress={() => setShowPicker(true)}
                                                        onBlur={onBlur}
                                                        disableFullscreenUI={true}
                                                        editable={false}
                                                    />
                                                );
                                            }}
                                            name="dob"
                                        />
                                    </Pressable>
                                    {showPicker && (
                                        <DateTimePicker
                                            value={dob ? new Date(dob) : new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={onDateChange}
                                        />
                                    )}
                                    {errors.dob && <Text className="text-red-500 mx-1">{errors.dob.message}</Text>}
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('mobile')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className="w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="mobile_number"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('mobile')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                    keyboardType="numeric"
                                                />
                                            )}
                                        />
                                        {errors.mobile_number && <Text className="text-red-500 mx-1">{errors.mobile_number.message}</Text>}
                                        {mobileError && <Text className="text-red-500 mx-1">{mobileError}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('address')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="address"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('address')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.address && <Text className="text-red-500 mx-1">{errors.address.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('city')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="city"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('city')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.city && <Text className="text-red-500 mx-1">{errors.city.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('state')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="state"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('state')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.state && <Text className="text-red-500 mx-1">{errors.state.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('pincode')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="pincode"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('pincode')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                    keyboardType="numeric"
                                                />
                                            )}
                                        />
                                        {errors.pincode && <Text className="text-red-500 mx-1">{errors.pincode.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('education')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="education"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('education')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.education && <Text className="text-red-500 mx-1">{errors.education.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('job')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="job"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('job')}
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.job && <Text className="text-red-500 mx-1">{errors.job.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('maritalstatus')}:</Text>
                                    </View>
                                    <View className="w-full mt-2">
                                        <View className="mx-1" style={styles.select}>
                                            <Controller
                                                control={control}
                                                name="marital_status"
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Select
                                                        borderWidth={0}
                                                        placeholder={t('selectmaritalstatus')}
                                                        selectedValue={value}
                                                        onValueChange={(itemValue) => onChange(itemValue)}
                                                        _selectedItem={{
                                                            bg: "blue.300",
                                                            endIcon: <CheckIcon size="5" />,
                                                        }}
                                                    >
                                                        <Select.Item label={t('married')} value="married" />
                                                        <Select.Item label={t('unmarried')} value="unmarried" />
                                                        <Select.Item label={t('widower')} value="Widower" />
                                                        <Select.Item label={t('widow')} value="Widow" />
                                                        <Select.Item label={t('divorcee')} value="divorcee" />
                                                    </Select>
                                                )}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('gender')}:</Text>
                                        <Text className="text-red-600 text-[17px] ml-1">*</Text>
                                    </View>
                                    <View className="w-full mt-2">
                                        <View className="mb-[10px] ml-1">
                                            <Controller
                                                control={control}
                                                name="gender"
                                                render={({ field: { onChange, value } }) => (
                                                    <Radio.Group
                                                        name="genderGroup"
                                                        value={value}
                                                        className="flex flex-row"
                                                        onChange={(nextValue) => onChange(nextValue)}
                                                    >
                                                        <Radio value="male" >{t('male')}</Radio>
                                                        <Radio value="female" ml={2}>{t('female')}</Radio>
                                                        <Radio value="other" ml={2}>{t('other')}</Radio>
                                                    </Radio.Group>
                                                )}
                                            />
                                        </View>
                                        {errors.gender && <Text className="text-red-500 mx-1">{errors.gender.message}</Text>}
                                    </View>
                                </View>

                                <View className="mt-3 mb-6">
                                    {loading ? (
                                        <View className="flex flex-row items-center justify-center bg-blue-500 cursor-pointer p-2 rounded-lg">
                                            <Text className="mr-4 text-lg font-semibold text-white ">{t("Loading")}</Text>
                                            <ActivityIndicator size="large" color="white" />
                                        </View>
                                    ) : (
                                        <Button className="bg-blue-500 py-3 rounded-lg" title={t('register')} disabled={loading} onPress={handleSubmit(onSubmit)} />
                                    )}
                                </View>

                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            ) : null
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: '#eee',
        color: '#333',
        borderRadius: 10,
        paddingVertical: 10,
        paddingLeft: 10,
        marginBottom: 10,
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0.2,
        marginHorizontal: 4,
        elevation: 4,
    },
    select: {
        backgroundColor: '#eee',
        color: '#333',
        borderRadius: 10,
        paddingVertical: 8,
        paddingLeft: 10,
        marginBottom: 10,
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0.2,
        marginHorizontal: 4,
        elevation: 4,
    },
    inputError: {
        borderColor: 'red',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export default Register;