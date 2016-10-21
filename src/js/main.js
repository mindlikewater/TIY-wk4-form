import $ from 'jquery';

//variable holds div class="container"
var container = $(".container");

//function to show error when attempting to request data
function handleError (req) {
  console.log("Error: request failed");
  console.log(req);
};

//generates HTML for the different language options
function optionsList (data) {
  var options = data.options.map(function(properties) {
    return `<option value="${properties.value}">${properties.label}</option>`
  }).join();
  return options;
};

//makes HTML for the Select Languages menu
function makeLanguageMenu(data) {
  return `
    <div class="fields" id="${data.id}">
      <select name="select">
        <option value="">Select Language...</option>
        ${optionsList(data)};
      </select>
    </div>`;
};

//makes HTML for the Comments box
function makeCommentBox (data) {
  return `
    <div class="fields" id="${data.id}">
      <textarea name="${data.type}" placeholder="${data.label}" rows="4" cols="58"></textarea>
      <i class="fa ${data.icon}"</i>
    </div>`;
};

//makes the HTML for a field in the form
function makeField (data) {
  return `
    <div class="fields" id="${data.id}">
      <input type="${data.type}" placeholder="${data.label}"/>
      <i class="fa ${data.icon}"</i>
    </div>`;
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

//function creates all the fields that make up the form
function allFields (data) {
  var fieldHTML = "";
  //loop through each field obj in the form array
  data.forEach(function(field) {
    if (field.id === "user-language") {
      fieldHTML = makeLanguageMenu(field);
      $(".container").append(fieldHTML);
    }
    else if (field.id === "user-comment") {
      fieldHTML = makeCommentBox(field);
      $(".container").append(fieldHTML);
    }
    else {
      fieldHTML = makeField(field);
      $(".container").append(fieldHTML);
    }
  });
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
