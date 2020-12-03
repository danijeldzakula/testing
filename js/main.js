$(function(){
   $(document).on("click", "._popup-link", function(){
      var elem = $(this),
          target =  elem.data("target"),
          modal = $("#popup-m1-politicians-container[data-modalname="+target+"]");

      $("body").append(modal);
      modal.fadeIn();
      return false;
   });
   $(document).on("click", "._popup-close", function(){
       var elem = $(this),
           modal = elem.parents("._popup");

       modal.fadeOut();
       return false;
   });
});