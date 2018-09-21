import React from 'react';

const ribbons = [
  {
    type: ''
  }, {
    type: 'ribbon-primary'
  }, {
    type: 'ribbon-success'
  }, {
    type: 'ribbon-info'
  }, {
    type: 'ribbon-warning'
  }, {
    type: 'ribbon-danger'
  }
]


const Section = () => {
  return(
    <article className="article">
      <h2 className="article-title">Ribbons</h2>
      <div className="row">
        {
          ribbons.map((ribbon, i) =>
            <div className="col-md-4" key={( i + 1).toString()} >
              <div className={`box box-default mb-3 ribbon-container ${ribbon.type}`}>
                <div className="ribbon-wrapper">
                  <div className="ribbon"> 30% Off </div>
                </div>
                <div className="box-header">Ribbon</div>
                <div className="box-body">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti rerum reprehenderit ipsam natus saepe. Recusandae, itaque nulla in illum dolorum ea eveniet quaerat ipsa placeat magni commodi obcaecati mollitia necessitatibus?</p>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </article>
  );
}

export default Section;
