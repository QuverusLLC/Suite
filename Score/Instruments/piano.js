class Piano
{
    constructor()
    {
        this.Name = "piano";
    }
    Initialize()
    {
        this.KeyWhiteColor = "#FFFFFF";
        this.KeyBlackColor = "#222222";
        this.KeySeparatorColor = "#000000";

        this.KeyColors = "wbwbwwbwbwbw"; // Starting at C
        this.KeyStart = 0;
        this.SetStart(0);

        this.OctaveCountWhite = 7;
        this.OctaveCountBlack = 5;
        this.SetOctaves(3);

        this.PianoWidth = 440;
        this.PianoHeight = 100;

        this.canvas = undefined;
        this.ctx = undefined;
    }

    SetSettings(dict)
    {
        this.PianoWidth = dict["Width"];
        this.PianoHeight = dict["Height"];
        this.Octaves = dict["Octaves"];
        Score.PianoSettings();
    }

    GetSettings()
    {
        Score.PianoSettings();
        return {
            Width: this.PianoWidth,
            Height: this.PianoHeight,
            Octaves: this.Octaves,
        }
    }

    SetStart(keyStart)
    {
        let prevColors = this.KeyColors;
        let difference = (keyStart - this.KeyStart) + 12; // If number is negative modulus doesn't work, so add 12
        console.log(difference);
        if (difference != 0)
        {
            this.KeyColors = "";
            for (let i = 0; i < 12; i++)
            {
                let newColor = prevColors[(i + difference) % 12];
                this.KeyColors += newColor;
            }
            this.KeyStart = keyStart;
        }
    }
    
    SetOctaves(octaves)
    {
        this.Octaves = octaves;
        this.CountKeys();
    }

    CountKeys()
    {
        this.KeyCount = this.Octaves * 12;
        this.KeyCountWhite = (this.OctaveCountWhite * this.Octaves);
        this.KeyCountBlack = (this.OctaveCountBlack * this.Octaves);
    }

    Resize()
    {
        this.KeyWidthWhite = this.PianoWidth / this.KeyCountWhite;
        this.KeyHeightWhite = this.PianoHeight;
        this.KeyWidthBlack = this.KeyWidthWhite * .5;
        this.KeyHeightBlack = this.KeyHeightWhite * .66;

        this.KeyPos = [];
        this.KeyWhite = [];
        this.KeyBlack = [];
        for (let i = 0; i < this.KeyCount; i++)
        {
            if (this.KeyColors[i % 12] == "w") // White key
            {
                this.KeyPos.push(this.KeyWidthWhite * this.KeyWhite.length);
                this.KeyWhite.push(i);
            }
            else // Black key
            {
                this.KeyPos.push(this.KeyPos[i - 1] + (this.KeyWidthWhite - this.KeyWidthBlack/2));
                this.KeyBlack.push(i);
            }
        }
    }

    Render(heading = undefined)
    {
        if (heading == undefined)
        {
            this.canvas = Manager.CreateCanvas("scale", this.PianoWidth, this.PianoHeight);
        }
        else
        {
            this.canvas = Manager.CreateCanvas("scale", this.PianoWidth, this.PianoHeight, "Scale");
        }
        this.ctx = this.canvas.getContext("2d");

        // White keys

        this.ctx.fillStyle = this.KeyWhiteColor;
        this.ctx.fillRect(0, 0, this.PianoWidth, this.PianoHeight);
        
        // Key separators
        this.ctx.fillStyle = this.KeySeparatorColor;
        for (let index of this.KeyWhite)
        {
            this.ctx.fillRect(this.KeyPos[index] - 1, 0, 2, this.PianoHeight);
        }
        // Black keys
        this.ctx.fillStyle = this.KeyBlackColor;
        for (let index of this.KeyBlack)
        {
            this.ctx.fillRect(this.KeyPos[index], 0, this.KeyWidthBlack, this.KeyHeightBlack);
        }
    }

    DrawLabels(keyIndexes, keyLabels, iterate = false)
    {
        let counter = 0; // Counts how many time scale keys have been passed through
        for (let i = 0; i < this.KeyCount; i++)
        {
            if (keyIndexes[counter % 7] == (i % 12))
            {
                let label = keyLabels[counter % 7];
                if (this.KeyColors[i % 12] == "w")
                {
                    Manager.DrawLabel(this.ctx, label, this.KeyPos[i] + (this.KeyWidthWhite/2), this.KeyHeightWhite - 5);
                }
                else
                {
                    Manager.DrawLabel(this.ctx, label, this.KeyPos[i] + (this.KeyWidthBlack/2), this.KeyHeightBlack - 5);
                }
                counter++;
            }
            if (!iterate && counter > 7)
            {
                break;
            }
        }
    }
}