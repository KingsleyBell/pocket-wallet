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

  $("select[name='os0']").change(function(e) {
    var val = $(this).find(":selected").val();
    if (val === "Inscribed") {
      $("input[name='os1']").prop("required", true);
    }
    else {
      $("input[name='os1']").prop("required", false);
    }
  });

  var forms = document.getElementsByClassName('needs-validation');

  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      else {
        $(".invalid-feedback").hide();
      }
      form.classList.add('was-validated');
    }, false);
  });
});
