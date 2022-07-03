class _Manager
{
    constructor()
    {
        this.DefineElements();
    }

    DefineElements()
    {
        let html = "";
        this.Header = Suite.GetHeader();
        this.Body = Suite.GetBody();
        this.Style = Suite.GetStyle();


        html = `Header Container`;
        this.Header.insertAdjacentHTML('beforeend', html);
        this.Header.style.display = "flex";
        this.Header.style.alignItems = "center";

        html = `
<div id="panel-container" class="panel-container" style="width: 100%; height: 100%;">
    <div id="panel-left" class="panel-left">
        <div id="panel-left-header-container" class="panel-left-header-container">
            <h3 style="padding: 5px; text-align: left;">Lyrics Panel</h3>
        </div>
        <div id="panel-left-content-container" class="panel-left-content-container">
            <div id="left-body-container" class="left-body-container">
                <div id="left-content-number-container" class="left-content-number-container">
                    <textarea readonly id="lyrics-lines" class="lyrics-lines" style="height: 100%; width: 100%; overflow: hidden;"></textarea>
                </div>
                <div id="left-content-lyrics-container" class="left-content-lyrics-container">
                    <textarea id="lyrics-textarea" class="lyrics-textarea" placeholder="Type lyrics here" style="height: 100%; width: 100%; overflow: auto; overflow: hidden;"></textarea>
                </div>
                <div id="left-content-syllables-container" class="left-content-syllables-container">
                    <textarea readonly id="lyrics-syllables" class="lyrics-syllables" style="height: 100%; width: 100%; overflow: hidden;"></textarea>
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
    </div>
</div>`;
        this.Body.insertAdjacentHTML('beforeend', html);

        this.PanelContainer = document.getElementById('panel-container');
        this.PanelContainer.style.display = "flex";
        this.PanelContainer.style.justifyContent = "center";
        this.PanelContainer.style.position = "relative";

        html = `
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
    height: 100%;
}
.panel-left-header-container,
.panel-middle-header-container,
.panel-right-header-container {
    position: relative;
    justify-content: center;
    padding: 0px;
    margin: 0px;
    height: 30px;
    background: var(--dvSuite_background1);
    float: top;
}
.panel-middle-content-container,
.panel-left-content-container,
.panel-right-content-container {
    position: relative;
    display: inline-block;
    padding: 0px;
    width: 100%;
    height: 100%;
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
    overflow: hidden;
}
.left-content-number-container {
    float: left;
    position: relative;
    vertical-align: top;
    overflow: hidden;
    height: 100%;
    width: 5%;
    min-width: 24px;
    max-width: 24px;
    font-family: var(--dvSuite_font-family);
    letter-spacing: var(--dvSuite_letter-spacing);
    font-size: var(--dvSuite_font-size);
    text-align: left;
}
.left-content-lyrics-container {
    float: left;
    position: relative;
    vertical-align: top;
    overflow: hidden;
    height: 100%;
    min-width: 173px;
    width: 88%;
    max-width: 90%;
    font-family: var(--dvSuite_font-family);
    letter-spacing: var(--dvSuite_letter-spacing);
    font-size: var(--dvSuite_font-size);
}
.left-content-syllables-container {
    float: left;
    position: relative;
    vertical-align: top;
    overflow: shown;
    height: 100%;
    width: 5%;
    min-width: 20px;
    max-width: 20px;
    font-family: var(--dvSuite_font-family);
    letter-spacing: var(--dvSuite_letter-spacing);
    font-size: var(--dvSuite_font-size);
    text-align: right;
}`;
        this.Style.insertAdjacentHTML('beforeend', html);
    }
}