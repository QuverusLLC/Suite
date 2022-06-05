class _Manager
{
    // Manages HTML elements
    constructor()
    {
        this.InstrumentElements = {}
        this.DefineElements();

        this.LabelFont = "bold 14px roboto mono";
        this.LabelColor = "#00ba6c";
        this.InstrumentRows = 0;
        this.SelectedRow = 0;
    }

    DefineElements()
    {
        let html = "";
        this.TitleContainer = document.getElementById("title_container");
        this.HeaderContainer = document.getElementById("header_container");
        this.BodyContainer = document.getElementById("body_container");
        this.FooterContainer = document.getElementById("footer_container");
        this.StyleContainer = document.getElementById("style_container");

        html = `
        <div class="title_name" class="title_name" style="padding-left: 10px; padding-right: 5px">
    <h2>Score</h2>
</div>
<div class="title_version" class="title_version" style="padding: 2px;">
    <sup style="font-size: 10px;">0.1.1</sup>
</div>
<div class="title_other" class="title_other" style="padding-left: 20px;">
    <p style="font-size: 12px;">Part of DAAV, LLC's <a href="https://github.com/daavllc/Suite" target="_blank" rel="noopener noreferrer">suite</a> of open source tools</p>
</div>`;
        this.TitleContainer.insertAdjacentHTML('beforeend', html);
        this.TitleContainer.style.display = "flex";
        this.TitleContainer.style.width = "100%";
        this.TitleContainer.style.alignItems = "center";
        this.TitleContainer.style.margin = "0px";
        this.TitleContainer.style.border = "1px solid var(--dvSuite_separator)"
        this.TitleContainer.style.height = "25px";

        html = `
<div id="settings_container" class="settings_container" style="display: flex; align-items: center;">
    <h3 style="padding: 10px;">Scale Settings</h3>
    <div class="scale_settings_container" style="display: flex; align-items: center;">
        <div class="root_container" style="display: flex; align-items: center; padding: 10px;">
            <h4 style="font-size: 12px; padding: 5px;">Root Note:</h4>
            <select id="scale_root" class=combo style="font-size: 12px;">
                <option value="C" selected>C</option>
                <option value="C#">C#</option>
                <option value="D">D</option>
                <option value="D#">D#</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="F#">F#</option>
                <option value="G">G</option>
                <option value="G#">G#</option>
                <option value="A">A</option>
                <option value="A#">A#</option>
                <option value="B">B</option>
            </select>
        </div>
        <div class="pattern_container" style="display: flex; align-items: center; padding: 10px;">
            <h4 style="font-size: 12px; padding: 5px;">Scale:</h4>
            <select id="scale_pattern" class=combo style="font-size: 12px;">
                <option value="major" selected>Major (Ionian)</option>
                <option value="minor">Minor (Aeolian)</option>
                <option value="dorian">Dorian</option>
                <option value="phrygian">Phrygian</option>
                <option value="lydian">Lydian</option>
                <option value="mixolydian">Mixolydian</option>
                <option value="locrian">Locrian</option>
                <option value="harmonic-minor">Harmonic Minor</option>
                <option value="melodic-minor">Melodic Minor</option>
            </select>
        </div>
    </div>
</div>`;
        this.HeaderContainer.insertAdjacentHTML('beforeend', html);
        this.HeaderContainer.style.display = "flex";
        this.HeaderContainer.style.width = "100%";
        this.HeaderContainer.style.alignItems = "center";
        this.HeaderContainer.style.border = "1px solid var(--dvSuite_separator)"
        this.HeaderContainer.style.height = "40px";

        this.SettingsContainer = document.getElementById('settings_container');
        this.SettingsContainer.style.display = "flex";
        this.SettingsContainer.style.alignItems = "center";
        this.SettingsContainer.style.justifyContent = "center";
        this.SettingsContainer.style.position = "relative";

        html = `
<div id="instrument_selection_container" class="instrument_selection_container"></div>
<div id="instrument_settings_container" class="instrument_settings_container"></div>
<div id="instrument_container" class="instrument_container"></div>`;
        this.BodyContainer.insertAdjacentHTML('beforeend', html);

        this.InstrumentSelectionContainer = document.getElementById('instrument_selection_container');
        this.InstrumentSettingsContainer = document.getElementById('instrument_settings_container');
        
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
        
        this.InstrumentSettingsContainer.style.display = "none";
        this.InstrumentSettingsContainer.style.alignItems = "center";
        this.InstrumentSettingsContainer.style.justifyContent = "center";

        this.InstrumentContainer = document.getElementById('instrument_container');
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
        let keys = Object.keys(this.InstrumentElements).reverse();
        for (let key in keys)
        {
            this.EraseElements(keys[key]);
        }
        this.InstrumentRows = 0;
        this.SelectedRow = 0;
    }

    EraseElements(key)
    {
        let value = this.InstrumentElements[key];
        for (let i = value.length - 1; i >= 0; i--)
        {
            let removed = value.pop();
            let doc = document.getElementById(removed)
            if (doc != null)
            {
                doc.remove();
            }
        }
        delete this.InstrumentElements[key];
    }

    CreateCanvas(alias, width, height, heading = false, style = "border:1px solid #c3c3c3;")
    {
        let id = "canvas_" + alias;
        if (id in this.InstrumentElements)
        {
            let doc = document.getElementById(id + "_element");
            doc.setAttribute("width", width.toString());
            doc.setAttribute("height", height.toString());
            doc.setAttribute("style", style);
            return doc;
        }
        let name = "";
        let html = "";
        this.InstrumentElements[id] = [];
        if (heading)
        {
            name = id + "_heading";
            html += `<h3 id="` + name + `">` + heading + `</h3>\n`;
            this.InstrumentElements[id].push(name);
        }
        name = id + "_container";
        html += `<div id="` + name + `" class="` + name + `">\n`;
        this.InstrumentElements[id].push(name);

        name = id + "_element";
        html += `  <canvas id="` + name + `">Your browser does not support the canvas element.</canvas>\n`;
        this.InstrumentElements[id].push(name);
        html += `</div>`;
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

    DeleteCanvas(alias)
    {
        let id = "canvas_" + alias;
        this.EraseElements(id);
    }

    // Settings

    SelectRow(row = this.InstrumentRows, heading = false)
    {
        if (row > this.InstrumentRows)
        {
            this.CreateRow(heading)
        }
        this.SelectedRow = row;
    }

    CreateRow(heading = false)
    {
        this.InstrumentRows++;
        this.SelectedRow = this.InstrumentRows;
        let id = "row_" + this.SelectedRow;
        this.InstrumentElements[id] = [];

        let name = id + "_container_parent";
        this.InstrumentElements[id].push(name);
        let html = `<div id="` + name + "" + `" class="` + name + `">\n`;
        if (heading != false)
        {
            name = id + "_heading";
            html += `  <p id="` + name + `" style="display: flex; align-items: center; justify-content: center;">` + heading + `</p>\n`;
            this.InstrumentElements[id].push(name);
        }
        name = id + "_container";
        html += `  <div id="` + name + "" + `" class="` + name + `">\n`;
        this.InstrumentElements[id].push(name);

        html += `  </div>\n</div>`;
        this.InstrumentSettingsContainer.insertAdjacentHTML('beforeend', html);

        let row = document.getElementById(name);
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "center";
        row.style.position = "relative";
    }

    DeleteRow(row)
    {
        let id = "row_" + row;
        this.EraseElements(id);
    }

    CreateSlider(alias, min, max, value, step = 1, heading = undefined)
    {
        let id = "slider_" + alias;
        if (id in this.InstrumentElements)
        {
            let doc = document.getElementById(id + "_element");
            doc.setAttribute("min", min.toString());
            doc.setAttribute("max", max.toString());
            doc.setAttribute("value", value.toString());
            doc.setAttribute("step", step.toString());
            return doc;
        }
        this.InstrumentElements[id] = [];
        let name = id + "_container";
        let html = `<div id="` + name + "" + `" class="` + name + `">\n`;
        this.InstrumentElements[id].push(name);
        if (heading != undefined)
        {
            name = id + "_heading";
            html += `  <p id="` + name + `">` + heading + `</p>\n`;
            this.InstrumentElements[id].push(name);
        }
        name = id + "_element";
        html += `  <input id="` + name + `" type="range" class="slider" min="` + min + `" max="` + max + `" value="` + value +`" step="` + step +`"></input>`;
        this.InstrumentElements[id].push(name);

        document.getElementById("row_" + this.SelectedRow + "_container").insertAdjacentHTML('beforeend', html)
        return document.getElementById(name);
    }

    DeleteSlider(alias)
    {
        let id = "slider_" + alias;
        this.EraseElements(id);
    }

    CreateCombo(alias, options, selected = 0, heading = undefined)
    {
        let id = "combo_" + alias;
        if (id in this.InstrumentElements)
        {
            // TODO: add updating options and selected
            let doc = document.getElementById(id + "_element");
            return doc;
        }
        this.InstrumentElements[id] = [];
        let name = id + "_container";

        this.InstrumentElements[id].push(name);
        let html = `<div id="` + name + "" + `" class="` + name + `">\n`;
        if (heading != undefined)
        {
            name = id + "_heading";
            html += `  <p id="` + name + `">` + heading + `</p>\n`;
            this.InstrumentElements[id].push(name);
        }
        name = id + "_element";
        html += `  <select id="` + name + `" class="combo">\n`;
        this.InstrumentElements[id].push(id + "_element");
        for (let i = 0; i < options.length; i++)
        {
            name = "option_" + i + "_" + id;
            if (selected == i)
            {
                html += `    <option id="` + name + `" value="` + options[i][0] + `" selected>` + options[i][1] + `</option>\n`;
            }
            else
            {
                html += `    <option id="` + name +`" value="` + options[i][0] + `">` + options[i][1] + `</option>\n`;
            }
            
        }
        html += `  </select>\n</div>`;
        document.getElementById("row_" + this.SelectedRow + "_container").insertAdjacentHTML('beforeend', html);
        return document.getElementById(id + "_element");
    }

    DeleteCombo(alias)
    {
        let id = "combo_" + alias;
        this.EraseElements(id);
    }

    DrawLabel(ctx, label, x, y)
    {
        ctx.font = this.LabelFont;
        ctx.fillStyle = this.LabelColor;
        ctx.textAlign = "center";
        ctx.fillText(label, x, y);
    }
}