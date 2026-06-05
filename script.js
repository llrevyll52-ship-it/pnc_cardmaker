const nameInput = document.getElementById("nameInput");
const nameText = document.getElementById("nameText");
const cardCanvas = document.getElementById("cardCanvas");
const nameBar = document.getElementById("nameBar");
const nameRight = document.getElementById("nameRight");

let previewScale = 0.32;

const MIN_SCALE = 0.12;
const MAX_SCALE = 0.6;
const SCALE_STEP = 0.04;

function applyPreviewScale() {
    cardCanvas.style.transform = `scale(${previewScale})`;
}

function updateName() {
    const value = nameInput.value.trim() || "이즈";

    nameText.textContent = value;

    requestAnimationFrame(() => {
        const textWidth =
            nameText.getBoundingClientRect().width;

        const barWidth =
            Math.max(180, textWidth * 0.9);

        const rightLeft =
            470 + textWidth + 30;

        nameBar.style.width =
            `${barWidth}px`;

        nameRight.style.left =
            `${rightLeft}px`;
    });
}

function handleZoom(event) {
    const key = event.key;

    if (key !== "+" && key !== "=" && key !== "-") {
        return;
    }

    event.preventDefault();

    if (key === "+" || key === "=") {
        previewScale = Math.min(MAX_SCALE, previewScale + SCALE_STEP);
    }

    if (key === "-") {
        previewScale = Math.max(MIN_SCALE, previewScale - SCALE_STEP);
    }

    applyPreviewScale();
}

nameInput.addEventListener("input", updateName);
window.addEventListener("keydown", handleZoom);

window.addEventListener("load", () => {
    applyPreviewScale();
    updateName();
});
