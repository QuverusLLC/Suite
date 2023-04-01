/*
 Copyright 2022 Quverus LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {App} from "../Suite/app";

import React from "react";

import {Dictionary} from "../Suite/types";
import {Scales, Scale} from "./scale";

import {Piano} from "./instruments/piano";
import {Guitar} from "./instruments/guitar";

import {ScoreSettings} from "./components/scoreSettings";

import * as config from "./config";

export class Score extends App {
    protected override conf: Dictionary<any> = {
        ScaleRoot: 0,
        ScalePattern: Scales["major"],
        ScaleKeys: config["ScaleKeys"] as Array<number>,
        ScaleLabels: config["ScaleLabels"] as Array<string>,
        TriadLabels: config["TriadLabels"] as Array<Array<string>>,
        ChordLabels: config["ChordLabels"] as Array<Array<string>>,
        Instrument: new Piano(this.UpdateScale.bind(this)),
        ScaleLabelsMap: [] as Array<Map<string, string>>,
        TriadLabelsMap: [] as Array<Array<Map<string, string>>>,
        ChordLabelsMap: [] as Array<Array<Map<string, string>>>,
        KeyIDMap: config["KeyIDMap"],
        NoteLabels: config["NoteLabels"],
        TriadIndexes: config["TriadIndexes"],
        ChordIndexes: config["ChordIndexes"],
        ShowInstrumentSettings: false,
    };
    protected override settings = {};

    public override Initialize(): void {
        this.UpdateScale();
    }

    public override Render(): JSX.Element {
        return (
            <div id="containerScore">
                <ScoreSettings
                    SetRoot={this.SetRootNote.bind(this)}
                    SetScale={this.SetScalePattern.bind(this)}
                    ToggleSettings={this.ToggleSettings.bind(this)}
                    SetInstrument={this.SetInstrument.bind(this)}
                />
                {this.conf["Instrument"].Render(
                    this.conf["ShowInstrumentSettings"]
                )}
            </div>
        );
    }

    public GetNoteID(note: string): number {
        for (let i = 0; i < this.conf["NoteLabels"].length; i++) {
            if (this.conf["NoteLabels"][i].includes(note)) return i;
        }
        return -1;
    }

    public SetRootNote(e: any) {
        this.conf["ScaleRoot"] = parseInt(e.target.value, 10);
        this.UpdateScale();
    }

    public SetScalePattern(e: any) {
        this.conf["ScalePattern"] = Scales[e.target.value] as Scale;
        this.UpdateScale();
    }

    public ToggleSettings(e: any) {
        this.conf["ShowInstrumentSettings"] =
            !this.conf["ShowInstrumentSettings"];
        this.UpdateScale();
    }

    public SetInstrument(e: any) {
        switch (e.target.value) {
            case "piano":
                this.conf["Instrument"] = new Piano(
                    this.UpdateScale.bind(this)
                );
                this.UpdateScale();
                break;
            case "guitar":
                this.conf["Instrument"] = new Guitar(
                    this.UpdateScale.bind(this)
                );
                this.UpdateScale();
                break;
            case "":
                throw new Error(`Invalid instrument! ${e.target.value}`);
        }
    }

    private UpdateScale() {
        //console.log(this.conf)
        const newScale = this.conf["ScalePattern"].GetKeys(
            this.conf["ScaleRoot"]
        );
        if (
            JSON.stringify(this.conf["ScaleKeys"]) !== JSON.stringify(newScale)
        ) {
            // Prevent re-calculation if it scale remains the same
            this.conf["ScaleKeys"] = newScale;
            //console.log("Scale Keys", this.conf["ScaleKeys"]);
            this.SetScaleLabels();
            this.SetTriadLabels();
            this.SetChordLabels();
            //console.log("Scale Labels", this.conf["ScaleLabels"]);
            //console.log("Triad Labels", this.conf["TriadLabels"]);
            //console.log("Chord Labels", this.conf["ChordLabels"]);
            this.SetScaleLabelsMap();
            this.SetTriadLabelsMap();
            this.SetChordLabelsMap();
            //console.log("Scale Labels Map", this.conf["ScaleLabelsMap"]);
            //console.log("Triad Labels Map", this.conf["TriadLabelsMap"]);
            //console.log("Chord Labels Map", this.conf["ChordLabelsMap"]);
        }
        this.conf["Instrument"].Update(this.conf);
        this.suite.Render();
    }

    public SetScaleLabels() {
        this.conf["ScaleLabels"] = [
            this.conf["NoteLabels"][this.conf["ScaleKeys"][0]][0],
        ];
        for (let i = 1; i < 7; i++) {
            const labelOpts =
                this.conf["NoteLabels"][this.conf["ScaleKeys"][i] % 12];
            let label = "";
            if (labelOpts.length == 1) {
                label = labelOpts[0];
            } else {
                const nextLabelLetter =
                    this.conf["NoteLabels"][
                        this.conf["ScaleKeys"][(i + 1) % 7] % 12
                    ][0][0];
                const prevLabelLetter =
                    this.conf["ScaleLabels"][
                        this.conf["ScaleLabels"].length - 1
                    ][0];
                //this.log.trace(`Index: ${i}: ${labelOpts} // Prev: ${prevLabelLetter}, Next: ${nextLabelLetter}`);
                if (labelOpts[0][0] == nextLabelLetter) {
                    if (labelOpts[0][0] != prevLabelLetter)
                        label = labelOpts[1];
                } else {
                    if (labelOpts[0][0] == prevLabelLetter)
                        label = labelOpts[1];
                }
                if (label === "") label = labelOpts[0];
            }
            this.conf["ScaleLabels"].push(label);
        }
    }

    public SetTriadLabels() {
        this.conf["TriadLabels"] = [];
        for (let i = 0; i < 7; i++) {
            this.conf["TriadLabels"].push([]);
            for (let j = 0; j < 4; j++) {
                this.conf["TriadLabels"][i].push(
                    this.conf["ScaleLabels"][
                        this.conf["TriadIndexes"][i][j] % 7
                    ]
                );
            }
        }
    }

    public SetChordLabels() {
        this.conf["ChordLabels"] = [];
        for (let i = 0; i < 7; i++) {
            this.conf["ChordLabels"].push([]);
            for (let j = 0; j < 4; j++) {
                this.conf["ChordLabels"][i].push(
                    this.conf["ScaleLabels"][
                        this.conf["ChordIndexes"][i][j] % 7
                    ]
                );
            }
        }
    }

    public get LabelsMap() {
        return {
            C: "",
            D: "",
            E: "",
            F: "",
            G: "",
            A: "",
            B: "",
            "C#": "",
            "D#": "",
            "F#": "",
            "G#": "",
            "A#": "",
        };
    }

    public SetScaleLabelsMap() {
        this.conf["ScaleLabelsMap"] = [];
        for (
            let i = 0;
            i < 2;
            i++ // Two octaves
        )
            this.conf["ScaleLabelsMap"].push(this.LabelsMap);
        for (let i = 0; i < 7; i++) {
            let octaveNumber = 0;
            const index = this.conf["ScaleKeys"][i];
            const label = this.conf["ScaleLabels"][i];
            if (index >= 12) octaveNumber = 1;
            this.conf["ScaleLabelsMap"][octaveNumber][
                this.conf["KeyIDMap"][this.conf["ScaleKeys"][i] % 12]
            ] = label;
        }
    }

    public SetTriadLabelsMap() {
        this.conf["TriadLabelsMap"] = [];
        for (let i = 0; i < 7; i++) {
            // Seven total triads
            this.conf["TriadLabelsMap"].push([]);
            for (
                let j = 0;
                j < 3;
                j++ // Three octaves each
            )
                this.conf["TriadLabelsMap"][i].push(this.LabelsMap);
        }
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 4; j++) {
                let octaveNumber = 0;
                const triadIndex = this.conf["TriadIndexes"][i][j];
                const keyIndex =
                    this.conf["ScaleKeys"][triadIndex % 7] +
                    12 * parseInt(`${triadIndex / 7}`, 10);
                const label = this.conf["TriadLabels"][i][j];
                if (keyIndex >= 24) octaveNumber = 2;
                else if (keyIndex >= 12) octaveNumber = 1;
                this.conf["TriadLabelsMap"][i][octaveNumber][
                    this.conf["KeyIDMap"][
                        this.conf["ScaleKeys"][triadIndex % 7] % 12
                    ]
                ] = label;
            }
        }
    }
    public SetChordLabelsMap() {
        this.conf["ChordLabelsMap"] = [];
        for (let i = 0; i < 7; i++) {
            // Seven total chords
            this.conf["ChordLabelsMap"].push([]);
            for (
                let j = 0;
                j < 3;
                j++ // Three octaves each
            )
                this.conf["ChordLabelsMap"][i].push(this.LabelsMap);
        }
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 4; j++) {
                let octaveNumber = 0;
                const chordIndex = this.conf["ChordIndexes"][i][j];
                const keyIndex =
                    this.conf["ScaleKeys"][chordIndex % 7] +
                    12 * parseInt(`${chordIndex / 7}`, 10);
                const label = this.conf["ChordLabels"][i][j];
                if (keyIndex >= 24) octaveNumber = 2;
                else if (keyIndex >= 12) octaveNumber = 1;
                this.conf["ChordLabelsMap"][i][octaveNumber][
                    this.conf["KeyIDMap"][
                        this.conf["ScaleKeys"][chordIndex % 7] % 12
                    ]
                ] = label;
            }
        }
    }
}
