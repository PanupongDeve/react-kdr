
export default class BaseOTS {
    constructor() {
        this.loading = false;
        this.payload = null;
      
    }

    getActionsTypes() {
        return this.actionsTypes;
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
        return Object.assign({loading: true}, this.intialData())
    }

    
}