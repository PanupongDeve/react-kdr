import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AddUserForm from './EditForm';

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

class EditModalUserGroup extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.modalClose();
  };

  render() {
    const { classes } = this.props;
    return (
        <Modal
          className="root-modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.handleClose}
        >
          <div className={`${classes.paper} kdr-modal`}>
            <Typography className="model-header" variant="title" id="modal-title">
              แก้ไขส่วนลดของลูกค้าตามกลุ่มสินค้า
            </Typography>
            <AddUserForm handleCloseModal={this.handleClose} {...this.props }/>      
          </div>
        </Modal>
    );
  }
}

EditModalUserGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  userGroup: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const EditModalWrapped = withStyles(styles)(EditModalUserGroup);

export default EditModalWrapped;
