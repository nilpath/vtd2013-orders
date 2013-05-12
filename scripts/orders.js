/* global jQuery */

'use strict';

(function($) {
	window.Orders = function() {

		this.fetch = function(callback) {
			$.getJSON('/api/v1/orders.json', function(data) {
				callback(data);
			});
		};

		this.render = function(element, orders) {
			var $element = $(element);
			orders.forEach(function(order) {
				$element.append($('<li>').html(order.name));
			});
		};

	};
})(jQuery);
