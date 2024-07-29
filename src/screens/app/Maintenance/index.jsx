import React from 'react'
import { Image, Text, View } from 'react-native'

function Maintenance({ navigation }) {
    return (
        <View className="bg-white flex-1">

            <View className="h-[50%] my-3">
                <Image className="w-full h-full" source={require('../../../assets/maintenance.png')} />
            </View>

            <View>
                <View className="text-center px-3">
                    <Text className="tracking-wider marker:text-center my-3 text-3xl font-extrabold text-rose-700">Server Under Maintenance</Text>
                    <Text className="tracking-wider marker:text-center mb-3 text-lg font-bold text-neutral-700"> We apologize for the inconvenience. Our server is currently undergoing maintenance.</Text>
                </View>
            </View>
        </View>
    )
}

export default Maintenance

