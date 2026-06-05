const nameInput = document.getElementById("nameInput");
const nameText = document.getElementById("nameText");
const nameLine = document.getElementById("nameLine");
const nameRightWindow = document.getElementById("nameRightWindow");
const cardCanvas = document.getElementById("cardCanvas");

let previewScale = 0.32;

const MIN_SCALE = 0.12;
const MAX_SCALE = 0.6;
const SCALE_STEP = 0.04;

const BASE_NAME = "이즈";
const TEXT_X = 463;
const LINE_X = 460;
const BASE_RIGHT_X = 987;

function applyPreviewScale() {
    cardCanvas.style.transform = `scale(${previewScale})`;
}

function setNameFont(value) {
    nameText.classList.remove("font-kor", "font-eng");

    if (/[가-힣]/.test(value)) {
        nameText.classList.add("font-kor");
    } else {
        nameText.classList.add("font-eng");
    }
}

function measureText(text) {
    const oldText = nameText.textContent;
    nameText.textContent = text;

    const width = nameText.getBoundingClientRect().width / previewScale;

    nameText.textContent = oldText;
    return width;
}

function updateName() {
    const value = nameInput.value.trim() || BASE_NAME;

    nameText.textContent = value;
    setNameFont(value);

    requestAnimationFrame(() => {
        const currentWidth = nameText.getBoundingClientRect().width / previewScale;
        const baseWidth = measureText(BASE_NAME);

        const diff = currentWidth - baseWidth;

        nameRightWindow.style.left = `${BASE_RIGHT_X + diff}px`;

        const charCount = Math.max(value.length, 1);
        const avgCharWidth = currentWidth / charCount;

        const lineEnd = TEXT_X + currentWidth - avgCharWidth * 0.65;
        const lineWidth = Math.max(160, lineEnd - LINE_X);

        nameLine.style.width = `${lineWidth}px`;
    });
}

function handleZoom(event) {
    const key = event.key;

    if (key !== "+" && key !== "=" && key !== "-") return;

    event.preventDefault();

    if (key === "+" || key === "=") {
        previewScale = Math.min(MAX_SCALE, previewScale + SCALE_STEP);
    }

    if (key === "-") {
        previewScale = Math.max(MIN_SCALE, previewScale - SCALE_STEP);
    }

    applyPreviewScale();
    updateName();
}

nameInput.addEventListener("input", updateName);
window.addEventListener("keydown", handleZoom);

window.addEventListener("load", () => {
    applyPreviewScale();
    updateName();
});
