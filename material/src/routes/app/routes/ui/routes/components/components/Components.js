import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Avatars from './avatars/Avatars';
import Badges from './badges/Badges';
import BottomNavigation from './bottom-navigation/BottomNavigation';
import Callouts from './callouts/Callouts';
import ExpansionPanels from './expansion-panels/ExpansionPanels';
import Paper from './paper/Paper';
import Popovers from './popovers/Popovers';
import Progress from './progress/Progress';
import Ribbons from './ribbons/Ribbons';
// import Snackbars from './snackbars/Snackbars';
import Tabs from './tabs/Tabs';
import Tooltips from './tooltips/Tooltips';


const Components = () => (
  <div className="container-fluid container-mw-xl chapter">

    <QueueAnim type="bottom" className="ui-animate">
      <div key="2"><Avatars /></div>
      <div key="3"><Popovers /></div>
      <div key="4"><Badges /></div>
      <div key="5"><Tabs /></div>
      <div key="6"><BottomNavigation /></div>
      <div key="7"><Progress /></div>
      <div key="9"><Callouts /></div>
      <div key="10"><Ribbons /></div>
      <div key="11"><ExpansionPanels /></div>
      <div key="12"><Tooltips /></div>
      <div key="13"><Paper /></div>
    </QueueAnim>

  </div>
);

export default Components;
