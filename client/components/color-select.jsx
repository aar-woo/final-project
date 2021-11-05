import React from 'react';

export default function ColorSelect(props) {
  return (
    <div className={props.divClasses}>
      <select className='form-select'>
        <option defaultValue={props.colorCategory}>{`${props.colorCategorySelect}: ${props.colorCategory}`}</option>
        <option value="black">{props.colorCategorySelect + ': Black'}</option>
        <option value="white">{props.colorCategorySelect + ': White'}</option>
      </select>
    </div>
  );
}
