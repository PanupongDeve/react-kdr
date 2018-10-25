import ReduxSweetAlert, { swal, reducer, close } from 'react-redux-sweetalert';
import CustomOptions from './CustomOptions';

class SweetAlert {

    getComponent() {
        return ReduxSweetAlert;
    };

    getActions() {
        return {swal, close};  
    }

    getReducer() {
        return reducer;
    }

    setOnConfirm(onConfirm) {
        CustomOptions.setOnConfirm(onConfirm); 
    }

    getOptions() {
        return CustomOptions.getOptions();
    }
}


export default new SweetAlert();