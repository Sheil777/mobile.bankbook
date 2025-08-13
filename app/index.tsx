import BankContainer from "@/components/BankContainer";
import Category from "@/components/Category";
import { COLORS } from "@/constants/ui";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

// import { CategoryService } from '../database';
import { initDatabase } from '../database/db.init';
import { Categories } from '../database/categories'

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

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await initDatabase();
        // await Categories.deleteAll()
        const loadedCategories = await Categories.getAll();
        setCategories(loadedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ScrollView>
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

        <BankContainer 
          title="Тинькофф" 
          backgroundColor="yellow" 
          color="black" 
          isEditing={isEditing}
        >
          {categories.map(category => (
            <Category 
              key={category.id}
              img={category.image ? { uri: category.image } : require('@/assets/images/icons/tbank.png')}
              isEditing={isEditing}
            >
              {category.name}
            </Category>
          ))}
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
    </ScrollView>
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