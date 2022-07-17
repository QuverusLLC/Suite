class _Manager
{
    Initialize()
    {
        this.DefineElements();
    }

    DefineElements()
    {
        if (Suite.isMobile)
        {
            this.Layout = new _LayoutMobile();
        }
        else
        {
            this.Layout = new _LayoutDesktop();
        }
        this.Header = Suite.GetHeader();
        this.Body = Suite.GetBody();
        this.Style = Suite.GetStyle();

        this.Header.insertAdjacentHTML('beforeend', `Header Container`);
        this.Header.style.display = "flex";
        this.Header.style.alignItems = "center";

        this.Layout.Initialize();

        this.PanelContainer = document.getElementById('panel-container');
        this.PanelContainer.style.display = "flex";
        this.PanelContainer.style.justifyContent = "center";
        this.PanelContainer.style.position = "relative";

        this.Style.insertAdjacentHTML('beforeend', `
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
    overflow: auto;
    display: inline-flex;
}
.panel-left,
.panel-right {
    width: 30%;
}
.left-content-number-container,
.left-content-syllables-container {
    float: left;
    position: relative;
    vertical-align: top;
    overflow: hidden;
    height: 100%;
    width: 24px;
    font-family: var(--dvSuite_font-family);
    letter-spacing: var(--dvSuite_letter-spacing);
    font-size: var(--dvSuite_font-size);
}
 {
    float: left;
    position: relative;
    vertical-align: top;
    overflow: hidden;
    height: 100%;
    width: 24px;
    font-family: var(--dvSuite_font-family);
    letter-spacing: var(--dvSuite_letter-spacing);
    font-size: var(--dvSuite_font-size);
}
.left-content-lyrics-container {
    float: left;
    position: relative;
    vertical-align: top;
    overflow: hidden;
    height: 100%;
    font-family: var(--dvSuite_font-family);
    letter-spacing: var(--dvSuite_letter-spacing);
    font-size: var(--dvSuite_font-size);
    flex-grow: 100;
}`);
    }
}