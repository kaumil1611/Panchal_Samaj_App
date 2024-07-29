import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ApiContext from "../../../context/ApiContext";
import NewsList from "./NewsList";

const Favourites = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const newsData = useContext(ApiContext);
    const [news, setNews] = useState([]);

    useEffect(() => {
        (async function () {
            const result = await newsData?.newsListing();
            setNews(result);
            setLoading(false)
        })();
    }, []);

    return (
        <View style={styles.container}>
            <NewsList navigation={navigation} news={news} loading={loading} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 80
    },
});

export default Favourites;