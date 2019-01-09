import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AddUserForm from './AddForm';

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  button: {
    zIndex: "200",
    position: "absolute",
    marginTop: "-16px",
    marginLeft: "12px",
    margin: theme.spacing.unit
  }
});

class AddModal extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="fab"
          color="secondary"
          aria-label="add"
          className={classes.button}
          onClick={this.handleOpen}
        >
          <AddIcon />
        </Button>
        <Modal
          className="root-modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={`${classes.paper} kdr-modal`}>
            <Typography className="model-header" variant="title" id="modal-title">
              เพิ่มกลุ่ม
            </Typography>
            <AddUserForm handleCloseModal={this.handleClose} {...this.props }/>      
          </div>
        </Modal>
      </div>
    );
  }
}

AddModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const AddModalWrapped = withStyles(styles)(AddModal);

export default AddModalWrapped;
