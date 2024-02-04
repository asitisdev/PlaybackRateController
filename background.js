async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

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

async function onClick() {
  let tab = await getCurrentTab();
  await chrome.scripting
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

chrome.action.onClicked.addListener(async function () {
  onClick();
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === "set_playback_rate") {
    onClick();
  }
});
