import React from 'react';
import styles from './typescale.module.scss';

const Types = [
  {
    scaleCategory: '<h1>h1</h1>',
    typeface: 'Roboto',
    font: 'Light',
    size: '96',
    case: 'sentence',
    letterSpacing: '-1.5'
  },
  {
    scaleCategory: '<h2>h2</h2>',
    typeface: 'Roboto',
    font: 'Light',
    size: '60',
    case: 'sentence',
    letterSpacing: '-0.5'
  },
  {
    scaleCategory: '<h3>h3</h3>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '48',
    case: 'sentence',
    letterSpacing: '0'
  },
  {
    scaleCategory: '<h4>h4</h4>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '34',
    case: 'sentence',
    letterSpacing: '0.25'
  },
  {
    scaleCategory: '<h5>h5</h5>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '24',
    case: 'sentence',
    letterSpacing: '0'
  },
  {
    scaleCategory: '<h6>h6</h6>',
    typeface: 'Roboto',
    font: 'Medium',
    size: '20',
    case: 'sentence',
    letterSpacing: '0.15'
  },
  {
    scaleCategory: '<div class="typo-subtitle1">Subtitle 1</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '16',
    case: 'sentence',
    letterSpacing: '0.15'
  },
  {
    scaleCategory: '<div class="typo-subtitle2">Subtitle 2</h2>',
    typeface: 'Roboto',
    font: 'Medium',
    size: '14',
    case: 'sentence',
    letterSpacing: '0.1'
  },
  {
    scaleCategory: '<div class="typo-body1">Body 1</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '16',
    case: 'sentence',
    letterSpacing: '0.5'
  },
  {
    scaleCategory: '<div class="typo-body2">Body 2</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '14',
    case: 'sentence',
    letterSpacing: '0.25'
  },
  {
    scaleCategory: '<div class="typo-button">Button</div>',
    typeface: 'Roboto',
    font: 'Medium',
    size: '14',
    case: 'All caps',
    letterSpacing: '0.75'
  },
  {
    scaleCategory: '<div class="typo-caption">Caption</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '12',
    case: 'sentence',
    letterSpacing: '0.4'
  },
  {
    scaleCategory: '<div class="typo-overline">Overline</div>',
    typeface: 'Roboto',
    font: 'Regular',
    size: '10',
    case: 'All caps',
    letterSpacing: '1.5'
  },
]



const Section = () => (
  <article className="article">
    <h2 className="article-title">Type Scale</h2>
    <div className="box box-default table-box mdl-shadow--2dp">
      <table className={`mdl-data-table table-bordered table-striped ${styles.table}`}>
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">Scale Category</th>
            <th className="mdl-data-table__cell--non-numeric">Typeface</th>
            <th className="mdl-data-table__cell--non-numeric">Font</th>
            <th>Size</th>
            <th className="mdl-data-table__cell--non-numeric">Case</th>
            <th>Letter Spacing</th>
          </tr>
        </thead>
        <tbody>
          {
            Types.map((type, i) => 
              <tr key={i.toString()}>
                <th className="mdl-data-table__cell--non-numeric text-capitalize" dangerouslySetInnerHTML={{ __html: type.scaleCategory }}></th>
                <th className="mdl-data-table__cell--non-numeric">{type.typeface}</th>
                <th className="mdl-data-table__cell--non-numeric">{type.font}</th>
                <th>{type.size}</th>
                <th className="mdl-data-table__cell--non-numeric">{type.case}</th>
                <th>{type.letterSpacing}</th>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  </article>
)

export default Section;
