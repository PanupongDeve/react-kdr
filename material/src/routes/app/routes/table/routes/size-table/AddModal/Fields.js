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
import { connect } from "react-redux";
import * as sizesActions from "../../../../../../../actions/Axios/SizesActions";
import SweetAlertHelper from "../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../components/class/ComponentWithHandle";


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
      blockLoading: false
    };
  }

  handleOnCancel = () => {
    SweetAlertHelper.setOnConfirm(() => this.closeModal());
    this.handleAlertDicisions();
  };

  handleSubmit = event => {
    try {
      const sizesValidator = this.model.sizes.getSizesValidator();
      event.preventDefault();
      const data = {
        code: this.state.code,
        title: this.state.title,
        blockLoading: false
      };
      sizesValidator.validate(data);
      SweetAlertHelper.setOnConfirm(() => {
        this.handleOpenBlockLoading();
        this.props.createSizes(
          data,
          this.handleAlertSuccess,
          this.handleAlertError,
          this.props.getSizes,
          this.SweetAlertOptions.setMessageError
        );
      });
      this.handleAlertDicisions();
    } catch (errorMessages) {
      errorMessages.map(message => {
        this.notify.error(message);
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
                  label="ชื่อขนาดสินค้า"
                  name="title"
                  onChange={this.handleChange("title")}
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

const SweetAlertActions = SweetAlertHelper.getActions();

const actions = Object.assign(sizesActions, SweetAlertActions);

export default connect(
  null,
  actions
)(Box);
