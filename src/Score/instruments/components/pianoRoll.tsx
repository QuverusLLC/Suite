/*
 Copyright 2022 Quverus LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function PianoRoll(props : any): JSX.Element {
  return (<div className="PianoRoll" key={props.ID} style={{
      width: props.Width,
      height: props.Height
    }}>
    {props.Octaves.map((Octave : JSX.Element) => Octave)}
  </div>);
}
