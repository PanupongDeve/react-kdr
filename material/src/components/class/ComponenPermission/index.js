import { Component } from 'react';
import Storage from '../../../class/Storage';

export default class ComponentWithPermission extends Component {
    constructor(props) {
        super(props);
        this.storage = new Storage();
    }

    checkPermissionAdmin() {
        if(!this.storage.isToken()) {
            this.handleRedirectToAuth();
        }
    }

    checkPermissionUser() {
        
        if(this.storage.isToken()) {
            this.handleRedirectToApp();
        }
    }

    handleRedirectToApp = () => {
        this.props.history.push('/app/table/color-table');
    }

    handleRedirectToAuth = () => {
        this.props.history.push('/user/login');
    }

}
