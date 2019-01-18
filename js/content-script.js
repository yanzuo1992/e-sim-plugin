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
let hasTime = -1;

function check_time() {
    $.ajax({
        url: "limitsReset.html",
        data: null,
        success: (data) => {
            hasTime = parseInt(data.replace("\"", ""))
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            check_time();
        }
    });
}

function start() {
    let href = window.location.href;
    console.log(href);
    if (document.getElementById("loginContainer")) {
        $("#registeredPlayerLogin").val("lightningbear");//Fill in your user name
        $("#loginContainer").find("input[name='password']").val("lightningbear");//Fill in your password
        $("#bestForm").find(".foundation-style.button.foundationButton").trigger("click");
        return;
    }
    console.log("plugin starting");
    let limitReset = -1;

    check_time();
    let timer;
    let check = setInterval(function () {
        console.log("wait check time :" + hasTime);
        if (hasTime !== -1) {
            timer = setTimeout(function () {
                window.location.reload();//刷新当前页面.
            }, parseInt(hasTime) * 1000);
            console.log("The timer has been created. Wait " + hasTime + " seconds to refresh the page.")
            window.clearInterval(check)
        }
    }, 1000);

    setInterval(function () {
        console.log("Count down:" + $("#limit_timer_time_text").text());
    }, 10000);
    console.log("Limit Reset:" + limitReset);
    let actualHealth = $("#actualHealth").text();
    console.log("Actual Health:" + actualHealth);
    let location = href.split("/")[3].split(".html")[0];
    console.log("Page location:" + location);

    if (location === "battles") {
        console.log("battles");
        for (let a of $("#battlesTable").children("tbody").children("tr").find("a")) {
            if ($(a).text().indexOf("新手战场") !== -1) {
                window.location.href = "http://omega.e-sim.org/battle.html?id=" + $(a).attr("href").split("id=")[1]
                return;
            }
        }
    } else if (location === "battle") {
        if (actualHealth !== "0.0") {
            if (document.getElementById("fightButtonBerserk1") !== null) {
                document.getElementById("fightButtonBerserk1").click();
                window.location.reload();
                return;
            }
            actualHealth = $("#actualHealth").text();
            console.log("Attack! Actral health:" + actualHealth)
        }
        let battleText = $(".foundation-radius.fightContainer.foundation-base-font").text();
        if (battleText.indexOf("这轮的胜利方：") !== -1) {
            window.location.href = "http://omega.e-sim.org/battles.html?countryId=309"
            return;
        }
    } else if (location === "work") {
        console.log("Work work");
        if (document.getElementById("workButton") != null) {
            document.getElementById("workButton").click();
        }
        window.location.href = "http://omega.e-sim.org/index.html";
        return;
    } else if (location === "train") {
        console.log("Train train");
        if (document.getElementById("trainButton") != null) {
            document.getElementById("trainButton").click();
        }
        window.location.href = "http://omega.e-sim.org/index.html";
        return;
    }
    if (document.getElementById("taskButtonTrain") != null) {
        window.location.href = "http://omega.e-sim.org/train.html";
        return;
    }
    if (document.getElementById("taskButtonWork") != null) {
        window.location.href = "http://omega.e-sim.org/work.html";
        return;
    }
    if (document.getElementById("taskButtonFight") != null) {
        window.location.href = "http://omega.e-sim.org/battles.html?countryId=309";
        return;
    }

}

function end(timer) {
    console.log("plugin closed");
    window.clearInterval(timer);
}