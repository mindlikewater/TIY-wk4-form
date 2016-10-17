import $ from 'jquery';

//variable holds HTML div class="container"
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

function displayFields (data) {
  //array holds all the form fields
  var totalFields = [];
  //loop through each field obj in the Form array
  for (var i = 0; i < data.length; i++) {
    var fieldHTML = makeField(data[i]);
    totalFields.push(fieldHTML);
  }
  console.log(totalFields);
  return $(".container").html(totalFields);
};

function getFields() {
  var field = $.ajax({
    url: `http://json-data.herokuapp.com/forms/`,
    success: displayFields,
    error: handleError
  });
  console.log(field);
};
