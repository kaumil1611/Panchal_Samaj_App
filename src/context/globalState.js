import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { runOnJS, useAnimatedProps, useSharedValue } from "react-native-reanimated";
import { interpolatePath } from 'react-native-redash';
import usePath from "../hooks/usePath";
import { getPathXCenter } from "../utils/path";
export const GlobalContext = createContext({});

export const GlobalProvider = (props) => {

    const progress = useSharedValue(1);
    const { containerPath, curvedPaths, tHeight } = usePath();
    const circleXCoordinate = useSharedValue(0);

    const handleMoveCircle = (currentPath) => {
        circleXCoordinate.value = getPathXCenter(currentPath);
    };
    const animatedProps = useAnimatedProps(() => {
        const currentPath = interpolatePath(
            progress.value,
            Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
            curvedPaths,
        );
        runOnJS(handleMoveCircle)(currentPath);
        return {
            d: `${containerPath} ${currentPath}`,
        };
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [SelectedVillage, setSelectedVillage] = useState("");
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [screenpercentage, setScreenpercentage] = useState({
        first: "",
        second: ""
    });
    const bottomSheetRef = useRef(null);
    const [bottomSheetContent, setBottomSheetContent] = useState(null);
    const [registerData, setRegisterData] = useState(null);

    const snapPoints = useMemo(() => {
        const firstPoint = screenpercentage.first || "25%";
        const secondPoint = screenpercentage.second || "50%";
        return [firstPoint, secondPoint];
    }, [screenpercentage]);

    const handleSheetChanges = useCallback((index) => {

        if (index === -1) {
            setIsBottomSheetVisible(false);
        }
    }, [bottomSheetContent]);

    const openBottomSheet = (content) => {
        setBottomSheetContent(content);
        setIsBottomSheetVisible(true);
    };

    const [isAuthScreenActive, setIsAuthScreenActive] = useState(false);

    const setuserDataInStorage = async (key, data) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
            await getUserDataFromStorage(key)
        } catch (error) {
            console.log(error, "set storage error")
        }
    }
    const [allUserInfo, setAllUserInfo] = useState({})
    const getUserDataFromStorage = async (key) => {
        try {
            const userData = await AsyncStorage.getItem(key);
            if (userData !== null) {
                const user = await JSON.parse(userData);
                setIsLoggedIn(!!(user?._id))
                setAllUserInfo(user)
                return user
            }
        } catch (error) {
            console.error('Failed to fetch data from storage', error);
        }
    };
    const removeUserDataFromStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to fetch data from storage', error);
        }
    };
    const [allVillagesListing, setAllVillagesListing] = useState([]);
    const [defaultLanguage, setDefaultLanguage] = useState('en');
    const [pushNotificationToken, setPushNotificationToken] = useState("")
    const [currentPathNamestate, setCurrentPathNamestate] = useState("")
    const value = {
        setCurrentPathNamestate,
        currentPathNamestate,
        progress,
        animatedProps,
        containerPath,
        curvedPaths,
        tHeight,
        circleXCoordinate,
        handleMoveCircle,
        SelectedVillage,
        setSelectedVillage,
        isBottomSheetVisible,
        setIsBottomSheetVisible,
        setScreenpercentage,
        screenpercentage,
        bottomSheetRef,
        snapPoints,
        handleSheetChanges,
        openBottomSheet,
        bottomSheetContent,
        setIsAuthScreenActive,
        isAuthScreenActive,
        setRegisterData,
        registerData,
        getUserDataFromStorage,
        removeUserDataFromStorage,
        setuserDataInStorage,
        setIsLoggedIn,
        isLoggedIn,
        allUserInfo,
        setAllUserInfo,
        allVillagesListing,
        setAllVillagesListing,
        setDefaultLanguage,
        defaultLanguage,
        pushNotificationToken,
        setPushNotificationToken,
    };

    return (
        <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>
    );
};