/**
 * A high level abstraction over the little JavaScript required to display the loading progress of a webpage
 * @author fedeTibaldo
 * @copyright Federico Tibaldo 2018
 * @license MIT
 * @global
 */
let loadingScreen = loadingScreen || (function() {

	"use strict";

	/**
	 * The expected payload size of all the asynchronous requests put together
	 * @private 
	 */
	let expected = 0;

	/**
	 * The so-far received payload size
	 * @private
	 */
	let received = 0;

	/**
	 * One-time initialization
	 * @param {number} size the expected payload size of all the asynchronous requests put together
	 * @param {string} [style=''] the inline styles of the loading screen container
	 */
	let init = function(size, style = '') {
		if ( expected === 0 ) {
			expected = size;
			let container = document.querySelector('#ls-background');
			container.style = style;
			this.generateInnerHTML(container);
		}
	};

	/**
	 * Register the fetched resource size and trigger the interface update
	 * @param {number} partial the size of the payload of the singular request
	 */
	let got = function(partial) {
		received += partial;
		const percentage = received / expected * 100;
		this.updateInnerHTML(percentage);
		if ( percentage === 100 ) {
			document.querySelector('#ls-main').classList.add('ls-active');
		}
	};

	/**
	 * User overridable function
	 * @param {Object} container the loading screen container
	 */
	let generateInnerHTML = function(container) {
		throw 'generateInnerHTML has not been implemented yet!';
	}

	/**
	 * User overridable function
	 * @param {number} percentage the loading progress
	 */
	let updateInnerHTML = function(percentage) {
		throw 'updateInnerHTML has not been implemented yet!';
	}

	return { init, got, generateInnerHTML, updateInnerHTML }

})();