import { TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from './Themed';

interface RenderFooterProps {
    loading: boolean;
    isMore: boolean;
    getData(flag: boolean): void;
}

//Footer View with Load More button
export const RenderFooter = ({ loading, isMore, getData }: RenderFooterProps) => {
    if (!isMore)
        return (
            <View style={styles.footer}><Text>No more booking</Text></View>
        )
    else
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => getData(true)}
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>View More</Text>
                    {loading ? (
                        <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
};


const styles = StyleSheet.create({
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#0096FF',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
    }
});