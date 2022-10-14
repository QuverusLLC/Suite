/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

import {GuitarFret} from "./guitarFret";

export function GuitarString(props: any) {
    const frets = [] as Array<JSX.Element>;
    for (let i = 1; i < props.Labels.length; i++) {
        const id = `${props.ID}Fret${i}`;
        frets.push(<GuitarFret key={id} ID={id} Label={props.Labels[i]} />);
    }
    return (
        <div className="GuitarStringWrap" style={{height: props.Height}}>
            <div className="GuitarStringNut">{props.Tuning}</div>
            <div className="GuitarStringContents">
                <div
                    className="GuitarString"
                    style={{height: props.StringHeight}}
                ></div>
                <div className="GuitarFrets">
                    {frets.map((Fret: JSX.Element) => Fret)}
                </div>
            </div>
        </div>
    );
}
