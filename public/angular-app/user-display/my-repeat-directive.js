angular.module('meantodo').directive('myRepeatDirective', function() {
  return function(scope, element, attrs) {
    var standardFontSize = 7;
    var screenRatio = $(window).width()/$(window).height();
    var fontSizeModifier = 1;
    if (screenRatio < 1){
      fontSizeModifier = screenRatio/1.5;
    } else {
      fontSizeModifier = 0.75;
    }
    console.log(fontSizeModifier);
    var newFontSize = standardFontSize * fontSizeModifier;

    $('body, button, input[type="text"], input[type="email"], input[type="password"]').css('font-size', newFontSize + 'vh');
    $('.edit-task-button, .header>a>h1, .user-info').css('font-size', newFontSize/1.5 + 'vh');
    if (scope.$last){
      window.scrollTo(0, $(document).height());
    }
  };
})