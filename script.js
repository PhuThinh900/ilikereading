document.getElementById("loginBtn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username);
        document.querySelector(".login-container").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
    }
});

// API từ MangaHook
const API_URL = "https://mangahook-api.example.com";
fetch(`${API_URL}/manga`)
    .then(response => response.json())
    .then(data => {
        const mangaList = document.getElementById("mangaList");
        data.forEach(manga => {
            const div = document.createElement("div");
            div.innerHTML = `<img src="${manga.image}" alt="${manga.title}">
                             <p>${manga.title}</p>`;
            div.addEventListener("click", () => loadChapters(manga.id));
            mangaList.appendChild(div);
        });
    });

function loadChapters(mangaId) {
    fetch(`${API_URL}/manga/${mangaId}/chapters`)
        .then(response => response.json())
        .then(data => {
            const chapterList = document.getElementById("chapterList");
            chapterList.innerHTML = "";
            data.forEach(chapter => {
                const btn = document.createElement("button");
                btn.textContent = `Chương ${chapter.number}`;
                btn.addEventListener("click", () => readChapter(mangaId, chapter.id));
                chapterList.appendChild(btn);
            });
            document.getElementById("main-content").classList.add("hidden");
            chapterList.classList.remove("hidden");
        });
}

function readChapter(mangaId, chapterId) {
    fetch(`${API_URL}/manga/${mangaId}/chapter/${chapterId}`)
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById("mangaContent");
            contentDiv.innerHTML = data.pages.map(page => `<img src="${page}">`).join("");
            document.getElementById("chapterList").classList.add("hidden");
            document.getElementById("reader").classList.remove("hidden");
        });
}

// Dark mode
document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
