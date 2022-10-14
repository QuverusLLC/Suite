/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Instrument} from "../instrument";

import React from "react";

import {Size} from "../../Suite/size";
import {Dictionary} from "../../Suite/types";

import {PianoSettings} from "./components/pianoSettings";
import {PianoRoll} from "./components/pianoRoll";
import {PianoOctave} from "./components/pianoOctave";

export class Piano extends Instrument {
    protected override name = "Piano";
    protected override conf: Dictionary<any> = {
        KeyColors: "wbwbwwbwbwbwb",
    };
    protected override settings: Dictionary<any> = {
        Size: new Size(800, 100),
        Octaves: 3,
    };
    private scaleOctaves: Array<typeof PianoOctave | any> = [];
    private triads: Array<typeof PianoRoll | any> = [];
    private chords: Array<typeof PianoRoll | any> = [];

    public override Render(showSettings = false): JSX.Element {
        let InstrumentSettings = (
            <div id="InstrumentSettings" style={{display: "none"}}>
                <PianoSettings />
            </div>
        );
        if (showSettings) {
            InstrumentSettings = (
                <div id="InstrumentSettings" style={{display: "inline-flex"}}>
                    <PianoSettings
                        SetWidth={this.SetWidth.bind(this)}
                        SetHeight={this.SetHeight.bind(this)}
                        SetOctaves={this.SetOctaves.bind(this)}
                    />
                </div>
            );
        }
        return (
            <div id="containerPiano">
                {InstrumentSettings}
                <div id="PianoScale">
                    <h3>Scale</h3>
                    <PianoRoll
                        key={"PianoScale"}
                        Octaves={this.scaleOctaves}
                        Width={`${this.settings["Size"].Width}px`}
                        Height={`${this.settings["Size"].Height}px`}
                    />
                </div>
                <div id="PianoTriads">
                    <h3>Triads</h3>
                    {this.triads.map((PianoRoll: JSX.Element) => PianoRoll)}
                </div>
                <div id="PianoChords">
                    <h3>Chords</h3>
                    {this.chords.map((PianoRoll: JSX.Element) => PianoRoll)}
                </div>
            </div>
        );
    }

    public SetWidth(e: any) {
        this.settings["Size"].SetWidth = e.target.value;
        this.refresh();
    }

    public SetHeight(e: any) {
        this.settings["Size"].SetHeight = e.target.value;
        this.refresh();
    }

    public SetOctaves(e: any) {
        this.settings["Octaves"] = e.target.value;
        this.refresh();
    }

    public override Update(conf: Dictionary<any>) {
        this.UpdateScale(conf["ScaleLabelsMap"]);
        this.UpdateTriads(conf["TriadLabelsMap"]);
        this.UpdateChords(conf["ChordLabelsMap"]);
    }

    private CreateOctave(id: string, labels: Dictionary<string>) {
        return (
            <PianoOctave
                key={id}
                LabelC={labels["C"]}
                LabelD={labels["D"]}
                LabelE={labels["E"]}
                LabelF={labels["F"]}
                LabelG={labels["G"]}
                LabelA={labels["A"]}
                LabelB={labels["B"]}
                LabelCSharp={labels["C#"]}
                LabelDSharp={labels["D#"]}
                LabelFSharp={labels["F#"]}
                LabelGSharp={labels["G#"]}
                LabelASharp={labels["A#"]}
                Width={`${(1 / this.settings["Octaves"]) * 100 * 0.8}%`}
            />
        );
    }

    private UpdateScale(labels: Array<Dictionary<string>>) {
        this.scaleOctaves = [] as Array<JSX.Element>;
        let counter = 0;
        for (let i = 0; i < this.settings["Octaves"]; i++) {
            if (counter == 2) {
                this.scaleOctaves.push(
                    this.CreateOctave(
                        `ScaleOctave${i}`,
                        {} as Dictionary<string>
                    )
                );
            } else {
                this.scaleOctaves.push(
                    this.CreateOctave(`ScaleOctave${i}`, labels[counter])
                );
                counter += 1;
            }
        }
    }

    private UpdateTriads(labels: Dictionary<any>) {
        this.triads = [];
        for (let i = 0; i < 7; i++) {
            const octaves: Array<JSX.Element> = [];
            let counter = 0;
            for (let j = 0; j < this.settings["Octaves"]; j++) {
                octaves.push(
                    this.CreateOctave(
                        `Triad${i}Octave${j}_${counter}`,
                        labels[i][counter]
                    )
                );
                counter += 1;
                if (counter == 3) counter = 0;
            }
            this.triads.push(
                <PianoRoll
                    key={`PianoTriad${i}`}
                    Octaves={octaves}
                    Width={`${this.settings["Size"].Width}px`}
                    Height={`${this.settings["Size"].Height}px`}
                />
            );
        }
    }

    private UpdateChords(labels: Dictionary<any>) {
        this.chords = [];
        for (let i = 0; i < 7; i++) {
            const octaves: Array<JSX.Element> = [];
            let counter = 0;
            for (let j = 0; j < this.settings["Octaves"]; j++) {
                octaves.push(
                    this.CreateOctave(
                        `Chord${i}Octave${j}_${counter}`,
                        labels[i][counter]
                    )
                );
                counter += 1;
                if (counter == 3) counter = 0;
            }
            this.chords.push(
                <PianoRoll
                    key={`PianoChord${i}`}
                    Octaves={octaves}
                    Width={`${this.settings["Size"].Width}px`}
                    Height={`${this.settings["Size"].Height}px`}
                />
            );
        }
    }
}
