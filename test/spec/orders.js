/* global Orders, jQuery */

'use strict';

(function () {

	describe('Orders', function () {

		describe('fetch', function () {

			it('should have a fetch method', function() {
				var orders = new Orders();
				expect(orders.fetch).to.be.a('function');
			});

			it('should fetch orders from the API', function(done) {
				jQuery.getJSON = function(url) {
					expect(url).to.eq('/api/v1/orders.json');
					done();
				};

				var orders = new Orders();
				orders.fetch(function() {});
			});

			it('should return an array when the API returns successfully', function(done) {
				jQuery.getJSON = function(url, success) {
					success([]);
				};

				var orders = new Orders();
				orders.fetch(function(data) {
					expect(data).to.be.an('array');
					done();
				});
			});

		});

		describe('render', function () {

			it('renders <li>-elements inside the given element', function() {
				var ul = document.createElement('ul');
				var orders = new Orders();
				orders.render(ul, [{'name' : 'An order'}]);
				expect(ul.getElementsByTagName('li').length).to.eq(1);
			});

		});

	});

})();
