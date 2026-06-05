const nameInput = document.getElementById("nameInput");
const nameText = document.getElementById("nameText");
const nameLine = document.getElementById("nameLine");
const nameRight = document.getElementById("nameRight");

// PSD 기준값
const CARD_PREVIEW_SCALE = 0.32;

const BASE_LINE_WIDTH = 372;
const TEXT_START_X = 82;
const LINE_START_X = 73;

// 글자 마지막 지점보다 살짝 안쪽까지 바가 덮도록 조절
const LAST_CHAR_COVER_RATIO = 0.3;

// L7-name_R과 이름 바 끝 사이 간격
const RIGHT_GAP = 0;

function updateName() {
    const value = nameInput.value.trim() || "NAME";

    nameText.textContent = value;

    requestAnimationFrame(() => {
        const textWidth = nameText.getBoundingClientRect().width / CARD_PREVIEW_SCALE;
        const lastCharWidth = textWidth / value.length;

        const targetLineEnd =
            TEXT_START_X +
            textWidth -
            lastCharWidth * (1 - LAST_CHAR_COVER_RATIO);

        const newLineWidth = Math.max(
            BASE_LINE_WIDTH,
            targetLineEnd - LINE_START_X
        );

        nameLine.style.width = `${newLineWidth}px`;
        nameRight.style.left = `${LINE_START_X + newLineWidth + RIGHT_GAP}px`;
    });
}

nameInput.addEventListener("input", updateName);
window.addEventListener("load", updateName);
