
export default class BaseOTS {
    constructor() {
        this.loading = false;
        this.payload = null;
        this.baseActionsTypes = {
            LOADING: 'loading'
        }
      
    }

    getActionsTypes() {
        return Object.assign(this.actionsTypes, this.baseActionsTypes);
    }

    sendPayloadToReducer(type, payload) {
        return (dispatch) => {
            dispatch({
                type,
                payload
            });
        }
        
    }

    sendDataFormReducerToStore(payload, name) {
        const store = {};
        store[name] = payload;
        store.loading = this.loading;
        return store;
    }

    intialState() {
        return {
            loading: true
        }
    }

    
}