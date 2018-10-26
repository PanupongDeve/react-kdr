
export const OPEN_MODAL = 'Open_Modal';
export const CLEAR_DATA = 'Clear_data';

export const reciveStateFunction = (openModal) => dispatch => {
    dispatch({
        type: OPEN_MODAL,
        payload: openModal
    })
}

export const ClearModalFunction = () => dispatch => {
    dispatch({
        type: CLEAR_DATA
    })
}