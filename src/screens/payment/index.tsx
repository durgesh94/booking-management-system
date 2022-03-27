import { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useSelector } from "react-redux";
import { ModalInfo } from "../../components/ModalInfo";
import { RenderFooter } from "../../components/RenderFooter";
import { ItemView } from "../../components/ItemView";
import { ItemSeparatorView } from "../../components/ItemSeparatorView";
import { STATUS } from '../../constants/StatusEnum';

export default function PaymentScreen() {

    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState<any>([]);
    const [offset, setOffset] = useState(1);
    const [isMore, setIsMore] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState();
    const data: any = useSelector(state => state);

    const getData = (isLoadMore: boolean) => {
        setLoading(true);
        if (isLoadMore) setOffset(offset + 1)
        const pendingList: any = data.filter((item: any) => item.status === "PAYMENT");
        const pending5List: any = pendingList.slice(0, isLoadMore ? 5 * (offset + 1) : 5 * offset);
        if (pendingList.length <= pending5List.length) setIsMore(false);
        else setIsMore(true);
        setDataSource(pending5List);
        setLoading(false);
    };

    useEffect(() => {
        getData(false);
    }, [data]);

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Payment List:</Text>
            </View>
            <ModalInfo data={item} modalVisible={modalVisible} setModalVisible={(flag) => setModalVisible(flag)} />
            <FlatList
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <ItemSeparatorView />}
                renderItem={({ item, index }: any) => <ItemView item={item} index={index} status={STATUS.PAYMENT} setItem={(item) => setItem(item)} setModalVisible={(flag) => setModalVisible(flag)} />}
                ListFooterComponent={<RenderFooter loading={loading} isMore={isMore} getData={(flag) => getData(flag)} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    view: {
        paddingBottom: 20
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    }
});
