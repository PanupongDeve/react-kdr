import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import red from "@material-ui/core/colors/red";
import * as groupsActions from "../../../../../../../actions/Axios/GroupsActions";
import * as modelsActions from "../../../../../../../actions/Axios/ModelsActions";
import { connect } from "react-redux";
import model from "../../../../../../../class/ServicesAPI";
import SweetAlertHelper from "../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../components/class/ComponentWithHandle";
import AddModalWrapped from "./AddModalModel";
import EditModalWrapped from "./EditModalModel";
const GroupDTO = model.groups.getDTO();
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
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class TextFields extends ComponentWithHandle {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      title: "",
      models: [],
      blockLoading: true
    };
  }

  componentDidMount() {
    this.getGroup();
  }

  getGroup = () => {
    const { id } = this.props;
    this.props.getGroup(id, this.handleAlertError, this.SweetAlertOptions.setMessageError);
  }

  componentWillReceiveProps(nextProps) {
    let { group } = nextProps.groupsStore;

    group = GroupDTO.getObject(group);
    let models = group.models;
    models = ModelDTO.getArrayObject(models);
    models = ModelDTO.filterDataActive(models);
    this.setState({
      code: group.code,
      title: group.title,
      discountA1: group.discountA1,
      discountA2: group.discountA2,
      discountB1: group.discountB1,
      discountB2: group.discountB2,
      discountC1: group.discountC1,
      discountC2: group.discountC2,
      qtyA: group.qtyA,
      qtyB: group.qtyB,
      qtyC: group.qtyC,
      mixedColor: group.mixedColor,
      mixedModel: group.mixedModel,
      models
    });

    models.map( model => {
      this.setState({ [`stateModel${model.id}`]: false} )
      return model;
    })

    if(group) {
      this.setState({  blockLoading: false })
    }
  }

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

  handleOnCancel = () => {
    this.closeModal();
  };

  handleClearLists = (lists) => () => {
    this.setState({
      [lists[0]]: "",
      [lists[1]]: "",
      [lists[2]]: ""
    });
  }

  handleSubmit = event => {
    try {
      const groupsValidator = this.model.groups.getGroupsValidator();
      event.preventDefault();
      const { id } = this.props;
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
      GroupDTO.assigneNullInEmptyField(data, ['qtyA', 'discountA1', 'discountA2', 'qtyB', 'discountB1', 'discountB2', 'qtyC', 'discountC1', 'discountC2']);
      groupsValidator.validate(data);
      GroupDTO.assignNullInZeroFields(data, ['qtyA', 'discountA1', 'discountA2']);
      GroupDTO.assignNullInZeroFields(data, ['qtyB', 'discountB1', 'discountB2']);
      GroupDTO.assignNullInZeroFields(data, ['qtyC', 'discountC1', 'discountC2']);
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
        return message;
      });
    }
  };

  handleDeleteModel = (id) => () => {
    SweetAlertHelper.setOnConfirm(() => {
      this.props.deleteModel(
        id,
        this.getGroup,
        1,
        1,
        this.handleAlertErrorWithoutModal,
        this.SweetAlertOptions.setMessageError
      );   
    });
    this.handleAlertDicisions();
  }

  handleModelModalOpen = (id) => () => {
    this.setState({ [`stateModel${id}`]: true} );
  }

  handleModelModalClose = (id) => () => {
    this.setState({ [`stateModel${id}`]: false} );
  }

  render() {
    const { classes } = this.props;
    if(this.state.blockLoading) {
      return (
        <Fragment>
        <this.BlockUi tag="div" blocking={this.state.blockLoading}>
        </this.BlockUi>
        </Fragment>
      );
    }
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
                  value={this.state.title}
                  id="title"
                  label="ชื่อกลุ่ม"
                  name="title"
                  onChange={this.handleChange("title")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid style={{ marginTop: '10px'}} item xs={12} md={4}>
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

              <Grid item xs={12} md={3}>
                <TextField
                  type="number"
                  value={this.state.qtyA}
                  id="qtyA"
                  label="qtyA"
                  name="qtyA"
                  onChange={this.handleChange("qtyA")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  value={this.state.discountA1}
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

              <Grid item xs={12} md={3}>
                <TextField
                  value={this.state.discountA2}
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

              <Grid item xs={12} md={3}>
                <Button
                  onClick={this.handleClearLists(['qtyA', 'discountA1', 'discountA2'])}
                  className="btn-cancel"
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{ marginTop: '22px'}}
                >
                  <ClearIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Clear A
                </Button>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  type="number"
                  value={this.state.qtyB}
                  id="qtyB"
                  label="qtyB"
                  name="qtyB"
                  onChange={this.handleChange("qtyB")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  value={this.state.discountB1}
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

              <Grid item xs={12} md={3}>
                <TextField
                  value={this.state.discountB2}
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

              <Grid item xs={12} md={3}>
                <Button
                  onClick={this.handleClearLists(['qtyB', 'discountB1', 'discountB2'])}
                  className="btn-cancel"
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{ marginTop: '22px'}}
                >
                  <ClearIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Clear B
                </Button>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  value={this.state.qtyC}
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

              <Grid item xs={12} md={3}>
                <TextField
                  value={this.state.discountC1}
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

              <Grid item xs={12} md={3}>
                <TextField
                  value={this.state.discountC2}
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

              <Grid item xs={12} md={3}>
                <Button
                  onClick={this.handleClearLists(['qtyC', 'discountC1', 'discountC2'])}
                  className="btn-cancel"
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{ marginTop: '22px'}}
                >
                  <ClearIcon
                    className={classNames(classes.leftIcon, classes.iconSmall)}
                  />
                  Clear C
                </Button>
              </Grid>

              <Grid item xs={12} md={8}>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                  <h5>โมเดล</h5>
                  <AddModalWrapped groupId={this.props.id} />
                </div>
                
                {this.state.models.map((model, index) => {
              
                  return (
                      <Fragment key={index} style={{ display: 'flex', flexDirection: 'row'}}>
                            <Chip
                              style={{ marginTop: '25px'}}
                              key={model.id}
                              label={model.title}
                              onClick={this.handleModelModalOpen(model.id)}
                              onDelete={this.handleDeleteModel(model.id)}
                              className={classes.chip}
                            /> 
                        
                        <EditModalWrapped 
                          key={index} 
                          modalClose={this.handleModelModalClose(model.id)}
                          open={this.state[`stateModel${model.id}`]} 
                          id={model.id} 
                          groupId={this.props.id} />
                      </Fragment>
                  );
                })}
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
        {this.checkMobileDevice() ? <this.NotifyContainer /> : null}
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

const actions = Object.assign(modelsActions, groupsActions);

export default connect(
  mapStateToProps,
  actions
)(Box);
