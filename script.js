const nameInput = document.getElementById("nameInput");
const nameText = document.getElementById("nameText");
const nameLine = document.getElementById("nameLine");
const nameRight = document.getElementById("nameRight");
const cardCanvas = document.getElementById("cardCanvas");

let previewScale = 0.32;

const MIN_SCALE = 0.12;
const MAX_SCALE = 0.6;
const SCALE_STEP = 0.04;

/* 2600×3600 캔버스 기준 좌표 */
const TEXT_X = 463;
const LINE_X = 460;

/* name_R은 "이즈" 2글자 기준 */
const BASE_NAME = "이즈";
const BASE_RIGHT_X = 987;

/* 밑줄 기본값 */
const BASE_LINE_WIDTH = 527;
const LINE_EXTRA = 0;

function applyPreviewScale() {
    cardCanvas.style.transform = `scale(${previewScale})`;
}

function setNameFont(value) {
    nameText.classList.remove("font-kor", "font-eng");

    const hasKorean = /[가-힣]/.test(value);

    if (hasKorean) {
        nameText.classList.add("font-kor");
    } else {
        nameText.classList.add("font-eng");
    }
}

function getTextWidth(text) {
    const originalText = nameText.textContent;

    nameText.textContent = text;

    const width = nameText.getBoundingClientRect().width / previewScale;

    nameText.textContent = originalText;

    return width;
}

function updateName() {
    const value = nameInput.value.trim() || BASE_NAME;

    nameText.textContent = value;
    setNameFont(value);

    requestAnimationFrame(() => {
        const currentWidth = nameText.getBoundingClientRect().width / previewScale;
        const baseWidth = getTextWidth(BASE_NAME);

        const diff = currentWidth - baseWidth;

        nameRight.style.transform = `translateX(${diff}px)`;

        const lineWidth = Math.max(
            BASE_LINE_WIDTH,
            BASE_LINE_WIDTH + diff + LINE_EXTRA
        );

        nameLine.style.width = `${lineWidth}px`;
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
    updateName();
}

nameInput.addEventListener("input", updateName);
window.addEventListener("keydown", handleZoom);

window.addEventListener("load", () => {
    applyPreviewScale();
    updateName();
});
