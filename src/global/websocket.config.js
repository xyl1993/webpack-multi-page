import { apiConfig } from "./api.config";
import { getToken } from '../utils/auth';

var W3CWebSocket, lockReconnect = false;


const createWebSocket = (_this,token) => {
  W3CWebSocket = require("websocket").w3cwebsocket;
  _this.client = new W3CWebSocket(
    apiConfig.websocketUrl+'/'+getToken()
  );
  window.onbeforeunload = function() {
    _this.client.close();
  };
  initEventHandle(_this);
}

const resetWs = (_this) => {
  //心跳检测
  var heartCheck = {
    timeout: 60000, //60秒
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function (_this) {
      // clearTimeout(this.timeoutObj);
      // clearTimeout(this.serverTimeoutObj);
      return this;
    },
    start: function (_this) {
      var self = this;
      this.timeoutObj = setTimeout(() => {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常
        _this.client.send("HeartBeat");
        self.serverTimeoutObj = setTimeout(() => {
          //如果超过一定时间还没重置，说明后端主动断开了
          _this.client.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        }, self.timeout);
      }, this.timeout);
    }
  };
  heartCheck.reset(_this).start(_this);
}


function initEventHandle(_this) {
  _this.client.onerror = function (e) {
    console.log("Connection Error");
    reconnect(_this);
  };

  _this.client.onclose = function () {
    console.log("echo-protocol Client Closed");
    reconnect(_this);
  };
  _this.client.onopen = function () {
    console.log("WebSocket Client Connected");
    _this.client.send(1);
    resetWs(_this);
  };
  _this.client.onmessage = function (e) {
    if (e.data) {
      // const message = JSON.parse(e.data);
      _this.$notify({
        title: '老板',
        message: 'socket已经连上了',
        duration: 0,
        position: 'bottom-right',
        type: 'success',
        onClick:function(){
          // _this.$router.push({ path: "/orderDetail" ,query: { scree: `${message.data}` }});
        }
      });
    }
  };
}
function reconnect(_this) {
  if (lockReconnect) return;
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  setTimeout(() => {
    createWebSocket(_this);
    lockReconnect = false;
  }, 2000);
}

export { createWebSocket }