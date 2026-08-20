const quotes = [

    {
        text: "Success is the sum of small efforts repeated day after day.",
        author: "Robert Collier"
    },

    {
        text: "Dream big and dare to fail.",
        author: "Norman Vaughan"
    },

    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },

    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },

    {
        text: "Stay hungry. Stay foolish.",
        author: "Steve Jobs"
    },

    {
        text: "Small progress is still progress.",
        author: "MadWidgets"
    },

    {
        text: "Discipline beats motivation.",
        author: "Unknown"
    },

    {
        text: "Your only limit is your mind.",
        author: "Unknown"
    }

];

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const button = document.getElementById("new-quote");

function newQuote() {

    const random = Math.floor(Math.random() * quotes.length);

    quote.textContent = `"${quotes[random].text}"`;

    author.textContent = `— ${quotes[random].author}`;

}

button.addEventListener("click", newQuote);

newQuote();

lucide.createIcons();