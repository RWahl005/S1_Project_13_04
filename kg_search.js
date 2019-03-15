"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 4

   Wordsearch Game Script
   
   Filename: kg_search.js
   Author: Ryan Wahl
   Date:   3.15.19
   
   
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array

*/

/* 
      Global Variables & Event Listeners
*/
// Adds the mouse up event listener to the document.
document.addEventListener("mouseup", mouseUp);
// Adds the click event to the document listener.
document.addEventListener("click", onClick);

// Variable containing all of the selected letters.
var selectedLetters = [];
// Variable containing all of the words that have been found.
var foundWords = [];

// Calls the init function when the browser loads.
window.onload = init;

/*
      Global Functions
*/

/**
 * The init function is called when the browser isloaded.
 */
function init() {
      // Draws the word search table.
      document.getElementById("wordTable").innerHTML = drawWordSearch(letterGrid, wordArray);
      // Draws the list on the dise.
      document.getElementById("wordList").innerHTML = showList(wordArray);

      // Gets all of the cells in the table.
      var cells = document.getElementsByClassName("wordCell");
      // Loops through all of the cells.
      for (var i = 0; i < cells.length; i++) {
            // For every cell add an event listener to the onDown function.
            cells[i].onmousedown = onDown;
            // Sets the cursor style to pointer.
            cells[i].style.cursor = "pointer";
      }

      // Sets the user select to none so that the table can never be highlighted.
      document.getElementById("wordSearchTable").style.userSelect = "none";
}

/**
 * When the mouse is moved around
 * @param {Event} e This is auto populated by the browser.
 */
function onMove(e) {
      // If the element is not green (part of a found solution), set the background color to pink.
      if (e.target.style.backgroundColor != "lightgreen")
            e.target.style.backgroundColor = "pink";
      // Adds the picked letter to the pickedletters input.
      document.getElementById("pickedLetters").value += e.target.innerHTML;
      // Adds the selected letter to the global array.
      selectedLetters.push(e.target);
      // Prevent the browser from doing its default action.
      e.preventDefault();
}

/**
 * When the mouse is clicked down.
 * @param {Event} e This is auto populated by the browser. 
 */
function onDown(e) {
      // If the cell clicked is not already part of a solution, set the background color to pink.
      if (e.target.style.backgroundColor != "lightgreen")
            e.target.style.backgroundColor = "pink";

      // Set the pickedLetters input to the letter.
      document.getElementById("pickedLetters").value = e.target.innerHTML;

      // Get all of the cells.
      var cells = document.getElementsByClassName("wordCell");
      // Loop through all of the cells.
      for (var i = 0; i < cells.length; i++) {
            // Add the event listener onmove to the cells.
            cells[i].addEventListener("mouseenter", onMove);
      }

      // Add the letter to the global array.
      selectedLetters.push(e.target);
      e.preventDefault();
}

/**
 * Mouse up Event function.  
 * Called when the mouse is unclicked.
 */
function mouseUp() {
      // Gets all of the cells.
      var cells = document.getElementsByClassName("wordCell");
      // Loop through all of the cells
      for (var i = 0; i < cells.length; i++) {
            // Remove the onmove event listener from the cells.
            cells[i].removeEventListener("mouseenter", onMove);
      }

      // Run the commands based on crossing out the words.
      crossOutWord(isValidWord(document.getElementById("pickedLetters").value));
      //If all of the words are found
      if (foundWords.length === wordArray.length) {
            //Tell the user they won.
            alert("Congrats! You found all of the words!");
      }
}

/**
 * When the event is clicked.
 * @param {Event} e 
 */
function onClick(e) {
      // If the id of the element is show solution.
      if (e.target.id === "showSolution") {
            //runs the show solution function.
            showSolution();
      }
}

//Varaiable relating to the showSolution function.
// If the solution is currently showing.
var solutionShown = false;
// The solution elements array
var solutionElm = [];

/**
 * Show the solution on the table.
 */
function showSolution() {
      // If the solution is currently showing.
      if (solutionShown) {
            // Get all of the rows in table.
            var rows = document.querySelectorAll("#wordSearchTable tr");
            // Loop through the rows.
            for (var i = 0; i < rows.length; i++) {
                  // Get all of the cells in that row.
                  var cells = rows[i].getElementsByClassName("wordCell");
                  // Loop through all of the cells in that row.
                  for (var x = 0; x < cells.length; x++) {
                        // If the cell background color is orange, change it to white.
                        if (cells[x].style.backgroundColor === "orange")
                              cells[x].style.backgroundColor = "white";
                  }
            }
            //Set solutionShown to false.
            solutionShown = false;
            // Clear the solutionElm array.
            solutionElm = [];
      } else {
            // Get all of the rows in the table.
            var rows = document.querySelectorAll("#wordSearchTable tr");
            //Loop through all of the rows in the table.
            for (var i = 0; i < rows.length; i++) {
                  // Get the cells in a row.
                  var cells = rows[i].getElementsByClassName("wordCell");
                  //Loop through all of the cells in the table.
                  for (var x = 0; x < cells.length; x++) {
                        // If the current cell is a solution.
                        if (wordGrid[i][x] === "#") {
                              // If the background color is not light green (if the cell is not already found)
                              if (cells[x].style.backgroundColor != "lightgreen") {
                                    // Set the background color to orange.
                                    cells[x].style.backgroundColor = "orange";
                                    // Add the element to the solutionElm array.
                                    solutionElm.push(cells[x]);
                              }
                        }
                  }
            }
            // Set solutionShown to true.
            solutionShown = true;
      }
}

/**
 * Checks if the word is in the list.
 * @param {String} word The string list.
 * @returns {Boolean} True if valid, false if not. (word may be reversed as well).
 */
function isValidWord(word) {
      return wordArray.includes(word) || wordArray.includes(reverseWord(word));
}

/**
 * Runs the commands when a group of letters are selected.
 * @param {Boolean} valid if the word is valid or not.
 */
function crossOutWord(valid) {
      // If the word is not valid
      if (!valid) {
            // Loop through all of the selected letters.
            for (var i = 0; i < selectedLetters.length; i++) {
                  // If the selected letter background is not green, set it to white.
                  if (selectedLetters[i].style.backgroundColor != "lightgreen")
                        selectedLetters[i].style.backgroundColor = "white";
                  // If the solutionElm array includes the selectedLetter and the background is not green, Set it to orange.
                  if (solutionElm.includes(selectedLetters[i]) && selectedLetters[i].style.backgroundColor != "lightgreen") {
                        selectedLetters[i].style.backgroundColor = "orange";
                  }
            }
            // Set the value of the pickedLetters input control to an empty string.
            document.getElementById("pickedLetters").value = "";
            // Clear the selectedLetters array.
            selectedLetters = [];
            // Returns the function.
            return;
      }
      // If the word is valid.
      // The word string
      var word = document.getElementById("pickedLetters").value;
      // The word lists list elements.
      var wordList = document.querySelectorAll("#wordSearchList li");
      // The index of the word in that list.
      var wordIndex = 0;
      // The word in reverse.
      var reverseWords = reverseWord(word);
      // Finds the place of the word in the list array.
      for (var i = 0; i < wordList.length; i++) {
            if (wordList.item(i).innerHTML == word) wordIndex = i;
      }
      // finds the place of the word in the list array if the word is reversed.
      for (var i = 0; i < wordList.length; i++) {
            if (wordList.item(i).innerHTML == reverseWords) wordIndex = i;
      }
      // 
      wordList[wordIndex].style.textDecoration = "line-through";

      for (var i = 0; i < selectedLetters.length; i++) {
            selectedLetters[i].style.backgroundColor = "lightgreen";
      }

      selectedLetters = [];
      foundWords.push(word);
}

function reverseWord(word) {
      var result = "";
      for (var i = word.length - 1; i >= 0; i--) {
            result += word[i];
      }
      return result;
}



/*============================================================*/

function drawWordSearch(letters, words) {
      var rowSize = letters.length;
      var colSize = letters[0].length;

      var htmlCode = "<table id='wordSearchTable'>";
      htmlCode += "<caption>Word Search</caption>";

      for (var i = 0; i < rowSize; i++) {
            htmlCode += "<tr>";

            for (var j = 0; j < colSize; j++) {
                  if (words[i][j] == " ") {
                        htmlCode += "<td>";
                  } else {
                        htmlCode += "<td class='wordCell'>";
                  }
                  htmlCode += letters[i][j];
                  htmlCode += "</td>";
            }

            htmlCode += "</tr>";
      }
      htmlCode += "</table>";

      return htmlCode;
}

function showList(list) {
      var htmlCode = "<ul id='wordSearchList'>";

      for (var i = 0; i < list.length; i++) {
            htmlCode += "<li>" + list[i] + "</li>";
      }

      htmlCode += "</ul>";

      return htmlCode;
}