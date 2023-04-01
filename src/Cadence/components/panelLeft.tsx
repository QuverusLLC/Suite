/*
 Copyright 2022 Quverus LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

import {GetSyllable} from "../syllables";

export function LeftPanel(props : any): JSX.Element {
  function CheckLines(e : any) {
    const lyricsText = e.target.value;
    const lines: Array<string> = [];
    const syllables: Array<number> = [];
    let i = 0;
    for (const line of lyricsText.split("\n")) {
      lines.push(line);
      syllables.push(0);
      for (const word of line.replace(/\b/, " ").split(" ")) {
        syllables[i] += GetSyllable(word);
      }
      i++;
    }
    // Update counters
    const lineCount = document.getElementById("PanelLeftLines")as HTMLElement;
    const syllableCount = document.getElementById("PanelLeftSyllables")as HTMLElement;
    lineCount.textContent = "";
    syllableCount.textContent = "";

    for (let i = 0; i < lines.length; i++) {
      lineCount.textContent += (i + 1).toString() + "\n";
      syllableCount.textContent += syllables[i].toString() + "\n";
    }
  }
  return (<div id="PanelLeft" className="Panel">
    <div className="PanelHeaderContainer">Left panel</div>
    <div className="PanelBodyContainer">
      <div id="PanelLeftLinesContainer">
        <textarea readOnly="readOnly" id="PanelLeftLines"></textarea>
      </div>
      <div id="PanelLeftSyllablesContainer">
        <textarea readOnly="readOnly" id="PanelLeftSyllables"></textarea>
      </div>
      <div id="PanelLeftLyricsContainer">
        <textarea id="PanelLeftLyrics" onInput={CheckLines}></textarea>
      </div>
    </div>
  </div>);
}
