import BankContainer from "@/components/BankContainer";
import Category from "@/components/Category";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, Image, StyleSheet, Modal, Button, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/ui";
import React from "react";

type HomeScreenRouteProp = RouteProp<{
  Home: {
    isEditing: boolean;
    setIsEditing: (value: boolean | ((prev: boolean) => boolean)) => void;
    isPopupVisible?: boolean;
    setIsPopupVisible?: (value: boolean | ((prev: boolean) => boolean)) => void;
  };
}, 'Home'>;

interface HomeScreenProps {
  route: HomeScreenRouteProp;
}



function HomeScreen({ route }: HomeScreenProps ) {
  const isEditing = route.params?.isEditing || false;
  const setIsEditing = route.params?.setIsEditing || (() => {})
  const isPopupVisible = route.params?.isPopupVisible || false;
  const setIsPopupVisible = route.params?.setIsPopupVisible || (() => {})

  return (
    <View style={styles.container} >
      <View style={styles.header} >
        <Image 
          source={require('../assets/images/logo.png')}
          style={{
            width: '100%',
          }}
          resizeMode="contain"
        />
      </View>
      <BankContainer title="Тинькофф" backgroundColor="yellow" color="black" isEditing={isEditing}>
        <Category img={require('@/assets/images/icons/tbank.png')} isEditing={isEditing}>
          New Category
        </Category>
        <Category img={require('@/assets/images/icons/tbank.png')} isEditing={isEditing}>
          New Category fdsa fasd fasdf asd faydf asd fsdf ads fs
        </Category>
        <Category img={require('@/assets/images/icons/tbank.png')} isEditing={isEditing}>
          New Category fdsa fasd fasdf asd fasdf asd ads fsffas fasd fs
        </Category>
      </BankContainer>

      {/* Попап */}
      <Modal visible={isPopupVisible} transparent animationType="slide" statusBarTranslucent={true}>
        <TouchableWithoutFeedback onPress={() => setIsPopupVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <Text>Это попап!</Text>
                <Button title="Закрыть" onPress={() => setIsPopupVisible(false)} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

function MenuScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Страница меню</Text>
    </View>
  )
}

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
            route={{
              params: { isEditing, setIsEditing, isPopupVisible, setIsPopupVisible },
              key: 'Home',
              name: 'Home'
            } as any}
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
            route={{
              params: { isEditing, setIsEditing, isPopupVisible, setIsPopupVisible },
              key: 'Popup',
              name: 'Popup'
            } as any}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    width: '85%',
    marginTop: 10,
    aspectRatio: 4
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
})