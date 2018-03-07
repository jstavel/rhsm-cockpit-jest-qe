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

import Page from './page';

class Loginpage extends Page {
  get username() { return browser.element('#login-user-input'); }
  get password() { return browser.element('#login-password-input'); }
  get loginButton() { return browser.element('button#login-button'); }

  open() { this.browser.url(this.url); return this; }
  wait() { this.username.waitForVisible();
           this.password.waitForVisible();
           return this;
         }
  login(username, password) {
    this.username.setValue(username);
    this.password.setValue(password);
    this.loginButton.click();
    return this;
  }
}
export default LoginPage;
