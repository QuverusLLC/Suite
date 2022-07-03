class _Suite
{
    constructor()
    {
        this.Title = "DAAV Suite";
        this.Version = "0.0.1";
        this.Window = document.defaultView;
        this.Elements = {
            "Suite": document.getElementById("suite_container"),
            "Title": document.getElementById("title_container"),
            "Header": document.getElementById("header_container"),
            "Body": document.getElementById("body_container"),
            "Footer": document.getElementById("footer_container"),
            "Style": document.getElementById("style_container"),

            "InstHeader": document.getElementById("inst_header"),
            "InstBody": document.getElementById("inst_body"),
            "InstStyle": document.getElementById("inst_style")
        }

        this.Sizes = {
            "Viewport": dvGetViewportSize(),
            "Suite": [0,0],
            "Title": [0,0],
            "Header": [0,0],
            "Body": [0,0],
            "Footer": [0.0],
            "Scrollbar": dvGetScrollbarSize(),
            "Offset": 0
        };
    }

    Initialize(title = this.Title, version = this.Version)
    {
        this.Window.addEventListener("resize", Suite.Resize);
        this._InitSuite();
        this._InitStyle();
        this._InitTitle(title, version);
        this._InitHeader();
        this._InitFooter();
        this._InitBody();
        this._LogSizes();
    }

    GetHeader()
    {
        return this.Elements["InstHeader"];
    }

    GetBody()
    {
        return this.Elements["InstBody"];
    }

    GetStyle()
    {
        return this.Elements["InstStyle"];
    }

    GetViewportSize()
    {
        return this.Size["Viewport"];
    }

    GetSuiteSize()
    {
        return this.Size["Suite"];
    }

    GetBodySize()
    {
        return this.Size["Body"];
    }

    Resize()
    {
        Suite._SizeSuite();
        Suite._SizeTitle();
        Suite._SizeHeader();
        Suite._SizeFooter();
        Suite._SizeBody();
    }

    _LogSizes()
    {
        let sizes = `Viewport: ` + this.Sizes["Viewport"][0] + `px, ` + this.Sizes["Viewport"][1] + `px
    Suite: ` + this.Sizes["Suite"][0] + `px, ` + this.Sizes["Suite"][1] + `px
    Title: ` + this.Sizes["Title"][0] + `px, ` + this.Sizes["Title"][1] + `px
    Header: ` + this.Sizes["Header"][0] + `px, ` + this.Sizes["Header"][1] + `px
    Body: ` + this.Sizes["Body"][0] + `px, ` + this.Sizes["Body"][1] + `px
    Footer: ` + this.Sizes["Footer"][0] + `px, ` + this.Sizes["Footer"][1] + `px
  Total Height: ` + (this.Sizes["Title"][1] + this.Sizes["Header"][1] + this.Sizes["Body"][1] + this.Sizes["Footer"][1]) + `px`
        console.log(sizes);
    }

    _InitSuite()
    {
        this.Elements["Suite"].style.border = "2px solid var(--dvSuite_separator)";
        this.Elements["Suite"].style.overflow = "hidden";
        this._SizeSuite();
    }

    _InitTitle(title, version)
    {
        this.Sizes["Title"] = [this.Sizes["Suite"][0], 42];
        this.Elements["Title"].insertAdjacentHTML('beforeend', `
        <a href="https://daav.us" target="_blank" rel="noopener noreferrer">
            <img src="../helpers/media/DAAV-logo.png" alt="DAAV, LLC logo" style="height: 42px;"></img>
        </a>
        <div class="title_name" class="title_name" style="padding-left: 10px; padding-right: 5px">
            <h2>` + title +`</h2>
        </div>
        <div class="title_version" class="title_version">
            <sup style="font-size: 10px;">` + version +`</sup>
        </div>
        <div class="title_other" class="title_other" style="padding-left: 20px;">
            <p style="font-size: 12px;">Part of DAAV, LLC's <a href="https://github.com/daavllc/Suite" target="_blank" rel="noopener noreferrer">suite</a> of open source tools</p>
        </div>`);
        this.Elements["Title"].style.border = "1px solid var(--dvSuite_separator)"
        this.Elements["Title"].style.display = "flex";
        this.Elements["Title"].style.alignItems = "center";
        this.Elements["Title"].style.overflow = "hidden";
        this.Elements["Title"].style.padding = "0px";
        this._SizeTitle();
    }

    _InitHeader()
    {
        this.Elements["Header"].style.border = "1px solid var(--dvSuite_separator)"
        this.Elements["Header"].style.overflow = "hidden";
        this.Elements["Header"].style.padding = "0px";
        this._SizeHeader();
    }

    _InitBody()
    {
        this.Elements["Body"].style.border = "1px solid var(--dvSuite_separator)"
        this.Elements["Body"].style.overflow = "auto";
        this.Elements["Body"].style.padding = "0px";
        this._SizeBody();
    }

    _InitFooter()
    {
        this.Elements["Footer"].insertAdjacentHTML('beforeend', `
        <div class="footer_name" class="footer_name" style="padding-left: 10px; padding-right: 5px">
            <p>` + this.Title +`</p>
        </div>
        <div class="title_version" class="title_version">
            <sup style="font-size: 10px;">` + this.Version +`</sup>
        </div>
        <div class="title_other" class="title_other" style="padding-left: 20px;">
            <p style="font-size: 12px;">Copyright © 2022 DAAV, LLC</p>
        </div>`);
        this.Elements["Footer"].style.border = "1px solid var(--dvSuite_separator)"
        this.Elements["Footer"].style.display = "flex";
        this.Elements["Footer"].style.alignItems = "center";
        this.Elements["Footer"].style.overflow = "hidden";
        this.Elements["Footer"].style.padding = "0px";
        this._SizeFooter();
    }

    _InitStyle()
    {
        this.Elements["Style"].insertAdjacentHTML('beforeend', `
html, body {
    background: var(--dvSuite_background);
    height: 100%;
    width: 100%;
    margin: 0px;
}`);
    }

    _SizeSuite()
    {  // vpW - 4, vpH - 4
        this.Sizes["Viewport"] = dvGetViewportSize();
        this.Sizes["Suite"] = [this.Sizes["Viewport"][0] - (4), this.Sizes["Viewport"][1] - (4)]
        this.Elements["Suite"].style.width = `${this.Sizes["Suite"][0]}px`;
        this.Elements["Suite"].style.height = `${this.Sizes["Suite"][1]}px`;
    }

    _SizeTitle()
    { // suW, 42 + 2
        this.Elements["Title"].style.width = `${this.Sizes["Suite"][0] - this.Sizes["Offset"]}px`;
        this.Elements["Title"].style.height = `42px`;
        this.Sizes["Title"] = [parseInt(this.Elements["Title"].offsetWidth, 10), parseInt(this.Elements["Title"].offsetHeight, 10)];
    }

    _SizeHeader()
    {  // suW, 42 + 2
        this.Elements["Header"].style.width = `${this.Sizes["Suite"][0] - this.Sizes["Offset"]}px`;
        this.Elements["Header"].style.height = `42px`;
        this.Sizes["Header"] = [parseInt(this.Elements["Header"].offsetWidth, 10), parseInt(this.Elements["Header"].offsetHeight, 10)];
    }

    _SizeBody()
    { // suW, remaining height
        let heightOffset = (this.Sizes["Title"][1] + this.Sizes["Header"][1] + this.Sizes["Footer"][1])
        this.Elements["Body"].style.width = `${this.Sizes["Suite"][0] - this.Sizes["Offset"]}px`;
        this.Elements["Body"].style.height = `${this.Sizes["Suite"][1] - heightOffset}px`;
        this.Sizes["Body"] = [parseInt(this.Elements["Body"].offsetWidth, 10), parseInt(this.Elements["Body"].offsetHeight, 10)];
    }

    _SizeFooter()
    {  // suW, 42 + 2
        this.Elements["Footer"].style.width = `${this.Sizes["Suite"][0] - this.Sizes["Offset"]}px`;
        this.Elements["Footer"].style.height = `42px`;
        this.Sizes["Footer"] = [parseInt(this.Elements["Footer"].offsetWidth, 10), parseInt(this.Elements["Footer"].offsetHeight, 10)];
    }
}