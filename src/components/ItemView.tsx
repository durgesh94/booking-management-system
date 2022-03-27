import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Text, View } from './Themed';
import { updateBooking } from "../redux/actions";
import { STATUS } from "../constants/StatusEnum";

interface ItemViewProps {
    item: any;
    index: number;
    status?: string;
    setItem(item: any): void;
    setModalVisible(flag: boolean): void;
}

export const ItemView = ({ item, index, status, setItem, setModalVisible }: ItemViewProps) => {
    const dispatch = useDispatch();
    let btnText = null;
    let newStatus: string = "";

    switch (status) {
        case STATUS.PENDING:
            btnText = "Accept Request";
            newStatus = STATUS.ACTIVE;
            break;
        case STATUS.ACTIVE:
            btnText = "Generate Invoice";
            newStatus = STATUS.PAYMENT
            break;
        case STATUS.PAYMENT:
            btnText = "Paid";
            newStatus = STATUS.PAYMENT
            break;
        default:
            alert("Status not found");
            break;
    }

    return (
        // Flat List Item
        <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Text onPress={() => {
                setItem(item);
                setModalVisible(true);
            }}>
                {index + 1}
                {'.   '}
                {item.name.toUpperCase()}
            </Text>
            <TouchableOpacity
                onPress={() => dispatch(updateBooking({ ...item, status: newStatus }))}
                disabled={btnText === "Paid" ? true : false}
                style={{
                    backgroundColor: btnText === "Paid" ? "gray" : "green",
                    borderRadius: 4,
                    padding: 8
                }}>
                <Text style={{
                    color: "white",
                    fontWeight: "bold"
                }}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
};