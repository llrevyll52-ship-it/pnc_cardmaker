const nameInput = document.getElementById("nameInput");
const nameText = document.getElementById("nameText");
const cardCanvas = document.getElementById("cardCanvas");
const nameLine = document.getElementById("nameLine");
const nameRight = document.getElementById("nameRight");

let previewScale = 0.32;

const MIN_SCALE = 0.12;
const MAX_SCALE = 0.6;
const SCALE_STEP = 0.04;

function applyPreviewScale() {
    cardCanvas.style.transform = `scale(${previewScale})`;
}

function updateName() {
    const value = nameInput.value.trim() || "NAME";
    nameText.textContent = value;

    requestAnimationFrame(() => {

        const baseTextWidth = 700;
        const baseLineWidth = 372;
        const baseRightLeft = 800;

        const textWidth =
            nameText.getBoundingClientRect().width;

        const extraWidth =
            Math.max(0, textWidth - baseTextWidth);

        nameLine.style.width =
            `${baseLineWidth + extraWidth}px`;

        nameRight.style.left =
            `${baseRightLeft + extraWidth}px`;

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
