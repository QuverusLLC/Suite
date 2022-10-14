/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function MiddlePanel(): JSX.Element {
    return (
        <div id="PanelMiddle" className="Panel">
            <div className="PanelHeaderContainer">Middle panel</div>
            <div className="PanelBodyContainer">
                <div id="PanelMiddleContent"></div>
            </div>
        </div>
    );
}
