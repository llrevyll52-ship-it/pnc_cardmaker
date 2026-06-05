console.log("PNC Card Maker Loaded");

const cardName = document.getElementById("cardName");
const cardTitle = document.getElementById("cardTitle");

cardName.addEventListener("input", () => {
    console.log("이름:", cardName.value);
});

cardTitle.addEventListener("input", () => {
    console.log("타이틀:", cardTitle.value);
});
