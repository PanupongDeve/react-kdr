import React from "react";
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
import * as colorsActions from "../../../../../../../actions/ColorsActions";

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

class TextFields extends React.Component {
  state = {
    code: "",
    title: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createColors(this.state)
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
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
              label="ชื่อสี"
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
              onClick={this.props.handleClose}
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
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

const TextFields1 = withStyles(styles)(TextFields);

const Box = props => <TextFields1 {...props} />;

const actions = Object.assign(colorsActions);

export default connect(null,actions)(Box);
