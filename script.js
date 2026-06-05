const nameInput = document.getElementById("nameInput");
const nameText = document.getElementById("nameText");
const nameLine = document.getElementById("nameLine");
const nameRight = document.getElementById("nameRight");
const cardCanvas = document.getElementById("cardCanvas");

let previewScale = 0.32;

const MIN_SCALE = 0.12;
const MAX_SCALE = 0.6;
const SCALE_STEP = 0.04;

// PSD 기준 이름 텍스트 위치
const NAME_TEXT_X = 428;
const NAME_TEXT_Y = 2998;

// 이름 바 원본 기준
const BASE_LINE_WIDTH = 2600;

// L8-name_line은 전체 캔버스 PNG라서
// transform-origin을 PSD 왼쪽 기준으로 둔다.
const LINE_SCALE_ORIGIN_X = 0;

// L7-name_R은 전체 캔버스 PNG라서
// 이동만 시킨다.
const RIGHT_MOVE_RATIO = 1;

// 글자 마지막 약 30% 지점까지 바가 닿도록 조절
const LAST_CHAR_COVER_RATIO = 0.3;

// 이름이 짧을 때 기본 상태 유지
const MIN_EXTRA_WIDTH = 0;

function applyPreviewScale() {
    cardCanvas.style.transform = `scale(${previewScale})`;
}

function updateName() {
    const value = nameInput.value.trim() || "NAME";

    nameText.textContent = value;

    requestAnimationFrame(() => {
        const textWidth = nameText.getBoundingClientRect().width / previewScale;
        const lastCharWidth = textWidth / value.length;

        const targetEnd =
            NAME_TEXT_X +
            textWidth -
            lastCharWidth * (1 - LAST_CHAR_COVER_RATIO);

        const baseEnd = 920;

        const extraWidth = Math.max(
            MIN_EXTRA_WIDTH,
            targetEnd - baseEnd
        );

        const lineScaleX =
            (BASE_LINE_WIDTH + extraWidth) / BASE_LINE_WIDTH;

        nameLine.style.transformOrigin = `${LINE_SCALE_ORIGIN_X}px center`;
        nameLine.style.transform = `scaleX(${lineScaleX})`;

        nameRight.style.transform = `translateX(${extraWidth * RIGHT_MOVE_RATIO}px)`;
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
