import { COLORS } from "@/constants/ui";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import MenuScreen from "@/screens/MenuScreen";
import HomeScreen from "@/screens/HomeScreen";


// TabNavigator
type RootTabParamList = {
  Home: {
    isEditing: boolean;
    setIsEditing: (value: boolean | ((prev: boolean) => boolean)) => void;
  };
  Popup: {
    isPopupVisible: boolean;
    setIsPopupVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
  };
  Menu: {};
};

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function Index() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY_COLOR,
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Скрываем заголовок
      }}
    >
      {/* Кнопка редактирования */}
      <Tab.Screen
        name="Home"
        children={() => (
          <HomeScreen
            isEditing={isEditing} 
            setIsEditing={setIsEditing}
            isPopupVisible={isPopupVisible}
            setIsPopupVisible={setIsPopupVisible}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name="pencil" 
              color={isEditing ? COLORS.PRIMARY_COLOR : 'gray'} 
              size={size} 
            />
          ),
          tabBarLabel: "Редактировать",
          tabBarLabelStyle: {
            color: isEditing ? COLORS.PRIMARY_COLOR : 'gray'
          }
        }}
        listeners={{
          tabPress: (e) => {
            setIsEditing(prev => !prev);
          },
        }}
      />

      {/* Попап */}
      <Tab.Screen
        name="Popup"
        children={() => (
          <HomeScreen
            isEditing={isEditing} 
            setIsEditing={setIsEditing}
            isPopupVisible={isPopupVisible}
            setIsPopupVisible={setIsPopupVisible}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name="add-circle" 
              color={isPopupVisible ? COLORS.PRIMARY_COLOR : 'gray'} 
              size={size} 
            />
          ),
          tabBarLabel: "Добавить",
          tabBarLabelStyle: {
            color: isPopupVisible ? COLORS.PRIMARY_COLOR : 'gray'
          }
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            setIsPopupVisible(prev => !prev);
          },
        }}
      />

      {/* Кнопка меню */}
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
          tabBarLabel: "Меню",
        }}
      />
    </Tab.Navigator>
  );
}
