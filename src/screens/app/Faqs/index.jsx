import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const Faqs = () => {

    const { t } = useTranslation();
    const [visibleAnswers, setVisibleAnswers] = useState({});
    const [faqsImage, setFaqsImage] = useState("");
    const { allfaqListing, contactUsPageDetails } = useContext(ApiContext);
    const { defaultLanguage } = useContext(GlobalContext);
    const [faqs, setFaq] = useState([]);
    const [loading, setLoading] = useState(true);
    const [windowWidth] = useState(Dimensions.get('window').height);
    console.log("heisghtththt", windowWidth)

    useEffect(() => {
        const fetchCommitteeMembers = async () => {
            try {
                const faqDetails = await allfaqListing();
                setFaq(faqDetails);
            } catch (error) {
                console.error("Failed to fetch committee members", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCommitteeMembers();
    }, []);

    const toggleAnswerVisibility = (id) => {
        setVisibleAnswers((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ["faqSupport"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'faqSupport':
                            setFaqsImage(item.value);
                            break;
                        default:
                            break;
                    }
                }
            });
        })();
    }, []);

    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);

    const renderItems = ({ item }) => {
        const isAnswerVisible = visibleAnswers[item._id];

        return (
            <View className="p-2">
                <View className="w-full mt-2">
                    <TouchableOpacity activeOpacity={0.95} onPress={() => toggleAnswerVisibility(item._id)}>
                        <View className="flex flex-row justify-between items-center bg-white shadow-2xl shadow-black rounded-[15px] p-[15px]" style={{ shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 2, elevation: 5 }}>
                            <Text className="font-extrabold tracking-wider text-lg text-neutral-700 basis-[93%]">
                                {defaultLanguage == "en" ? item.questionE : item.questionG}
                            </Text>
                            <AnimatedFeatherIcon
                                name={isAnswerVisible ? 'chevron-up' : 'chevron-down'}
                                size={30}
                                color="#666"
                            />
                        </View>
                    </TouchableOpacity>
                    {isAnswerVisible && (
                        <View className="bg-white rounded-[15px] p-[15px] mt-[10px]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                            <Text className="text-justify" style={{ color: '#333' }}>
                                {defaultLanguage == "en" ? item.answerE : item.answerG}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View className="bg-white p-3">
            <View className="w-full h-full bg-[#F7F7FA] rounded-[10px] ">
                <View className="w-full h-40 bg-[#E9EDF7] flex flex-row ">
                    <View className="basis-[35%] flex flex-row justify-center items-center">
                        <Image className="w-[60px] h-[80px] object-cover" source={{ uri: `${process.env.IMAGE_URL}${faqsImage}` }} />
                    </View>
                    <View className="basis-[65%] flex flex-row justify-center items-center">
                        <Text className="font-extrabold tracking-wider text-2xl text-rose-700">
                            {t('Quickhelpforcommonissues')}
                        </Text>
                    </View>
                </View>
                <View className="flex-1">
                    {loading ? (
                        <View className="flex-1 justify-center items-center">
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                        <FlatList
                            data={faqs}
                            renderItem={renderItems}
                            keyExtractor={item => item._id.toString()}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                    {!loading && !faqs.length && <NoDataFound message={"There are no FAQs in this village."} />}
                </View>
            </View>
        </View>
    )
}

export default Faqs;