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

        this.scale = undefined;
        this.triads = undefined;
        this.chords = undefined;

        this.TriadIndexes = [[0,2,4,6], [1,3,5,7], [2,4,6,8], [3,5,7,9], [4,6,8,10], [5,7,9,11], [6,8,10,12]];
        this.ChordIndexes = [[0,3,6,9], [1,4,7,10], [2,5,8,11], [3,6,9,12], [4,7,10,13], [5,8,11,14], [6,9,12,15]];
    }

    SetSettings(dict)
    {
        this.PianoWidth = dict["Width"];
        this.PianoHeight = dict["Height"];
        this.Octaves = dict["Octaves"];
        Score.PianoSettings(false);
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
        if (difference % 12 == 0)
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

    Render(headings = false)
    {
        if (!headings)
        {
            this.scale = Manager.CreateCanvas("scale", this.PianoWidth, this.PianoHeight);
            this.triads = Manager.CreateCanvas("triads", this.PianoWidth, this.PianoHeight * 7);
            this.chords = Manager.CreateCanvas("chords", this.PianoWidth, this.PianoHeight * 7);
        }
        else
        {
            this.scale = Manager.CreateCanvas("scale", this.PianoWidth, this.PianoHeight, "Scale");
            this.triads = Manager.CreateCanvas("triads", this.PianoWidth, this.PianoHeight * 7, "Triads");
            this.chords = Manager.CreateCanvas("chords", this.PianoWidth, this.PianoHeight * 7, "Chords");
        }
        // Scale
        // White keys
        let ctx = this.scale.getContext("2d");
        ctx.fillStyle = this.KeyWhiteColor;
        ctx.fillRect(0, 0, this.PianoWidth, this.PianoHeight);
        
        // Key separators
        ctx.fillStyle = this.KeySeparatorColor;
        for (let index of this.KeyWhite)
        {
            ctx.fillRect(this.KeyPos[index] - 1, 0, 2, this.PianoHeight);
        }
        // Black keys
        ctx.fillStyle = this.KeyBlackColor;
        for (let index of this.KeyBlack)
        {
            ctx.fillRect(this.KeyPos[index], 0, this.KeyWidthBlack, this.KeyHeightBlack);
        }

        // Triads/Scale
        for (let item of [this.triads, this.chords])
        {
            ctx = item.getContext("2d");
            
            // White keys
            ctx.fillStyle = this.KeyWhiteColor;
            ctx.fillRect(0, 0, this.PianoWidth, this.PianoHeight * 7);
            
            // Key separators
            ctx.fillStyle = this.KeySeparatorColor;
            for (let index of this.KeyWhite)
            {
                ctx.fillRect(this.KeyPos[index] - 1, 0, 2, this.PianoHeight * 7);
            }

            // Black keys
            for (let i = 0; i < 7; i++)
            {
                // Horizontal separators
                ctx.fillStyle = this.KeySeparatorColor;
                ctx.fillRect(0, this.PianoHeight * i, this.PianoWidth, 2);

                ctx.fillStyle = this.KeyBlackColor;
                for (let index of this.KeyBlack)
                {
                    ctx.fillRect(this.KeyPos[index], i * this.PianoHeight, this.KeyWidthBlack, this.KeyHeightBlack);
                }
            }

        }
    }

    DrawLabels(keyIndexes, keyLabels, iterate = false)
    {
        // Scale
        let ctx = this.scale.getContext("2d");
        let counter = 0; // Counts how many time scale keys have been passed through
        for (let i = 0; i < this.KeyCount; i++)
        {
            if (keyIndexes[counter % 7] == (i % 12))
            {
                let label = keyLabels[counter % 7];
                if (this.KeyColors[i % 12] == "w")
                {
                    Manager.DrawLabel(ctx, label, this.KeyPos[i] + (this.KeyWidthWhite/2), this.KeyHeightWhite - 5);
                }
                else
                {
                    Manager.DrawLabel(ctx, label, this.KeyPos[i] + (this.KeyWidthBlack/2), this.KeyHeightBlack - 5);
                }
                counter++;
            }
            if (!iterate && counter > 7)
            {
                break;
            }
        }

        this.DrawChordLabels(keyIndexes, keyLabels)

    }

    DrawChordLabels(keyIndexes, keyLabels)
    {
        let triadctx = this.triads.getContext("2d");
        let chordctx = this.chords.getContext("2d");
        
        for (let piano = 0; piano < 7; piano++)
        {
            let counter = 0; // Counts how many time scale keys have been passed through
            let triadCounter = 0;
            let chordCounter = 0;
            for (let i = 0; i < this.KeyCount; i++)
            {
                if (keyIndexes[counter % 7] == (i % 12))
                {
                    let label = keyLabels[counter % 7];
                    if (triadCounter != -1 && this.TriadIndexes[piano][triadCounter] == counter)
                    {
                        if (this.KeyColors[i % 12] == "w")
                        {
                            Manager.DrawLabel(triadctx, label, this.KeyPos[i] + (this.KeyWidthWhite/2), (this.KeyHeightWhite - 5) + (piano * this.PianoHeight));
                        }
                        else
                        {
                            Manager.DrawLabel(triadctx, label, this.KeyPos[i] + (this.KeyWidthBlack/2), (this.KeyHeightBlack - 5) + (piano * this.PianoHeight));
                        }
                        triadCounter++;
                    }
                    if (chordCounter != -1 && this.ChordIndexes[piano][chordCounter] == counter)
                    {
                        if (this.KeyColors[i % 12] == "w")
                        {
                            Manager.DrawLabel(chordctx, label, this.KeyPos[i] + (this.KeyWidthWhite/2), (this.KeyHeightWhite - 5) + (piano * this.PianoHeight));
                        }
                        else
                        {
                            Manager.DrawLabel(chordctx, label, this.KeyPos[i] + (this.KeyWidthBlack/2), (this.KeyHeightBlack - 5) + (piano * this.PianoHeight));
                        }
                        chordCounter++;
                    }
                    if (triadCounter > this.TriadIndexes[piano].length)
                    {
                        triadCounter = -1;
                    }
                    if (chordCounter > this.ChordIndexes[piano].length)
                    {
                        chordCounter = -1;
                    }
                    counter++;
                }
                if (triadCounter == -1 && chordCounter == -1)
                {
                    break;
                }
            }
        }
    }
}