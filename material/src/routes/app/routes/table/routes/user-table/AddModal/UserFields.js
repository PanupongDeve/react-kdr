import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";
import red from '@material-ui/core/colors/red';

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
    backgroundColor: red[500],
  },
});

class TextFields extends React.Component {
  state = {
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
	console.log(this.props);
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={24}>
          <Grid item xs={12} md={4}>
            <TextField
              required
              id="code"
              label="Code"
              name="code"
              className={classes.textField}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              id="username"
              label="Username"
              name="username"
              className={classes.textField}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              id="name"
              label="Name"
              name="name"
              className={classes.textField}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              id="tel"
              label="Telephone"
              name="tel"
              className={classes.textField}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              id="address"
              label="Address"
              name="address"
              className={classes.textField}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              id="group"
              label="Group"
              name="group"
              className={classes.textField}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button className='btn-save' variant="contained" size="large" color="primary">
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Save
            </Button>
			<Button onClick={this.props.handleClose} className='btn-cancel' variant="contained" size="large" color="primary">
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

const Box = (props) => <TextFields1 {...props}/>;

export default Box;
