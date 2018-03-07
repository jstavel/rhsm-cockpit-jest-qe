class Page {
  constructor (browser) {
    console.log('constructor');
    this.browser = browser;
    this.title = 'Cockpit Page';
  }

  open(path){
    this.browser.url(path);
  }
  call(fn){
    return fn();
  }
}
export {Page};
// function page (browser) {
//   this.browser=browser;
//   this.title = 'Cockpit Page';
// }

// page.prototype.open = function (path) {
//   this.browser.url(path);
// };

// module.exports = new page();
