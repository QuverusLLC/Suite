/*
 Copyright 2022 Quverus LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

import {GuitarString} from "./guitarString";

export function GuitarRoll(props : any): JSX.Element {
  const strings = [] as Array < JSX.Element >;
  const wrapHeight = `${ (1 / props.Labels.length) * 100}%`;
  for (let i = props.Labels.length - 1; i >= 0; i--) {
    const id = `${props.ID}String${i}`;
    strings.push(<GuitarString key={id} ID={id} Tuning={props.Labels[i][0]} Labels={props.Labels[i]} StringHeight={1 + i * 0.25} Height={wrapHeight}/>);
  }
  const minHeight = props.Labels.length * 22;
  return (<div className="GuitarRoll" style={{
      width: props.Width,
      height: props.Height,
      minHeight: `${minHeight}px`
    }}>
    {strings.map((String : JSX.Element) => String)}
  </div>);
}
