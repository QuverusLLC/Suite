/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Dictionary} from "../Suite/types";

export class Scale {
    private name: string;
    private pattern: string;
    public constructor(pattern: string, name: string) {
        this.name = name;
        this.pattern = pattern;
        if (this.pattern.length !== 7)
            throw new Error(
                `Invalid pattern '${this.name}': '${this.pattern}'`
            );
    }

    public get Name() {
        return this.name;
    }

    public get Pattern() {
        return this.pattern;
    }

    public GetInt(index: number) {
        return parseInt(this.pattern[index], 10);
    }

    public GetKeys(scaleRoot: number): Array<number> {
        let index = scaleRoot;
        const keys: Array<number> = [scaleRoot];
        for (let i = 0; i < 7 - 1; i++) {
            index += this.GetInt(i);
            keys.push(index);
        }
        return keys;
    }
}

export const Scales: Dictionary<Scale> = {
    major: new Scale("2212221", "Major"),
    minor: new Scale("2122122", "Minor"),
    dorian: new Scale("2122212", "Dorian"),
    phrygian: new Scale("1222122", "Phrygian"),
    lydian: new Scale("2221221", "Lydian"),
    mixolydian: new Scale("2212212", "Mixolydian"),
    locrian: new Scale("1221222", "Locrian"),
    harmonicMinor: new Scale("2122131", "Harmonic Minor"),
    melodicMinor: new Scale("2122221", "Melodic Minor"),
};
