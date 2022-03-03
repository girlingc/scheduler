import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {

  // Adds correct class to display selected day
  const dayClass = classNames(
    "day-list__item",
    {'day-list__item--selected': props.selected}, 
    {'day-list__item--full': !props.spots}
  );

  // Formats information to display gramatically correct data
  const formatSpots = ()=>{
    const singularOrPluralSpot = props.spots > 1 ? 'spots' : 'spot';
    return !props.spots ? "no spots remaining" : `${props.spots} ${singularOrPluralSpot} remaining` ;
  };

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}