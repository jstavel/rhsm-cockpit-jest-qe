import {Observable} from 'rxjs';
import * as webdriverio from 'webdriverio';
const WebSocket = require('ws');
import * as ini from 'ini';
import {LoginPage} from '../page_objects/login.page'; 

const options = {
  desiredCapabilities: {
    browserName: 'firefox',
    marionette: true,
    javascriptEnabled: true,
    acceptSslCerts: true,
    acceptInsecureCerts: true
  }
};

let env;
let browser;
let ws;
let rhsm;

beforeAll(() =>{
  console.log('hooking browser');
  env = require('env2')('.env');
  browser = webdriverio.remote(options).init();
  return browser.url(process.env.COCKPIT_URL);
});

beforeAll(() =>{
  console.log('hooking rhsm service');
  ws = new WebSocket(process.env.RHSM_SERVICES_URL + '/monitor/etc/rhsm/rhsm.conf');
  console.log('ws is created');
  return Observable.fromEvent(ws,'open')
    .take(1)
    .map((x) => Observable.fromEvent(ws,'message').publish())
    .forEach((x) => {console.log('rhsm is openned');
                     rhsm = x;
                     rhsm.connect();});
});

afterAll(t=>{
  console.log('end of browser');
  return browser.end();
});

function getRHSMContent(ws, rhsm){
  let rhsmContentPromise = rhsm
      .map((x) => JSON.parse(x.data))
      .filter(x => x.event === "pong")
      .take(1)
      .map(x => ini.decode(new Buffer(x.content,'base64').toString('utf8')))
      .toPromise();
  ws.send('ping');
  return rhsmContentPromise;
};

test('Proxy dialog has 01', async () => {
  console.log('proxy dialog first test 01');
  (new LoginPage(browser))
    .open()
    .wait()
    .login(process.env.COCKPIT_USER_NAME,
           process.env.COCKPIT_USER_PASSWORD);
  //browser.debug();
  // MainPage.wait()
  //   .subscriptions();
  // SubscriptionsPage.wait();
  // UnregisteredStatusElement.wait()
  //   .registerWithUser(process.env.COCKPIT_SUBSCRIPTION_USER_NAME,
  //                     process.env.COCKPIT_SUBSCRIPTION_PASSWORD);

  // let rhsmConfig;
  // getRHSMContent(ws,rhsm)
  //   .then((x) => {rhsmConfig = x; console.log('01 value is:', rhsmConfig); done()});
})
