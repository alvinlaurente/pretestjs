class Book {
  constructor(title, isbn, author, borrowStatus = false) {
    this.title = title;
    this.isbn = isbn;
    this.author = author;
    this.borrowStatus = borrowStatus; // Set buku belum terpinjam saat objek dibuat
  }
}

class Person {
  constructor(name, origin) {
    this.name = name;
    this.origin = origin;
  }

  introduce() {
    return `Nama saya adalah ${this.name} dan saya berasal dari ${this.origin}`;
  }
}

class Member extends Person {
  constructor(name, origin, membership = false, bookBorrowed = 0) {
    super(name, origin);
    this.membership = membership; // Membership belum aktif saat objek dibuat
    this.bookBorrowed = bookBorrowed; // Set buku yang dipinjam 0 saat objek dibuat
  }
}

class Librarian extends Person {
  constructor(name, origin) {
    super(name, origin);
  }

  activate(member) {
    member.membership = true;
    if (member.membership == true) {
      this.statusMember = 'aktif';
    }

    return `Status member ${member.name} saat ini ${this.statusMember}`;
  }

  deactivate(member) {
    member.membership = false;
    if (member.membership == false) {
      this.statusMember = 'tidak aktif';
    }

    return `Status member ${member.name} saat ini ${this.statusMember}`;
  }

  checkout(book, member) {
    if (member.membership == true) {
      if (book.borrowStatus == false) {
        if (member.bookBorrowed < 2) {
          book.borrowStatus = true;
          member.bookBorrowed++;

          return `Buku ${book.title} dipinjam oleh ${member.name}. ${member.name} telah meminjam ${member.bookBorrowed} buku.`;
        }

        else {
          return `Maaf buku ${book.title} tidak dapat dipinjam. ${member.name} sudah meminjam 2 buku.`;
        }
      }
      else {
        return `Maaf buku yang ingin anda pinjam tidak tersedia.`;
      }
    }

    else {
      return `Maaf status member ${member.name} belum aktif.`;
    }
  }

  return(book, member) {
    if (member.membership == true) {
      if (book.borrowStatus == true) {
        if (member.bookBorrowed > 0) {
          member.bookBorrowed--;
          book.borrowStatus = false;

          return `Buku ${book.title} berhasil dikembalikan. Terima kasih ${member.name}. Saat ini anda meminjam ${member.bookBorrowed} buku.`;
        }
      }
    }
  }
}


// Object Declaration
let alvin = new Member('Alvin', 'Jogja');
let ardi = new Member('Ardi', 'Jakarta');
let alfian = new Librarian('Alfian', 'Bandung');
let buku1 = new Book('Binar Guidebook', '123456789', 'Binar Academy');
let buku2 = new Book('HTML for Dummies', '987654321', 'Ed Tittel, Stephen J. James');
let buku3 = new Book('JavaScript: The Definitive Guide', '111111111', 'David Flanagan');
let buku4 = new Book('Bootstrap 4 Quick Start: Responsive Web Design and Development Basics for Beginners (Bootstrap 4 Tutorial Book 1)', '222222222', 'Jacob Lett');

// Console.log testing
console.log(alfian.checkout(buku1, alvin));
console.log(alfian.activate(alvin));
console.log(alfian.checkout(buku1, alvin));
console.log(alfian.checkout(buku2, alvin));
console.log(alfian.checkout(buku3, alvin));
console.log(alfian.return(buku1, alvin));
console.log(alfian.checkout(buku4, alvin));
console.log(alfian.checkout(buku1, ardi));
console.log(alfian.activate(ardi));
console.log(alfian.checkout(buku1, ardi));
console.log(alfian.checkout(buku3, ardi));
console.log(alfian.return(buku1, ardi));
console.log(alfian.checkout(buku5, ardi));