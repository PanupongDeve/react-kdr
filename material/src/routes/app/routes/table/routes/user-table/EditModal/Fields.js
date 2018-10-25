import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import red from "@material-ui/core/colors/red";
import * as usersActions from "../../../../../../../actions/Axios/UsersActions";
import { connect } from "react-redux";
import model from "../../../../../../../class/ServicesAPI";
import SweetAlertHelper from "../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../components/class/ComponentWithHandle";
import role from '../../../../../../../enums/role';
const UserDTO = model.users.getDTO();

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  menu: {
    width: 200
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  cancel: {
    backgroundColor: red[500]
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class TextFields extends ComponentWithHandle {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      address: "",
      tel: "",
      group: "",
      blockLoading: true
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getUser(id);
  }

  componentWillReceiveProps(nextProps) {
    let { user } = nextProps.usersStore;
    user = UserDTO.getObject(user);
    this.setState({
      name: user.name,
      username: user.username,
      address: user.address,
      tel: user.tel,
      group: user.group,
      blockLoading: false
    });
  }

  handleOnCancel = () => {
    SweetAlertHelper.setOnConfirm(() => this.closeModal());
    this.handleAlertDicisions();
  };

  handleSubmit = event => {
    try {
      const usersValidator = this.model.users.getUsersValidator();
      const {name, address, tel, group} = this.state;
      event.preventDefault();
      const { id } = this.props;
      let data = {name, address, tel, group};
      data = UserDTO.filterIsHaveDataForUpdate(data);
      usersValidator.validateUpdate(data);
      SweetAlertHelper.setOnConfirm(() => {
        this.handleOpenBlockLoading();
        this.props.updateUsers(
          id,
          data,
          this.handleAlertSuccess,
          this.handleAlertError,
          this.props.getUsers,
          this.SweetAlertOptions.setMessageError
        );
      });
      this.handleAlertDicisions();
    } catch (errorMessages) {
      errorMessages.map(message => {
        this.notify.error(message);
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <this.BlockUi tag="div" blocking={this.state.blockLoading}>
          <form
            onSubmit={this.handleSubmit}
            className={classes.container}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={24}>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="name"
                  value={this.state.name}
                  label="ชื่อ"
                  name="name"
                  onChange={this.handleChange("name")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  disabled
                  id="username"
                  value={this.state.username}
                  label="รหัสสมาชิก"
                  name="username"
                  onChange={this.handleChange("username")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>


              <Grid item xs={12} md={4}>
                <TextField
                  id="address"
                  value={this.state.address}
                  label="ที่อยู่"
                  name="address"
                  onChange={this.handleChange("address")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  id="tel"
                  label="เบอร์โทรศัพท์"
                  name="tel"
                  value={this.state.tel}
                  onChange={this.handleChange("tel")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl required className={`${classes.formControl} kdr-selector`}>
                  <InputLabel htmlFor="group-required">กลุ่ม</InputLabel>
                  <Select
                    value={this.state.group}
                    onChange={this.handleChange("group")}
                    name="group"
                    inputProps={{
                      id: "group"
                    }}
                    className={`${classes.selectEmpty} selector_input`}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={role.ADMIN}>{role.ADMIN}</MenuItem>
                    <MenuItem value={role.MemberA}>{role.MemberA}</MenuItem>
                    <MenuItem value={role.MemberB}>{role.MemberB}</MenuItem>
                    <MenuItem value={role.DEFAULT}>{role.DEFAULT}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12}>
                <Button
                  className="btn-save"
                  variant="contained"
                  size="large"
                  color="primary"
                  type="submit"
                >
                  <SaveIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Save
                </Button>
                <Button
                  onClick={this.handleOnCancel}
                  className="btn-cancel"
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  <ClearIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </this.BlockUi>
        <this.SweetAlert />
        { this.checkMobileDevice() ? <this.NotifyContainer /> : null }
      </Fragment>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

const TextFields1 = withStyles(styles)(TextFields);

const Box = props => <TextFields1 {...props} />;

const mapStateToProps = state => {
  return {
    usersStore: state.usersStore
  };
};

const actions = Object.assign(usersActions);

export default connect(
  mapStateToProps,
  actions
)(Box);
