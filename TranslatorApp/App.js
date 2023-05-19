import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './screens/home/homeScreen';
import LoadingScreen from './components/loadingScreen';
import CustomDrawer from './components/customDrawerScreen';
import { Dimensions, LogBox } from 'react-native'
import { Sizes } from './constants/styles';
import ChatWithuserScreen from './screens/chatWithuser/chatWithuserScreen';
import GoToPickupScreen from './screens/goToPickup/goToPickupScreen';
import StartconnectionScreen from './screens/startconnection/startconnectionScreen';
import EndconnectionScreen from './screens/endconnection/endconnectionScreen';
import EditProfileScreen from './screens/editProfile/editProfileScreen';
import UserconnectionsScreen from './screens/userconnections/userconnectionsScreen';
import connectionDetailScreen from './screens/connectionDetail/connectionDetailScreen';
import UserRatingsScreen from './screens/userRatings/userRatingsScreen';
import WalletScreen from './screens/wallet/walletScreen';
import NotificationsScreen from './screens/notifications/notificationsScreen';
import SplashScreen from './screens/splashScreen';
import LoginScreen from './screens/auth/loginScreen';
import RegisterScreen from './screens/auth/registerScreen';
import VerificationScreen from './screens/auth/verificationScreen';
import InviteFriendsScreen from './screens/inviteFriends/inviteFriendsScreen';
import FaqsScreen from './screens/faqs/faqsScreen';
import ContactUsScreen from './screens/contactUs/contactUsScreen';

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
        <Stack.Screen name="Login" component={LoginScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Home" component={DrawerNavigation} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="ChatWithuser" component={ChatWithuserScreen} />
        <Stack.Screen name="GoToPickup" component={GoToPickupScreen} />
        <Stack.Screen name="Startconnection" component={StartconnectionScreen} />
        <Stack.Screen name="Endconnection" component={EndconnectionScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Userconnections" component={UserconnectionsScreen} />
        <Stack.Screen name="connectionDetail" component={connectionDetailScreen} />
        <Stack.Screen name="UserRatings" component={UserRatingsScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
        <Stack.Screen name="Faqs" component={FaqsScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyApp;