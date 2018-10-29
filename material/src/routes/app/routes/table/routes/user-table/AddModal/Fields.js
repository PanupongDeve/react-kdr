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
import { connect } from "react-redux";
import * as usersActions from "../../../../../../../actions/Axios/UsersActions";
import SweetAlertHelper from "../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../components/class/ComponentWithHandle";
import role from '../../../../../../../enums/role';

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
      password: "",
      address: "",
      tel: "",
      group: "",
      blockLoading: false
    };
  }

  handleOnCancel = () => {
    SweetAlertHelper.setOnConfirm(() => this.closeModal());
    this.handleAlertDicisions();
  };

  handleSubmit = event => {
    try {
      event.preventDefault();
      const {name, username, password, address, tel, group} = this.state;
      const usersValidator = this.model.users.getUsersValidator();
      const UserDTO = this.model.users.getDTO();
      let data = { name, username, password, address, tel, group };
      data = UserDTO.filterIsHaveData(data);
      usersValidator.validateCreate(data);
      SweetAlertHelper.setOnConfirm(() => {
        this.handleOpenBlockLoading();
        this.props.createUsers(
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
        return message;
      });
    }
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
                  id="username"
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
                  required
                  id="password"
                  label="รหัสผ่าน"
                  name="password"
                  onChange={this.handleChange("password")}
                  className={classes.textField}
                  margin="normal"
                  type="password"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  id="address"
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
                  onChange={this.handleChange("tel")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl required className={`${classes.formControl} kdr-selector`}>
                  <InputLabel htmlFor="group-required">สิทธ์การใช้งาน</InputLabel>
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

const SweetAlertActions = SweetAlertHelper.getActions();

const actions = Object.assign(usersActions, SweetAlertActions);

export default connect(
  null,
  actions
)(Box);
