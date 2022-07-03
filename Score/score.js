const Suite = new _Suite();

function Initialize()
{
    Suite.Initialize("Score", "0.1.1");
    Score.Initialize();
}

class _Score
{
    // Main instance
    constructor()
    {
        this.ScaleRoot = undefined;
        this.ScalePattern = undefined;

        this.NoteLabels = [ ["C", "B#"], ["C#", "D♭"], ["D"], ["D#", "E♭"], ["E", "F♭"], ["F", "E#"], ["F#", "G♭"], ["G"], ["G#", "A♭"], ["A"], ["A#", "B♭"], ["B", "C♭"] ];
        
        this.Instrument = undefined;
        this.InstrumentSettings = null;
    }

    Initialize()
    {
        let instrument_selector = document.getElementById("select_instrument");
        instrument_selector.oninput = function()
        {
            Score.Render(this.value);
        }
        this.Render(instrument_selector.value);

        let scale_root = document.getElementById("scale_root");
        scale_root.oninput = function()
        {
            Score.SetScaleRoot(this.value)
            Score.SetScaleKeys();
            Score.Render();
            Score.DrawInstrument();
        }
        this.SetScaleRoot("C");

        let scale_pattern = document.getElementById("scale_pattern");
        scale_pattern.oninput = function()
        {
            
            Score.SetScalePattern(this.value);
            Score.SetScaleKeys();
            Score.Render();
            Score.DrawInstrument();
        }
        this.SetScalePattern("major");
        
        this.SetScaleKeys();
        this.DrawLabels();
    }

    GetNoteID(note)
    {
        for (let i = 0; i < this.NoteLabels.length; i++)
        {
            if (this.NoteLabels[i].includes(note))
            {
                return i;
            }
        }
        return -1;
    }

    SetScaleRoot(scaleRoot)
    {
        for (let i = 0; i < this.NoteLabels.length; i++)
        {
            if (this.NoteLabels[i].includes(scaleRoot))
            {
                this.ScaleRoot = i;
            }
        }
    }

    SetScalePattern(scalePattern)
    {
        switch(scalePattern)
        {
            case "major":
                this.ScalePattern = "2212221";
                break;
            case "minor":
                this.ScalePattern = "2122122";
                break;
            case "dorian":
                this.ScalePattern = "2122212";
                break;
            case "phrygian":
                this.ScalePattern = "1222122";
                break;
            case "lydian":
                this.ScalePattern = "2221221";
                break;
            case "mixolydian":
                this.ScalePattern = "2212212";
                break;
            case "locrian":
                this.ScalePattern = "1221222";
                break;
            case "harmonic-minor":
                this.ScalePattern = "2122131";
                break;
            case "melodic-minor":
                this.ScalePattern = "2122221";
                break;
        }
    }

    SetScaleKeys()
    {
        if (this.ScaleRoot == undefined || this.ScalePattern == undefined)
        {
            return false;
        }
        this.ScaleKeys = [this.ScaleRoot];
        for (let i = 1; i < 7; i++)
        {
            this.ScaleKeys.push((this.ScaleKeys[i - 1] + parseInt(this.ScalePattern[(i - 1) % 7])) % 12);
        }
        this.SetScaleLabels();
        return true;
    }

    SetScaleLabels()
    {
        this.ScaleLabels = [this.NoteLabels[this.ScaleKeys[0]][0]];
        for (let i = 1; i < 7; i++)
        {
            let label = this.NoteLabels[this.ScaleKeys[i] % 12][0];
            if (this.NoteLabels[this.ScaleKeys[i] % 12].length > 1)
            {
                // If next label letter equals current label letter
                if (this.NoteLabels[(this.ScaleKeys[(i + 1) % 7]) % 12][0][0] == label[0])
                {
                    // If previous label letter does NOT equal current label letter, rename it
                    if (this.NoteLabels[(this.ScaleKeys[i - 1]) % 12][0][0] != label[0])
                    {
                        label = this.NoteLabels[this.ScaleKeys[i] % 12][1];
                    }
                }
                else // If next label label letter does NOT equal current label letter
                {
                    // If previous label letter equals current label letter, rename it
                    if (this.NoteLabels[(this.ScaleKeys[i - 1]) % 12][0][0] == label[0])
                    {
                        label = this.NoteLabels[this.ScaleKeys[i] % 12][1];
                    }
                }
            }
            
            this.ScaleLabels.push(label);
        }
    }

    Render(instName)
    {
        if (this.Instrument != undefined)
        {
            Manager.DeleteInstrument();
            if (instName != undefined && instName != this.Instrument.Name)
            {
                this.InstrumentSettings = null;
            }
        }
        if (instName != undefined)
        {
            switch(instName)
            {
                case "piano":
                    this.Instrument = new Piano();
                    break;
                case "guitar":
                    this.Instrument = new Guitar();
                    break;
            }
        }
        this.Instrument.Initialize();
        if (this.InstrumentSettings == null)
        {
            this.InstrumentSettings = this.Instrument.GetSettings();
        }
        else
        {
            this.Instrument.SetSettings(this.InstrumentSettings);
        }
        this.DrawInstrument();
    }

    DrawInstrument()
    {
        if (this.Instrument.Name == "piano")
        {
            this.Instrument.CountKeys();
            this.Instrument.Resize();
            this.Instrument.Render(true);
        }
        else if (this.Instrument.Name == "guitar")
        {
            this.Instrument.ReTune();
            this.Instrument.Resize();
            this.Instrument.Render();
        }
        this.DrawLabels();
    }

    DrawLabels()
    {
        if (this.ScaleRoot == undefined || this.ScalePattern == undefined)
        {
            return;
        }
        this.Instrument.DrawLabels(this.ScaleKeys, this.ScaleLabels, true);
    }

    PianoSettings()
    {
        Manager.SelectRow(1);

        Manager.CreateSlider("width", 400, 1000, this.Instrument.PianoWidth, 1, "Width").oninput = function()
        {
            Score.Instrument.PianoWidth = parseInt(this.value, 10);
            Score.InstrumentSettings = Score.Instrument.GetSettings();
            Score.DrawInstrument();
        }
        Manager.CreateSlider("height", 70, 200, this.Instrument.PianoHeight, 1, "Height").oninput = function()
        {
            Score.Instrument.PianoHeight = parseInt(this.value, 10);
            Score.InstrumentSettings = Score.Instrument.GetSettings();
            Score.DrawInstrument();
        }
        Manager.CreateSlider("octaves", 2, 6, this.Instrument.Octaves, 1, "Octaves").oninput = function()
        {
            Score.Instrument.SetOctaves(parseInt(this.value, 10));
            Score.InstrumentSettings = Score.Instrument.GetSettings();
            Score.DrawInstrument();
        }
    }

    GuitarSettings()
    {
        Manager.SelectRow(1);

        Manager.CreateCombo("string_count", [[4,4], [5,5], [6,6], [7,7], [8,8], [9,9], [10,10], [11,11], [12,12]], this.Instrument.StringCount - 4, "Strings").oninput = function()
        {
            Manager.SelectRow(1)
            Score.Instrument.StringCount = parseInt(this.value, 10);
            while (Score.Instrument.StringCount > Score.Instrument.TuningLabels.length)
            {
                Score.Instrument.TuningLabels.push("E")
                Score.Instrument.AddTuningCombo(Score.Instrument.TuningLabels.length - 1)
            }
            while (Score.Instrument.StringCount < Score.Instrument.TuningLabels.length)
            {
                Score.Instrument.TuningLabels.pop();
                Manager.DeleteCombo("tuning_" + Score.Instrument.TuningLabels.length)
            }
            Manager.SelectRow();
            Score.InstrumentSettings = Score.Instrument.GetSettings();
            Score.DrawInstrument();
        }
        for (let string = 0; string < this.Instrument.StringCount; string++)
        {
            this.Instrument.AddTuningCombo(string);
        }

        Manager.SelectRow(2);

        Manager.CreateSlider("width", 400, 1000, this.Instrument.NeckWidth, 1, "Width").oninput = function()
        {
            Score.Instrument.NeckWidth = parseInt(this.value, 10);
            Score.InstrumentSettings = Score.Instrument.GetSettings();
            Score.DrawInstrument();
        }
        Manager.CreateSlider("height", 100, 300, this.Instrument.NeckHeight, 1, "Height").oninput = function()
        {
            Score.Instrument.NeckHeight = parseInt(this.value, 10);
            Score.InstrumentSettings = Score.Instrument.GetSettings();
            Score.DrawInstrument();
        }
    }
}
const Manager = new _Manager();
const Score = new _Score();