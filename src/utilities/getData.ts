interface getDataProps {
    data: any;
    isLoadMore: boolean;
    offset: number;
    setLoading(flag: boolean): void;
    setIsMore(flag: boolean): void;
    setOffset(count: number): void;
    setDataSource(data: any): void;
}
export const getData = ({ data, setLoading, offset, setOffset, isLoadMore, setIsMore, setDataSource }: getDataProps) => {
    setLoading(true);
    if (isLoadMore) setOffset(offset + 1)
    const pendingList: any = data.filter((item: any) => item.status === "PENDING");
    const pending5List: any = pendingList.slice(0, isLoadMore ? 5 * (offset + 1) : 5 * offset);
    if (pendingList.length <= pending5List.length) setIsMore(false);
    else setIsMore(true);
    setDataSource(pending5List);
    setLoading(false);
}