import $ from 'jquery';

//variable holds HTML div class="container"
var container = $(".container");
//variable represents first object in the JSON array for the form
var objectId = 0;

function handleError (req) {
  console.log("Error: request failed");
  console.log(req);
};

function makeField () {
  return `
    <div class="fields">
      ${formFields.label}
    </div>`;
}

function addName (data) {
  var nameHTML = nameField(data);
  firstName.append(nameHTML);
}

// var formFields = $(".formFields");
// function getFields (event) {
//   var field = $.ajax({
//     url: `http://json-data.herokuapp.com/forms/${formFields}`
//     success: addField,
//     error: handleError
//   });
//   console.log(field);
// }
