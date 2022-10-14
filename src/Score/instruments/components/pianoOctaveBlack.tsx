/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function PianoOctaveBlack(props: any): JSX.Element {
    return (
        <div className="OctaveBlack">
            <div className="KeySpacerStart"></div>
            <div className="KeyBlack">
                <div className="KeyBlackLabel">{props.LabelCSharp}</div>
            </div>
            <div className="KeySpacerHalf"></div>
            <div className="KeyBlack">
                <div className="KeyBlackLabel">{props.LabelDSharp}</div>
            </div>
            <div className="KeySpacerWhole"></div>
            <div className="KeyBlack">
                <div className="KeyBlackLabel">{props.LabelFSharp}</div>
            </div>
            <div className="KeySpacerHalf"></div>
            <div className="KeyBlack">
                <div className="KeyBlackLabel">{props.LabelGSharp}</div>
            </div>
            <div className="KeySpacerHalf"></div>
            <div className="KeyBlack">
                <div className="KeyBlackLabel">{props.LabelASharp}</div>
            </div>
        </div>
    );
}
