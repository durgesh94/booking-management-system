import * as actions from "./actionTypes";

export const addBooking = (data: any) => ({
    type: actions.ADD_BOOKING,
    payload: data
});

export const updateBooking = (data: any) => ({
    type: actions.UPDATE_BOOKING,
    payload: data
});