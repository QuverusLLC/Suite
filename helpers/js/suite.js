class _Suite
{
    constructor()
    {
        this.Title = "DAAV Suite";
        this.Version = "0.1.0";
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

        this.isMobile = false;
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
        { 
            this.isMobile = true;
        }
    }

    Initialize(title = this.Title, version = this.Version)
    {
        console.log("Initializing dvSuite...");
        console.log("Running on Mobile:", this.isMobile);
        this.Window.addEventListener("resize", dvResize);
        this._InitSuite(title);
        this._InitStyle();
        this._InitTitle(title, version);
        this._InitHeader();
        this._InitFooter();
        this._InitBody();
        this._LogSizes();
        console.log("Done!");
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
        this._SizeSuite();
        this._SizeTitle();
        this._SizeHeader();
        this._SizeFooter();
        this._SizeBody();
        this.SizeHook();
    }

    TitleMenu(x)
    {
        x.classList.toggle("change");
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

    _InitSuite(title)
    {
        this.Elements["Suite"].style.border = "2px solid var(--dvSuite_separator)";
        this.Elements["Suite"].style.overflow = "hidden";
        this.Elements["Suite"].insertAdjacentHTML('beforeend', `<title>dvSuite | ` + title + `</title>`)
        this._SizeSuite();
    }

    _InitTitle(title, version)
    {
        this.Sizes["Title"] = [this.Sizes["Suite"][0], 42];
        if (!this.isMobile)
        {
            this.Elements["Title"].insertAdjacentHTML('beforeend', `
            <div class="title_logo" class="title_logo">
                <a href="https://quver.us" target="_blank" rel="noopener noreferrer">
                    <img src="https://quverusllc.github.io/Suite/helpers/media/qv_logo-512x512.png" alt="Quverus LLC logo" style="height: 42px;"></img>
                </a>
            </div>
            <div class="title_name" class="title_name" style="padding-left: 15px; padding-right: 5px;">
                <h2>` + title +`</h2>
            </div>
            <div class="title_version" class="title_version">
                <sup style="font-size: 10px;">` + version +`</sup>
            </div>
            <div class="title_other" class="title_other" style="padding-left: 20px;">
                <p style="font-size: 12px;">Part of Quverus LLC's <a href="https://github.com/quverusllc/Suite" target="_blank" rel="noopener noreferrer">suite</a> of open source tools</p>
            </div>
            <div class="title_menu" onclick="Suite.TitleMenu(this)" style="margin-left: auto; margin-right: 0; padding-right: 10px;">
                <div class="titleMenu-bar1"></div>
                <div class="titleMenu-bar2"></div>
                <div class="titleMenu-bar3"></div>
            </div>`);
        }
        else
        {
            this.Elements["Title"].insertAdjacentHTML('beforeend', `
            <a href="https://quver.us" target="_blank" rel="noopener noreferrer">
                <img src="../helpers/media/qv_logo-512x512.png" alt="Quverus LLC logo" style="height: 42px;"></img>
            </a>
            <div class="title_name" class="title_name" style="padding-left: 15px; padding-right: 5px">
                <h2>` + title +`</h2>
            </div>
            <div class="title_version" class="title_version">
                <sup style="font-size: 10px;">` + version +`</sup>
            </div>`);
        }
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
            <p style="font-size: 12px;">Copyright © 2022 Quverus LLC</p>
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
}
.suite_container {
    margin: 0px;
}
.footer_container {
    margin-top: auto;
    margin-bottom: 0;
}
.title_menu {
    display: inline-block;
    cursor: pointer;
}
.title_logo, .title_name, .title_version, .title_other {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
    height= 100%;
}

.titleMenu-bar1, .titleMenu-bar2, .titleMenu-bar3 {
    width: 35px;
    height: 5px;
    background-color: #999999;
    margin: 6px 0;
    transition: 0.4s;
}
.change .titleMenu-bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
}
.change .titleMenu-bar2 {
    opacity: 0;
}
.change .titleMenu-bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
}
`);
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
    {  // suW, 22 + 2
        this.Elements["Footer"].style.width = `${this.Sizes["Suite"][0] - this.Sizes["Offset"]}px`;
        this.Elements["Footer"].style.height = `22px`;
        this.Sizes["Footer"] = [parseInt(this.Elements["Footer"].offsetWidth, 10), parseInt(this.Elements["Footer"].offsetHeight, 10)];
    }

    SizeHook()
    {} // Defined in Suite application
}