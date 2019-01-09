import BaseOTS from './BaseOTS';

class ColorsOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETCH_COLORS: "fetch_colors",
            FETCH_COLOR: "fetch_color",
            CLEAR_COLOR: "clear_color"
        }
    }

    intialData() {
        return {
            colors: [],
            color: ''
        }
    }

}

export default new ColorsOTS();