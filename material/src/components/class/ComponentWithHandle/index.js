import ComponenPermission from '../ComponenPermission';
import SweetAlertHelper from "../../../class/SweetAlert";
import Notify from "../../../class/Notify";
import BlockUi from "react-block-ui";
import model from '../../../class/ServicesAPI'

const SweetAlert = SweetAlertHelper.getComponent();
const SweetAlertOptions = SweetAlertHelper.getOptions();

export default class ComponentWithHandle extends ComponenPermission {
  constructor(props) {
    super(props);
    this.SweetAlert = SweetAlert;
    this.BlockUi = BlockUi;
    this.SweetAlertOptions = SweetAlertOptions;
    this.SweetAlertHelper = SweetAlertHelper;
    this.notify = new Notify();
    this.NotifyContainer = this.notify.getComponent();
    this.model = model;
  }

  

  handleOpenBlockLoading = () => {
    this.setState({ blockLoading: true });
  };

  handleCloseBlockLoading = () => {
    this.setState({ blockLoading: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  closeModal = () => {
    setTimeout(() => {
      this.props.handleCloseModal();
    }, 300);
  };

  handleAlertDicisions = () => {
    const SweetAlertOptions = SweetAlertHelper.getOptions();
    this.props.swal(SweetAlertOptions.handleDicitions);
  };

  handleAlertError = () => {
    this.handleCloseBlockLoading();
    SweetAlertHelper.setOnConfirm(() => this.closeModal());
    const SweetAlertOptions = SweetAlertHelper.getOptions();
    this.props.swal(SweetAlertOptions.handleError);
  };

  handleAlertSuccess = () => {
    this.handleCloseBlockLoading();
    SweetAlertHelper.setOnConfirm(() => {
      this.closeModal()
    });
    const SweetAlertOptions = SweetAlertHelper.getOptions();
    this.props.swal(SweetAlertOptions.handleSuccess);
  };

  checkMobileDevice = () => {
    return window.innerWidth <= 767
  }
}
