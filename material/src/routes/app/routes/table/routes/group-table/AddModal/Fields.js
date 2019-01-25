import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import red from "@material-ui/core/colors/red";
import { connect } from "react-redux";
import * as groupsActions from "../../../../../../../actions/Axios/GroupsActions";
import SweetAlertHelper from "../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../components/class/ComponentWithHandle";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import model from '../../../../../../../class/ServicesAPI';

const GroupDTO = model.groups.getDTO();

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    mixedColor: false,
    mixedModel: false
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
      discountA1: '',
      discountA2: '',
      discountB1: '',
      discountB2: '',
      discountC1: '',
      discountC2: '',
      qtyA: '',
      qtyB: '',
      qtyC: '',
      mixedColor: false,
      mixedModel: false,
      blockLoading: false
    };
  }

  handleOnCancel = () => {
    this.closeModal();
  };

  handleCheckMixColor = () => {
    this.setState({
      mixedColor: true,
      mixedModel: false
    });
  }

  handleCheckMixModel = () => {
    this.setState({
      mixedColor: false,
      mixedModel: true
    });
  }

  handleSubmit = event => {
    try {
      const groupsValidator = this.model.groups.getGroupsValidator();
      event.preventDefault();
      const data = {
        code: this.state.code,
        title: this.state.title,
        discountA1: this.state.discountA1,
        discountA2: this.state.discountA2,
        discountB1: this.state.discountB1,
        discountB2: this.state.discountB2,
        discountC1: this.state.discountC1,
        discountC2: this.state.discountC2,
        qtyA: this.state.qtyA,
        qtyB: this.state.qtyB,
        qtyC: this.state.qtyC,
        mixedColor: this.state.mixedColor,
        mixedModel: this.state.mixedModel

      };
      GroupDTO.deleteEmptyField(data, ['discountA1', 'discountA2', 'discountB1', 'discountB2', 'discountC1', 'discountC2', 'qtyA', 'qtyB', 'qtyC']);
      groupsValidator.validate(data);
      SweetAlertHelper.setOnConfirm(() => {
        this.handleOpenBlockLoading();
        this.props.createGroups(
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
        return message;
      })
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
                  id="code"
                  label="รหัส"
                  name="code"
                  onChange={this.handleChange("code")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="title"
                  label="ชื่อกลุ่ม"
                  name="title"
                  onChange={this.handleChange("title")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  type="number"
                  id="qtyA"
                  label="qtyA"
                  name="qtyA"
                  onChange={this.handleChange("qtyA")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  type="number"
                  id="qtyB"
                  label="qtyB"
                  name="qtyB"
                  onChange={this.handleChange("qtyB")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  type="number"
                  id="qtyC"
                  label="qtyC"
                  name="qtyC"
                  onChange={this.handleChange("qtyC")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  id="discountA1"
                  type="number"
                  label="discountA1"
                  name="discountA1"
                  onChange={this.handleChange("discountA1")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  type="number"
                  id="discountA2"
                  label="discountA2"
                  name="discountA2"
                  onChange={this.handleChange("discountA2")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  type="number"
                  id="discountB1"
                  label="discountB1"
                  name="discountB1"
                  onChange={this.handleChange("discountB1")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  type="number"
                  id="discountB2"
                  label="discountB2"
                  name="discountB2"
                  onChange={this.handleChange("discountB2")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  type="number"
                  id="discountC1"
                  label="discountC1"
                  name="discountC1"
                  onChange={this.handleChange("discountC1")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  type="number"
                  id="discountC2"
                  label="discountC2"
                  name="discountC2"
                  onChange={this.handleChange("discountC2")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              

              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.mixedColor}
                      onChange={this.handleCheckMixColor}
                      value={this.state.mixedColor}
                    />
                  }
                  label="Mix-Color"
                  className="kdr-checkbox"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.mixedModel}
                      onChange={this.handleCheckMixModel}
                      value={this.state.mixedModel}
                    />
                  }
                  label="Mix-Model"
                  className="kdr-checkbox"
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

const SweetAlertActions = SweetAlertHelper.getActions();

const actions = Object.assign(groupsActions, SweetAlertActions);

export default connect(
  null,
  actions
)(Box);
