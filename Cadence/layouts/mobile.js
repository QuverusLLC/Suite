class _LayoutMobile
{
    Initialize()
    {
        Manager.Body.insertAdjacentHTML('beforeend', `
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
</div>`);
    }
}