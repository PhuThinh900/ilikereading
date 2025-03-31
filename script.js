const API_URL = "https://api.mangahook.com"; 
let currentManga = null;
let currentChapter = null;
let autoReadInterval = null;

// Dark Mode
document.getElementById("toggle-darkmode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Hiển thị danh sách truyện
async function loadManga() {
    const response = await fetch(`${API_URL}/manga`);
    const mangas = await response.json();
    const mangaList = document.getElementById("manga-list");
    mangaList.innerHTML = "";
    mangas.forEach(manga => {
        let item = document.createElement("div");
        item.className = "manga-item";
        item.innerHTML = `<img src="${manga.image}" width="100"><br>${manga.title}`;
        item.onclick = () => showChapters(manga);
        mangaList.appendChild(item);
    });
}

// Lọc truyện theo thể loại
function filterManga() {
    const genre = document.getElementById("genre").value;
    loadManga(genre);
}

// Tìm kiếm truyện
function searchManga() {
    const query = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".manga-item").forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(query) ? "block" : "none";
    });
}

// Hiển thị danh sách chương
async function showChapters(manga) {
    currentManga = manga;
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("chapter-list-page").classList.remove("hidden");
    document.getElementById("manga-title").textContent = manga.title;
    const response = await fetch(`${API_URL}/manga/${manga.id}/chapters`);
    const chapters = await response.json();
    const chapterList = document.getElementById("chapter-list");
    chapterList.innerHTML = "";
    chapters.forEach((chapter, index) => {
        let btn = document.createElement("button");
        btn.textContent = `Chương ${index + 1}`;
        btn.onclick = () => readChapter(chapter);
        chapterList.appendChild(btn);
    });
}

// Đọc chương truyện
async function readChapter(chapter) {
    currentChapter = chapter;
    document.getElementById("chapter-list-page").classList.add("hidden");
    document.getElementById("reader-page").classList.remove("hidden");
    document.getElementById("chapter-title").textContent = chapter.title;
    const response = await fetch(`${API_URL}/chapter/${chapter.id}`);
    const data = await response.json();
    document.getElementById("chapter-content").innerHTML = data.content;
    saveProgress();
}

// Lưu tiến độ đọc
function saveProgress() {
    localStorage.setItem("lastRead", JSON.stringify({ manga: currentManga, chapter: currentChapter }));
}

// Tải tiến độ đọc
function loadProgress() {
    const lastRead = JSON.parse(localStorage.getItem("lastRead"));
    if (lastRead) {
        currentManga = lastRead.manga;
        currentChapter = lastRead.chapter;
        readChapter(currentChapter);
    }
}

// Lịch sử đọc
function loadHistory() {
    const history = JSON.parse(localStorage.getItem("readingHistory")) || [];
    return history;
}

function saveHistory() {
    let history = loadHistory();
    if (!history.some(item => item.chapter.id === currentChapter.id)) {
        history.push({ manga: currentManga, chapter: currentChapter });
    }
    localStorage.setItem("readingHistory", JSON.stringify(history));
}

// Chuyển chương
function nextChapter() {
    let index = currentManga.chapters.indexOf(currentChapter);
    if (index < currentManga.chapters.length - 1) {
        readChapter(currentManga.chapters[index + 1]);
    }
}

function prevChapter() {
    let index = currentManga.chapters.indexOf(currentChapter);
    if (index > 0) {
        readChapter(currentManga.chapters[index - 1]);
    }
}

// Đọc tự động
function toggleAutoRead() {
    if (autoReadInterval) {
        clearInterval(autoReadInterval);
        autoReadInterval = null;
    } else {
        autoReadInterval = setInterval(nextChapter, 5000);
    }
}

// Quay lại trang trước
function goBack() {
    document.querySelectorAll(".hidden").forEach(el => el.classList.add("hidden"));
    document.getElementById("home-page").classList.remove("hidden");
}

// Đăng xuất
function logout() {
    localStorage.clear();
    location.reload();
}

// Load dữ liệu ban đầu
document.addEventListener("DOMContentLoaded", () => {
    loadManga();
    loadProgress();
});
