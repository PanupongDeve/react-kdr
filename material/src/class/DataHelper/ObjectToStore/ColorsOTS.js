import BaseOTS from './BaseOTS';

class ColorsOTS extends BaseOTS {
    constructor() {
        super();
        this.actionsTypes = {
            FETH_COLORS: "fetch_colors",
            FETH_COLOR: "fetch_color"
        }
    }

}

export default new ColorsOTS();