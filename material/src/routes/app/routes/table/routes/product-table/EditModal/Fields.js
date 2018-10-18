import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import red from "@material-ui/core/colors/red";
import { connect } from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as productsActions from "../../../../../../../actions/Axios/ProductsActions";
import * as groupsActions from "../../../../../../../actions/Axios/GroupsActions";
import * as colorsActions from "../../../../../../../actions/Axios/ColorsActions";
import * as sizesActions from "../../../../../../../actions/Axios/SizesActions";
import SweetAlertHelper from "../../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../../components/class/ComponentWithHandle";
import model from "../../../../../../../class/ServicesAPI";

const GroupDTO = model.groups.getDTO();
const ColorDTO = model.colors.getDTO();
const SizeDTO = model.sizes.getDTO();
const ProductDTO = model.products.getDTO();

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
      code: "",
      title: "",
      price: "",
      groupLists: [],
      groupSelected: '',
      colorLists: [],
      colorSelected: '',
      sizeLists: [],
      sizeSelected: '',
      imagePath: "assets/images-demo/image-icons/coming-soon.png",
      price: '',
      priceA: '',
      priceB: '',
      remark: '',
      blockLoading: true
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getProduct(id);
    this.props.getGroups();
    this.props.getColors();
    this.props.getSizes();
  }

  componentWillReceiveProps(nextProps) {
    let { groups } = nextProps.groupsStore;
    let { colors } = nextProps.colorsStore;
    let { sizes } = nextProps.sizesStore;
    let { product } = nextProps.productsStore

    groups = GroupDTO.getArrayObject(groups);
    groups = GroupDTO.filterDataActive(groups);

    colors = ColorDTO.getArrayObject(colors);
    colors = ColorDTO.filterDataActive(colors);

    sizes = SizeDTO.getArrayObject(sizes);
    sizes = SizeDTO.filterDataActive(sizes);

    product = ProductDTO.getObject(product);
   
    this.setState({
      groupLists: groups,
      colorLists: colors,
      sizeLists: sizes,
      code: product.code,
      price: product.price,
      priceA: product.priceA,
      priceB: product.priceB,
      remark: product.remark,
      title: product.title,
      imagePath: product.imagePath,
      colorSelected: product.colorId,
      groupSelected: product.groupId,
      sizeSelected: product.sizeId
    });

    if(groups && colors && sizes && product) {
      this.setState({
        blockLoading: false
      })
    }
  }

  handleOnCancel = () => {
    SweetAlertHelper.setOnConfirm(() => this.closeModal());
    this.handleAlertDicisions();
  };

  handleUploadFile = async event => {
    event.preventDefault();

    try {
      const productsValidator = this.model.products.getProductsValidator();
      const file = event.target.files[0];
      if (!file) return;
      productsValidator.validateFile(file);
      let data = await model.products.upload(file);
      this.setState({
        imagePath: `http://localhost:3003${data}`
      });
    } catch (errorMessages) {
      errorMessages.map(message => {
        this.notify.error(message);
      });
    }
  };

  handleSubmit = event => {
    try {
      const { id } = this.props;
      const productsValidator = this.model.products.getProductsValidator();
      event.preventDefault();
      const {
        code,
        title,
        price,
        imagePath,
        priceA,
        priceB,
        remark,
        groupSelected: groupId,
        sizeSelected: sizeId,
        colorSelected: colorId
      } = this.state;
      const data = { code, title, price, groupId, sizeId, colorId, imagePath, priceA, priceB, remark};
      productsValidator.validate(data);
      SweetAlertHelper.setOnConfirm(() => {
        this.handleOpenBlockLoading();
        this.props.updateProducts(
          id,
          data,
          this.handleAlertSuccess,
          this.handleAlertError,
          this.props.getProducts,
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

  render() {
    const { classes } = this.props;
    const { groupLists, colorLists, sizeLists }  = this.state;
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
                  label="ชื่อสินค้า"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange("title")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  id="remark"
                  label="หมายเหตุ"
                  value={this.state.remark}
                  name="remark"
                  onChange={this.handleChange("remark")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  id="price"
                  label="ราคาสินค้า"
                  name="price"
                  value={this.state.price}
                  type="number"
                  onChange={this.handleChange("price")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  id="priceA"
                  label="ราคาสินค้าA"
                  name="priceA"
                  value={this.state.priceA}
                  type="number"
                  onChange={this.handleChange("priceA")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  id="priceB"
                  label="ราคาสินค้าB"
                  name="priceB"
                  value={this.state.priceB}
                  type="number"
                  onChange={this.handleChange("priceB")}
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl required className={`${classes.formControl} kdr-selector`}>
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
                    {
                      groupLists.map((group, index) => <MenuItem key={index} value={group.id}>{group.title}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl className={`${classes.formControl} kdr-selector`}>
                  <InputLabel htmlFor="color-required">สี</InputLabel>
                  <Select
                    value={this.state.colorSelected}
                    onChange={this.handleChange("colorSelected")}
                    name="colorSelected"
                    inputProps={{
                      id: "color-required"
                    }}
                    className={`${classes.selectEmpty} selector_input`}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      colorLists.map((color, index) => <MenuItem key={index} value={color.id}>{color.title}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl required className={`${classes.formControl} kdr-selector`}>
                  <InputLabel htmlFor="size-required">ขนาด</InputLabel>
                  <Select
                    value={this.state.sizeSelected}
                    onChange={this.handleChange("sizeSelected")}
                    name="sizeSelected"
                    inputProps={{
                      id: "size-required"
                    }}
                    className={`${classes.selectEmpty} selector_input`}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      sizeLists.map((size, index) => <MenuItem key={index} value={size.id}>{size.title}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>

               <Grid item xs={12} md={4}>
                <div className="img" style={{ width: "80%" }}>
                  <img
                    style={{ width: "80%" }}
                    src={this.state.imagePath}
                    alt=""
                  />
                </div>

                <input
                  accept="image/*"
                  className="d-none"
                  id="contained-button-file2"
                  multiple
                  type="file"
                  onChange={this.handleUploadFile}
                />
                <label
                  htmlFor="contained-button-file2"
                  style={{ marginTop: "20px" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    className="btn-w-md"
                  >
                    {" "}
                    Upload <CloudUploadIcon className={classes.rightIcon} />
                  </Button>
                </label>
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

const actions = Object.assign(productsActions, groupsActions, colorsActions, sizesActions, SweetAlertActions);

const mapStateToProps = state => {
  return {
    groupsStore: state.groupsStore,
    colorsStore: state.colorsStore,
    sizesStore: state.sizesStore,
    productsStore: state.productsStore
  };
};

export default connect(
  mapStateToProps,
  actions
)(Box);
