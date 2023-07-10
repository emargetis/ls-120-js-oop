function createBook(title, author, read = false) {
  return {
    title, // same as `title: title,`
    author, // same as `author: author,`
    read,
    
    getDescription() {
      let readStatus = this.read ? 'have' : 'haven\'t';
      console.log(`${this.title} was written by ${this.author}. I ${readStatus} read it.`);
    },
    
    readBook() {
      this.read = true;
    }
  };
}


let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

book1.getDescription();  // "Mythos was written by Stephen Fry."
book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"

book1.getDescription(); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
book1.getDescription(); // Mythos was written by David Fry. I have read it.