const booksList = document.getElementById("books-list");
const filter = document.getElementById("filter");

if (booksList && filter) {
  const books = Array.from(booksList.querySelectorAll(".book"));
  const loading = document.getElementById("books-loading");

  showLoadingState(booksList, loading, filter);

  filter.addEventListener("change", () => {
    const sortedBooks = [...books];

    if (filter.value === "price-low") {
      sortedBooks.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (filter.value === "price-high") {
      sortedBooks.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    } else if (filter.value === "rating") {
      sortedBooks.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
    }

    booksList.append(...sortedBooks);
  });
}
