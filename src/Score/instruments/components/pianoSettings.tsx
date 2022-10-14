/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function PianoSettings(props: any) {
    return (
        <div id="PianoSettings">
            <div id="PianoSettingsWidth">
                <h3 className="ScoreSettingsItemTitle">Width: </h3>
                <input
                    id="PianoSettingsWidthSlider"
                    type="range"
                    className="slider"
                    min="400"
                    max="1500"
                    defaultValue="800"
                    step="1"
                    onChange={props.SetWidth}
                ></input>
            </div>
            <div id="PianoSettingsHeight">
                <h3 className="ScoreSettingsItemTitle">Height: </h3>
                <input
                    id="PianoSettingsHeightSlider"
                    type="range"
                    className="slider"
                    min="60"
                    max="200"
                    defaultValue="100"
                    step="1"
                    onChange={props.SetHeight}
                ></input>
            </div>
            <div id="PianoSettingsOctaves">
                <h3 className="ScoreSettingsItemTitle">Octaves: </h3>
                <input
                    id="PianoSettingsOctavesSlider"
                    type="range"
                    className="slider"
                    min="3"
                    max="6"
                    defaultValue="3"
                    step="1"
                    onChange={props.SetOctaves}
                ></input>
            </div>
        </div>
    );
}
