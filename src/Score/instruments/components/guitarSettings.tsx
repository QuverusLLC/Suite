/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function GuitarSettings(props: any) {
    const tuners = [] as Array<JSX.Element>;
    for (let i = 0; i < props.Strings; i++) {
        tuners.push(
            <div className="GuitarTuner" key={`GuitarSettingsTuner${i + 1}`}>
                <p>{i + 1}</p>
                <select
                    id={`GuitarSettingsTuner${i + 1}`}
                    className="combo"
                    onInputCapture={props.SetTuning}
                >
                    <option value="0">C</option>
                    <option value="1">C#</option>
                    <option value="2">D</option>
                    <option value="3">D#</option>
                    <option value="4">E</option>
                    <option value="5">F</option>
                    <option value="6">F#</option>
                    <option value="7">G</option>
                    <option value="8">G#</option>
                    <option value="9">A</option>
                    <option value="10">A#</option>
                    <option value="11">B</option>
                </select>
            </div>
        );
    }
    return (
        <div id="GuitarSettings">
            <div id="GuitarSettingsWidth">
                <h3 className="ScoreSettingsItemTitle">Width: </h3>
                <input
                    id="GuitarSettingsWidthSlider"
                    type="range"
                    className="slider"
                    min="560"
                    max="1500"
                    defaultValue="800"
                    step="1"
                    onChange={props.SetWidth}
                ></input>
            </div>
            <div id="GuitarSettingsHeight">
                <h3 className="GuitarSettingsItemTitle">Height: </h3>
                <input
                    id="GuitarSettingsHeightSlider"
                    type="range"
                    className="slider"
                    min="115"
                    max="300"
                    defaultValue="115"
                    step="1"
                    onChange={props.SetHeight}
                ></input>
            </div>
            <div id="GuitarSettingsStrings">
                <h3 className="GuitarSettingsItemTitle">Strings: </h3>
                <select
                    id="GuitarSettingsStringsCombo"
                    className="combo"
                    onInputCapture={props.SetStrings}
                >
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div id="GuitarSettingsTuners">
                <h3 className="GuitarSettingsItemTitle">Tuners: </h3>
                {tuners.map((Tuner: JSX.Element) => Tuner)}
            </div>
        </div>
    );
}
