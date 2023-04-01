/*
 Copyright 2022 Quverus LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function PianoOctaveWhite(props : any): JSX.Element {
  return (<div className="OctaveWhite">
    <div className="KeyWhite">
      <div className="KeyWhiteLabel">{props.LabelC}</div>
    </div>
    <div className="KeyWhite">
      <div className="KeyWhiteLabel">{props.LabelD}</div>
    </div>
    <div className="KeyWhite">
      <div className="KeyWhiteLabel">{props.LabelE}</div>
    </div>
    <div className="KeyWhite">
      <div className="KeyWhiteLabel">{props.LabelF}</div>
    </div>
    <div className="KeyWhite">
      <div className="KeyWhiteLabel">{props.LabelG}</div>
    </div>
    <div className="KeyWhite">
      <div className="KeyWhiteLabel">{props.LabelA}</div>
    </div>
    <div className="KeyWhite">
      <div className="KeyWhiteLabel">{props.LabelB}</div>
    </div>
  </div>);
}
