class Guitar
{
    constructor()
    {
        this.Name = "guitar";
    }

    Initialize()
    {
        this.FingerboardColor = "#41260A";
        this.FretColor = "#C0C0C0";
        this.NutColor = "#AA0000";
        this.StringColor = "#DDDDDD";
        this.PositionMarkerColor = "#777777";

        this.NutWidth = 20;
        this.NeckHeight = 130;
        this.NeckWidth = 450 + this.NutWidth;
        this.FretCount = 24;

        this.StringCount = 6;
        this.TuningLabels = ["E", "A", "D", "G", "B", "E"]
        this.ReTune();
        this.StringSize = 1;
        this.StringIncrement = 0.25;

        this.canvas = undefined;
        this.ctx = undefined;
    }

    AddTuningCombo(string)
    {
        let selected = 4;
        if (this.Tuning.length - 1 > string)
        {
            selected = Score.GetNoteID(this.TuningLabels[string]);
        }
        Manager.CreateCombo("tuning_" + string, [["C", "C"], ["C#", "C#"], ["D", "D"], ["D#", "D#"], ["E", "E"], ["F", "F"], ["F#", "F#"], ["G", "G"], ["G#", "G#"], ["A", "A"], ["A#", "A#"], ["B", "B"]], selected).oninput = function()
        {
            Score.Instrument.TuningLabels[string] = this.value;
            Score.InstrumentSettings = Score.Instrument.GetSettings();
            Score.DrawInstrument();
        }
    }

    SetStringTune(string, note)
    {
        this.Tuning[string] = Score.GetNoteID(note);
    }

    SetStringKeys(string)
    {
        this.StringKeys[string] = [];
        for (let i = 0; i < this.FretCount + 1; i++)
        {
            this.StringKeys[string].push((i + this.Tuning[string] % 12));
        }
    }

    ReTune()
    {
        this.Tuning = []
        this.StringKeys = [];
        for (let string = 0; string < this.TuningLabels.length; string++)
        {
            this.StringKeys.push([])
            this.Tuning.push(0)

            this.SetStringTune(string, this.TuningLabels[string]);
            this.SetStringKeys(string);
        }
    }

    SetSettings(dict)
    {
        this.NeckWidth = dict["Width"];
        this.NeckHeight = dict["Height"];
        this.StringCount = dict["StringCount"];
        this.TuningLabels = dict["TuningLabels"];
        Score.GuitarSettings();
    }

    GetSettings()
    {
        Score.GuitarSettings();
        return {
            Width: this.NeckWidth,
            Height: this.NeckHeight,
            StringCount: this.StringCount,
            TuningLabels: this.TuningLabels
        }
    }

    Resize()
    {
        this.FingerboardWidth = (this.NeckWidth - this.NutWidth) / this.FretCount;
        this.FingerboardHeight = this.NeckHeight;
        this.StringHeight = this.NeckHeight/this.StringCount;
        this.FretWidth = 2;

        this.FretPos = [];
        for (let i = 0; i < this.FretCount; i++)
        {
            this.FretPos.push(this.FingerboardWidth * i + this.NutWidth)
        }
        this.StringPos = [];
        for (let i = 0; i < this.StringCount; i++)
        {
            this.StringPos.push((this.StringHeight * i) + this.StringHeight/2)
        }
    }

    Render(heading = undefined)
    {
        if (heading == undefined)
        {
            this.canvas = Manager.CreateCanvas("scale", this.NeckWidth, this.NeckHeight);
        }
        else
        {
            this.canvas = Manager.CreateCanvas("scale", this.NeckWidth, this.NeckHeight, heading);
        }
        this.ctx = this.canvas.getContext("2d");

        // Fingerboard
        this.ctx.fillStyle = this.FingerboardColor;
        this.ctx.fillRect(0, 0, this.NeckWidth, this.NeckHeight);

        // Frets
        this.ctx.fillStyle = this.FretColor;
        for (let i = 0; i < this.FretCount; i++)
        {
            this.ctx.fillRect(this.FretPos[i] - 1, 0, this.FretWidth, this.NeckHeight);
            if ([2,4,6,8,11,14,16,18,20,23].includes(i)) // Position markers
            {
                this.ctx.fillStyle = this.PositionMarkerColor;
                this.ctx.fillRect((this.FretPos[i] - 3) + (this.FingerboardWidth/2), this.StringHeight, 8, 8);
                if ([11,23].includes(i))
                {
                    this.ctx.fillRect((this.FretPos[i] - 3) + (this.FingerboardWidth/2), this.StringHeight*2, 8, 8);
                }
                this.ctx.fillStyle = this.FretColor;
            }
        }

        // Nut
        this.ctx.fillStyle = this.NutColor;
        this.ctx.fillRect(this.NutWidth - 2, 0, 4, this.NeckHeight);

        // Strings
        for (let i = 0; i < this.StringCount; i++)
        {
            this.ctx.fillStyle = this.StringColor;
            let thickness = (this.StringCount - i) * this.StringIncrement;
            this.ctx.fillRect(0, this.StringPos[i], this.NeckWidth, this.StringSize + thickness)
            // String tuning
            Manager.DrawLabel(this.ctx, Score.NoteLabels[this.Tuning[i]][0], this.NutWidth/2, this.StringPos[i] + 6)
        }
    }

    DrawLabels(keyIndexes, keyLabels, iterate = false)
    {
        for (let string = 0; string < this.StringCount; string++)
        {
            let counter = 0;
            for (let i = 1; i < this.FretCount + 1; i++)
            {
                let note = this.StringKeys[string][i] % 12;
                if (keyIndexes.includes(note))
                {
                    let label = keyLabels[keyIndexes.indexOf(note)];
                    Manager.DrawLabel(this.ctx, label, this.FretPos[i] - (this.FingerboardWidth/2), this.StringPos[string] + 6)
                    counter++;
                }
                if (!iterate && counter > 7)
                {
                    break;
                }
            }
        }
    }
}