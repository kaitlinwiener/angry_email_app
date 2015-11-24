$(function () {
  console.log("hey")
  var button = $('#yellbutton')
  var angryemail = $('#angryemail')

  $(document).on("click", button, function() {
    var recipient = $('#recipient').val()
    var body = $('#emailbody').val()
    var angryemail = $('#angryemail')
    if (recipient != "" && body != "") {
      angryemail.toggleClass('hidden')
      console.log("clicked")
      setTimeout(function () {
        angryemail.removeClass('hidden');
      }, 1500)
    } else {
      console.log("empty");
    }
  });
})
