$(document).ready(function(){

  $('body').on('click', '.task.active', function(){
    var $this = $('this');
    console.log($this.hasClass('task'));
    $this.toggleClass('active');
    $this.siblings('.task').toggleClass('active');
  });

});