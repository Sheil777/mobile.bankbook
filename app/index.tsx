import { Text, View, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View 
        style={{
          width: '85%',
          marginTop: 10,
        }}
      >
        <Image 
          source={require('../assets/images/logo.png')}
          style={{
            width: '100%',
          }}
          resizeMode="contain"
        />
      </View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
