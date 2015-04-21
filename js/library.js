//New version of library code challenge per Brooke due 4/21/15
//I am turning this in a day early in case I still need to make any changes

//Just adding today's date to html page
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var year = d.getFullYear();
var today = month + "/" + day + "/" + year;
document.getElementById('putDate').textContent = today;

//library will hold shelf objects which in turn hold book objects
var library = {};

//These are the event listerners to call the appropriate function based on
//which html button is clicked
document.getElementById('addShelf').addEventListener('click', addShelf, false);
document.getElementById('removeShelf').addEventListener('click', removeShelf, false);
document.getElementById('addNewBook').addEventListener('click', addNewBook, false);
document.getElementById('removeBook').addEventListener('click', removeBook, false);
document.getElementById('showAllShelves').addEventListener('click', function() { showAll("Shelves"); }, false);
document.getElementById('showAllBooks').addEventListener('click', function() { showAll("Books"); }, false);

//this is the shelf object constructor
function Shelf(name) {
  this.name = name;
  this.books = [];

  //adds the book object to the shelf object
  this.addBook = function(title, author) {
    this.books.push(new Book(title,author));
  }

  //removes the book object from the shelf object
  this.removeBook = function(title, index) {
    delete this.books[index].title;
  }

  //returns the books on this shelf
  this.getBooks = function() {
    return this.books;
  }
}

//this is the book constructor which gets called from the addBook method of the 
//shelf constructor
function Book (title, author) {
    this.title = title;
    this.author = author;
}

//this function is called from the html page and used to add a new shelf
function addShelf() {
    var shelf = prompt("Please enter a name for the new SHELF");
    
    if (shelf) {
      shelf = shelf.toUpperCase();
      //check for existence first, then add if not there
      if (library[shelf]) {
        var dup = "That is a duplicate shelf: " + shelf;
        printOut(dup);
      }
      else {
          //use the constructor
          newShelf = new Shelf(shelf);
          library[shelf] = newShelf;
          var result = "Added: " + shelf;
          printOut(result);
      }
    }
    else {
      printOut("You did not enter a shelf name");
    }
}

//this function is called from html page and used to remove a shelf
function removeShelf() {
    var shelf = prompt("Please enter a name for the shelf you would like to DELETE");
    
    if (shelf) {
      shelf = shelf.toUpperCase();

      //check for existence first, then add if not there
      if (!library[shelf]) {
        var notThere = "That shelf '" + shelf + "' does not exist";
        printOut(notThere);
      }
      else {
          delete library[shelf];
          var result = "Deleted: " + shelf;
          printOut(result);
      }
    }
    else {
      printOut("You did not enter a shelf name");
    }
}

//This function is called from the html page to add a new book
//if the shelf the book belongs on does not exist, it is created
function addNewBook() {
    var title = prompt("Please enter a title for the new BOOK");
    var author = prompt("Please enter the name of the author for this book");
    var shelf = prompt("What shelf does this book belong on?");
    
    if (title && author && shelf) {
      shelf = shelf.toUpperCase();

      //first make sure book is not a duplicate
      var dup = checkExist(title);

      if (dup) {
        printOut("That is a duplicate book: " + title);
        return;
      }

      //next see if the shelf is there and add it if it's not
      if (!library[shelf]) {
          var newShelf = new Shelf(shelf);
          library[shelf] = newShelf;
      }

      //It's not a duplicate and we have the shelf so add the book
      //using the Shelf method
      library[shelf].addBook(title, author);         
      var result = "Added: " + title + " by " + author;
      printOut(result);
    }
    else {
      printOut("You did not enter all of the required information to add a book");
    }
}

//function called from html page to remove a book title
function removeBook() {
    var title = prompt("Please enter the name of the book you would like to DELETE");
    var removed = false;

    if (title) {
      //use getExist to return shelf and index
      var result = checkExist(title);

      //if book on shelf matches title to remove, remove it using shelf method
      if (result) {
        library[result[0]].removeBook(title, result[1]);
        printOut("Book title \"" + title + "\" has been removed");
      }
      else {
        printOut("That book '" + title + "' does not exist");
      }
    }
    else {
      printOut("You did not enter a book title");
    }
}

//generic function to print the results to the html page
var printOut = function(data) {
  document.getElementById("showHere").innerHTML = data;
};

//puts all the shelves into an array - called from various functions
function getShelves() {
  var shelves = [];
  for (var key in library) {
    if (library.hasOwnProperty(key)) {
      shelves.push(key);
    }
  }
  return shelves;
}

//function called from the html page to display all of the shelves or all of the books
//based on the parameter
function showAll(item) {
  var items = "";
  var shelves = getShelves();
  //if there are no shelves, there are also no books
  if (shelves.length > 0) {
      for (var i=0; i<shelves.length; i++) {
        if (item == "Shelves") {
          items += shelves[i] + "<br>";
        }
        if (item == "Books") {
          var books = library[shelves[i]].getBooks();
          for (var x=0; x<books.length; x++) {
            if (books[x].title) {
              items += books[x].title + " by " + books[x].author +"<br>";
            }
          }
        }
      }
  }
  //in case there are not any created yet
  if (items == "") {      
    printOut("There are not currently any " + item + " created to show");
    return;
  }
  printOut(item + ":<br>" + items);
}

//get the shelves and then check each shelf for the existence of a title
function checkExist(title) {
  var shelves = getShelves();
  var match = false;
  if (shelves.length > 0) {
    for (var i=0; i<shelves.length; i++) {
      var books = library[shelves[i]].getBooks();
      if (books.length > 0) {
          for (var x=0; x<books.length; x++) {
            if (match = (books[x].title.toUpperCase() === title.toUpperCase())) {
              var result = [shelves[i], x];
              return result;
            }
          }
      }
    }
  }
  else {
    return false;
  }
}

//Is this more of what you were looking for? I still have one day if you have changes you'd like 
//me to make. Thank you! 















