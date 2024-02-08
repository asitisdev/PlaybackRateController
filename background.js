function setPlaybackRate(playbackRate) {
  document
    .querySelectorAll("video")
    .forEach((v) => (v.playbackRate = playbackRate));
}

function getPlaybackRate() {
  let playbackRate = prompt("동영상 배속 설정", "1.0");

  if (!+playbackRate) {
    alert("올바른 숫자값을 입력해 주세요");
    playbackRate = 1.0;
  }

  return +playbackRate;
}

function onClick(tab) {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: getPlaybackRate,
    })
    .then((injectionResults) => {
      for (const { result: playbackRate } of injectionResults) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id, allFrames: true },
          func: setPlaybackRate,
          args: [playbackRate],
        });
      }
    });
}

chrome.action.onClicked.addListener(function (tab) {
  onClick(tab);
});

chrome.commands.onCommand.addListener(function (command, tab) {
  if (command === "set_playback_rate") {
    onClick(tab);
  }
});
