$(document).ready(function() {
  $(".button-link").prop("disabled", false);

  $("#home-link").click(function(e) {
    e.preventDefault();
    $(".nav-link")[0].click();
  });

  $(".nav-link").click(function(e) {
    var targetId = e.target.id.split('-'),
    linkId = targetId[targetId.length - 1];
    $(".section.active").removeClass("active");
    $(".nav-link.active").removeClass("active");

    $("#section-" + linkId).addClass("active");
    $(this).addClass("active");
  });

  $(".carousel").on('slid.bs.carousel', function () {
    var index = $(".section.active").find(".carousel-item.active").attr("index");
    $(".carousel-item.active").removeClass("active");
    $(".carousel-item[index=" + index + "]").addClass("active");
  });

  Array.from(document.querySelectorAll('.watermarked')).forEach(function(el) {
        el.dataset.watermark = (el.dataset.watermark + ' ').repeat(10000);
  });
});
