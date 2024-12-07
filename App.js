import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import SplashScreen from './screens/OnboardingScreen/SplashScreen';
import Signup from './screens/OnboardingScreen/SignUp';
import Login from './screens/OnboardingScreen/Login';
import Home from './screens/HomeScreen/Home';
import Promo from './screens/HomeScreen/Promo';
import RecommendedPlace from './screens/HomeScreen/Recommended';
import Explore from './screens/ExploreScreen/Explore';
import Reservation from './screens/ReservationScreen/Reservation';
import Profile from './screens/ProfileScreen/Profile';
import RecommendationCategory from './screens/CategoryDetails/RecommendationCategory';
import RestaurantCategory from './screens/CategoryDetails/RestaurantCategory';
import Billiard from './screens/CategoryDetails/Billiard';
import CafeCategory from './screens/CategoryDetails/CafeCategory';
import ReservationDate from './screens/ReservationScreen/ReservationDate';
import ReservationMenu from './screens/ReservationScreen/ReservationMenu';
import ReservationCart from './screens/ReservationScreen/ReservationCart';
import Payment from './screens/ReservationScreen/Payment';
import ReservationHistory from './screens/ReservationScreen/ReservationHistory';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Reservation') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFA500',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1A2B45',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Reservation" component={Reservation} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="SignUp" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={BottomTabNavigator} /> 
            <Stack.Screen name="Promo" component={Promo} />
            <Stack.Screen name="Recommended" component={RecommendedPlace} />
            <Stack.Screen name="Explore" component={Explore} />
            <Stack.Screen name="RecommendationCategory" component={RecommendationCategory} />
            <Stack.Screen name="Reservation" component={Reservation} />
            <Stack.Screen name="ReservationDate" component={ReservationDate} />
            <Stack.Screen name="ReservationMenu" component={ReservationMenu} />
            <Stack.Screen name="ReservationCart" component={ReservationCart} />
            <Stack.Screen name="ReservationHistory" component={ReservationHistory} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="RestaurantCategory" component={RestaurantCategory} />
            <Stack.Screen name="CafeCategory" component={CafeCategory} />
            <Stack.Screen name="Billiard" component={Billiard} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
});
