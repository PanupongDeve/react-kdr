import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import MaterialIcon from "components/MaterialIcon";
import AddModalWrapped from './AddModal/AddModal';
import EditModalWrapped from './EditModal/EditModal';
import { connect } from "react-redux";
import * as colorsActions from "../../../../../../actions/ColorsActions";
import model from '../../../../../../class/FirebaseCloundFireStore';
import SweetAlertHelper from "../../../../../../class/SweetAlert";
import ComponentWithHandle from "../../../../../../components/class/ComponentWithHandle";

const ColorDTO = model.colors.getDTO();

let counter = 0;



function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: "id", numeric: false, disablePadding: true, label: "รหัส" },
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "ชื่อสี"
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "สร้างเมื่อ"
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: true,
    label: "แก้ไขล่าสุด"
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" className="check-box">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
			        onChange={onSelectAllClick} 
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
          <TableCell numeric>Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, handleRemoveItems } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Colors
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div onClick={handleRemoveItems} className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <ul className="list-unstyled float-right">
              <li className="list-inline-item search-box seach-box-right d-none d-md-inline-block" />
              <li className="list-inline-item search-box seach-box-right d-none d-md-inline-block">
                <div className="search-box-inner">
                  <div className="search-box-icon">
                    <MaterialIcon icon="search" />
                  </div>
                  <input
                    onChange={() => alert("Hello world")}
                    type="text"
                    placeholder="search..."
                  />
                  <span className="input-bar" />
                </div>
              </li>
            </ul>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  button: {
    zIndex: "200",
    position: "absolute",
    marginTop: "-30px",
    marginLeft: "-25px",
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class EnhancedTable extends ComponentWithHandle {
  constructor(props) {
    super(props);

    this.state = {
      order: "desc",
      orderBy: "updatedAt",
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5
    };
  }

  componentDidMount() {
    this.props.getColors();
  }


  componentWillReceiveProps(nextProps) {
    let {loading, colors } = nextProps.colorsStore;
    colors = ColorDTO.getArrayObject(colors);
    this.setState({ data: colors })
  }

  componentWillUnmount() {
    this.props.clearColor();
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.documentId) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRemoveItemsConfirmed = event => {
    const { selected } = this.state;
    const items = selected;
    items.map(item => {
      this.props.deleteColor(item);
    })
    this.setState({ selected: [] });
  }

  handleRemoveItems = () => {
    SweetAlertHelper.setOnConfirm(() => this.handleRemoveItemsConfirmed());
    this.handleAlertDicisions();
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    let {loading } = this.props.colorsStore;
    
    

    return (
      <Paper className={classes.root}>
        <this.BlockUi tag="div" blocking={loading}>
        <AddModalWrapped />
        <EnhancedTableToolbar handleRemoveItems={this.handleRemoveItems} numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={`user-table ${classes.table}`} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.documentId);
                  return (
                    <TableRow
                      hover
                    //   onClick={event => this.handleClick(event, n.id)}
                    //   role="checkbox"
                    //   aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                    //   selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.documentId)} />
                      </TableCell>
                      <TableCell numeric>{n.code}</TableCell>
                      <TableCell numeric>{n.title}</TableCell>
                      <TableCell numeric>{n.createdAt}</TableCell>
                      <TableCell numeric>{n.updatedAt}</TableCell>
					            <TableCell className="actions-ceil"><EditModalWrapped documentId={n.documentId} /></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </this.BlockUi>
        <this.SweetAlert />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    colorsStore: state.colorsStore
  };
};

const SweetAlertActions = SweetAlertHelper.getActions();

const actions = Object.assign(colorsActions, SweetAlertActions);

const EnhancedTable1 = withStyles(styles)(EnhancedTable);

const EnhancedTableWithRedux = connect(mapStateToProps,actions)(EnhancedTable1)

const Section = (props) => (
  <article className="article">
    <h2 className="article-title">จัดการสี</h2>
    <EnhancedTableWithRedux {...props} />
  </article>
);

export default Section;
