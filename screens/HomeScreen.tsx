import { initDatabase } from '../database/db.init';
import { Categories } from '../database/categories'
import { useEffect, useState } from 'react';
import { ScrollView, View, Image, StyleSheet, Modal, TouchableWithoutFeedback, Button, Text } from 'react-native';
import BankContainer from '@/components/BankContainer';
import Category from '@/components/Category';
import CurrentCategoriesTable from '@/database/currentCategories';
import CurrentCategoriesType from '@/types/currentCategories';
import ModalAddBank from '@/components/popups/ModalAddBank';

interface HomeScreenProps {
    isEditing: boolean;
    setIsEditing: (value: boolean | ((prev: boolean) => boolean)) => void;
    isPopupVisible: boolean;
    setIsPopupVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
    isEditing,
    setIsEditing,
    isPopupVisible,
    setIsPopupVisible
}) => {
  const [currentCategories, setCurrentCategories] = useState<CurrentCategoriesType[]>([]);
  const [loading, setLoading] = useState(true);
  const closeModalAddBank = () => { setIsPopupVisible(false) }

  useEffect(() => {
    const loadData = async () => {
      try {
        await initDatabase();
        // await CurrentCategoriesTable.deleteAll()
        setCurrentCategories(await CurrentCategoriesTable.getAll())
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

        {
          currentCategories.map(bank => (
            <BankContainer
              key={bank.bank_id}
              title={bank.name}
              backgroundColor={bank.color_bg}
              color={bank.color_text}
              isEditing={isEditing}
            >
              {
              bank.categories &&
                bank.categories.map(category => (
                  <Category 
                    key={category.category_id}
                    img={category.image ? { uri: category.image } : require('@/assets/images/icons/tbank.png')}
                    isEditing={isEditing}
                  >
                    {category.name}
                  </Category>
                ))
              }
            </BankContainer>
          ))
        }

        {/* Попап */}
        <ModalAddBank isPopupVisible={isPopupVisible} onClose={closeModalAddBank} />

      </View>
    </ScrollView>
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
})

export default HomeScreen;