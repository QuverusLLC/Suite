/*
 Copyright 2022 Quverus LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

import {Dictionary} from "../Suite/types";

export class Instrument {
  protected name = "undefined";
  protected settings: Dictionary<any> = {};
  protected conf: Dictionary<any> = {};
  protected refresh: CallableFunction;
  public constructor(refresh : CallableFunction) {
    this.refresh = refresh;
  }

  public get Preferences() {
    return this.settings;
  }

  public set Settings(settings : any) {
    this.settings = settings;
  }

  public Render(): JSX.Element {
    return <p>undefined</p>;
  }

  public Update(conf : Map<string, any>) {}
}
