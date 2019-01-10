$("#start").click(function () {
        console.log("plugin starting")
        chrome.tabs.getSelected(null, function (tab) {　　// 先获取当前页面的tabID
            chrome.tabs.sendMessage(tab.id, {greeting: "start"}, function (response) {
                console.log(response);　　// 向content-script.js发送请求信息
            });
        })
    }
);
$("#end").click(function () {
    console.log("plugin closed")
    chrome.tabs.getSelected(null, function (tab) {　　// 先获取当前页面的tabID
        chrome.tabs.sendMessage(tab.id, {greeting: "end"}, function (response) {
            console.log(response);　　// 向content-script.js发送请求信息
        });
    })
});

