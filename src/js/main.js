import $ from 'jquery';

//variable holds div class="container"
var container = $(".container");

//function to show error when attempting to request data
function handleError (req) {
  console.log("Error: request failed");
  console.log(req);
};

//makes the HTML for a field in the form
function makeField (data) {
  return `
    <div class="fields" id="${data.id}">
      <i class="fa ${data.icon}"</i>
      <input type="${data.type}" placeholder="${data.label}"/>
    </div>`;
};

//creates all the fields that make up the form
function displayFields (data) {
  //array holds all the form fields
  // var totalFields = [];
  //loop through each field obj in the Form array
  for (var i = 0; i < data.length; i++) {
    var fieldHTML = makeField(data[i]);
    // totalFields.push(fieldHTML);
    $(".container").append(fieldHTML);

  }
};

function getFields() {
  $.ajax({
    url: `http://json-data.herokuapp.com/forms/`,
    success: displayFields,
    error: handleError
  });
};

var inputbar = document.getElementsByClassName("container");
inputbar.innerHTML = getFields();
