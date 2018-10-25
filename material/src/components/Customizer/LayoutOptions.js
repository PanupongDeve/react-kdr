import React from 'react';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  toggleBoxedLayout,
  toggleCollapsedNav,
  toggleNavBehind,
  toggleFixedHeader,
  changeSidebarWidth
} from 'actions/settingsActions';



class LayoutOptions extends React.Component {

  onToggleFixedHeader = (e, val) => {
    const { handleToggleFixedHeader } = this.props;
    handleToggleFixedHeader(val);
  }

  onToggleCollapsedNav = (e, val) => {
    const { handleToggleCollapsedNav } = this.props;
    handleToggleCollapsedNav(val);
  }

  onToggleNavBehind = (e, val) => {
    const { handleToggleNavBehind } = this.props;
    handleToggleNavBehind(val);
  }

  onToggleBoxedLayout = (e, val) => {
    const { handleToggleBoxedLayout } = this.props;
    handleToggleBoxedLayout(val);
  }

  onSidebarWidthChange = (e) => {
    const { handleSidebarWidthChange } = this.props;
    let val = e.target.value;
    handleSidebarWidthChange(val);
  }

  render() {
    const { layoutBoxed, navCollapsed, navBehind, fixedHeader, sidebarWidth } = this.props;

    return (
      <section className="section-layout-options">
        <h4 className="section-header">Layout Options</h4>
        <div className="divider my-1" />

        <List className="layout-options">
          <ListItem className="layout-option">
            <ListItemText primary="Fix Header" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.onToggleFixedHeader}
                checked={fixedHeader}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className="layout-option">
            <ListItemText primary="Collapsed Sidenav" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.onToggleCollapsedNav}
                checked={navCollapsed}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className="layout-option">
            <ListItemText primary="Full Width Header" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.onToggleNavBehind}
                checked={navBehind}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem className="layout-option">
            <ListItemText primary="Boxed Layout" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.onToggleBoxedLayout}
                checked={layoutBoxed}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <FormControl className="w-100 layout-select">
          <InputLabel htmlFor="sidenav-width">Sidenav Width</InputLabel>
          <Select
            value={sidebarWidth}
            onChange={this.onSidebarWidthChange}
            input={<Input name="sidenav_width" id="sidenav-width" />}
          >
            <MenuItem value='small'>Small size</MenuItem>
            <MenuItem value='middle'>Middle size</MenuItem>
            <MenuItem value='large'>Large size</MenuItem>
          </Select>
        </FormControl>

      </section>
    );
  }
}

const mapStateToProps = state => ({
  layoutBoxed: state.settings.layoutBoxed,
  navCollapsed: state.settings.navCollapsed,
  navBehind: state.settings.navBehind,
  fixedHeader: state.settings.fixedHeader,
  sidebarWidth: state.settings.sidebarWidth
});
const mapDispatchToProps = dispatch => ({
  handleToggleFixedHeader: (isFixedHeader) => {
    dispatch(toggleFixedHeader(isFixedHeader));
  },
  handleToggleCollapsedNav: (isNavCollapsed) => {
    dispatch(toggleCollapsedNav(isNavCollapsed));
  },
  handleToggleNavBehind: (isNavBehind) => {
    dispatch(toggleNavBehind(isNavBehind));
  },
  handleToggleBoxedLayout: (isLayoutBoxed) => {
    dispatch(toggleBoxedLayout(isLayoutBoxed));
  },
  handleSidebarWidthChange: (sidebarWidth) => {
    dispatch(changeSidebarWidth(sidebarWidth));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutOptions);
