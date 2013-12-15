'use strict';
angular.module("splitter", []).directive("splitter", ['$window',
    function($window) {
        return {
            restrict: 'AC',
            link: function(scope, iElement, iAttr) {
                if (iAttr.fixed === 'fixed') return;
                var isActive = false;
                var isPerv = /^(up|left)$/.test(iAttr.splitter);
                var target = isPerv ? iElement.prev() : iElement.next();
                var style = /^(up|down)$/.test(iAttr.splitter) ? 'height' : 'width';
                var eventType = /^(up|down)$/.test(iAttr.splitter) ? 'clientY' : 'clientX';
                var sourceSize, targetSize;
                var content = iElement.parents(".flexbox-content");
                iElement.on('mousedown', function(ev) {
                    isActive = true;
                    targetSize = parseInt(target.css(style));
                    content.addClass("active");
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
                    content.removeClass("active");
                });

                var wEl = angular.element($window);
                function resize() {
                    content.width(content.parent().width());
                    //content.height(wEl.height() - content.position().top);
                    //content.height(content.parent().height());
                }
                resize();
                //fix parent full width issue
                wEl.off('resize.splitter').on('resize.splitter', resize);
            }
        };
    }
]);
