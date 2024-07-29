import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const Button = ({ title, onPress, style, styleTitle, ...otherProps }) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={[styles.container, style]} {...otherProps}>
            <Text style={[styles.title, styleTitle]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(Button);