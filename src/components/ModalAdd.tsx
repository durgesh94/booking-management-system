import { Modal, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import { Text, View } from './Themed';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../redux/actions";
import { STATUS } from "../constants/StatusEnum";
import layout from "../constants/Layout";

interface FormInput {
    name: String;
    email: String;
    bookingType: String;
    description: String;
}

interface ModalAddProps {
    modalVisible: boolean;
    setModalVisible(flag: boolean): void;
    data: any;
}
export const ModalAdd = ({ data, modalVisible, setModalVisible }: ModalAddProps) => {

    const dispatch = useDispatch();
    const records: any = useSelector(state => state);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            bookingType: data?.type,
            description: ''
        }
    });

    const onSubmit = (formData: FormInput) => {
        formData.bookingType = data?.type;
        dispatch(addBooking({ ...formData, id: records.length + 1, status: STATUS.PENDING }));
        reset();
        setModalVisible(false);
        alert("Booking Created successfully...!")
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ alignSelf: "flex-end" }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{ fontWeight: "bold" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>Fill Your Personal Information:</Text>
                        <Text style={{ paddingTop: 10 }}>Name:</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="name"
                        />
                        {errors.name && <Text style={{ color: "red" }}>Name is required.</Text>}

                        <Text style={{ paddingTop: 10 }}>Email:</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="email"
                        />
                        {errors.email && <Text style={{ color: "red" }}>Email is required.</Text>}

                        <Text style={{ fontWeight: "bold", marginTop: 20 }}>Fill Your Requirements:</Text>
                        <Text style={{ paddingTop: 10 }}>Booking Type: {data?.type}</Text>
                        <Text style={{ paddingTop: 10 }}>Description: </Text>
                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    multiline={true}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="description"
                        />
                        {errors.description && <Text style={{ color: "red" }}>Description max length is 100 characters</Text>}

                        <View style={{ paddingTop: 20 }}>
                            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
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
    input: {
        paddingHorizontal: 10,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        width: layout.window.width - 120
    }
});