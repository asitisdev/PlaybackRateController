chrome.browserAction.onClicked.addListener(function () {

    let playbackRate = prompt('동영상 배속 설정', '1.0');
    if (!+playbackRate) {
        alert("올바른 숫자값을 입력해 주세요");
        playbackRate = "1.0"
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            null,
            {code:
            `document.querySelectorAll('video').forEach(v => v.playbackRate = "${playbackRate}");
            document.querySelectorAll('iframe').forEach(item => item.contentWindow.document.body.querySelectorAll('video').forEach(v => v.playbackRate = "${playbackRate}"));`
        });
    });

});
