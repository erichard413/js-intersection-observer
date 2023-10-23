const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      //this code will unhook the observer to any entry that is already displayed on the page, only NEW observed entries will be animated. The rest will stay static on page.
      //   if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 1,
    // rootMargin: "100px",
  }
);

const lastCardObserver = new IntersectionObserver(
  entries => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  { rootMargin: "100px" }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach(card => {
  observer.observe(card);
});

const cardContainer = document.querySelector(".card-container");

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card);
    cardContainer.append(card);
  }
}
