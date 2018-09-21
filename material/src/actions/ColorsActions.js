
import model from '../class/FirebaseCloundFireStore';

const ColorsOTS = model.colors.getOTS();
const ColorsTypes = ColorsOTS.getActionsTypes();

export const getColors = () => async dispatch => {
    try {

        const functionReciveData = (data) => {
             ColorsOTS.sendPayloadToReducer(ColorsTypes.FETH_COLORS, data)(dispatch);
        }

        await model.colors.getAllWithRealtime(functionReciveData);
        
    } catch (error) {
        throw Promise.reject(error);
    }
}

export const createColors = (data) => async dispatch => {
    try {
        const result = await model.colors.create(data);
       
    } catch (error) {
        throw Promise.reject(error);
    }
}
