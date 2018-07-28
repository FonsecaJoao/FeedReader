/**
 * @description All tests are placed within the $() function to
 * ensure they don't run until the DOM is ready
 */
$(function() {
    /**
     * @description This is the first test suite and it is all about
     * the RSS feeds definitions
     */
    describe('RSS Feeds', function() {

        /**
         * @description Checks if allFeeds variable is defined and its
         * length is greater than 0
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * @description Loops through each feed in allFeeds object
         * and checks if has a URL defined and that is not empty
         */
        it('has not empty URL', function() {
            for(var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /**
         * @description Loops through each feed in allFeeds object
         * and checks if has a name defined and that is not empty
         */
        it('has not empty name', function() {
            for(var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /**
     * @description This is the second test suite and it is all about
     * the menu
     */
    describe('The menu', function() {

        /**
         * @description Checks if the menu element is hidden by
         * default
         */
        it('menu is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /**
         * @description Menu changes visibility when the menu icon
         * is clicked
         */
        it('menu changes on click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /**
     * @description This is the third test suite and it all about
     * the initial entries
     */
    describe('Initial Entries', function() {

        /**
         * @description Checks when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container.
         * Since loadFeed() is asynchronous this test will require
         * the use of Jasmine's beforeEach and asynchronous done()
         * function
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least one item in container', function() {
            var entryFeed = $('.feed .entry');
            expect(entryFeed.length > 0).toBe(true);
        });
    });

    /**
     * @description This is the fourth test suite and it all about
     * the new feed selection
     */
    describe('New Feed Selection', function() {

        /**
         * @description Checks when a new feed is loaded by the
         * loadFeed function that the content actually changes
         */
        var feed,
            feedVal;
        beforeEach(function(done) {
            loadFeed(1, function() {
                feed = $('.feed').html();

                loadFeed(2, function() {
                    feedVal = $('.feed').html();
                    done();
                });
            });
        });

        it('content changes', function() {
            expect(feedVal).not.toEqual(feed);
        });
    });
}());
