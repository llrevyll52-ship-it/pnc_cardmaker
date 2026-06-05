const nameInput = document.getElementById("nameInput");
const nameText = document.getElementById("nameText");
const nameLine = document.getElementById("nameLine");
const nameRight = document.getElementById("nameRight");
const cardCanvas = document.getElementById("cardCanvas");

let previewScale = 0.32;

const MIN_SCALE = 0.12;
const MAX_SCALE = 0.6;
const SCALE_STEP = 0.04;

const BASE_NAME = "이즈";

const TEXT_X = 463;
const LINE_X = 460;
const NAME_R_GAP = 15;

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

function getNameFontSize(length) {
    if (length <= 2) return 320;
    if (length === 3) return 300;
    if (length === 4) return 275;
    if (length === 5) return 250;
    return 225;
}

function updateName() {
    const value = nameInput.value.trim() || BASE_NAME;
    const length = value.length;

    nameText.textContent = value;
    setNameFont(value);
    nameText.style.fontSize = `${getNameFontSize(length)}px`;

    requestAnimationFrame(() => {
        const textWidth = nameText.offsetWidth;
        const charCount = Math.max(value.length, 1);
        const avgCharWidth = textWidth / charCount;

        const lineEnd = TEXT_X + textWidth - avgCharWidth * 0.65;
        const lineWidth = Math.max(160, lineEnd - LINE_X);

        nameLine.style.width = `${lineWidth}px`;

        const nameRightX = TEXT_X + textWidth + NAME_R_GAP;
        nameRight.style.transform = `translateX(${nameRightX - 987}px)`;
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
