import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (props) {

  // Maps over day array to display list of days
  const dayOfTheWeek = (props.days).map(
      day => 
        <DayListItem 
          {...day} 
          key={day.id}
          selected={day.name === props.value}
          setDay={props.onChange}
        />
    );

  return (
    <ul>
      {dayOfTheWeek}
    </ul>
  );
}