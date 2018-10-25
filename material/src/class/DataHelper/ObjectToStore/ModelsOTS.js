import BaseOTS from './BaseOTS';

class ModelsOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETH_MODELS: "fetch_models",
            FETH_MODEL: "fetch_model",
            CLEAR_MODEL: "clear_model"
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