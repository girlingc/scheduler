import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;
  const dayClass = classNames(
    "day-list__item",
    {'day-list__item--selected': selected}, 
    {'day-list__item--full': !spots}
  );

  const formatSpots = ()=>{
    const singularOrPluralSpot = spots > 1 ? 'spots' : 'spot';
    return !spots ? "no spots remaining" : `${spots} ${singularOrPluralSpot} remaining` ;
  };

  return (
    <li onClick={() => setDay(name)} className={dayClass} >
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}