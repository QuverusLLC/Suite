/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function RightPanel(): JSX.Element {
    return (
        <div id="PanelRight" className="Panel">
            <div className="PanelHeaderContainer">Right panel</div>
            <div className="PanelBodyContainer">
                <div id="PanelRightContent"></div>
            </div>
        </div>
    );
}
