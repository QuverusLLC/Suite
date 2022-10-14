/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

import {PianoOctaveWhite} from "./pianoOctaveWhite";
import {PianoOctaveBorder} from "./pianoOctaveBorder";
import {PianoOctaveBlack} from "./pianoOctaveBlack";

export function PianoOctave(props: any): JSX.Element {
    return (
        <div className="PianoOctaveWrap" style={{width: props.Width}}>
            <div className="PianoOctave">
                <PianoOctaveWhite
                    LabelC={props.LabelC}
                    LabelD={props.LabelD}
                    LabelE={props.LabelE}
                    LabelF={props.LabelF}
                    LabelG={props.LabelG}
                    LabelA={props.LabelA}
                    LabelB={props.LabelB}
                />
                <PianoOctaveBorder />
                <PianoOctaveBlack
                    LabelCSharp={props.LabelCSharp}
                    LabelDSharp={props.LabelDSharp}
                    LabelFSharp={props.LabelFSharp}
                    LabelGSharp={props.LabelGSharp}
                    LabelASharp={props.LabelASharp}
                />
            </div>
        </div>
    );
}
