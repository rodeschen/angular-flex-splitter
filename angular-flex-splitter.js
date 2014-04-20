'use strict';
angular.module("splitter", []).directive("splitter", ['$window', '$timeout',
  function($window, $timeout) {
    return {
      restrict: 'AC',
      template: '<div class="ghost"></div>',
      link: function(scope, iElement, iAttr) {
        if (iAttr.fixed === 'fixed') return;
        var isActive = false;
        var isPerv = /^(up|left)$/.test(iAttr.splitter);
        var target = isPerv ? iElement.prev() : iElement.next();
        var style = /^(up|down)$/.test(iAttr.splitter) ? 'height' : 'width';
        var ghostStyle = /^(up|down)$/.test(iAttr.splitter) ? 'top' : 'left';
        var eventType = /^(up|down)$/.test(iAttr.splitter) ? 'clientY' : 'clientX';
        var sourceSize, targetSize;
        var body = angular.element('body');
        var content = iElement.parents(".flexbox-content");

        var ghost = iElement.children(".ghost");
        var lastSize = 0;
        ghost.on('mousedown', function(ev) {
          isActive = true;
          targetSize = parseInt(target.css(style));
          body.addClass("flexbox-active");
          ghost.addClass("active");
        }).parent().parent().on('mousemove', function(ev) {
          if (!isActive) return;
          lastSize = (ev[eventType] - sourceSize);
          ghost.css(ghostStyle, (ev[eventType] - sourceSize));
        }).on('mousedown', function(ev) {
          sourceSize = ev[eventType];
        }).on('mouseup', function(ev) {
          isActive = false;
          body.removeClass("flexbox-active");
          ghost.removeClass("active");
          ghost.css(ghostStyle, 0);
          if (isPerv) {
            target.css(style, targetSize + lastSize);
          } else {
            target.css(style, targetSize - lastSize);
          }
        });

        var wEl = angular.element($window);
        var pWidth = 0;



        function resize() {
          if (pWidth != content.parent().width()) {
            pWidth = content.parent().width();
            content.width(pWidth);
            //fix animation delay
            $timeout(resize, 50);
          }
        }
        resize();
        //fix parent full width issue
        wEl.off('resize.splitter').on('resize.splitter', resize);
        var newScope = scope.$new();
        newScope.$on("resize", resize);
      }
    };
  }
]);
