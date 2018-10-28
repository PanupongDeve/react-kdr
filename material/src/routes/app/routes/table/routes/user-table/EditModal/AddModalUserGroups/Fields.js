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
      discountA: 10,
      discountB: 10,
      amount: 10,
      groupLists: [],
      groupSelected:"",
      blockLoading: true
    };
  }

  componentDidMount() {
    this.props.getGroups();
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
    SweetAlertHelper.setOnConfirm(() => this.closeModal());
    this.handleAlertDicisions();
  };


  handleSubmit = event => {
    try {
      
      const { groupSelected:groupId , discountA, discountB, amount  } = this.state;
      const { userId } = this.props;
      const UserGroupsValidator = this.model.usersGroups.getValidator();
      event.preventDefault();
      const data = { userId, groupId, discountA, discountB, amount  } 
      UserGroupsValidator.validate(data);
      GroupDTO.deleteEmptyField(data, ['discountB']);
      console.log(data);
      SweetAlertHelper.setOnConfirm(() => {
        this.handleOpenBlockLoading();
        this.props.createUsersGroups(
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
  classes: PropTypes.object.isRequired
};

const TextFields1 = withStyles(styles)(TextFields);

const Box = props => <TextFields1 {...props} />;

const SweetAlertActions = SweetAlertHelper.getActions();

const actions = Object.assign(
  modelsActions,
  groupsActions, 
  SweetAlertActions
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
