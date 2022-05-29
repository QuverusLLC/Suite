const Manager = new _Manager();

function Initialize()
{
    console.log("Hello world!");
}

let leftPanel = document.getElementById("panel-left");
let middlePanel = document.getElementById("panel-middle");
let rightPanel = document.getElementById("panel-right");

let lyricsLines = document.getElementById("lyrics-lines");
let lyricsInput = document.getElementById("lyrics-textarea");
let lyricsSyllables = document.getElementById("lyrics-syllables");

lyricsInput.oninput = function()
{
    CheckLines();
}

let x = 0;

let leftW = 0;
let middleW = 0;
let rightW = 0;
let viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
let viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

window.onresize = function()
{
    viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    CheckLines();
}

const mouseDownHandler = function(e)
{
    x = e.clientX;

    GetWidths();

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
}

function GetWidths()
{
    const leftStyles = window.getComputedStyle(leftPanel);
    const middleStyles = window.getComputedStyle(middlePanel);
    const rightStyles = window.getComputedStyle(rightPanel);
    leftW = parseInt(leftStyles.width, 10);
    middleW = parseInt(middleStyles.width, 10);
    rightW = parseInt(rightStyles.width, 10);
}

const mouseMoveHandler = function(e)
{
    const dX = e.clientX - x;
    if (x < viewportWidth/2)
    {
        let px = leftW + dX;
        if (px >= 215 && px <= viewportWidth * .35)
        {
            middlePanel.style.width = `${middleW + -dX}px`;
            leftPanel.style.width = `${px}px`;
            rightPanel.style.width = `${rightW}px`;
        }
    }
    else
    {
        let px = rightW - dX;
        if (px >= viewportWidth * .2 && px <= viewportWidth * .35)
        {
            middlePanel.style.width = `${middleW + dX}px`;
            rightPanel.style.width = `${px}px`;
            leftPanel.style.width = `${leftW}px`;
        }
    }
    CheckLines();
}

const mouseUpHandler = function()
{
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
}

const leftResizer = leftPanel.querySelectorAll(".resizer");

[].forEach.call(leftResizer, function(resizer)
{
    resizer.addEventListener("mousedown", mouseDownHandler);
});

const rightResizer = rightPanel.querySelectorAll(".resizer");
[].forEach.call(rightResizer, function(resizer)
{
    resizer.addEventListener("mousedown", mouseDownHandler);
});

function CheckLines()
{
    let lines = [];
    let syllables = [];
    let i = 0;
    for (let line of lyricsInput.value.split("\n"))
    {
        lines.push(line);
        syllables.push(0)
        for (let word of line.replace(/\b/, " ").split(" "))
        {
            //syllables[i] += GetSyllable(word)
            syllables[i] += word.length;
        }
        i++;
    }
    UpdateCounters(lines, syllables);
}

function UpdateCounters(lines, syllables)
{
    lyricsLines.value = "";
    lyricsSyllables.value = ""; // 8.238 - 8.5238 = 8.3809 // 180/21 - 188/21 = 8.5713 - 8.95
    let rows = lyricsInput.rows;
    let lht = parseInt(window.getComputedStyle(lyricsInput).lineHeight, 10)
    let columns = parseInt(lyricsInput.cols, 10);
    console.log(columns, rows)
    // 173-179/20: 8.55, 27: 8.33, 217-221/26: 8.34
    for (let i = 0; i < lines.length; i++)
    {
        lyricsLines.value += (i + 1).toString() + "\n";
        lyricsSyllables.value += syllables[i].toString() + "\n";
        remaining = lines[i].length;
        while (remaining > columns) // TODO: this doesn't work: determine number of rows in textarea to add line numbers
        {
            lyricsLines.value += "\n";
            lyricsSyllables.value += "\n";
            remaining -= columns;
        }
    }

}