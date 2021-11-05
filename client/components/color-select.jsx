import React from 'react';

export default function ColorSelect(props) {
  let optionNone;
  if (props.classes.includes('secondary-select')) {
    optionNone = '';
  } else {
    optionNone = 'd-none';
  }
  return (
    <div className={props.classes} onChange={props.onChange}>
      <select className='form-select'>
        <option defaultValue={props.colorCategory}>{`${props.colorCategorySelect}: ${props.colorCategory}`}</option>
        <option value="black">{props.colorCategorySelect + ': Black'}</option>
        <option value="white">{props.colorCategorySelect + ': White'}</option>
        <option value="grey">{props.colorCategorySelect + ': Grey'}</option>
        <option value="red">{props.colorCategorySelect + ': Red'}</option>
        <option value="yellow">{props.colorCategorySelect + ': Yellow'}</option>
        <option value="green">{props.colorCategorySelect + ': Green'}</option>
        <option value="cyan">{props.colorCategorySelect + ': Cyan'}</option>
        <option value="blue">{props.colorCategorySelect + ': Blue'}</option>
        <option value="magenta">{props.colorCategorySelect + ': Magenta'}</option>
        <option value="khaki">{props.colorCategorySelect + ': Khaki'}</option>
        <option className={optionNone} value="none">{props.colorCategorySelect + ': none'}</option>
      </select>
    </div>
  );
}
