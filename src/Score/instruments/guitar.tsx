/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Instrument} from "../instrument";

import React from "react";

import {Size} from "../../Suite/size";
import {Dictionary} from "../../Suite/types";

import {GuitarSettings} from "./components/guitarSettings";
import {GuitarRoll} from "./components/guitarRoll";

export class Guitar extends Instrument {
    protected override name = "Guitar";
    protected override conf: Dictionary<any> = {
        GuitarStringLabels: [] as Array<Array<String>>,
        GuitarTriadLabels: [] as Array<Array<Array<String>>>,
        GuitarChordLabels: [] as Array<Array<Array<String>>>,
        GuitarIDs: [] as Array<Array<number>>,
    };
    protected override settings: Dictionary<any> = {
        Size: new Size(800, 115),
        Strings: 6,
        Frets: 25,
        Tuning: [4, 9, 2, 7, 11, 4] as Array<number>, // E A D G B E
    };
    private scales: JSX.Element = (<p>undefined</p>);
    private triads: Array<JSX.Element> = [];
    private chords: Array<JSX.Element> = [];

    public override Render(showSettings = false): JSX.Element {
        let InstrumentSettings = (
            <div id="InstrumentSettings" style={{display: "none"}}>
                <GuitarSettings />
            </div>
        );
        if (showSettings) {
            InstrumentSettings = (
                <div id="InstrumentSettings" style={{display: "inline-flex"}}>
                    <GuitarSettings
                        Strings={this.settings["Strings"]}
                        SetWidth={this.SetWidth.bind(this)}
                        SetHeight={this.SetHeight.bind(this)}
                        SetStrings={this.SetStrings.bind(this)}
                        SetTuning={this.SetTuning.bind(this)}
                    />
                </div>
            );
        }
        return (
            <div id="containerGuitar">
                {InstrumentSettings}
                <div id="GuitarScale">
                    <h3>Scale</h3>
                    {this.scales}
                </div>
                <div id="GuitarTriads">
                    <h3>Triads</h3>
                    {this.triads.map((Triad: JSX.Element) => Triad)}
                </div>
                <div id="GuitarChords">
                    <h3>Chords</h3>
                    {this.chords.map((Chord: JSX.Element) => Chord)}
                </div>
            </div>
        );
    }

    private SetWidth(e: any) {
        this.settings["Size"].SetWidth = e.target.value;
        this.refresh();
    }

    private SetHeight(e: any) {
        this.settings["Size"].SetHeight = e.target.value;
        this.refresh();
    }

    private SetStrings(e: any) {
        this.settings["Strings"] = e.target.value;
        while (this.settings["Tuning"].length > this.settings["Strings"])
            this.settings["Tuning"].pop();
        while (this.settings["Tuning"].length < this.settings["Strings"])
            this.settings["Tuning"].push(4); // E
        this.refresh();
    }

    private SetTuning(e: any) {
        const tuning = parseInt(e.target.value, 10);
        const string =
            parseInt(e.target.id.substr(19, e.target.id.length), 10) - 1;
        this.settings["Tuning"][string] = tuning;
        this.refresh();
    }

    public override Update(conf: Dictionary<any>) {
        this.SetStringIDs();
        console.log("String IDs", this.conf["GuitarIDs"]);
        this.SetStringLabels(
            conf["ScaleLabels"],
            conf["ScaleKeys"],
            conf["KeyIDMap"]
        );
        this.SetTriadLabels(conf["TriadLabels"]);
        this.SetChordLabels(conf["ChordLabels"]);
        console.log("String Labels", this.conf["GuitarStringLabels"]);
        //console.log("Triad Labels", this.conf["GuitarTriadLabels"]);
        //console.log("Chord Labels", this.conf["GuitarChordLabels"]);
    }

    private CreateGuitar(id: string, labels: Array<Array<string>>) {
        return (
            <GuitarRoll
                key={id}
                ID={id}
                Width={`${this.settings["Size"].Width}px`}
                Height={`${this.settings["Size"].Height}px`}
                Labels={labels}
            />
        );
    }

    private SetStringIDs() {
        this.conf["GuitarIDs"] = [];
        for (let i = 0; i < this.settings["Strings"]; i++) {
            this.conf["GuitarIDs"].push([]);
            const root = this.settings["Tuning"][i];
            for (let j = 0; j < this.settings["Frets"]; j++) {
                this.conf["GuitarIDs"][i].push((root + j) % 24);
            }
        }
    }

    private SetStringLabels(
        labels: Array<string>,
        keys: Array<number>,
        idMap: Dictionary<string>
    ) {
        console.log("Scale keys", keys, "Scale labels", labels);
        this.conf["GuitarStringLabels"] = [];
        for (let i = 0; i < this.settings["Strings"]; i++) {
            this.conf["GuitarStringLabels"].push([]);
            this.conf["GuitarStringLabels"][i].push(
                idMap[this.settings["Tuning"][i]]
            );
            for (let j = 1; j < this.settings["Frets"]; j++) {
                const note = this.conf["GuitarIDs"][i][j] as number;
                if (keys.includes(note))
                    this.conf["GuitarStringLabels"][i].push(
                        labels[keys.indexOf(note)]
                    );
                else if (keys.includes(note % 12))
                    this.conf["GuitarStringLabels"][i].push(
                        labels[keys.indexOf(note % 12)]
                    );
                else if (keys.includes(note + 12))
                    this.conf["GuitarStringLabels"][i].push(
                        labels[keys.indexOf(note + 12)]
                    );
                else this.conf["GuitarStringLabels"][i].push("");
            }
        }
        this.scales = this.CreateGuitar(
            "GuitarScales",
            this.conf["GuitarStringLabels"]
        );
    }

    private SetTriadLabels(triadLabels: Array<Array<string>>) {
        this.conf["GuitarTriadLabels"] = [];
        this.triads = [];
        for (let i = 0; i < triadLabels.length; i++) {
            // 7 triads
            this.conf["GuitarTriadLabels"].push([]);
            for (let j = 0; j < this.settings["Strings"]; j++) {
                this.conf["GuitarTriadLabels"][i].push([
                    this.conf["GuitarStringLabels"][j][0],
                ]);
                for (let k = 1; k < this.settings["Frets"]; k++) {
                    const label = this.conf["GuitarStringLabels"][j][k] as string;
                    if (triadLabels[i].includes(label)) {
                        this.conf["GuitarTriadLabels"][i][j].push(label);
                    } else {
                        this.conf["GuitarTriadLabels"][i][j].push("");
                    }
                }
            }
            this.triads.push(
                this.CreateGuitar(
                    `GuitarTriad${i + 1}`,
                    this.conf["GuitarTriadLabels"][i]
                )
            );
        }
    }

    private SetChordLabels(chordLabels: Array<Array<string>>) {
        this.conf["GuitarChordLabels"] = [];
        this.chords = [];
        for (let i = 0; i < chordLabels.length; i++) {
            // 7 chords
            this.conf["GuitarChordLabels"].push([]);
            for (let j = 0; j < this.settings["Strings"]; j++) {
                this.conf["GuitarChordLabels"][i].push([
                    this.conf["GuitarStringLabels"][j][0],
                ]);
                for (let k = 1; k < this.settings["Frets"]; k++) {
                    const label = this.conf["GuitarStringLabels"][j][k] as string;
                    if (chordLabels[i].includes(label)) {
                        this.conf["GuitarChordLabels"][i][j].push(label);
                    } else {
                        this.conf["GuitarChordLabels"][i][j].push("");
                    }
                }
            }
            this.chords.push(
                this.CreateGuitar(
                    `GuitarChord${i + 1}`,
                    this.conf["GuitarChordLabels"][i]
                )
            );
        }
    }
}
