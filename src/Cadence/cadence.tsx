/*
 Copyright 2022 Quverus LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {App} from "../Suite/app";

import React from "react";

import {Dictionary} from "../Suite/types";

import {LeftPanel} from "./components/panelLeft";
import {MiddlePanel} from "./components/panelMiddle";
import {RightPanel} from "./components/panelRight";

export class Cadence extends App {
    protected override conf: Dictionary<any> = {};
    protected override settings: Dictionary<any> = {};

    public override Initialize(): void {
        this.Update();
    }

    public override Render(): JSX.Element {
        return (
            <div id="containerCadence">
                <LeftPanel />
                <MiddlePanel />
                <RightPanel />
            </div>
        );
    }

    private Update(): void {
        this.suite.Render();
    }
}
