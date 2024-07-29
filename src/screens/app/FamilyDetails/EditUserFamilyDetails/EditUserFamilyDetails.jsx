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
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as yup from 'yup';
import Button from '../../../../components/Button';
import ApiContext from '../../../../context/ApiContext';
import { GlobalContext } from '../../../../context/globalState';
import toastMessage from '../../../../utils/toastMessage';

export default function EditUserFamilyDetails({ navigation, route }) {

    const { t } = useTranslation();
    const schema = yup.object().shape({
        firstname: yup.string().required(t('pleaseenterfirstname')),
        lastname: yup.string().required(t('pleaseenterlastname')),
        middlename: yup.string().required(t('pleaseentermiddlename')),
        education: yup.string().required(t('pleaseentereducation')),
        address: yup.string().required(t('pleaseenteraddress')),
        job: yup.string().required(t('pleaseenterjob')),
        relationship: yup.string().required(t('pleasechooserelation')),
        gender: yup.string().required(t('pleaseentergender')),
    });
    const { editFamilyDetailsUser, allRelationshipDataList, updateFamilyDetailsUser } = useContext(ApiContext);
    const [relationData, setRelationData] = useState([]);
    const { defaultLanguage } = useContext(GlobalContext);
    const { userId } = route.params;
    const [showPicker, setShowPicker] = useState(false);
    const [dob, setDob] = useState(null);
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstname: '',
            lastname: '',
            middlename: '',
            education: '',
            address: '',
            job: '',
            relationship: '',
            marital_status: '',
            gender: '',
            email: "",
            mobile_number: "",
        }
    });

    const onSubmit = async (data) => {
        const payload = {
            id: userId,
            data: data
        }
        setLoading(true)
        toastMessage(("User Update Successfully"), "Success");
        await updateFamilyDetailsUser(payload);
        setLoading(false)
        navigation.navigate('ViewFamilyDetails');
    };

    useEffect(() => {
        (async function () {
            const response = await editFamilyDetailsUser(userId);
            if (response) {
                setValue('firstname', response.firstname);
                setValue('lastname', response.lastname);
                setValue('middlename', response.middlename || '');
                setValue('education', response.education);
                setValue('address', response.address);
                setValue('job', response.job);
                setValue('relationship', response.relationship);
                setValue('marital_status', response.marital_status);
                setValue('gender', response.gender);
                setValue('mobile_number', response?.mobile_number ? response?.mobile_number?.toString() : "");
                setValue('email', response.email);
                if (response.dob) {
                    setDob(new Date(response.dob));
                    setValue('dob', response.dob);
                }
            }
        })();
    }, [userId, setValue]);

    useEffect(() => {
        (async function () {
            try {
                const allRelationData = await allRelationshipDataList();
                setRelationData(allRelationData || []);
            } catch (error) {
                console.error("Error fetching relation data:", error);
            }
        })();
    }, []);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toastMessage("Please fill all the required fields");
        }
    }, [errors]);

    return (
        <View className="bg-[#EFF6F9] w-full flex-1 px-3">
            <View className="w-full bg-white flex-1 p-3 rounded-md mt-3 mb-4">

                <Text className="font-extrabold tracking-wider mx-1 text-2xl text-rose-700">
                    {t('filldetails')}
                </Text>

                <View className="w-full mx-1 my-3 bg-neutral-700 h-[2px]"></View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                            <View>
                                <View>
                                    <View className="w-full mx-1 flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">{t('firstname')}:</Text>
                                        <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="firstname"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('firstname')}
                                                    className="p-3"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.firstname && <Text style={styles.error}>{errors.firstname.message}</Text>}
                                    </View>
                                </View>

                                <View>
                                    <View className="w-full mx-1 flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">{t('lastname')}:</Text>
                                        <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="lastname"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('lastname')}
                                                    className="p-3"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.lastname && <Text style={styles.error}>{errors.lastname.message}</Text>}
                                    </View>
                                </View>
                                <View className="my-1">
                                    <View className="w-full mx-1 flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('middlename')}:</Text>
                                        <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="middlename"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('middlename')}
                                                    className="py-3"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    defaultValue={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.middlename && <Text className="text-red-500 mb-[16px] mx-[4px]">{errors.middlename.message}</Text>}
                                    </View>
                                </View>

                                <View className="my-1">
                                    <View className="w-full">
                                        <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">{t('email')}:</Text>
                                    </View>
                                    <View className="w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('email')}
                                                    className="p-3"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                    </View>
                                </View>
                                <View className="w-full mt-1">
                                    <Text className="font-extrabold ml-1 text-base tracking-wider text-neutral-700">
                                        {t('mobile')}:
                                    </Text>
                                </View>
                                <View className="w-full mt-2">
                                    <Controller
                                        control={control}
                                        name="mobile_number"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                placeholder={t("PhoneNumber")}
                                                className="p-3"
                                                placeholderTextColor="grey"
                                                style={styles.input}
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={(text) => onChange(text)}
                                                keyboardType="numeric"
                                            />
                                        )}
                                    />
                                </View>

                                <View className="mt-1">
                                    <View className="w-full mx-1 flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">{t('gender')}:</Text>
                                        <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <View className="mx-1 mb-2">
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
                                                        <Radio value="male" my={1}>{t('male')}:</Radio>
                                                        <Radio value="female" my={1} ml={2}>{t('female')}:</Radio>
                                                        <Radio value="other" my={1} ml={2}>{t('other')}:</Radio>
                                                    </Radio.Group>
                                                )}
                                            />
                                        </View>
                                        {errors.gender && <Text style={styles.error}>{errors.gender.message}</Text>}
                                    </View>
                                </View>

                                <View className="w-full mt-1">
                                    <Text className="font-extrabold  text-base tracking-wider text-neutral-700">{t('dateofbirth')}:</Text>
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
                                                        placeholder="Select Date of Birth"
                                                        className="p-3"
                                                        placeholderTextColor="grey"
                                                        value={dateValue ? dateValue.toDateString() : ''}
                                                        onBlur={onBlur}
                                                        disableFullscreenUI={true}
                                                        editable={false}
                                                        onPress={() => setShowPicker(true)}
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
                                            onChange={(event, selectedDate) => {
                                                setShowPicker(false);
                                                if (selectedDate) {
                                                    setDob(selectedDate);
                                                    setValue('dob', selectedDate.toISOString());
                                                }
                                            }}
                                        />
                                    )}
                                    {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}
                                </View>

                                <View className="mt-1">
                                    <View className="w-full mx-1 flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">{t('education')}:</Text>
                                        <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="education"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('education')}
                                                    className="p-3"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.education && <Text style={styles.error}>{errors.education.message}</Text>}
                                    </View>
                                </View>

                                <View className="mt-1">
                                    <View className="w-full mx-1 flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">{t('job')}:</Text>
                                        <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="job"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('job')}
                                                    className="p-3"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.job && <Text style={styles.error}>{errors.job.message}</Text>}
                                    </View>
                                </View>

                                <View className="mt-1">
                                    <View className="w-full mx-1 flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">{t('address')}:</Text>
                                        <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                    </View>
                                    <View className=" w-full mt-2">
                                        <Controller
                                            control={control}
                                            name="address"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <TextInput
                                                    placeholder={t('address')}
                                                    className="p-3"
                                                    placeholderTextColor="grey"
                                                    style={styles.input}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={(text) => onChange(text)}
                                                />
                                            )}
                                        />
                                        {errors.address && <Text style={styles.error}>{errors.address.message}</Text>}
                                    </View>
                                </View>

                                <View className="mt-1">
                                    <View className="w-full mx-1 ">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">{t('maritalstatus')}:</Text>

                                    </View>
                                    <View className=" w-full mt-2">
                                        <View className="mx-1 mb-2 bg-[#eee]" style={styles.select}>
                                            <Controller
                                                control={control}
                                                name="marital_status"

                                                render={({ field: { onChange, value } }) => (
                                                    <Select
                                                        borderWidth={0}
                                                        placeholder={t('maritalstatus')}
                                                        selectedValue={value}
                                                        onValueChange={(itemValue) => onChange(itemValue)}
                                                        placeholderTextColor={'grey'}
                                                        fontSize={14}
                                                        _selectedItem={{
                                                            bg: "blue.300",
                                                            endIcon: <CheckIcon size="5" />,
                                                        }}
                                                    // style={styles.select}
                                                    >
                                                        <Select.Item label={t('married')} value="married" />
                                                        <Select.Item label={t('unmarried')} value="unmarried" />
                                                        <Select.Item label={t('widower')} value="widower" />
                                                        <Select.Item label={t('widow')} value="widow" />
                                                        <Select.Item label={t('divorcee')} value="divorcee" />
                                                    </Select>
                                                )}
                                            />
                                        </View>

                                    </View>
                                </View>

                                <View className=" w-full mt-1">
                                    <View className="w-full mx-1 flex flex-row gap-[0.5px]">
                                        <Text className="font-extrabold text-base tracking-wider text-neutral-700">{t('relationship')}:</Text>
                                        <Text style={{ color: 'red', fontSize: 17, height: 13 }}>*</Text>
                                    </View>
                                    <View className="mx-1 mt-2 mb-2 bg-[#eee]" style={styles.select}>
                                        <Controller
                                            control={control}
                                            name="relationship"
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    borderWidth={0}
                                                    placeholder={t('relationship')}
                                                    className="p-2 m-1"
                                                    selectedValue={value}
                                                    placeholderTextColor={'grey'}
                                                    fontSize={14}
                                                    onValueChange={(itemValue) => onChange(itemValue)}
                                                    _selectedItem={{
                                                        bg: "blue.300",
                                                        endIcon: <CheckIcon size="5" />,
                                                    }}

                                                >
                                                    {relationData.length > 0 ? (
                                                        relationData.map((relation) => (
                                                            <Select.Item key={relation.value} label={defaultLanguage && defaultLanguage == "en" ? relation.keyE : relation.keyG} value={relation.value} />
                                                        ))
                                                    ) : (
                                                        <Select.Item label="Loading..." value="" isDisabled />
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </View>
                                    {errors.relationship && <Text style={styles.error}>{errors.relationship.message}</Text>}
                                </View>

                                <View className="mt-3 mb-6">
                                    {loading ? (
                                        <View className="flex flex-row items-center justify-center bg-blue-500 cursor-pointer p-2 rounded-lg">
                                            <Text className="mr-4 text-lg font-semibold text-white ">{t("Loading")}</Text>
                                            <ActivityIndicator size="large" color="white" />
                                        </View>
                                    ) : (
                                        <Button className="bg-blue-500 py-3 rounded-lg" title={t('update')} disabled={loading} onPress={handleSubmit(onSubmit)} />
                                    )}
                                </View>

                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: '#eee',
        color: '#333',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 7,
        shadowColor: '#423f40',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0.2,
        marginHorizontal: 4,
        elevation: 4,
    },
    error: {
        color: 'red',
        marginBottom: 12,
        marginHorizontal: 4,
    },
    scrollViewContent: {
        flexGrow: 1,
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
});
