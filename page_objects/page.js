export default class Page {
  constructor (browser) {
    this.browser = browser;
    this.title = 'Cockpit Page';
  }

  open(path){
    this.browser.url(path);
  }
}

// function page (browser) {
//   this.browser=browser;
//   this.title = 'Cockpit Page';
// }

// page.prototype.open = function (path) {
//   this.browser.url(path);
// };

// module.exports = new page();
