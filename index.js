// Yes thats right, the Client-ID is right there...
// Don't get any ideas now...
const clientId = '85a3e3f30c46f22'
const albumHash = 'OKo1EHh'
var comics = null;
var selectedComic = null;
var selectedComicId = null;

$.ajax({
  url: `https://api.imgur.com/3/album/${albumHash}/images`,
  type: 'GET',
  dataType: 'json',
  headers: {
      'Authorization': `Client-ID ${clientId}`
  },
  contentType: 'application/json; charset=utf-8',
  success: function (result) {
      comics = result.data;
      selectedComicId = comics.length-1;
      selectedComic = comics[selectedComicId];
      $( "#comic-title" ).text(selectedComic.description || 'Untitled');
      $( "#comic-id" ).text(selectedComicId+1);
      $("#comic").attr("src",null);
      $("#comic").attr("src",selectedComic.link);

      // Add pagination numbers
      for(let i = 0; i < comics.length; i++) {
        $("#comic-numbers").append(`<button id="${i+1}" class="btn">${i+1}</button>`); 
      }

      // When number is clicked
      // Id is array index...
      $("#comic-numbers button").click(function(){
        selectedComicId = parseInt(this.id) - 1;
        displayId = parseInt(selectedComicId) + 1;
        selectedComic = comics[selectedComicId];
        $( "#comic-title" ).text(selectedComic.description || 'Untitled');
        $( "#comic-id" ).text(displayId);
        $("#comic").attr("src",null);
        $("#comic").attr("src",selectedComic.link);
      });
  },
  error: function (error) {
      console.log(error);
  }
});


$(document).ready(function(){

  $("#previous").click(function(){
    var currentId = $( "#comic-id" ).text();
    if (parseInt(currentId) > 1) {

    selectedComicId = parseInt(currentId) - 2;
    displayId = parseInt(selectedComicId) + 1;
    selectedComic = comics[selectedComicId];
    $( "#comic-title" ).text(selectedComic.description || 'Untitled');
    $( "#comic-id" ).text(displayId);
    $("#comic").attr("src",null);
    $("#comic").attr("src",selectedComic.link);
    }
  });

  $("#next").click(function(){
    var currentId = $( "#comic-id" ).text();
    if (parseInt(currentId) < comics.length) {

    selectedComicId = parseInt(currentId);
    displayId = parseInt(selectedComicId) + 1;
    selectedComic = comics[selectedComicId];
    $( "#comic-title" ).text(selectedComic.description || 'Untitled');
    $( "#comic-id" ).text(displayId);
    $("#comic").attr("src",null);
    $("#comic").attr("src",selectedComic.link);
    }
  });

});

