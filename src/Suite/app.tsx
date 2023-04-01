/*
 Copyright 2022 Quverus LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Logger, LogLevel} from "./logger";
import {Suite} from "./Suite";

import {Dictionary} from "./types";

import React from "react";

export class App {
  protected name: string;
  protected version: string;
  protected readonly log: Logger;
  protected suite: Suite;

  protected conf: Dictionary<any> = {};
  protected settings: Dictionary<any> = {};

  public constructor(name : string, version : string, suite : Suite, level : LogLevel = LogLevel.Trace) {
    this.name = name;
    this.version = version;
    this.suite = suite;
    this.log = new Logger(`Suite.${this.name}`, level);
  }

  public get Name() {
    return this.name;
  }

  public get Version() {
    return this.version;
  }

  public Initialize() {}
  public Render(): JSX.Element {
    return <p>undefined</p>;
  }
  public Shutdown() {}
  public Refresh() {}
}
