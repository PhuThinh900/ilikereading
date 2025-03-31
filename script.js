let loggedInUser = localStorage.getItem("loggedInUser");
let currentManga = null;
let currentChapter = 0;
let autoReadInterval = null;

document.addEventListener("DOMContentLoaded", () => {
    if (loggedInUser) {
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");
        loadMangaList();
    }
});

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    if (user && pass) {
        localStorage.setItem("loggedInUser", user);
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");
        loadMangaList();
    } else {
        alert("Vui lòng nhập tài khoản và mật khẩu!");
    }
}

function loadMangaList() {
    fetch("https://api.jikan.moe/v4/manga")
        .then(response => response.json())
        .then(data => {
            let mangaList = document.getElementById("manga-list");
            mangaList.innerHTML = "";
            data.data.forEach(manga => {
                let div = document.createElement("div");
                div.innerHTML = `<img src="${manga.images.jpg.image_url}" width="100"><br>${manga.title}`;
                div.onclick = () => loadChapters(manga);
                mangaList.appendChild(div);
            });
        });
}

function loadChapters(manga) {
    currentManga = manga;
    document.getElementById("home").classList.add("hidden");
    document.getElementById("chapter-list").classList.remove("hidden");
    document.getElementById("manga-title").textContent = manga.title;
    let chapterDiv = document.getElementById("chapters");
    chapterDiv.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        let btn = document.createElement("button");
        btn.textContent = `Chương ${i}`;
        btn.onclick = () => loadChapter(i);
        chapterDiv.appendChild(btn);
    }
}

function loadChapter(chapter) {
    currentChapter = chapter;
    document.getElementById("chapter-list").classList.add("hidden");
    document.getElementById("reader").classList.remove("hidden");
    document.getElementById("chapter-title").textContent = `Chương ${chapter}: ${currentManga.title}`;
    document.getElementById("chapter-image").src = "https://placehold.co/600x800?text=Trang+truyện";

    localStorage.setItem("lastRead", JSON.stringify({ manga: currentManga.mal_id, chapter }));
}

function goHome() {
    document.getElementById("chapter-list").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}

function goChapterList() {
    document.getElementById("reader").classList.add("hidden");
    document.getElementById("chapter-list").classList.remove("hidden");
}

function prevPage() {
    if (currentChapter > 1) loadChapter(currentChapter - 1);
}

function nextPage() {
    loadChapter(currentChapter + 1);
}

function autoRead() {
    if (autoReadInterval) {
        clearInterval(autoReadInterval);
        autoReadInterval = null;
    } else {
        autoReadInterval = setInterval(nextPage, 3000);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

window.onload = function () {
    let lastRead = localStorage.getItem("lastRead");
    if (lastRead) {
        lastRead = JSON.parse(lastRead);
        loadChapter(lastRead.chapter);
    }
};
