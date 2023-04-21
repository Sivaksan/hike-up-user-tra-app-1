import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { AntDesign } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {

    const [fname, setFName] = useState('');
    const [sname, setSName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nativelang, setNativeLang] = useState('');
    const [Tlang, setTLang] = useState('');
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {FNameInfo()}
                    {SNameInfo()}
                    {emailInfo()}
                    {phoneNumberInfo()}
                    {NativeLangInfo()}
                    {TLangInfo()}

                </ScrollView>
            </View>
            {continueButton()}
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('Verification') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

function TLangInfo() {
    return (
        <View style={{ margin: Sizes.fixPadding * 2.0, }}>
            <Text style={{ ...Fonts.grayColor15SemiBold }}>
                Known Language
            </Text>
            <TextInput
                value={Tlang}
                onChangeText={(value) => setName(value)}
                style={styles.textFieldStyle}
                cursorColor={Colors.primaryColor}
                placeholder='Enter here...'
                placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
        </View>
    )
}

function NativeLangInfo() {
    return (
        <View style={{ margin: Sizes.fixPadding * 2.0, }}>
            <Text style={{ ...Fonts.grayColor15SemiBold }}>
                Native Language
            </Text>
            <TextInput
                value={nativelang}
                onChangeText={(value) => setName(value)}
                style={styles.textFieldStyle}
                cursorColor={Colors.primaryColor}
                placeholder='Enter here...'
                placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
        </View>
    )
}

    function phoneNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor15SemiBold }}>
                    Phone Number
                </Text>
                <TextInput
                    value={phoneNumber}
                    onChangeText={(value) => setPhoneNumber(value)}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    keyboardType='phone-pad'
                    placeholder='Enter here...'
                    placeholderTextColor={Colors.lightGrayColor}
                />
                {divider()}
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor15SemiBold }}>
                    Email Address
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    keyboardType='email-address'
                    placeholder='Enter here...'
                    placeholderTextColor={Colors.lightGrayColor}
                />
                {divider()}
            </View>
        )
    }

function SNameInfo() {
    return (
        <View style={{ margin: Sizes.fixPadding * 2.0, }}>
            <Text style={{ ...Fonts.grayColor15SemiBold }}>
                Second Name
            </Text>
            <TextInput
                value={sname}
                onChangeText={(value) => setName(value)}
                style={styles.textFieldStyle}
                cursorColor={Colors.primaryColor}
                placeholder='Enter here...'
                placeholderTextColor={Colors.lightGrayColor}
            />
            {divider()}
        </View>
    )
}

    function FNameInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor15SemiBold }}>
                    First Name
                </Text>
                <TextInput
                    value={fname}
                    onChangeText={(value) => setName(value)}
                    style={styles.textFieldStyle}
                    cursorColor={Colors.primaryColor}
                    placeholder='Enter here...'
                    placeholderTextColor={Colors.lightGrayColor}
                />
                {divider()}
            </View>
        )
    }

    function divider() {
        return (
            <View style={{ backgroundColor: Colors.shadowColor, height: 1.0, }} />
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
                    Register
                </Text>
            </View>
        )
    }
}

export default RegisterScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    textFieldStyle: {
        height: 20.0,
        ...Fonts.blackColor16Bold,
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding - 4.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
})