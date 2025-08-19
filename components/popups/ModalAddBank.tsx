import { Modal, TouchableWithoutFeedback, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import StyledModal from "./StyledModal";
import { useEffect, useState } from "react";
import BanksTable from "@/database/banks";
import { initDatabase } from "@/database/db.init";
import { BankType } from "@/types/bank";
import CurrentCategoriesTable from "@/database/currentCategories";

interface Popup {
  isPopupVisible: boolean;
  onClose: () => void;
}

const ModalAddBank:React.FC<Popup> = ({
  isPopupVisible,
  onClose
}) => {
  const [banks, setBanks] = useState<BankType[]>([])

  useEffect(() => {
    const loadData = async () => {
      await initDatabase();

      setBanks(await BanksTable.getAvailable())
    }

    loadData()
  }, [isPopupVisible])

  async function addBank(id: number) {
    if(await CurrentCategoriesTable.addBank(id)){
      setBanks(prevBanks => prevBanks.filter(bank => bank.id !== id))
      // addBankOnHomeScreen(id)
    }
  }

  return (
    <StyledModal isOpen={isPopupVisible} onClose={onClose}>
      {
        banks.map((bank) => (
          <TouchableOpacity key={bank.id} onPress={() => addBank(bank.id)}>
            <View style={[styles.bankContainer, {backgroundColor: bank.color_bg}]}>
              <Text style={[styles.bankName, {color: bank.color_text}]}>{bank.name}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
      {/* <Button title="Закрыть" onPress={onClose} /> */}
    </StyledModal>
  )
}

const styles = StyleSheet.create({
  bankContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankName: {
    fontSize: 20,
    fontWeight: '600',
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

export default ModalAddBank;