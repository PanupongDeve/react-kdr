import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import MaterialIcon from 'components/MaterialIcon';
import DEMO from 'constants/demoData';

class NavRightList extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    // console.log( event)
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <ul className="list-unstyled float-right">
        <li className="list-inline-item search-box seach-box-right d-none d-md-inline-block">
          <div className="search-box-inner">
            <div className="search-box-icon"><MaterialIcon icon="search" /></div>
            <input type="text" placeholder="search..." />
            <span className="input-bar"></span>
          </div>
        </li>
        <li style={{marginRight: '10px'}}>
          <IconButton
            className="header-btn"
            aria-owns={anchorEl ? 'app-header-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Avatar alt="avatar" src="assets/images-demo/g1.jpg" className="rounded-circle header-avatar" />
          </IconButton>

          <Menu
            id="app-header-menu"
            className="app-header-dropdown"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}> <div><span>Signed in as</span><strong>{DEMO.user}</strong></div> </MenuItem>
            <div className="divider divider-solid my-1"></div>
            <MenuItem onClick={this.handleClose}> <a href="#/app/dashboard"> <i className="material-icons">home</i> <span>Dashboard</span> </a> </MenuItem>
            <MenuItem onClick={this.handleClose}> <a href="#/app/page/about"> <i className="material-icons">person</i> <span>About</span> </a> </MenuItem>
            <MenuItem onClick={this.handleClose}> <a href="#/app/page/services"> <i className="material-icons">help</i> <span>Need Help?</span> </a> </MenuItem>
            <div className="divider divider-solid my-1"></div>
            <MenuItem onClick={this.handleClose}> <a href={DEMO.login}> <i className="material-icons">forward</i> <span>Log Out</span> </a> </MenuItem>
          </Menu>
        </li>
      </ul>
    );
  }
}

export default withRouter(NavRightList);
