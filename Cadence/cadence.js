const Suite = new _Suite();
const Manager = new _Manager();

function Initialize()
{
    Suite.Initialize("Cadence", "0.0.4");
    Manager.Initialize();
    Cadence.Initialize();
}

class _Cadence
{
    constructor()
    {
        let x = 0

        this.mouseDownHandler = function(e)
        {
            x = e.clientX;

            Cadence.GetWidths();

            document.addEventListener("mousemove", Cadence.mouseMoveHandler);
            document.addEventListener("mouseup", Cadence.mouseUpHandler);
        }

        this.mouseUpHandler = function()
        {
            document.removeEventListener("mousemove", Cadence.mouseMoveHandler);
            document.removeEventListener("mouseup", Cadence.mouseUpHandler);
        }

        this.mouseMoveHandler = function(e)
        {
            const dX = e.clientX - this.x;
            if (x < Suite.GetBodySize()[0]/2)
            {
                let px = leftW + dX;
                if (px >= 215 && px <= Suite.GetBodySize()[0] * .35)
                {
                    Cadence.Panels["Middle"].style.width = `${Cadence.Widths["Middle"] + -dX}px`;
                    Cadence.Panels["Left"].style.width = `${px}px`;
                    Cadence.Panels["Right"].style.width = `${Cadence.Widths["Right"]}px`;
                }
            }
            else
            {
                let px = rightW - dX;
                if (px >= Suite.GetBodySize()[0] * .2 && px <= Suite.GetBodySize()[0] * .35)
                {
                    Cadence.Panels["Middle"].style.width = `${Cadence.Widths["Middle"] + dX}px`;
                    Cadence.Panels["Right"].style.width = `${px}px`;
                    Cadence.Panels["Left"].style.width = `${Cadence.Widths["Left"]}px`;
                }
            }
            //this.Panel["Left"]["LyricLines"].style.width = '24px';
            //this.Panel["Left"]["LyricSyllables"].style.width = '24px';
            //this.Panel["Left"]["Lyrics"].style.width = `${Cadence.Widths["Left"] - (24 + 28)}px`
            Cadence.CheckLines();
        }
    }
    
    Initialize()
    {

        this.Panels = {
            "Left": document.getElementById("panel-left"),
            "Middle": document.getElementById("panel-middle"),
            "Right": document.getElementById("panel-right")
        }

        this.Panel = {
            "Left": {
                "LyricLines": document.getElementById("left-content-number-container"),
                "Lyrics": document.getElementById("left-content-lyrics-container"),
                "LyricSyllables": document.getElementById("left-content-syllables-container")
            }
        }

        this.Styles = {
            "Left": window.getComputedStyle(this.Panels["Left"]),
            "Middle": window.getComputedStyle(this.Panels["Middle"]),
            "Right": window.getComputedStyle(this.Panels["Right"])
        }

        this.Widths = {
            "Left": 0,
            "Middle": 0,
            "Right": 0
        }

        this.Heights = {
            "Left": 0,
            "Middle": 0,
            "Right": 0
        }
    
        this.leftResizer = this.Panels["Left"].querySelectorAll(".resizer");
    
        [].forEach.call(this.leftResizer, function(resizer)
        {
            resizer.addEventListener("mousedown", Cadence.mouseDownHandler);
        });
    
        this.rightResizer = this.Panels["Right"].querySelectorAll(".resizer");
        [].forEach.call(this.rightResizer, function(resizer)
        {
            resizer.addEventListener("mousedown", Cadence.mouseDownHandler);
        });
    
        this.lyricLines = document.getElementById("lyrics-lines");
        this.lyricInput = document.getElementById("lyrics-textarea");
        this.lyricSyllables = document.getElementById("lyrics-syllables");
    
        this.lyricInput.oninput = function()
        {
            Cadence.CheckLines();
        }
    }

    GetWidths()
    {
        this.Widths["Left"] = parseInt(this.Styles["Left"].width, 10);
        this.Widths["Middle"] = parseInt(this.Styles["Middle"].width, 10);
        this.Widths["Right"] = parseInt(this.Styles["Right"].width, 10);
    }

    CheckLines()
    {
        let lines = [];
        let syllables = [];
        let i = 0;
        for (let line of this.lyricInput.value.split("\n"))
        {
            lines.push(line);
            syllables.push(0)
            for (let word of line.replace(/\b/, " ").split(" "))
            {
                syllables[i] += GetSyllable(word)
                //syllables[i] += word.length;
            }
            i++;
        }
        this.UpdateCounters(lines, syllables);
    }
    
    UpdateCounters(lines, syllables)
    {
        let charsPerLine = dvGetTextareaCharactersPerLine(this.lyricInput);

        this.lyricLines.value = "";
        this.lyricSyllables.value = "";
        
        for (let i = 0; i < lines.length; i++)
        {
            this.lyricLines.value += (i + 1).toString() + "\n";
            this.lyricSyllables.value += syllables[i].toString() + "\n";
            let characters = lines[i].length - charsPerLine;
            while (characters >= 1)
            {
                this.lyricLines.value += "\n";
                this.lyricSyllables.value += "\n";
                characters -= charsPerLine;
            }
        }
    }
}

const Cadence = new _Cadence();