class _Manager
{
    // Manages HTML elements
    constructor()
    {
        this.InstrumentElements = {}
        this.DefineElements();

        this.LabelFont = "bold 14px arial";
        this.LabelColor = "#00ba6c";
    }

    DefineElements()
    {
        let html = "";
        this.SettingsContainer = document.getElementById('settings_container');
        this.SettingsContainer.style.display = "flex";
        this.SettingsContainer.style.alignItems = "center";
        this.SettingsContainer.style.justifyContent = "center";
        this.SettingsContainer.style.position = "relative";
        html = `
<div class="scale_container" style="display: flex;">
  <h2>Scale Settings</h2>
  <p>Root Note</p>
  <select id="scale_root" class=combo>
    <option value="C" selected>C</option>
    <option value="C#">C#</option>
    <option value="D">D</option>
    <option value="D#">D#</option>
    <option value="E">E</option>
    <option value="F">F</option>
    <option value="F#">F#</option>
    <option value="G">G</option>
    <option value="G#">/G#</option>
    <option value="A">A</option>
    <option value="A#">A#</option>
    <option value="B">B</option>
  </select>
  <p>Pattern</p>
  <select id="scale_pattern" class=combo>
    <option value="major" selected>Major (Ionian)</option>
    <option value="minor">Minor (Aeolian)</option>
    <option value="dorian">Dorian</option>
    <option value="phrygian">Phrygian</option>
    <option value="lydian">Lydian</option>
    <option value="mixolydian">Mixolydian</option>
    <option value="locrian">Locrian</option>
    <option value="harmonic-minor">Harmonic Minor</option>
  </select>
</div>`;
        this.SettingsContainer.insertAdjacentHTML('beforeend', html);
        this.InstrumentSelectionContainer = document.getElementById('instrument_selection_container');
        this.InstrumentSelectionContainer.style.display = "flex";
        this.InstrumentSelectionContainer.style.alignItems = "center";
        this.InstrumentSelectionContainer.style.justifyContent = "center";
        this.InstrumentSelectionContainer.style.position = "relative";
        html = `
<div class="select_container" style="display: flex; align-items: center;">
  <h3 id="select_heading">Instrument:</h3>
  <select id="select_instrument" class="combo">
    <option value="piano" selected>Piano</option>
    <option value="guitar">Guitar</option>
  </select>
  <button onclick="Manager.ToggleSettings();">Settings</button>
</div>`;
        this.InstrumentSelectionContainer.insertAdjacentHTML('beforeend', html);
        this.InstrumentSettingsContainer = document.getElementById('instrument_settings_container');
        this.InstrumentSettingsContainer.style.display = "none";
        this.InstrumentSettingsContainer.style.alignItems = "center";
        this.InstrumentSettingsContainer.style.justifyContent = "center";

        this.InstrumentContainer = document.getElementById('instrument_container');
        this.StyleContainer = document.getElementById('style');
    }

    ToggleSettings()
    {
        if (this.InstrumentSettingsContainer.style.display === "none")
        {
            this.InstrumentSettingsContainer.style.display = "block";
        }
        else
        {
            this.InstrumentSettingsContainer.style.display = "none";
        }
    }

    DeleteInstrument()
    {
        for (const [key, value] of Object.entries(this.InstrumentElements))
        {
            for (let i = value.length; i >= 0; i--)
            {
                let doc = document.getElementById(value.pop())
                if (doc != null)
                {
                    doc.remove();
                }
            }
            delete this.InstrumentElements[key];
        }
    }

    CreateCanvas(id, width, height, heading = undefined, style = "border:1px solid #c3c3c3;")
    {
        let name = "";
        let html = "";
        this.InstrumentElements[id] = [];
        if (heading != undefined)
        {
            name = id + "_heading";
            html += `<h3 id="` + name + `">` + heading + `</h3>\n`;
            this.InstrumentElements[id].push(name);
        }
        name = id + "_container";
        html += `<div id="` + name + `" class="` + name + `">\n`;
        this.InstrumentElements[id].push(name);

        name = id + "_canvas";
        html += `  <canvas id="` + name + `">Your browser does not support the canvas element.</canvas>\n</div>`;
        this.InstrumentElements[id].push(name);
        this.InstrumentContainer.insertAdjacentHTML('beforeend', html);

        let canvas = document.getElementById(name);
        let container = canvas.parentElement;

        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";
        container.style.position = "relative";

        canvas.setAttribute("width", width.toString());
        canvas.setAttribute("height", height.toString());
        canvas.setAttribute("style", style);
        return canvas;
    }

    DrawLabel(ctx, label, x, y)
    {
        ctx.font = this.LabelFont;
        ctx.fillStyle = this.LabelColor;
        ctx.textAlign = "center";
        ctx.fillText(label, x, y)
    }
}