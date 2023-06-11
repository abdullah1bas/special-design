/*global $ */

$(function () {
  // "use strict";
  $(".menu-list li").click(function () {
    // sibling => 2le homa al a4qa2 bto3o shele mnhom al selcted
    $(this).addClass("selected").siblings("li").removeClass("selected");
    // de htgble asm al class
    console.log($(this).data("class"));
    // de y3ne al class .info-content kol al div 2le gwa a5fehom
    $(".info-content div").hide();
    // hena al class dh (.)+ al class 2le hytl3 mn al click azhro
    $("." + $(this).data("class")).fadeIn();
  });
});
