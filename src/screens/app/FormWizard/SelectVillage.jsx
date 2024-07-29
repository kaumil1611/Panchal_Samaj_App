import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useWizard } from "../../../context/WizardProvider";

export default function SelectVillage({ navigation }) {

    const { wizardState, updateWizardState } = useWizard();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: wizardState });
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            updateWizardState({ progress: 0 });
        }
    }, [isFocused]);

    const onSubmit = (data) => {
        updateWizardState({ ...data, progress: 33 });
        navigation.navigate("Step2");
    };

    return (
        <View style={styles.container}>
            <ProgressBar
                style={styles.progressBar}
                progress={wizardState.progress / 100}
                color={MD3Colors.primary60}
            />
            <View style={{ paddingHorizontal: 16 }}>
                <View style={styles.formEntry}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode="outlined"
                                label="Full Name"
                                placeholder="Enter Full Name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="fullName"
                    />
                    {errors.fullName && (
                        <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                            This is a required field.
                        </Text>
                    )}
                </View>

                <View style={styles.formEntry}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                mode="outlined"
                                label="Age"
                                placeholder="Enter Age"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="numeric"
                            />
                        )}
                        name="age"
                    />
                    {errors.age && (
                        <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                            This is a required field.
                        </Text>
                    )}
                </View>

                <Button
                    onPress={handleSubmit(onSubmit)}
                    mode="outlined"
                // className="m-2"
                >
                    GOTO STEP TWO
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formEntry: {
        margin: 8,
    },
    container: {
        flex: 1,
    },
    progressBar: {
        marginBottom: 16,
        paddingHorizontal: 0,
    },
});
