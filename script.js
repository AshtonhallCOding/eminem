const performances = [
{
year: "2018",
title: "2018 Coachella with 50 Cent",
description: "Surprise appearance with 50 Cent performing Patiently waiting and In da club"
},
{
year: "2000",
description: "Eminem performed The real slim shady with dozens of look alikes joining him on stage",
title: "2000 MTV Europe music awards"
},
{
year: "2011",
title: "2011 Grammy performance with Dr. Dre",
description: "Eminem and Dr. Dre performed 'I need a doctor' in a powerful live rendition"
}
];

function update_performance_info() {
const performance = performances[current_performance_index];
const performance_info = document.getElementById("performance-info");

performance_info.innerHTML = `
<h3>${performance.title}</h3>
<p><strong>Year:</strong> ${performance.year}</p>
<p>${performance.description}</p>
`;

document.getElementById("performance-counter").textContent = 
`${current_performance_index + 1}/${performances.length}`;
}

function populate_records() {
const records = [
"Most MTV Video Music awards for best Hiphop video (6)",
"Fastest rap in a chart-topping song (Godzilla had 11 syllables per second)",
"Best selling rapper of all time (over 220 million records)",
"First rapper with two diamond certified albums",
"Most consecutive Billboard 200 #1 albums (8)",
"Most words in a hit single (Rap God with 1,560 words)"
];

const records_list = document.getElementById("records-list");

records.forEach(record => {
const record_element = document.createElement("li");
record_element.textContent = record;
records_list.appendChild(record_element);
});

update_record_count();
}

function next_performance() {
current_performance_index = (current_performance_index + 1) % performances.length;
update_performance_info();
}

function previous_performance() {
current_performance_index = (current_performance_index - 1 + performances.length) % performances.length;
update_performance_info();
}

function show_random_award() {
const random_awards = [
"Best Selling Artist of the 2000s in the United States",
"First artist to have two digital singles certified Diamond (Not afraid, Love the way you lie)",
"First rapper to win the Academy Award for Best Original Song (Lose yourself ffrom 2003)",
"Most streamed rapper on spotify (50m + monthly listeners)"
];

const random_award = random_awards[Math.floor(Math.random() * random_awards.length)];
const random_award_element = document.getElementById("random-award");

random_award_element.textContent = random_award;
random_award_element.classList.remove("hidden");
}

function add_comment() {
event.preventDefault();

const name = document.getElementById("fan-name").value;
const memory = document.getElementById("fan-memory").value;
const comments_list = document.getElementById("comments-list");

const comment_div = document.createElement("div");
comment_div.className = "comment";
comment_div.innerHTML = `<strong>${name}</strong>: ${memory}`;

comments_list.appendChild(comment_div);
event.target.reset();
}

let current_performance_index = 0;
let awards = [
{count: 1, name: "Academy awards (Oscar)"},
{count: 15, name: "Grammy awards"},
{count: 2, name: "Brit awards"},
{count: 8, name: "MTV video music awards"},
{count: 10, name: "Billboard music awards"}
];

function populate_awards(sorted_by = 'name') {
const awards_list = document.getElementById("awards-list");
awards_list.innerHTML = '';

const sorted_awards = [...awards].sort((a, b) => {
if (sorted_by === 'name') {
return a.name.localeCompare(b.name);
} else {
return b.count - a.count;
}
});

sorted_awards.forEach(award => {
const award_element = document.createElement("div");
award_element.className = "award-item";
award_element.innerHTML = `
<h3>${award.name}</h3>
<p>Won ${award.count} times</p>
<div class="progress-bar">
<div style="width: ${award.count * 5}%"></div>
</div>
`;
awards_list.appendChild(award_element);
});
}

function sort_awards(by) {
populate_awards(by);
}

function toggle_persona_info(persona) {
const persona_cards = document.querySelectorAll(".persona-card");

persona_cards.forEach(card => {
const info = card.querySelector(".persona-info");
if (card.contains(event.target)) {
info.classList.toggle("hidden");
card.style.backgroundColor = info.classList.contains("hidden") ? "" : "#e6f7ed";
} else {
info.classList.add("hidden");
card.style.backgroundColor = "";
}
});
}

function update_record_count(count) {
const total = document.querySelectorAll("#records-list li").length;
const display_count = typeof count === 'number' ? count : total;
document.getElementById("record-count").textContent = 
`${display_count} of ${total} records shown`;
}

let current_image_index = 0;

function change_image() {
const images = ["young.jpg", "now.jpg"];
const main_image = document.getElementById("main-image");
const button = event.target;

current_image_index = (current_image_index + 1) % images.length;
main_image.src = `images/${images[current_image_index]}`;

if (current_image_index === 0) {
button.textContent = "See eminem now";
} else {
button.textContent = "See young eminem";
}
}

function filter_records() {
const search_term = document.getElementById("record-search").value.toLowerCase();
const records = document.querySelectorAll("#records-list li");
let visible_count = 0;

records.forEach(record => {
const text = record.textContent.toLowerCase();
if (text.includes(search_term)) {
record.style.display = "block";
visible_count++;
} else {
record.style.display = "none";
}
});

update_record_count(visible_count);
}

function reveal_fun_fact() {
const fun_facts = [
"Eminem is the only artist to have eight consecutive albums debut at number one on the Billboard 200",
"He can rap 11 syllables per second at his fastest",
"Eminem holds  guinness world record for most words in a hit single ('Rap God' with 1,560 words in 6:09 mins)"
];

const random_fact = fun_facts[Math.floor(Math.random() * fun_facts.length)];
const fun_fact_element = document.getElementById("fun-fact");

fun_fact_element.textContent = random_fact;
fun_fact_element.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", function() {
if (document.getElementById("awards-list")) {
populate_awards();
populate_records();
update_performance_info();
}

if (localStorage.getItem('darkMode') === 'true') {
document.body.classList.add('dark-mode');
document.getElementById('dark-mode-toggle').textContent = 'Toggle Light Mode';
}

document.getElementById('dark-mode-toggle')?.addEventListener('click', function() {
document.body.classList.toggle('dark-mode');
const is_dark = document.body.classList.contains('dark-mode');
this.textContent = is_dark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
localStorage.setItem('darkMode', is_dark);
});
});