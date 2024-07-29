import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

// Handle background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

// Request user permission for notifications
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {

        getFCMToken();
    }
}

// Get FCM token
async function getFCMToken() {
    try {
        const fcmToken = await messaging().getToken();

        if (fcmToken) {

        } else {
            console.log('Failed', 'No token received');
        }
    } catch (error) {
        console.log(error, "::::which error arrived?")
    }

}

requestUserPermission();

// Handle foreground messages
messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
});
