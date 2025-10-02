var player = null;
var url = "https:\/\/livestream.ibb.gov.tr\/cam_turistik\/b_kapalicarsi.stream\/playlist.m3u8";

function bradmaxPlayerInit() {
    if(window.player){ window.bradmax.player.destroy(player); }
    
    var bradmaxPlayerConfig = {
    "showErrorDetails":false,
    "contextMenuDisabled": true,
    "dataProvider":{"source":[{"url":url}]},
    "autoplay":true,
    "mute":true
    };

    var element = document.getElementById("bradmaxPlayer");
    player = window.bradmax.player.create(element, bradmaxPlayerConfig);
    //player = window.bradmax.player.create(element, null);

    if(!window.player){ window.player = player; }
}