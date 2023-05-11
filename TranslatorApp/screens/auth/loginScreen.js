import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TouchableOpacity, Image, BackHandler, TextInput } from 'react-native'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useFocusEffect } from '@react-navigation/native';
import { FirebaseRecaptchaBanner, FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from '../../firebase';
import { getApp } from 'firebase/app';
import { PhoneAuthProvider, getAuth, onAuthStateChanged, signInWithCredential } from 'firebase/auth';

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const app = getApp();
    const auth = getAuth(app);

    const [backClickCount, setBackClickCount] = useState(0);

    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const firebaseConfig = app ? app.options : undefined;

    let phoneRef = useRef()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                navigation.push('Home')
            } else {
                console.log('no user')
            }
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'flex-end', flexGrow: 1 }}>
                    {loginImage()}
                    {welcomeInfo()}
                    {mobileNumberInfo()}

                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                    // attemptInvisibleVerification
                    />

                </ScrollView>
            </View>
            {exitInfo()}
        </SafeAreaView>
    )

    function sendCodeButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                disabled={!phoneNumber}
                onPress={async () => {
                    // The FirebaseRecaptchaVerifierModal ref implements the
                    // FirebaseAuthApplicationVerifier interface and can be
                    // passed directly to `verifyPhoneNumber`.
                    try {
                        const phoneProvider = new PhoneAuthProvider(auth);
                        const verificationId = await phoneProvider.verifyPhoneNumber(
                            phoneNumber,
                            recaptchaVerifier.current
                        );
                        setVerificationId(verificationId);

                    } catch (err) {
                        console.log(err.message);
                    }
                }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>Send Verification Code</Text>
            </TouchableOpacity>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                disabled={!verificationId}
                onPress={async () => {
                    try {
                        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
                        await signInWithCredential(auth, credential).then(isUser => {
                            if (isUser.user) navigation.push('Register', {
                                phoneNumber
                            })
                        })
                        console.log('Phone authentication successful 👍')
                    } catch (err) {
                        console.log(err.message)
                    }
                }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>Continue & Confirm Code</Text>
            </TouchableOpacity>
        )
    }

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={styles.exitInfoWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor15SemiBold }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
                :
                null
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <IntlPhoneInput
                    onChangeText={({ phoneNumber }) => setPhoneNumber(phoneRef.state.dialCode + phoneNumber)}
                    defaultCountry="LK"
                    containerStyle={{ backgroundColor: Colors.whiteColor, }}
                    placeholder={"Enter Your Number"}
                    phoneInputStyle={styles.phoneInputStyle}
                    dialCodeTextStyle={{ ...Fonts.blackColor15Bold, marginHorizontal: Sizes.fixPadding - 2.0, }}
                    ref={ref => phoneRef = ref}
                />
                {phoneNumber !== '' && sendCodeButton()}
                <TextInput
                    placeholder='Enter the verification code'
                    style={styles.phoneInputStyle}
                    editable={!!verificationId}
                    onChangeText={setVerificationCode}
                />
                {verificationCode !== '' && continueButton()}
            </View>
        )
    }

    function welcomeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 4.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                    Welcome to Hike-Up
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor14SemiBold }}>
                    Enter your phone number to continue
                </Text>
            </View>
        )
    }

    function loginImage() {
        return (
            <Image
                source={require('../../assets/images/login.png')}
                style={{ width: '100%', height: height / 3.0, resizeMode: 'stretch' }}
            />
        )
    }
}

export default LoginScreen

const styles = StyleSheet.create({
    phoneInputStyle: {
        flex: 1,
        ...Fonts.blackColor15Bold,
        borderBottomColor: Colors.shadowColor,
        borderBottomWidth: 1.0,
    },
    exitInfoWrapStyle: {
        backgroundColor: Colors.lightBlackColor,
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginVertical: Sizes.fixPadding * 2.0,
    },
})