import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

export const useFabVisibility = (initialState = true, settledTime = 900) => {
    const [yCurrentPosition, setYCurrentPosition] = useState(0);
    const [yPreviousPosition, setYPreviousPosition] = useState(0);

    const [fabVisible, setFabVisibility] = useState(initialState);
    const [isSettled, setSettled] = useState(false);

    const [allowFab, setAllowFab] = useState(true);

    const parseVisibility = debounce(
        (previous, current) => {
            setSettled(false);
            if (!allowFab) setFabVisibility(false);
            else setFabVisibility(previous >= current);
            setTimeout(() => setSettled(true), settledTime);
        },
        400,
        { leading: true }
    );

    useEffect(() => {
        parseVisibility(yPreviousPosition, yCurrentPosition);
    }, [yPreviousPosition, yCurrentPosition]);

    useEffect(() => {
        isSettled && setFabVisibility(true);
    }, [isSettled]);

    const processScrollEvent = (evt) => {
        setYPreviousPosition(yCurrentPosition);
        setYCurrentPosition(evt.nativeEvent.contentOffset.y);
    };

    return [fabVisible, processScrollEvent, setAllowFab];
};
