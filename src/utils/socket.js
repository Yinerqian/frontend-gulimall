
var websock = null;
var global_callback = null;

/**
 * 
 * @param {*} this vue对象
 */
let vm;
export function initWebSocket(that) { //初始化weosocket
    if(websock){return}
    vm = that;
    //ws地址
    // var wsuri = "ws://192.168.0.21:7777/lgsm/ws/dw";
    // var wsuri = "ws://192.168.1.205:7777/lgsm/ws/dw";
    var wsuri = "ws://192.168.1.29:7777/lgsm/ws/dw";
    websock = new WebSocket(wsuri);
    websock.onmessage = function (e) {
        websocketonmessage(e);
    }
    websock.onclose = function (e) {
        websocketclose(e);
    }
    websock.onopen = function () {
        websocketOpen();
    }

    //连接发生错误的回调方法
    websock.onerror = function () {
        console.log("WebSocket连接发生错误");
    }
}

// 实际调用的方法
function sendSock(agentData, callback) {
    global_callback = callback;
    if (websock.readyState === websock.OPEN) {
        //若是ws开启状态
        websocketsend(agentData)
    } else if (websock.readyState === websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData, callback);
        }, 1000);
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData, callback);
        }, 1000);
    }
}

//数据接收
function websocketonmessage(e) {
    if (e.data) {
        try {
            let row = JSON.parse(e.data).data[0]
            vm.$set(vm.socketInfo, row.code, row.value)
            if (row.unit && row.unit != 'null' && row.unit != 'undefined') {
                vm.$set(vm.socketInfo, row.code + "_unit", row.unit)
            }
            vm.clearOtherPosition(row.code)
            vm.clearOtherWorkPoint(row.code)
            vm.clearOtherWorkStatus(row.code)
            vm.refreshKey++;
        } catch (error) {

        }
    }
}

//数据发送
function websocketsend(agentData) {
    websock.send("测试111");
}

//关闭
function websocketclose(e) {
    console.log("connection closed (" + e.code + ")");
}

function websocketOpen(e) {
    console.log("连接成功");
}

export default {
    websocketOpen,
    websocketclose,
    websocketsend,
    websocketonmessage,
    sendSock,
    initWebSocket
}