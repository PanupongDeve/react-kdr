import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import red from "@material-ui/core/colors/red";
import { connect } from "react-redux";
import * as modelsActions from "../../../../../../../../actions/Axios/ModelsActions";
import * as groupsActions from "../../../../../../../../actions/Axios/GroupsActions";
import * as usersActions from "../../../../../../../../actions/Axios/UsersActions";
import SweetAlertHelper from "../../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../../components/class/ComponentWithHandle";
import model from "../../../../../../../../class/ServicesAPI";

const GroupDTO = model.groups.getDTO();

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
    marginTop: theme.spacing.unit * 2
  }
});

class TextFields extends ComponentWithHandle {
  constructor(props) {
    super(props);
    this.state = {
      discountA: 0,
      discountB: 0,
      amount: 0,
      groupLists: [],
      groupSelected:"",
      blockLoading: true
    };
  }

  componentDidMount() {
    this.props.getGroups(
      this.handleAlertErrorWithoutModal,
      this.SweetAlertOptions.setMessageError,
      this.handleCloseBlockLoading
    );

    const { userGroup } = this.props;
    this.setState({
      discountA: userGroup.discountA || 0,
      discountB: userGroup.discountB || 0,
      amount: userGroup.amount || 0,
      groupSelected: userGroup.groupId
    })
  }

  componentWillReceiveProps(nextProps) {
    let { groups } = nextProps.groupsStore;

    groups = GroupDTO.getArrayObject(groups);
    groups = GroupDTO.filterDataActive(groups);

    this.setState({
      groupLists: groups,
      blockLoading: false
    });
  }

  handleOnCancel = () => {
    this.closeModal();
  };


  handleSubmit = event => {
    try {
      
      const { groupSelected:groupId , discountA, discountB, amount  } = this.state;
      const { userGroup } = this.props;
      const UserGroupsValidator = this.model.usersGroups.getValidator();
      event.preventDefault();
      const data = { userId: userGroup.userId , groupId, discountA, discountB, amount  } 
      UserGroupsValidator.validate(data);
      GroupDTO.deleteEmptyField(data, ['discountB']);
      SweetAlertHelper.setOnConfirm(() => {
        this.handleOpenBlockLoading();
        this.props.updateUsersGroup(
          data,
          this.handleAlertSuccess,
          this.handleAlertError,
          this.props.getUser,
          this.SweetAlertOptions.setMessageError
        );
      });
      this.handleAlertDicisions();
    } catch (errorMessages) {
      errorMessages.map(message => {
        this.notify.error(message);
        return message;
      })
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment key='1'>
        <this.BlockUi tag="div" blocking={this.state.blockLoading}>
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={24}>
              <Grid item xs={12} md={4}>
                <FormControl
                    required
                    className={`${classes.formControl} kdr-selector`}
                  >
                    <InputLabel htmlFor="group-required">กลุ่ม</InputLabel>
                    <Select
                      value={this.state.groupSelected}
                      onChange={this.handleChange("groupSelected")}
                      name="groupSelected"
                      inputProps={{
                        id: "group-required"
                      }}
                      className={`${classes.selectEmpty} selector_input`}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.state.groupLists.map((group, index) => (
                        <MenuItem key={index} value={group.id}>
                          {group.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  type="number"
                  id="amount"
                  label="จำนวน"
                  name="amount"
                  onChange={this.handleChange("amount")}
                  value={this.state.amount}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4} />

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  type="number"
                  id="discountA"
                  label="ส่วนลดA"
                  name="discountA"
                  onChange={this.handleChange("discountA")}
                  value={this.state.discountA}
                  defaultChecked={this.props.userGroup.discountA}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  type="number"
                  id="discountB"
                  label="ส่วนลดB"
                  name="discountB"
                  onChange={this.handleChange("discountB")}
                  value={this.state.discountB}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Button
                  onClick={this.handleSubmit}
                  className="btn-save"
                  variant="contained"
                  size="large"
                  color="primary"
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
  classes: PropTypes.object.isRequired,
  userGroup: PropTypes.object.isRequired
};

const TextFields1 = withStyles(styles)(TextFields);

const Box = props => <TextFields1 {...props} />;

const SweetAlertActions = SweetAlertHelper.getActions();

const actions = Object.assign(
  modelsActions,
  groupsActions, 
  SweetAlertActions,
  usersActions
);

const mapStateToProps = state => {
  return {
    groupsStore: state.groupsStore,
  };
};

export default connect(
  mapStateToProps,
  actions
)(Box);
