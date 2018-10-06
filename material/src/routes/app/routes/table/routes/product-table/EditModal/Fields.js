import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import red from "@material-ui/core/colors/red";
import * as groupsActions from "../../../../../../../actions/Axios/GroupsActions";
import { connect } from "react-redux";
import model from "../../../../../../../class/ServicesAPI";
import SweetAlertHelper from "../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../components/class/ComponentWithHandle";
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
  }
});

class TextFields extends ComponentWithHandle {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      title: "",
      blockLoading: true
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getGroup(id);
  }

  componentWillReceiveProps(nextProps) {
    let { group } = nextProps.groupsStore;
    group = GroupDTO.getObject(group);
    this.setState({
      code: group.code,
      title: group.title,
      blockLoading: false
    });
  }

  handleOnCancel = () => {
    SweetAlertHelper.setOnConfirm(() => this.closeModal());
    this.handleAlertDicisions();
  };

  handleSubmit = event => {
    try {
      const groupsValidator = this.model.groups.getGroupsValidator();
      event.preventDefault();
      const { id } = this.props;
      const data = {
        code: this.state.code,
        title: this.state.title
      };
      groupsValidator.validate(data);
      SweetAlertHelper.setOnConfirm(() => {
        this.handleOpenBlockLoading();
        this.props.updateGroups(
          id,
          data,
          this.handleAlertSuccess,
          this.handleAlertError,
          this.props.getGroups,
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
                  value={this.state.code}
                  onChange={this.handleChange("code")}
                  id="code"
                  label="รหัส"
                  name="code"
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  value={this.state.title}
                  onChange={this.handleChange("title")}
                  id="title"
                  label="ชื่อสินค้า"
                  name="title"
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
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
    groupsStore: state.groupsStore
  };
};

const actions = Object.assign(groupsActions);

export default connect(
  mapStateToProps,
  actions
)(Box);
