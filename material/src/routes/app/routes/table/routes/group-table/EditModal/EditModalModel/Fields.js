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
import * as modelsActions from "../../../../../../../../actions/Axios/ModelsActions";
import * as groupsActions from "../../../../../../../../actions/Axios/GroupsActions";
import SweetAlertHelper from "../../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../../components/class/ComponentWithHandle";
import model from "../../../../../../../../class/ServicesAPI";
const ModelDTO = model.models.getDTO();

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
      code: "",
      title: "",
      blockLoading: true
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getModel(id);
  }

  componentWillReceiveProps(nextProps) {
    let { model } = nextProps.modelsStore

    model = ModelDTO.getObject(model);
    this.setState({
      code: model.code,
      title: model.title
    });

    if(model) {
      this.setState({
        blockLoading: false
      })
    }
  }

  handleOnCancel = () => {
    SweetAlertHelper.setOnConfirm(() => this.closeModal());
    this.handleAlertDicisions();
  };

  handleSubmit = event => {
    try {
      const { id, groupId } = this.props;
      const { code, title } = this.state;
      const modelsValidator = this.model.models.getModelsValidator();
      event.preventDefault();
      const data = { code, title, groupId } 
      modelsValidator.validate(data);
      SweetAlertHelper.setOnConfirm(() => {
        this.handleOpenBlockLoading();
        this.props.updateModels(
          id,
          data,
          this.handleAlertSuccess,
          this.handleAlertError,
          this.props.getModels,
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
      <Fragment key='2'>
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
                  value={this.state.code}
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
                  label="ชื่อโมเดล"
                  name="title"
                  value={this.state.title}
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

const actions = Object.assign(
  modelsActions,
  groupsActions, 
  SweetAlertActions
);

const mapStateToProps = state => {
  return {
    groupsStore: state.groupsStore,
    modelsStore: state.modelsStore
  };
};

export default connect(
  mapStateToProps,
  actions
)(Box);
