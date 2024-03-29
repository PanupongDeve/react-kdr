import BaseOTS from './BaseOTS';

class SizesOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETCH_SIZES: "fetch_sizes",
            FETCH_SIZE: "fetch_size",
            CLEAR_SIZE: "clear_size"
        }
    }

    intialData() {
        return {
            sizes: [],
            size: ''
        }
    }

}

export default new SizesOTS();