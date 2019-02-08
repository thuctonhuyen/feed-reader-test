/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length)
        .not
        .toBe(0);
    });

    /* a test that loops through each feed
       * in the alblFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
    it('have URL defined and not empty', function () {
      allFeeds
        .forEach(function (feed) {
          var feedUrl = _.get(feed, 'url');
          expect(feedUrl).toBeDefined();
          expect(feedUrl)
            .not
            .toBe('');
        })
    })

    /* a test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
    it('have name defined and not empty', function () {
      allFeeds
        .forEach(function (feed) {
          var feedName = _.get(feed, 'name');
          expect(feedName).toBeDefined();
          expect(feedName)
            .not
            .toBe('');
        })
    })
  });

  describe('The menu', function () {
    var MENU_HIDDEN_CLASS_NAME = 'menu-hidden';
    var MENU_ICON_LINK_CLASS_NAME = 'menu-icon-link';
    var bodyClassName;
    /*  a test that ensures the menu element is
      * hidden by default. You'll have to analyze the HTML and
      * the CSS to determine how we're performing the
      * hiding/showing of the menu element.
      */
    it('is hidden by default', function () {
      bodyClassName = getBodyClassName();
      expect(bodyClassName).toBeDefined();
      expect(bodyClassName).toBe(MENU_HIDDEN_CLASS_NAME);
    })

    /*  a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
    it('should change visibility when menu icon is clicked', function () {
      var $menuIconSelector = $('.' + MENU_ICON_LINK_CLASS_NAME);

      // menu display when clicked
      $menuIconSelector.click();
      bodyClassName = getBodyClassName();
      expect(bodyClassName)
        .not
        .toBe(MENU_HIDDEN_CLASS_NAME);

      // menu hide when clicked again
      $menuIconSelector.click();
      bodyClassName = getBodyClassName();
      expect(bodyClassName).toBe(MENU_HIDDEN_CLASS_NAME);
    })
  })

  describe('Initial Entries', function () {
    beforeEach(function (done) {
      loadFeed(0, done);
    });

    /*  a test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      * Remember, loadFeed() is asynchronous so this test will require
      * the use of Jasmine's beforeEach and asynchronous done() function.
      */
    it('should have at least a single .entry element within .feed container after loadFeed is called',
    function () {
      var $entries = $('.feed .entry');
      var entriesLength = $entries && _.size($entries);
      expect(entriesLength).toBeDefined();
      expect(entriesLength).toBeGreaterThan(0);

    })
  })

  describe('New Feed Selection', function () {
    var before;
    var after;
    beforeEach(function (done) {
      loadFeed(0, function () {
        before = _.trim(getFeedEntriesText());

        loadFeed(1, function () {
          after = _.trim(getFeedEntriesText());
          done();
        })
      })
    })

    /*  a test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * Remember, loadFeed() is asynchronous.
      */
    it('should have content change when a new feed is loaded by the loadFeed', function () {
      expect(before)
        .not
        .toBe(after);
    })
  })
}());

// helpers:
var getBodyClassName = function () {
  if ($) {
    var $body = $('body');
    return $body && $body.attr('class');
  }
}

var getFeedEntriesText = function () {
  if ($) {
    var $feedEntry = $('.feed .entry')
    return $feedEntry && $feedEntry.text();
  }
}