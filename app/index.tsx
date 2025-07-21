import BankContainer from "@/components/BankContainer";
import Category from "@/components/Category";
import { Text, View, Image, StyleSheet } from "react-native";

export default function Index() {
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
      <BankContainer title="Тинькофф" backgroundColor="yellow" color="black">
        <Category img={require('@/assets/images/icons/tbank.png')}>
          New Category
        </Category>
        <Category img={require('@/assets/images/icons/tbank.png')}>
          New Category fdsa fasd fasdf asd faydf asd fsdf ads fs
        </Category>
        <Category img={require('@/assets/images/icons/tbank.png')}>
          New Category fdsa fasd fasdf asd fasdf asd fsdf ads fsffas fasd fs
        </Category>
      </BankContainer>
    </View>
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