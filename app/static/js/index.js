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

  // Country modal
  $("#current-flag").click(function(e) {
    $('#countryModal').modal();
  });

  // Order modal
  $("#zar-button").click(function(e) {
    $('#orderModal').modal();
  });

  // za order form submit
  $("#za-order-form").submit(function(e) {

      e.preventDefault(); // avoid to execute the actual submit of the form.

      var form = $(this);
      var url = window.location.pathname;

      $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function(data)
        {
          $.each(data, function (key, val) {
            $("#za-order-confirmation-form input[name=" + key + "]").val(val);
            console.log(key, val);
          });
          $('#orderConfirmModal').modal();
        }
      });
  });
});
