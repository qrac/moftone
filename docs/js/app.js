//----------------------------------------------------
// App - Concatenating
//----------------------------------------------------

//@prepros-append _bgcolor.js
//----------------------------------------------------
// Background color paint
//----------------------------------------------------

$(function() {
  $('.pallet .bar').each(function(){
    var bgColor = $(this).css('background-color');
    bgColor = bgColor.replace("rgb(","");
    bgColor = bgColor.replace(")","");
    bgColor = bgColor.split(",");
    bgColor = "#" + ("0" + parseInt(bgColor[0]).toString(16)).slice(-2) + ("0" + parseInt(bgColor[1]).toString(16)).slice(-2) + ("0" + parseInt(bgColor[2]).toString(16)).slice(-2);
    $('.group.is-color-data .texts.is-hex',this).text(bgColor);
  });
});
