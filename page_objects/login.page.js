// var Page = require('./page');

// var LoginPage = Object.create(Page, {
//     username: { get: function() { return browser.element('#login-user-input')}},
//     password: { get: function() { return browser.element('#login-password-input')}},
//     loginButton: { get: function() { return browser.element('button#login-button')}},

//     open : { value: function() { browser.url(this.url); return this; } },
//     wait: { value: function() {
//         this.username.waitForVisible();
//         this.password.waitForVisible();
//         return this;
//     }},
//     login: { value: function (username, password){
//         this.username.setValue(username);
//         this.password.setValue(password);
//         this.loginButton.click();
//         return this;
//     }}
// });

// module.exports = LoginPage;

import {Page} from './page';

class LoginPage extends Page {
  get username() { return this.browser.element('#login-user-input'); }
  get password() { return this.browser.element('#login-password-input'); }
  get loginButton() { return this.browser.element('button#login-button'); }

  async open() { console.log('open a login page');
           await this.browser.url(this.url);
           return this; }

  async wait() { console.log('wait for login page');
           await this.username.waitForVisible();
           await this.password.waitForVisible();
           return this; }

  async login(username, password) {
    console.log('login on a login page');
    await this.username.setValue(username);
    await this.password.setValue(password);
    await this.loginButton.click();
    return this;
  }
}
export {LoginPage};
