const nameInput = document.getElementById("nameInput");
const nameText = document.getElementById("nameText");
const nameLine = document.getElementById("nameLine");
const nameRight = document.getElementById("nameRight");

const BASE_LINE_WIDTH = 663;
const TEXT_START_X = 82;
const RIGHT_OFFSET = 48;

function updateName() {
    const value = nameInput.value.trim() || "NAME";

    nameText.textContent = value;

    requestAnimationFrame(() => {
        const textWidth = nameText.getBoundingClientRect().width / 0.32;

        const estimatedLastCharWidth = textWidth / value.length;
        const lineEnd =
            TEXT_START_X +
            textWidth -
            estimatedLastCharWidth * 0.7;

        const newLineWidth = Math.max(BASE_LINE_WIDTH, lineEnd);

        nameLine.style.width = `${newLineWidth}px`;
        nameRight.style.left = `${newLineWidth - RIGHT_OFFSET}px`;
    });
}

nameInput.addEventListener("input", updateName);

window.addEventListener("load", updateName);
