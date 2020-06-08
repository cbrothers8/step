// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */

function addRandomGreeting() {
  const greetings =
      ['I know how to knit.', 'Je parle Français. (I speak French.)', 'Panda Bears are my favorite animals.', 'I play the flute and clarinet.'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

var numOfComments;
var oldComments;
var ctr = 0;

async function loadComments() {
  const response = await fetch('/data');
  const oldCommentArray = await response.text();

  //Remove quotes and brackets from comments
  removeQuotes = oldCommentArray.replace(/"/g, '');
  oldComments = removeQuotes.replace(/[\])}[{(]/g, '');
  oldComments = oldComments.split(",");

  calculateMaxComments(oldComments);
}

function calculateMaxComments(oldComments) {
    var selected = document.getElementById("numOfComments").value;
	if (selected == 5) {
      	changeMaxComments(5, oldComments);
  	}
    else if (selected == 1){
        changeMaxComments(1, oldComments);
    }
  	else {
    	//Add all comments to table
    	for (eachComment of oldComments) {
            createTable(eachComment);
  		}
  	}
}

function createTable(eachComment) {
  var table = document.getElementById("comment-table");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  cell1.innerHTML = eachComment;
}

function changeMaxComments(numOfComments, oldComments) {
    //Add max number of comments to table
    for (eachComment of oldComments) {
        if (ctr == numOfComments) {
        	break;
      	}
        createTable(eachComment);
        ctr++;
  	}
}

function myDeleteFunction(table) {
    var rowCount = table.rows.length; //7
        for (var i = rowCount - 1; i >= 0; i--) {
            table.deleteRow(i);
        }
}

function refresh(){
    ctr = 0;
    table = document.getElementById("comment-table");
    //Clear previous comments
    myDeleteFunction(table);
    calculateMaxComments(oldComments);
}