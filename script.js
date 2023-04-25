body = document.querySelector("body");

const inputField = document.createElement("input");
inputField.type = "search";
inputField.id = "searchBox";
inputField.placeholder = "Enter book name";
body.appendChild(inputField);

const books = document.createElement('div');
books.id = 'books';
books.className = 'row m-4';
body.appendChild(books);

const getData = async () => {
  let res = await fetch("https://anapioficeandfire.com/api/books");
  let data = await res.json();
  return data;
};
let getChar = async(charLink)=>{
  let char = await fetch(await charLink);
  let charName = await char.json();
  return charName.name;
}

(async ()=>{
  const bookData = await getData();
  console.log(bookData)
  bookData.map(data =>showData(data));
  async function showData(el){ 
    try{
      let book =  document.createElement('div');
      book.className = 'book col-lg-3 col-md-4 col-sm-6';
      let bookContent = document.createElement('div');
      bookContent.className = 'book-content p-3 m-2';
      bookContent.innerHTML = `<div class = 'h5 book-name text-center'>
      ${el.name}</div>
      <hr>
      <div> ISBN : ${el.isbn}</div>
      <div> Pages : ${el.numberOfPages}</div>
      <div> Authors : ${el.authors}</div>
      <div class='text-center h6 mt-2'> Characters</div> `
      let chars = document.createElement('div');
      chars.className = 'povChars';
      book.appendChild(bookContent);
      bookContent.appendChild(chars);

      for(let i = 0 ; i<5; i++){
        charName = await getChar(el.povCharacters[i]);
        
        let char = document.createElement('div');
        char.className = 'char'
        char.innerHTML = charName;
        chars.appendChild(char);
      }
      books.appendChild(book);
    }
    catch(e){
      console.log(e);
    }
   }
})()

// search
inputField.addEventListener('keyup', ()=>{
  filter = inputField.value.toUpperCase();
  let book = books.getElementsByClassName('book');
  for(i=0; i<book.length; i++){
    let re = new RegExp(inputField.value, "i");
    var bookName = book[i].getElementsByClassName('book-name')[0];
    var txtValue = bookName.textContent || bookName.innerHTML;
    bookName.innerHTML = bookName.textContent.replace(re, "<b>$&</b>");
    if(txtValue.toUpperCase().indexOf(filter) > -1){
      book[i].style.display = "";
    }else{
      book[i].style.display = "none";
    }
  }
})