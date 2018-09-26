import React from 'react';
import QueueAnim from 'rc-queue-anim';
import UserFields from './UserFields';


const Page = (props) => (

      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-4"> <UserFields {...props}/>  </div>
      </QueueAnim>
  
)

export default Page;
