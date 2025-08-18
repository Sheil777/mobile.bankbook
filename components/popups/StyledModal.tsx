import { Modal, TouchableWithoutFeedback, View, StyleSheet } from "react-native";

interface StyledModalProps {
  isOpen: boolean,
    onClose: () => void;
    children: React.ReactNode;
}

const StyledModal: React.FC<StyledModalProps> = ({
  isOpen,
  onClose,
  children
}) => (
    <Modal visible={isOpen} transparent animationType="slide" statusBarTranslucent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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

export default StyledModal