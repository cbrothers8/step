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

async function deleteComments() {
    const deleteFetch = await fetch('/data');
    const deleteReponse = await response.text();
}

function createMap() {
    // The location of The Arch
  	var arch = {lat: 38.624691, lng: -90.184776};
    //The location of the Zoo
	var zoo = {lat: 38.638901, lng: -90.284599};
 
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: arch});

	// The marker, positioned at The Arch
  	var archMarker = new google.maps.Marker({position: arch, map: map});
    // The marker, positioned at The Arch
  	var zooMarker = new google.maps.Marker({position: zoo, map: map});

    archMarker.addListener('click', function() {
          map.setZoom(17);
          map.setCenter(archMarker.getPosition());
          archInfoWindow.open(map, archMarker);
    }); 

    zooMarker.addListener('click', function() {
          map.setZoom(15);
          map.setCenter(zooMarker.getPosition());
          zooInfoWindow.open(map, zooMarker);
        });
}

var archInfo = "<h1>The Gateway Arch</h1><br>" +
                "The Gateway Arch is a 630-foot monument in St. Louis, Missouri, United States. Clad in stainless steel and built in the form of a weighted catenary arch, " +
 	            "it is the world's tallest arch, the tallest man-made monument in the Western Hemisphere, and Missouri's tallest accessible building.";

var archInfoWindow = new google.maps.InfoWindow({
    content: archInfo
});

var zooInfo = "<h1>Saint Louis Zoo</h1><br>" +
	          "Home to over 13,000* animals representing 555* species, the Saint Louis Zoo is recognized worldwide for its innovative approaches to animal care and management, " +
	          "wildlife conservation, research and education. One of the few free zoos in the nation, the Saint Louis Zoo attracts approximately 3 million visitors annually " +
              "and is the most-visited attraction in the region.";

var zooInfoWindow = new google.maps.InfoWindow({
    content: zooInfo
});

function loadContent() {
    createMap();
    loadComments();
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Creates a chart and adds it to the page. */
function drawChart() {
  fetch('/color-data').then(response => response.json())
  .then((colorVotes) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Color');
    data.addColumn('number', 'Votes');
    Object.keys(colorVotes).forEach((color) => {
      data.addRow([color, colorVotes[color]]);
    });
        data.addRows([
            ['White', 10],
          	['Pink', 5],
          	['Black', 15]
        ]);

    const options = {
      'title': 'Favorite Colors',
      'width':600,
      'height':500
    };

  const chart = new google.visualization.PieChart(document.getElementById('chart-container'));
  chart.draw(data, options);
  });
}