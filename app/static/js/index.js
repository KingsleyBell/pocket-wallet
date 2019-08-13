var deleteOrderUrl;

$(document).ready(function() {
  // Activate buy now button after page load
  $(".button-link").prop("disabled", false);

  // Go to first section
  $("#home-link").click(function(e) {
    e.preventDefault();
    $(".nav-link")[0].click();
  });

  // Section navigation
  $(".nav-link").click(function(e) {
    var targetId = e.target.id.split('-'),
    linkId = targetId[targetId.length - 1];
    $(".section.active").removeClass("active");
    $(".nav-link.active").removeClass("active");

    $("#section-" + linkId).addClass("active");
    $(this).addClass("active");
  });

  // Set global slide index
  $(".carousel").on('slid.bs.carousel', function () {
    var index = $(".section.active").find(".carousel-item.active").attr("index");
    $(".carousel-item.active").removeClass("active");
    $(".carousel-item[index=" + index + "]").addClass("active");
  });

  // Promo watermark background
  Array.from(document.querySelectorAll('.watermarked')).forEach(function(el) {
        el.dataset.watermark = (el.dataset.watermark + ' ').repeat(10000);
  });
});
