loadingScreen
=============
>_A high level abstraction over the little JavaScript required to display the loading progress of a webpage_

What problem does this library address?
-----------
In today's modern web development, "code splitting" is often mandatory to keep high levels of performance. However, this practice often involves figuring out what's critical and what's not; what is deliverable later and how to hide its absence in the meanwhile. Useless to say, this step often becomes a bottleneck in the workflow. It's painful to set up, and even when you manage to automate it, it's still pretty slow.

At times calculating such heuristics is not even possible: what would you display while your `Vue.js` code is downloading, when you only have the root element?

The solution
------------
This library provides the minimum setup necessary to get up and running with your own loading screen, whether simple or complex. `loadingScreen` won't care about the underlying logic at all. It has only one job: to keep track of the resource download progress and notify your functions.

Technical considerations
------------
`loadingScreen` uses an alternative approach to the usual "fade out at 100%". In fact, when fully loaded, **it's the content the one that fades in**. This very behavior lets users interact immediately with the interface without waiting for the previous animation to complete. In this way, the application seems faster while no real boosts are applied. [Even Apple has implemented it!](https://twitter.com/vincentriemer/status/1004880123617857536)

This library strives not to hinder the way you styled your website, applying neutral values to the few properties it customizes. Here are the ones that may impact your development:
- the content container has a final `z-index` of 0;
- the content container has `position: relative`;
- the `body` has `margin: 0` (applied by [Normalize.css](https://necolas.github.io/normalize.css/) as well);

Example - Bootstrap Website
------------
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Loading Screen</title>
	<link rel="preload" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" as="style"
		onload="this.onload=null;this.rel='stylesheet';loadingScreen.got(137.63)">
	<noscript><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"></noscript>
	<script>
		/*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
		(function(a){"use strict";a.loadCSS||(a.loadCSS=function(){});var b=loadCSS.relpreload={};if(b.support=function(){var d;try{d=a.document.createElement("link").relList.supports("preload")}catch(f){d=!1}return function(){return d}}(),b.bindMediaToggle=function(d){function f(){d.media=g}var g=d.media||"all";d.addEventListener?d.addEventListener("load",f):d.attachEvent&&d.attachEvent("onload",f),setTimeout(function(){d.rel="stylesheet",d.media="only x"}),setTimeout(f,3e3)},b.poly=function(){if(!b.support())for(var g,d=a.document.getElementsByTagName("link"),f=0;f<d.length;f++)g=d[f],"preload"!==g.rel||"style"!==g.getAttribute("as")||g.getAttribute("data-loadcss")||(g.setAttribute("data-loadcss",!0),b.bindMediaToggle(g))},!b.support()){b.poly();var c=a.setInterval(b.poly,500);a.addEventListener?a.addEventListener("load",function(){b.poly(),a.clearInterval(c)}):a.attachEvent&&a.attachEvent("onload",function(){b.poly(),a.clearInterval(c)})}"undefined"==typeof exports?a.loadCSS=loadCSS:exports.loadCSS=loadCSS})("undefined"==typeof global?this:global);
	</script>
	<style>
		/*! loadingScreen stylesheet ~ (c)2018 Federico Tibaldo ~ MIT license */
		body{margin:0}#ls-main{position:relative;height:100vh;opacity:0;transition:opacity 1s ease-out;overflow:auto;z-index:-2}#ls-main.ls-active{height:auto;min-height:100vh;opacity:1;z-index:0}#ls-background{position:absolute;top:0;left:0;width:100%;height:100vh;z-index:-1}
	</style>
</head>
<body>
	<div id="ls-background"></div>
	<div id="ls-main" class="bg-white">
		<!-- example -->
		<!-- credit: https://getbootstrap.com/docs/4.0/examples/narrow-jumbotron/ -->
		<div class="container">

			<header class="header clearfix">
				<nav>
				<ul class="nav nav-pills float-right">
					<li class="nav-item">
					<a class="nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
					<a class="nav-link" href="#">About</a>
					</li>
					<li class="nav-item">
					<a class="nav-link" href="#">Contact</a>
					</li>
				</ul>
				</nav>
				<h3 class="text-muted">Project name</h3>
			</header>
		
			<main role="main">
		
				<div class="jumbotron">
				<h1 class="display-3">Jumbotron heading</h1>
				<p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
				<p><a class="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
				</div>
		
				<div class="row marketing">
				<div class="col-lg-6">
					<h4>Subheading</h4>
					<p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
		
					<h4>Subheading</h4>
					<p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
		
					<h4>Subheading</h4>
					<p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
				</div>
		
				<div class="col-lg-6">
					<h4>Subheading</h4>
					<p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
		
					<h4>Subheading</h4>
					<p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
		
					<h4>Subheading</h4>
					<p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
				</div>
				</div>
		
			</main>
		
			<footer class="footer">
				<p>&copy; Company 2017</p>
			</footer>
		
		</div>
		<!-- /example -->
	</div>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"
                onload="loadingScreen.got(49.54)" defer></script>
	<script>
		/*! loadingScreen ~ (c)2018 Federico Tibaldo ~ MIT license */
		var loadingScreen=loadingScreen||function(){'use strict';var a=0;var b=0;var c=function c(b){var c=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';if(a===0){a=b;var d=document.querySelector('#ls-background');d.style=c;this.generateInnerHTML(d)}};var d=function d(c){b+=c;var d=b/a*100;this.updateInnerHTML(d);if(d===100){document.querySelector('#ls-main').classList.add('ls-active')}};var e=function e(a){throw'generateInnerHTML has not been implemented yet!'};var f=function f(a){throw'updateInnerHTML has not been implemented yet!'};return{init:c,got:d,generateInnerHTML:e,updateInnerHTML:f}}();

		loadingScreen.generateInnerHTML = function(container) {
			let parent = document.createElement('div');
			parent.style = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:system-ui,BlinkMacSystemFont,-apple-system,Segoe UI, Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;text-align:center;font-weight:100;color:#fff";
			// text
			let paragraph = document.createElement('p');
			paragraph.style = "font-size:2rem;"
			paragraph.textContent = "Your page is loading";
			// percentage
			let percentage = document.createElement('p');
			percentage.style = "font-size:3rem;margin-top:1rem;";
			percentage.textContent = '0%';
			// append elements
			parent.appendChild(paragraph);
			parent.appendChild(percentage);
			container.appendChild(parent);
			// store nodes
			this.percentage = percentage;
		};
		loadingScreen.updateInnerHTML = function(progress) {
			this.percentage.textContent = Math.round(progress) + '%';
		};
		loadingScreen.init(137.63 + 49.54, 'background:#93439b;');
		
	</script>
</body>
</html>
```