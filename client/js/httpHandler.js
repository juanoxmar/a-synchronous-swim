(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

  setInterval(function(){
    $.ajax({
    type: 'GET',
    url: serverUrl + '/move',
    cache: true,
    contentType: false,
    processData: false,
    success: (res) => {
      SwimTeam.move(res);
    }
    });
  }, 5000)


    $.ajax({
    type: 'GET',
    url: serverUrl + '/background.jpg',
    cache: true,
    contentType: false,
    processData: false,
    success: () => {
      console.log('Getting Background')
    }
    });


  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: (res) => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];

    // console.log(file);
    // if (file.type !== 'image/jpeg') {
    //   console.log('Not a jpg file!');
    //   return;
    // }

    ajaxFileUplaod(file);
  });

})();
