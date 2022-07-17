function dvGetViewportSize()
{
    var vpW;
    var vpH;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof this.Window.innerWidth != 'undefined')
    {
        vpW = this.Window.innerWidth,
        vpH = this.Window.innerHeight
    }
    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
    {  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        vpW = document.documentElement.clientWidth,
        vpH = document.documentElement.clientHeight
    }

    // older versions of IE
    else
    {
        vpW = document.getElementsByTagName('body')[0].clientWidth,
        vpH = document.getElementsByTagName('body')[0].clientHeight
    }
    return [vpW, vpH];
}

function dvGetScrollbarSize()
{
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbar = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbar;
}

function dvResize()
{
    console.log("Resizing!");
    Suite.Resize();
}

function dvGetTextareaCharactersPerLine(ta)
{
    let width = parseInt(window.getComputedStyle(ta).width, 10)
    let fontWidth = 12 * .7;
    let charactersPerLine = parseInt(width/fontWidth, 10);
    console.log(charactersPerLine)
    return charactersPerLine;
}