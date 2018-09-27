import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditUserForm from './EditUserForm';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/EditTwoTone";

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
    marginTop: "-30px",
    marginLeft: "-25px",
    margin: theme.spacing.unit
  }
});

const Actions = (props) => {
  return (
    <Tooltip title="Edit">
      <IconButton onClick={props.handleOpen} className="btn-edit"  aria-label="Edit">
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

class EditModal extends React.Component {
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
        <Actions handleOpen={this.handleOpen} />
        <Modal
          className="root-modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={`${classes.paper} modal-add-user`}>
            <Typography className="model-header" variant="title" id="modal-title">
              แก้ไขผู้ใช้งาน
            </Typography>
            <EditUserForm handleClose={this.handleClose}/>      
          </div>
        </Modal>
      </div>
    );
  }
}

EditModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const EditModalWrapped = withStyles(styles)(EditModal);

export default EditModalWrapped;