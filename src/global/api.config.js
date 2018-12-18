let base_api_host = '';
let openLink = '';
let websocketUrl='';
if(process.env.NODE_ENV === 'development'){
  openLink ='http://localhost:4000/#/';
  base_api_host='/api';
  websocketUrl = 'ws://127.0.0.1:8080/websocket';
}else{
  openLink = 'http://office.jshflm.com/dist/index.html#/';
  websocketUrl = 'wss://office.jshflm.com/websocket';
}
export const apiConfig = {
  base_api_host: base_api_host,
  openLink:openLink,
  websocketUrl:websocketUrl,
  allowUrls: "login", //不需要添加token请求的接口
  noJsonTypeUrls: "\/selDomitoryScoreList|\/test", //不需要json传参的接口
}