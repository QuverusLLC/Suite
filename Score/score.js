function Initialize()
{
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
        console.log("ScaleRoot:", this.ScaleRoot)
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
        }
        console.log("ScalePattern:", this.ScalePattern)
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
            this.ScaleKeys.push((this.ScaleKeys[i - 1] + parseInt(this.ScalePattern[(i - 1) % 7])) % 12)
        }
        console.log("Scale keys:", this.ScaleKeys);
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

    Initialize()
    {
        this.Instrument = undefined;

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
        this.SetScaleRoot("C")

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

    Render(instName)
    {
        if (this.Instrument != undefined)
        {
            Manager.DeleteInstrument();
        }
        switch(instName)
        {
            case "piano":
                this.Instrument = new Piano();
                break;
            case "guitar":
                //this.Instrument = new Guitar();
                break;
        }
        this.Instrument.Initialize();
        this.DrawInstrument();
    }

    DrawInstrument()
    {
        this.Instrument.Resize();
        this.Instrument.Render()
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
}
const Manager = new _Manager();
const Score = new _Score();