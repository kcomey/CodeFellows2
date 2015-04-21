
//New version of library code challenge per Brooke due 4/21/15

//Just adding today's date to html page
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var year = d.getFullYear();
var today = month + "/" + day + "/" + year;
document.getElementById('putDate').textContent = today;

//These are the event listerners to call the appropriate function based on
//which html button is clicked
document.getElementById('addShelf').addEventListener('click', addShelf, false);
document.getElementById('removeShelf').addEventListener('click', removeShelf, false);
document.getElementById('addNewBook').addEventListener('click', addNewBook, false);
document.getElementById('removeBook').addEventListener('click', deleteBook, false);
document.getElementById('showShelves').addEventListener('click', showShelves, false);
document.getElementById('showBooks').addEventListener('click', showAllBooks, false);

//library will hold shelf objects which in turn hold book objects
var library = {};

//this is the shelf object constructor
//initialize the instance
function Shelf(name) {
  this.name = name;
  this.books = {};
}
//define the methods for the Shelf object
Shelf.prototype = {
    constructor: Shelf,
    addBook:function (title, author)  {
        //if book is not there, add it
        if (this.books[title] != undefined) {
          return printOut("The book \"" + title + "\" is already on the shelf");
        }
        else { 
          this.books[title] = author; 
          return printOut("The book \"" + title + "\" by " + author + " has been added");
        }
    },
    removeBook:function (title)  {
        //if book is there, remove it
       if(this.books[title] != undefined) {
            delete this.books[title];
            return true;
       }
    },
    showBooks:function ()  {
        //key is title, value is author
        var printBooks = "";
        for (var key in this.books) {
          printBooks += key + " by " + this.books[key] + "<br>";
        }
        if (!printBooks) {
          printBooks = "No books have been added to this shelf yet<br>";
        }  
        return printBooks;
    }
}

//this function is called from the html page and used to add a new shelf
function addShelf() {
    var shelf = prompt("Please enter a name for the new SHELF");
    
    if (shelf) {
      //check for existence first, then add if not there
      if (library[shelf]) {
        return printOut("That is a duplicate shelf: " + shelf);
      }
      else {
          //add to library object shelf name, shelf object
          newShelf = new Shelf(shelf);
          library[shelf] = newShelf;
          return printOut("Added: " + shelf);
      }
    }
    else {
      return printOut("You did not enter a shelf name");
    }
}

//this function is called from html page and used to remove a shelf
//removing a shelf also removes the books as they are part of the shelf object
function removeShelf() {
    var shelf = prompt("Please enter a name for the shelf you would like to DELETE");
    
    if (shelf) {
       //check for existence first
      if (!library[shelf]) {
        return printOut("The shelf \"" + shelf + "\" does not exist");
      }
      else {
          delete library[shelf];
          return printOut("Deleted: " + shelf);
      }
    }
    else {
      return printOut("You did not enter a shelf name");
    }
}

//This function is called from the html page to add a new book
//if the shelf the book belongs on does not exist, it is created as well
function addNewBook() {
    var title = prompt("Please enter a title for the new BOOK");
    var author = prompt("Please enter the name of the author for this book");
    var shelf = prompt("What shelf does this book belong on?");
    
    if (title && author && shelf) {
      //create shelf if it does not exist
      if (!library[shelf]) {
          var newShelf = new Shelf(shelf);
          library[shelf] = newShelf;
      }
      //add book with shelf method
      library[shelf].addBook(title, author);
    }
    else {
      return printOut("You did not enter all of the required information to add a book");
    }
}

//function called from html page to remove a book title
function deleteBook() {
    var title = prompt("Please enter the name of the book you would like to DELETE");
    if (!title) {
      return printOut("You did not enter a book title");
    }

    var empty = libraryEmpty();
    //if library is empty we know the book does not exist
    if (empty) {
      return printOut("The book \"" + title + "\" does not exist");
    }
    else {
      //need to check all of the shelves for the book title
      //remove it if found
      for (var shelf in library) {
        //shelf method
        var removed = library[shelf].removeBook(title);
        if (removed) {
          printOut("The book \"" + title + "\" has been removed");
          break;
        }
      }
      if (!removed) { printOut("The book \"" + title + "\" does not exist") };
    }
}
  
//called from button on html page, shows all books and what shelf they are on
function showAllBooks() {
  //must be at least one shelf to have at least one book to show
  var empty = libraryEmpty();
  if (!empty) {
    var showBooks = "";
    for (var shelf in library) {  
      showBooks += shelf + ":<br>"; 
      //using shelf method
      showBooks += library[shelf].showBooks();
      showBooks += "<br>";
    }
    return printOut(showBooks);
  }
  else {
    return printOut("There are currently not any books to show");
  }
}

//this function is called from html page and used to show all of the shelves
function showShelves() {
    //make sure there is at least one shelf
    var empty = libraryEmpty();
    if (!empty) {
      //key is name of shelf, value is object
      var printShelves = "";
      for (var key in library) {
          printShelves += key + "<br>";
      } 
      return printOut("Shelves:<br>" + printShelves);
    }
    else {
      return printOut("No shelves have been added yet");
    } 
}

//quick function to see if at least one item exists in the library
function libraryEmpty() {
  var empty = true;
  for (shelf in library) {
    return empty = false;
  }
  return empty;
}

//quick function to print the results to the html page
var printOut = function(data) {
  document.getElementById("showHere").innerHTML = data;
};



