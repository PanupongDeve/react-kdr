import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditForm from './EditForm';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/EditTwoTone";
import * as modalModelActions from '../../../../../../../../actions/EditModalModelActions';

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


class EditModal extends React.Component {

  handleClose = () => {
    this.props.modalClose();
  };

  render() {
    const { classes, id, groupId } = this.props;

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
              แก้ไขโมเดล
            </Typography>
            <EditForm handleCloseModal={this.handleClose} id={id} groupId={groupId} />   
          </div>
        </Modal>
    );
  }
}

EditModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const actions = Object.assign(modalModelActions);

// We need an intermediary variable for handling the recursive nesting.
let EditModalWrapped = withStyles(styles)(EditModal);


export default EditModalWrapped;
