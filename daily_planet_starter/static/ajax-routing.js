$(document).ready(function() {
  console.log('ajax reached on this page');
  $('#delete-btn').click(function (e) {
    // prevent defaults, including page refresh
    e.preventDefault();

    // grab the url of the action from the del button
    var url = $(this).attr('href');
    console.log('delete button pressed, url is', url);

    $.ajax({
      // specify method (otherwise defaults to get)
      method: 'DELETE',
      // specify path
      url: url
    }).done(function(data) {
      // redirect back to index, for user experience
      window.location = '/articles';
      console.log('delete was recieved');
    }).fail(function(err) {
      console.log('error was:', err);
    });
  });

  $('edit-form').submit(function (e) {
    console.log('submit was reached');
    // prevent defaults, including page refresh
    e.preventDefault();

    var url = $(this).attr('action');
    // makes sure data is url-encoded for body parser to use
    var data = $(this).serialize();
    console.log(data);

    $.ajax({
      method: "PUT",
      url: url,
      data: data
    }).done(function(data) {
      window.location = "/articles";
    }).fail(function(err) {
      console.log('error for submitting edited article was:', err);
    });
  });
});
