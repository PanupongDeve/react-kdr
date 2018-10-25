import React from 'react';
import { Route } from 'react-router-dom';

import DataTable from './routes/data-table/'
import Responsive from './routes/responsive/'
import Static from './routes/static/'
import Usertable from './routes/user-table'
import ColorTable from './routes/color-table';
import SizeTable from './routes/size-table';
import GroupTable from './routes/group-table';
import ProductTable from './routes/product-table';
import OrderTable from './routes/order-table';
import ModelTable from './routes/model-table';

const Table = ({ match }) => (
  <div>
    <Route path={`${match.url}/user-table`} component={Usertable}/>
    <Route path={`${match.url}/color-table`} component={ColorTable}/>
    <Route path={`${match.url}/size-table`} component={SizeTable}/>
    <Route path={`${match.url}/model-table`} component={ModelTable}/>
    <Route path={`${match.url}/group-table`} component={GroupTable}/>
    <Route path={`${match.url}/product-table`} component={ProductTable}/>
    <Route path={`${match.url}/order-table`} component={OrderTable}/>
    <Route path={`${match.url}/data-table`} component={DataTable}/>
    <Route path={`${match.url}/responsive`} component={Responsive}/>
    <Route path={`${match.url}/static`} component={Static}/>
  </div>
)

export default Table;
