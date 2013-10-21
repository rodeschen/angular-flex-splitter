'use strict';
angular.module("splitter", []).directive("splitter", function() {
    return {
        restrict: 'AC',
        scope: {
            'splitter': '@',
            'fixed': '@'
        },
        link: function(scope, iElement) {
            if (scope.fixed === 'fixed') return;
            var isActive = false;
            var isPerv = /^(up|left)$/.test(scope.splitter);
            var target = isPerv ? iElement.prev() : iElement.next();
            var style = /^(up|down)$/.test(scope.splitter) ? 'height' : 'width';
            var eventType = /^(up|down)$/.test(scope.splitter) ? 'clientY' : 'clientX';
            var sourceSize, targetSize;
            iElement.on('mousedown', function(ev) {
                isActive = true;
                targetSize = parseInt(target.css(style));
                iElement.parents(".flexbox-content").addClass("active");
            }).parent().on('mousemove', function(ev) {
                if (!isActive) return;
                if (isPerv) {
                    target.css(style, targetSize + (ev[eventType] - sourceSize));
                } else {
                    target.css(style, targetSize - (ev[eventType] - sourceSize));
                }
            }).on('mousedown', function(ev) {
                sourceSize = ev[eventType];
            }).on('mouseup', function(ev) {
                isActive = false;
                iElement.parents(".flexbox-content").removeClass("active");
            });
        }
    };
});
