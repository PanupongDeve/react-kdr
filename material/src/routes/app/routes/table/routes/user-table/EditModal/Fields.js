import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import red from "@material-ui/core/colors/red";
import * as usersActions from "../../../../../../../actions/Axios/UsersActions";
import * as groupsActions from "../../../../../../../actions/Axios/GroupsActions";
import { connect } from "react-redux";
import model from "../../../../../../../class/ServicesAPI";
import SweetAlertHelper from "../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../components/class/ComponentWithHandle";
import role from '../../../../../../../enums/role';
import AddModalWrapped from "./AddModalUserGroups";
import EditModalWrapped from "./EditModalUserGroup";
const UserDTO = model.users.getDTO();
const GroupsDTO = model.groups.getDTO();

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
      groups: [],
      usersGroup: "",
      usersGroups: [],
      blockLoading: true
    };
  }

  componentDidMount() {
    this.getUser();
  }

  componentWillReceiveProps(nextProps) {
    let { user } = nextProps.usersStore;
    user = UserDTO.getObject(user);
    let { groups } = user;
    groups = GroupsDTO.getArrayObject(groups);
    groups = GroupsDTO.filterDataActive(groups);
    this.setState({
      name: user.name,
      username: user.username,
      address: user.address,
      tel: user.tel,
      group: user.group,
      groups
    });

    groups.map( group => {
      this.setState({ [`stateGroup${group.id}`]: false} );
      return group;
    });

    if(user) {
      this.setState({  blockLoading: false })
    }
  }

  getUser = () => {
    const { id } = this.props;
    this.props.getUser(id, this.handleAlertError,this.SweetAlertOptions.setMessageError);
  }

  handleOnCancel = () => {
    this.closeModal();
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
        return message;
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleGroupModalOpen = (id) => () => {
    this.setState({ [`stateGroup${id}`]: true} );
  }

  handleGroupModalClose = (id) => () => {
    this.setState({ [`stateGroup${id}`]: false} );
  }

  handleDeleteUserGroup = (groupId) => () => {
    let { user } = this.props.usersStore;
    SweetAlertHelper.setOnConfirm(() => {
      this.props.deleteUsersGroup(
        user.id,
        groupId,
        this.getUser,
        this.handleAlertErrorWithoutModal,
        this.SweetAlertOptions.setMessageError
      );   
    });
    this.handleAlertDicisions();
  }

  render() {
    const { classes } = this.props;
    let { user } = this.props.usersStore;
    const { groups } = user;
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

              <Grid item xs={12} md={8}>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                  <h5>กลุ่ม</h5>
                  <AddModalWrapped createUsersGroups={this.props.createUsersGroups} getUser={this.getUser} userId={this.props.id} />
                </div>
                
                
                { groups ? groups.map((group, index) => {
                  return (
                      <Fragment key={index} style={{ display: 'flex', flexDirection: 'row'}}>
                            <Chip
                              key={index}
                              style={{ marginTop: '25px', marginRight: '12px'}}
                              key={group.id}
                              label={group.title}
                              onClick={this.handleGroupModalOpen(group.id)}
                              onDelete={this.handleDeleteUserGroup(group.id)}
                              className={classes.chip}
                            /> 
                        
                        <EditModalWrapped 
                          key={index} 
                          modalClose={this.handleGroupModalClose(group.id)}
                          open={this.state[`stateGroup${group.id}`]} 
                          id={group.id} 
                          userGroup={group.user_group}
                          groupId={this.props.id} />
                      </Fragment>
                  );
                }): null}
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

const actions = Object.assign(usersActions, groupsActions);

export default connect(
  mapStateToProps,
  actions
)(Box);
