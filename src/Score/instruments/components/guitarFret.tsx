/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function GuitarFret(props: any): JSX.Element {
    return (
        <div className="GuitarFretWrap">
            <div className="GuitarFret"></div>
            <div className="GuitarFretLabel">{props.Label}</div>
        </div>
    );
}
