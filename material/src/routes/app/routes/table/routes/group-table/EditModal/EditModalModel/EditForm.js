import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Fields from './Fields';


const Page = (props) => (

      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"> <Fields {...props}/> </div>
      </QueueAnim>
  
)

export default Page;
