import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import MapViewDirections from 'react-native-maps-directions';
import { Key } from "../../constants/key";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const languagesList = [
    {
        id: '1',
        languageImage: require('../../assets/images/languages/t1.png'),
        languageName: 'Max',
        amount: 0
    },
    {
        id: '2',
        languageImage: require('../../assets/images/languages/t2.png'),
        languageName: 'Very nearby',
        amount: 20.50,
    },
    {
        id: '3',
        languageImage: require('../../assets/images/languages/t3.png'),
        languageName: 'Nearby',
        amount: 30.50,
    },
    {
        id: '4',
        languageImage: require('../../assets/images/languages/t4.png'),
        languageName: 'Prof',
        amount: 40.00,
    },
    {
        id: '5',
        languageImage: require('../../assets/images/languages/t5.png'),
        languageName: 'Prof',
        amount: 40.50,
    },
];

const languageTypes = ['Economy', 'Luxury', 'Extras'];

const SelectlanguageScreen = ({ navigation }) => {

    const [selectedlanguageTypeIndex, setSelectedlanguageTypeIndex] = useState(0);
    const [selectedlanguageIndex, setSelectedlanguageIndex] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {directionInfo()}
                {header()}
                {selectlanguageSheet()}
            </View>
        </SafeAreaView>
    )

    function selectlanguageSheet() {
        return (
            <Animatable.View
                animation="slideInUp"
                iterationCount={1}
                duration={1500}
                style={{ ...styles.bottomSheetWrapStyle }}
            >
                {indicator()}
                {languageTypesInfo()}
                {languagesInfo()}
                {bookconnectionButton()}
            </Animatable.View>
        )
    }

    function indicator() {
        return (
            <View style={{ ...styles.sheetIndicatorStyle }} />
        )
    }

    function languagesInfo() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { setSelectedlanguageIndex(index) }}
                style={styles.languageInfoWrapStyle}
            >
                <Image
                    source={item.languageImage}
                    style={styles.languageImageStyle}
                />
                <View style={{ marginLeft: Sizes.fixPadding, marginTop: - (width / 6.3) + 30.0, }}>
                    <Text style={{ ...Fonts.blackColor15SemiBold }}>
                        {item.languageName}
                    </Text>
                    <Text style={{ ...Fonts.blackColor15Bold }}>
                        ${item.amount.toFixed(2)}
                    </Text>
                    <View
                        style={{
                            backgroundColor: selectedlanguageIndex == index ? Colors.lightBlackColor : Colors.shadowColor,
                            ...styles.selectedlanguageIndicatorStyle,
                        }}
                    >
                        <MaterialIcons
                            name='check'
                            color={Colors.whiteColor}
                            size={14}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={languagesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingRight: Sizes.fixPadding }}
            />
        )
    }

    function languageTypesInfo() {
        return (
            <View style={styles.languageTypesInfoWrapStyle}>
                {
                    languageTypes.map((item, index) => (
                        <Text
                            key={`${index}`}
                            onPress={() => setSelectedlanguageTypeIndex(index)}
                            style={{
                                ...selectedlanguageTypeIndex == index ? { ...Fonts.blackColor18SemiBold } : { ...Fonts.lightGrayColor18SemiBold },
                                ...styles.languageTypeTextStyle
                            }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function bookconnectionButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('SelectPaymentMethod') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Book Translator
                </Text>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0, ...Fonts.blackColor20ExtraBold }}>
                    Choose a Translator
                </Text>
            </View>
        )
    }

    function directionInfo() {
        const currentlanguageLocation = {
            latitude: 22.715024,
            longitude: 88.474119,
        }
        const userLocation = {
            latitude: 22.558488,
            longitude: 88.309215,
        }
        return (
            <MapView
                region={{
                    latitude: 22.483643,
                    longitude: 88.375880,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
                style={{ height: '100%', }}
                provider={PROVIDER_GOOGLE}
                mapType="terrain"
            >
                <MapViewDirections
                    origin={userLocation}
                    destination={currentlanguageLocation}
                    apikey={Key.apiKey}
                    strokeColor={Colors.primaryColor}
                    strokeWidth={3}
                />
                <Marker coordinate={currentlanguageLocation}>
                    <Image
                        source={require('../../assets/images/icons/marker2.png')}
                        style={{ width: 50.0, height: 50.0, resizeMode: 'stretch', }}
                    />
                    <Callout>
                        <View style={styles.calloutWrapStyle}>
                            <View style={styles.kilometerInfoWrapStyle}>
                                <Text style={{ ...Fonts.whiteColor10Bold }}>
                                    10km
                                </Text>
                            </View>
                            <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.blackColor14SemiBold }}>
                                1655 Island Pkwy, Kamloops, BC V2B 6Y9
                            </Text>
                        </View>
                    </Callout>
                </Marker>
                <Marker coordinate={userLocation}>
                    <Image
                        source={require('../../assets/images/icons/marker3.png')}
                        style={{ width: 23.0, height: 23.0, }}
                    />
                    <Callout>
                        <Text style={{ width: width / 1.5, ...Fonts.blackColor14SemiBold }}>
                            9 Bailey Drive, Fredericton, NB E3B 5A3
                        </Text>
                    </Callout>
                </Marker>
            </MapView>
        )
    }
}

export default SelectlanguageScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 20.0,
        left: 15.0,
        right: 15.0,
    },
    calloutWrapStyle: {
        width: width / 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor
    },
    kilometerInfoWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.lightBlackColor,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0
    },
    bottomSheetWrapStyle: {
        borderTopLeftRadius: Sizes.fixPadding * 2.5,
        borderTopRightRadius: Sizes.fixPadding * 2.5,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: 0.0,
        maxHeight: height - 150.0,
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
    },
    sheetIndicatorStyle: {
        width: 50,
        height: 5.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignSelf: 'center',
        marginVertical: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0
    },
    languageTypesInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding + 5.0
    },
    languageInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.shadowColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
        marginTop: (width / 6.3) / 1.5,
    },
    languageImageStyle: {
        top: -(width / 6.3) / 1.5,
        alignSelf: 'center',
        width: width / 6.3,
        height: width / 3.5,
        resizeMode: 'stretch',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    selectedlanguageIndicatorStyle: {
        marginTop: -Sizes.fixPadding,
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        right: -0.50,
    },
    languageTypeTextStyle: {
        maxWidth: width / 3.5,
        flex: 1,
        textAlign: 'center'
    }
})