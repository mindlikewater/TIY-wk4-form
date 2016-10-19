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
      <input type="${data.type}" placeholder="${data.label}"/>
      <i class="fa ${data.icon}"</i>
    </div>`;
};

/*function extracts the Language options from the data
function extractLanguages (data) {
  if (data.id === "user-language") {
    var label = data.options.label;
    var value = data.options.value;

    return {
      label: label,
      value: value
    };
  };
}; */

//fuction makes the <Select> language menu
function makeLanguageMenu (data) {
  if (data.id === "user-language") {
    var langList = data.map(function (x) {
      return x.options;
    });
  }
  langList.forEach(function (x) {
    return `
    <div class="fields" id="${x.id}">
      <select name="select">
        <option value="${x.value}">${x.label}</option>
      </select>
      <i class="fa ${x.icon}"</i>
    </div>`;
  });
};

//makes the HTML for the submit button at the bottom of the form
function submitButton() {
  var buttonHTML = `
    <div id="submit">
      <button name="button">Submit Form</button>
    </div>`;

  //adds the button to the bottom of the container
  $(".container").append(buttonHTML);
};

//creates all the fields that make up the form
function allFields (data) {
  //loop through each field obj in the Form array
  for (var i = 0; i < data.length; i++) {
    if (data.id === "user-language") {
      makeLanguageMenu(data);
    }
    else {
      var fieldHTML = makeField(data[i]);
    }
    //add all the HTML fields to the div, container
    $(".container").append(fieldHTML);
  }
  //call function that creates HTML for Submit button
  submitButton();
};

//gets the data from the url
function getFields() {
  $.ajax({
    url: `http://json-data.herokuapp.com/forms/`,
    success: allFields,
    error: handleError
  });
};

//gets location on the page where the form fields should go
var inputbars = document.getElementsByClassName("container");
//puts the form fields onto the webpage
inputbars.innerHTML = getFields();
