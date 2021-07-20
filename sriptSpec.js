const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const {document} = (new JSDOM('<!doctype html><html><body> <div class="wrapper"><ul id="navbar"></ul><ul class="list"></ul></div></body></html>')).window;
global.document = document;
global.window = document.defaultView;

describe('Tests for script.js', () => {
    var script = require('./script.js');

    it('should call setEvents()', () => {
      let spyOnSetEvents = spyOn(script, 'setEvents');
      script.setEvents();
      expect(spyOnSetEvents).toHaveBeenCalled();
    })
    it('should call createNavbarElemets()', () => {
      let spyOnCreateNavbarElemets = spyOn(script, 'createNavbarElemets');
      script.createNavbarElemets();
      expect(spyOnCreateNavbarElemets).toHaveBeenCalled();
      expect(document.getElementById('navbar').childNodes.length).toBe(6);
    })
})
  