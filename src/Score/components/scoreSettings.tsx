/*
 Copyright 2022 Quverus LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function ScoreSettings(props : any) {
  return (<div id="ScoreSettings">
    <div id="ScoreSettingsRoot">
      <h4 className="ScoreSettingsItemTitle">Root note:
      </h4>
      <select id="ScoreSettingsRootCombo" className="combo" onInputCapture={props.SetRoot}>
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
    <div id="ScoreSettingsScale">
      <h4 className="ScoreSettingsItemTitle">Scale:
      </h4>
      <select id="ScoreSettingsScaleCombo" className="combo" onInputCapture={props.SetScale}>
        <option value="major">Major (Ionian)</option>
        <option value="minor">Minor (Aeolian)</option>
        <option value="dorian">Dorian</option>
        <option value="phrygian">Phrygian</option>
        <option value="lydian">Lydian</option>
        <option value="mixolydian">Mixolydian</option>
        <option value="locrian">Locrian</option>
        <option value="harmonicMinor">Harmonic Minor</option>
        <option value="melodicMinor">Melodic Minor</option>
      </select>
    </div>
    <div id="ScoreSettingsInstrument">
      <select id="ScoreSettingsInstrumentCombo" className="combo" onInputCapture={props.SetInstrument}>
        <option value="piano">Piano</option>
        <option value="guitar">Guitar</option>
      </select>
    </div>
    <div id="ScoreSettingsInstrumentSettings">
      <button id="ScoreSettingsInstrumentSettingsButton" onClick={props.ToggleSettings}>
        Settings
      </button>
    </div>
  </div>);
}
