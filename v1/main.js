const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

console.log(CATEGORIES.find((cat) => cat.name === "finance").color);

const btn = document.querySelector(".btn-open");
const factForm = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM Elements: Render facts in list
factsList.innerHTML = "";

// Load data from Supabase
async function loadFatcs() {
  const resp = await fetch(
    "https://qupcjflzmbhlpsfcmraq.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cGNqZmx6bWJobHBzZmNtcmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxODAwMzgsImV4cCI6MjAyMTc1NjAzOH0.jDb4Adbfr6pbM5XaLfDFsSplyaD6oxhygiw7U9mxuQg",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cGNqZmx6bWJobHBzZmNtcmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxODAwMzgsImV4cCI6MjAyMTc1NjAzOH0.jDb4Adbfr6pbM5XaLfDFsSplyaD6oxhygiw7U9mxuQg",
      },
    }
  );

  const data = await resp.json();
  createFactsList(data);
}

loadFatcs();

function createFactsList(factsArray) {
  const htmlArray = factsArray.map(
    (fact) => `<li class="fact">
  <p>
  ${fact.text}
  <a
  class="source"
  href="${fact.source}"
  target="_blank"
  >(Source)</a
  >
  </p>
  <span class="tag" style="background-color: ${
    CATEGORIES.find((cat) => cat.name === fact.category).color
  }"
  >${fact.category}</span
  >
  <div class="vote-buttons">
  <button>👍<strong>${fact.votesInteresting}</strong></button>
  <button>🤯 <strong>${fact.votesMindblowing}</strong></button>
  <button>⛔️ <strong>${fact.votesFalse}</strong></button>
  </div>
  </li>`
  );

  const html = htmlArray.join("");

  factsList.insertAdjacentHTML("afterbegin", html);
}

createFactsList(initialFacts);

// Toggle form visibility
btn.addEventListener("click", () => {
  if (factForm.classList.contains("hidden")) {
    factForm.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    factForm.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

// Filter
// const arrayEl = [5, 4, 7, 8, 9, 0, 2, 1, 45].filter((el) => el > 5);

// console.log(arrayEl);

// FALSY Values: 0, "", null, undefined

// 8/22/22 - 2/21/24
/*
const factObj = {
  text: "Venkatesh is about to get married",
  likedTheGirl: "Not",
  didTheyLikeme: "Yes",
  createSummary: function () {
    return `The fact is "${this.text}", he did ${this.likedTheGirl} but they liked him ${this.didTheyLikeme}`;
  },
};

console.log(factObj.createSummary());



// forEach
[48, 5, 4, 7, 8, 9, 0, 0, , 1, 1, 3, 4, 4, 2, 323].forEach((forEle) =>
  console.log(forEle)
);

// const times10 = [
//   5, 6, 7, 4, 3, 2, 1, 5, 7, 8, 9, 0, 97, 54, 1231, 6536, 9686, 70,
// ].map(function (el) {
//   return el * 10;
// });

const times10 = [
  5, 6, 7, 4, 3, 2, 1, 5, 7, 8, 9, 0, 97, 54, 1231, 6536, 9686, 70,
].map((el) => el * 10);

console.log(times10);

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const allCat = CATEGORIES.map((cat) => cat.name);
console.log(allCat);
*/
