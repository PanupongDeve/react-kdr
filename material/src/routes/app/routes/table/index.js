import React from 'react';
import { Route } from 'react-router-dom';

import DataTable from './routes/data-table/'
import Responsive from './routes/responsive/'
import Static from './routes/static/'
import Usertable from './routes/user-table'


const Table = ({ match }) => (
  <div>
    <Route path={`${match.url}/user-table`} component={Usertable}/>
    <Route path={`${match.url}/data-table`} component={DataTable}/>
    <Route path={`${match.url}/responsive`} component={Responsive}/>
    <Route path={`${match.url}/static`} component={Static}/>
  </div>
)

export default Table;
