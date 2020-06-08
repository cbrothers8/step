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

async function loadComments() {
  const response = await fetch('/data');
  const oldCommentArray = await response.text();
  
  //Remove quotes and brackets from comments
  removeQuotes = oldCommentArray.replace(/"/g, '');
  oldComments = removeQuotes.replace(/[\])}[{(]/g, '');
  oldComments = oldComments.split(",");

  //Add each comment to table
  for (eachComment of oldComments) {
    newRow = document.createElement('tr');
    nextComment = document.createElement('td');
	nextComment.innerText = eachComment;
    newRow.appendChild(nextComment);
	document.getElementById('comment-table').appendChild(newRow);
  }
}