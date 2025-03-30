let chapters = [
    { title: "Chương 1: Khởi đầu", content: "Nội dung chương 1..." },
    { title: "Chương 2: Cuộc hành trình", content: "Nội dung chương 2..." },
    { title: "Chương 3: Cuộc chạm trán", content: "Nội dung chương 3..." },
    { title: "Chương 4: Kết thúc", content: "Nội dung chương 4..." }
];

let currentChapter = 0;

function handleLogin() {
    let username = document.getElementById("username").value.trim();
    if (username) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("reader-section").style.display = "block";
        loadChapter();
    }
}

function loadChapter() {
    document.getElementById("chapter-title").innerText = chapters[currentChapter].title;
    document.getElementById("chapter-content").innerText = chapters[currentChapter].content;
}

function nextChapter() {
    if (currentChapter < chapters.length - 1) {
        currentChapter++;
        loadChapter();
    }
}

function prevChapter() {
    if (currentChapter > 0) {
        currentChapter--;
        loadChapter();
    }
}

function selectChapter(index) {
    currentChapter = parseInt(index);
    loadChapter();
}

function readChapter() {
    let speech = new SpeechSynthesisUtterance(chapters[currentChapter].content);
    speech.lang = "vi-VN";
    window.speechSynthesis.speak(speech);
}

function logout() {
    document.getElementById("reader-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}
