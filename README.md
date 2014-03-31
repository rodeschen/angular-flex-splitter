angular-flex-splitter
=====================

In reference to [polymer-ui-splitter](http://www.polymer-project.org/polymer-all/polymer-ui-elements/polymer-ui-splitter/index.html) ,rewrite to angular.

It’s still  using the jQuery,and mainly use prov and parents method.

Installation
================

    <script src="jquery.js"></script>
    <script src="angular.min.js"></script>
    <script src="angular-flex-splitter.js"></script>
	<script>
	    angular.module("app", ['splitter']);
    </script>    

Usage
===============
** parameter Usage **

1. CSS class
    1. flexbox-content - full parent content
    2. flexbox - content(default horizontal mode)
    3. column - vertica mode
    4. flex - main block
2. splitter 
    1. vertica mode -  up | down
    2. horizontal mode - left | right
3. fixed - fixed mode(value fixed)


==============
	
	<!-- class flexbox-content : fully parent -->
	<!-- class flexbox : flex mode -->
	<!-- class column : vertica mode -->
    <div class="flexbox-content flexbox column" style="border:1px #AAA solid;">
    	<!-- class flex : main block -->
        <div class="flexbox flex">
			
			<!-- horizontal mode -->        
			<!-- set default width -->
            <div style="width:200px">left</div>
            
            <!-- horizontal mode : splitter = left | right -->
            <div splitter="left"></div>
            
            <!-- class flex : main block -->
            <div class="flexbox column flex">
                <div class="flex">top</div>
                <div splitter="down"></div>
                <div style="height:100px">down</div>
            </div>
            
            <div splitter="right"></div>
            
            <div class="flexbox column" style="width:300px">
                <div class="flex">top</div>
                <div splitter="down"></div>
                <div style="height:100px">down</div>
            </div>
        </div>
        <!-- vertica mode : splitter = down | up -->
        <!-- fixed mode : fixed = fixed -->
        <div splitter="down" fixed="fixed"></div>
        <!-- set default height -->
        <div style="height:100px">footer fixed</div>
    </div>















The MIT License (MIT)
