class _Manager
{
    constructor()
    {
        this.DefineElements();
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
<div class="title_name" class="title_name" style="padding: 10px;">
    <h2>Cadence</h2>
</div>
<div class="title_version" class="title_version" style="padding: 2px;">
    <p style="font-size: 10px; vertical-align: bottom;">0.0.2</p>
</div>
<div class="title_other" class="title_other" style="padding: 20px;">
    <p style="font-size: 12px; text-align: right;">A part of DAAV, LLC's <a href="https://github.com/daavllc/Suite" target="_blank" rel="noopener noreferrer">suite</a> of open source tools</p>
</div>`;
        this.TitleContainer.insertAdjacentHTML('beforeend', html);
        this.TitleContainer.style.display = "flex";
        this.TitleContainer.style.width = "100%";
        this.TitleContainer.style.alignItems = "center";
        this.TitleContainer.style.margin = "0px";
        this.TitleContainer.style.border = "1px solid var(--dvSuite_separator)"
        this.TitleContainer.style.height = "5%";

        html = `
Header Container`;
        this.HeaderContainer.insertAdjacentHTML('beforeend', html);
        this.HeaderContainer.style.display = "flex";
        this.HeaderContainer.style.width = "100%";
        this.HeaderContainer.style.alignItems = "center";
        this.HeaderContainer.style.margin = "0px";
        this.HeaderContainer.style.border = "1px solid var(--dvSuite_separator)"
        this.HeaderContainer.style.height = "10%";

        html = `
<div id="panel-left" class="panel-left">
    <div id="panel-left-header-container" class="panel-left-header-container">
        <h3 style="padding: 5px; text-align: left;">Lyrics Panel</h3>
    </div>
    <div id="panel-left-content-container" class="panel-left-content-container">
        <div id="left-body-container" class="left-body-container">
            <div id="left-content-number-container" class="left-content-number-container">
                <textarea readonly id="lyrics-lines" class="lyrics-lines" style="height: 100%; width: 100%;"></textarea>
            </div>
            <div id="left-content-lyrics-container" class="left-content-lyrics-container">
                <textarea id="lyrics-textarea" class="lyrics-textarea" placeholder="Type lyrics here" style="height: 100%; width: 99%; overflow: auto;"></textarea>
            </div>
            <div id="left-content-syllables-container" class="left-content-syllables-container">
                <textarea readonly id="lyrics-syllables" class="lyrics-syllables" style="height: 100%; width: 100%;"></textarea>
            </div>
        </div>
    </div>
    <div class="resizer panel-left-resizer"></div>
</div>
<div id="panel-middle" class="panel-middle" style="width: 40%;">
    <div id="panel-middle-header-container" class="panel-middle-header-container">
        <h3 style="padding: 5px; text-align: center;">Helper Panel</h3>
    </div>
    <div id="panel-middle-content-container" class="panel-middle-content-container"></div>
</div>
<div id="panel-right" class="panel-right">
    <div id="panel-right-header-container" class="panel-right-header-container">
        <h3 style="padding: 5px; text-align: right;">Parameter Panel</h3>
    </div>
    <div id="panel-right-content-container" class="panel-right-content-container"></div>
    <div class="resizer panel-right-resizer"></div>
</div>`;
        this.BodyContainer.insertAdjacentHTML('beforeend', html);
        this.BodyContainer.style.display = "flex";
        this.BodyContainer.style.justifyContent = "center";
        this.BodyContainer.style.position = "relative";
        this.BodyContainer.style.padding = "0px";
        this.BodyContainer.style.margin = "0px";
        this.BodyContainer.style.height = "84%";

        html = `
html, body {
    background: var(--dvSuite_background);
    height: 100%;
    width: 100%;
    margin: 0px;
}
.resizer {
    position: absolute;
}
.panel-left-resizer {
    cursor: col-resize;
    height: 100%;
    right: 0;
    top: 0;
    width: 5px;
}
.panel-right-resizer {
    cursor: col-resize;
    height: 100%;
    left: 0;
    top: 0;
    width: 5px;
}
.panel-left,
.panel-middle,
.panel-right {
    border: 1px solid var(--dvSuite_separator);
    position: relative;
    width: 100%;
    height: 100%;
}
.panel-left-header-container,
.panel-middle-header-container,
.panel-right-header-container {
    position: relative;
    justify-content: center;
    padding: 0px;
    margin: 0px;
    top: -20px;
    height: 30px;
    background: var(--dvSuite_background1);
}
.panel-middle-content-container,
.panel-left-content-container,
.panel-right-content-container {
    position: relative;
    display: inline-block;
    padding: 0px;
    top: -20px;
    width: 100%;
    height: 92%;
}
.left-body-container {
    justify-content: center;
    position: relative;
    vertical-align: top;
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
    border: 1px solid var(--dvSuite_separator);
    overflow: hidden;
}
.panel-left,
.panel-right {
    position: relative;
    width: 30%;
}
.left-content-number-container {
    float: left;
    position: relative;
    vertical-align: top;
    height: 100%;
    width: 5%;
    min-width: 20px;
    max-width: 20px;
    top: -1px;
    left: -1px;
    font-family: var(--dvSuite_font-family);
    letter-spacing: var(--dvSuite_letter-spacing);
    font-size: var(--dvSuite_font-size);
    text-align: left;
    overflow: hidden;
}
.left-content-lyrics-container {
    float: left;
    position: relative;
    vertical-align: top;
    height: 100%;
    min-width: 173px;
    width: 81%;
    max-width: 90%;
    overflow: hidden;
}
.left-content-syllables-container {
    float: right;
    position: relative;
    vertical-align: top;
    height: 100%;
    width: 5%;
    min-width: 20px;
    max-width: 20px;
    top: -1px;
    right: -1px;
    font-family: var(--dvSuite_font-family);
    letter-spacing: var(--dvSuite_letter-spacing);
    font-size: var(--dvSuite_font-size);
    text-align: right;
    overflow: hidden;
}`;
        this.StyleContainer.insertAdjacentHTML('beforeend', html);
    }
}