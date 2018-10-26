import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import EditForm from './EditForm';
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
    const { classes, id } = this.props;

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
          <div className={`${classes.paper} kdr-modal`}>
            <Typography className="model-header" variant="title" id="modal-title">
              แก้ไขสี
            </Typography>
            <EditForm handleCloseModal={this.handleClose} id={id} />      
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
