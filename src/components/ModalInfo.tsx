import { Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Text, View } from './Themed';

interface ModalInfoProps {
    modalVisible: boolean;
    setModalVisible(flag: boolean): void;
    data: any;
}
export const ModalInfo = ({ data, modalVisible, setModalVisible }: ModalInfoProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View
                        style={{
                            alignSelf: "flex-end"
                        }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{
                                fontWeight: "bold"
                            }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ paddingTop: 10, fontWeight: "bold" }}> Personal Information:</Text>
                    <Text style={{}}>{JSON.stringify(data)}</Text>
                    <Text style={{}}>Id: {data?.id}</Text>
                    <Text style={{}}>Name: {data?.name}</Text>
                    <Text style={{}}>Email: durgesh.tambe94@gmail.com</Text>
                    <Text style={{}}>Country: India</Text>
                    <Text style={{}}>City: Pune</Text>
                    <Text style={{}}>Contact: 9090909090</Text>
                    <Text style={{ paddingTop: 10, fontWeight: "bold" }}>Booking Information:</Text>
                    <Text style={{}}>Ticket Type: </Text>
                    <Text style={{}}>Tour type: </Text>
                    <Text style={{}}>Departure Date: </Text>
                    <Text style={{}}>Destination from: </Text>
                    <Text style={{}}>Destination to: </Text>
                    <Text style={{}}>No. of tickets: </Text>
                    <Text style={{}}>Description: </Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});