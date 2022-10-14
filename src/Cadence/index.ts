/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Suite} from "../Suite/Suite";

import {Cadence} from "./cadence";

window.onload = function () {
    const su = new Suite();
    const app = new Cadence("Cadence", "0.1.0", su);
    su.Initialize(app);
};
