import { Modal, TouchableWithoutFeedback, View, Text, Button, StyleSheet } from "react-native";
import StyledModal from "./StyledModal";

interface Popup {
  isPopupVisible: boolean,
  onClose: () => void
}

const ModalAddBank:React.FC<Popup> = ({
  isPopupVisible,
  onClose
}) => (
  <StyledModal isOpen={isPopupVisible} onClose={onClose}>
    <Text>Это попап!</Text>
    <Button title="Закрыть" onPress={onClose} />
  </StyledModal>
)

const styles = StyleSheet.create({
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

export default ModalAddBank;