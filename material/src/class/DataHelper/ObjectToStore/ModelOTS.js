import BaseOTS from './BaseOTS';

class ModelsOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETH_SIZES: "fetch_models",
            FETH_SIZE: "fetch_model",
            CLEAR_SIZE: "clear_model"
        }
    }

    intialData() {
        return {
            models: [],
            model: ''
        }
    }

}

export default new ModelsOTS();