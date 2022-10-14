/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Suite} from "../Suite/Suite";

import {Score} from "./score";

window.onload = function () {
    const su = new Suite();
    const app = new Score("Score", "0.3.0", su);
    su.Initialize(app);
};
