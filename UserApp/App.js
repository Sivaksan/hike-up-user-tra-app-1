import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/home/homeScreen';
import LoadingScreen from './components/loadingScreen';
import CustomDrawer from './components/customDrawerScreen';
import { Dimensions, LogBox } from 'react-native'
import { Sizes } from './constants/styles';
import DropOffLocationScreen from './screens/dropOffLocation/dropOffLocationScreen';
import BookNowScreen from './screens/bookNow/bookNowScreen';
import SelectlanguageScreen from './screens/selectlanguage/selectlanguageScreen';
import SelectPaymentMethodScreen from './screens/selectPaymentMethod/selectPaymentMethodScreen';
import SearchingFortranslatorsScreen from './screens/searchingFortranslators/searchingFortranslatorsScreen';
import translatorDetailScreen from './screens/translatorDetail/translatorDetailScreen';
import ChatWithtranslatorScreen from './screens/chatWithtranslator/chatWithtranslatorScreen';
import connectionStartedScreen from './screens/connectionStarted/connectionStartedScreen';
import connectionEndScreen from './screens/connectionEnd/connectionEndScreen';
import RatingScreen from './screens/rating/ratingScreen';
import EditProfileScreen from './screens/editProfile/editProfileScreen';
import UserconnectionsScreen from './screens/userconnections/userconnectionsScreen';
import connectionDetailScreen from './screens/connectionDetail/connectionDetailScreen';
import WalletScreen from './screens/wallet/walletScreen';
import PaymentMethodsScreen from './screens/paymentMethods/paymentMethodsScreen';
import AddPaymentMethodScreen from './screens/addPaymentMethod/addPaymentMethodScreen';
import NotificationsScreen from './screens/notifications/notificationsScreen';
import InviteFriendsScreen from './screens/inviteFriends/inviteFriendsScreen';
import FaqsScreen from './screens/faqs/faqsScreen';
import ContactUsScreen from './screens/contactUs/contactUsScreen';
import SplashScreen from './screens/splashScreen';
import OnboardingScreen from './screens/onboarding/onboardingScreen';
import LoginScreen from './screens/auth/loginScreen';
import RegisterScreen from './screens/auth/registerScreen';
import VerificationScreen from './screens/auth/verificationScreen';

LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const { width } = Dimensions.get('window');

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: width - 90.0, borderTopRightRadius: Sizes.fixPadding * 2.0, borderBottomRightRadius: Sizes.fixPadding * 2.0, },
      }}
    >
      <Drawer.Screen name="DrawerScreen" component={HomeScreen} />
    </Drawer.Navigator>
  )
}

function MyApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Home" component={DrawerNavigation} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="DropOffLocation" component={DropOffLocationScreen} />
        <Stack.Screen name="BookNow" component={BookNowScreen} />
        <Stack.Screen name="Selectlanguage" component={SelectlanguageScreen} />
        <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethodScreen} />
        <Stack.Screen name="SearchingFortranslators" component={SearchingFortranslatorsScreen} />
        <Stack.Screen name="translatorDetail" component={translatorDetailScreen} />
        <Stack.Screen name="ChatWithtranslator" component={ChatWithtranslatorScreen} />
        <Stack.Screen name="connectionStarted" component={connectionStartedScreen} />
        <Stack.Screen name="connectionEnd" component={connectionEndScreen} />
        <Stack.Screen name="Rating" component={RatingScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Userconnections" component={UserconnectionsScreen} />
        <Stack.Screen name="connectionDetail" component={connectionDetailScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
        <Stack.Screen name="Faqs" component={FaqsScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyApp;