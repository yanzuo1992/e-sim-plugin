$(document).ready(function () {
    start();
    chrome.extension.onMessage.addListener(
        function (request, sender, sendMessage) {
            if (request.greeting === "start") {
                // start(timer)
            } else if (request.greeting === "end") {
                // end(timer)
            }
        });
});

function start() {
    let href = window.location.href;
    console.log(href);
    console.log("plugin starting");
    let limitReset = $("#limitReset").text();
    setTimeout(function () {
        window.location.reload();//刷新当前页面.
    }, parseInt(limitReset) * 1000);
    console.log("Limit Reset:" + limitReset);
    let actualHealth = $("#actualHealth").text();
    console.log("Actual Health:" + actualHealth);
    if (href.split("/")[3].split(".html")[0] === "battles") {
        console.log("battles");
        window.location.href = "http://omega.e-sim.org/battle.html?id=" + $($("#battlesTable").children("tbody").children("tr").get(1)).find("a").attr("href").split("id=")[1]
    } else if (href.split("/")[3].split(".html")[0] === "battle") {
        let attack = setTimeout(function () {
            if (actualHealth !== "0.0") {
                if (document.getElementById("fightButtonBerserk1") !== null) {
                    document.getElementById("fightButtonBerserk1").click();
                    window.location.reload();
                }
                if (document.getElementById("fightagainbutton") !== null) {
                    document.getElementById("fightagainbutton").click();
                }
                actualHealth = $("#actualHealth").text();
                console.log("Attack! Actral health:" + actualHealth)
            } else {
                window.clearInterval(attack);
            }
        }, 5000);
        setInterval(function () {
            console.log("Count down:" + $("#minutesLimit").text() + $("#secondsLimit").text())
            let battleText = $(".foundation-radius.fightContainer.foundation-base-font").text();
            if (battleText.indexOf("这轮的胜利方：") !== -1) {
                window.location.href = "http://omega.e-sim.org/battles.html?countryId=309"
            }
        }, 2000);
    }

}

function end(timer) {
    console.log("plugin closed");
    window.clearInterval(timer);
}