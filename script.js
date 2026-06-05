@font-face {
    font-family: "Avenir Black";
    src: url("./Avenir%20Black/fonts/Avenir%20Black.ttf") format("truetype");
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #151515;
    color: #ffffff;
    font-family: Arial, sans-serif;
}

.app {
    min-height: 100vh;
    display: flex;
    gap: 32px;
    padding: 32px;
}

.preview-panel {
    flex: 1;
    overflow: auto;
}

/* PSD 원본 크기 */
.card-canvas {
    position: relative;
    width: 2600px;
    height: 3600px;

    transform: scale(0.32);
    transform-origin: top left;
}

/* 모든 PSD 레이어 */
.layer {
    position: absolute;

    left: 0;
    top: 0;

    width: 2600px;
    height: 3600px;

    pointer-events: none;
}

/* 레이어 순서 */

.frame-layer {
    z-index: 1;
}

.title-layer {
    z-index: 2;
}

.name-left-layer {
    z-index: 10;
}

.name-line-layer {
    z-index: 11;
}

.name-right-layer {
    z-index: 12;
}

/* 이름 텍스트 */

.name-text {
    position: absolute;

    left: 428px;
    top: 2998px;

    z-index: 20;

    color: #ffffff;

    font-family: "Avenir Black", "Arial Black", Arial, sans-serif;

    font-size: 320px;
    line-height: 1;

    letter-spacing: -8px;
    white-space: nowrap;

    text-shadow:
        0 10px 10px rgba(0,0,0,.75),
        0 0 18px rgba(0,0,0,.60);
}

/* 작업 패널 */

.control-panel {
    width: 420px;
    min-width: 420px;

    height: fit-content;

    background: #f2f2f2;
    color: #333;

    border-radius: 24px;

    padding: 24px;

    display: flex;
    flex-direction: column;
    gap: 18px;
}

.control-panel h1 {
    text-align: center;

    color: #333;

    font-size: 30px;
}

.tool-tip {
    background: #ececec;

    border-radius: 12px;

    padding: 14px;

    font-size: 14px;
    line-height: 1.5;
}

.section-title {
    font-size: 20px;
    font-weight: 700;

    border-bottom: 2px solid #333;

    padding-bottom: 6px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.input-group label {
    font-weight: 700;
}

.input-group input {
    border: 1px solid #ccc;
    border-radius: 10px;

    padding: 12px;

    font-size: 15px;
}

.primary-button {
    margin-top: 12px;

    background: #333;
    color: white;

    border: none;
    border-radius: 12px;

    padding: 14px;

    font-size: 16px;
    font-weight: 700;

    cursor: pointer;
}
