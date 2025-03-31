document.getElementById("loginBtn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username);
        document.querySelector(".login-container").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        loadMangaList();
    }
});

// API MangaHook
const API_URL = "https://api.mangahook.com"; 
const API_KEY = "your_api_key_here";  // API key của bạn

async function loadMangaList() {
    try {
        const response = await fetch(`${API_URL}/manga/list?api_key=${API_KEY}`);
        const data = await response.json();
        displayMangaList(data);
    } catch (error) {
        console.error("Lỗi tải danh sách truyện:", error);
    }
}

function displayMangaList(mangaList) {
    const mangaContainer = document.getElementById("mangaList");
    mangaContainer.innerHTML = "";

    mangaList.forEach(manga => {
        const div = document.createElement("div");
        div.classList.add("manga-item");
        div.innerHTML = `<img src="${manga.image}" alt="${manga.title}">
                         <p>${manga.title}</p>`;
        div.addEventListener("click", () => loadChapters(manga.id));
        mangaContainer.appendChild(div);
    });
}

async function loadChapters(mangaId) {
    try {
        const response = await fetch(`${API_URL}/manga/${mangaId}/chapters?api_key=${API_KEY}`);
        const data = await response.json();
        displayChapterList(mangaId, data);
    } catch (error) {
        console.error("Lỗi tải danh sách chương:", error);
    }
}

function displayChapterList(mangaId, chapters) {
    const chapterList = document.getElementById("chapterList");
    chapterList.innerHTML = "";
    
    chapters.forEach(chapter => {
        const btn = document.createElement("button");
        btn.textContent = `Chương ${chapter.number}`;
        btn.addEventListener("click", () => readChapter(mangaId, chapter.id));
        chapterList.appendChild(btn);
    });

    document.getElementById("main-content").classList.add("hidden");
    chapterList.classList.remove("hidden");
}

async function readChapter(mangaId, chapterId) {
    try {
        const response = await fetch(`${API_URL}/manga/${mangaId}/chapter/${chapterId}?api_key=${API_KEY}`);
        const data = await response.json();
        displayChapterContent(data);
    } catch (error) {
        console.error("Lỗi tải nội dung chương:", error);
    }
}

function displayChapterContent(chapter) {
    const contentDiv = document.getElementById("mangaContent");
    contentDiv.innerHTML = chapter.pages.map(page => `<img src="${page}" style="width:100%;">`).join("");
    
    document.getElementById("chapterList").classList.add("hidden");
    document.getElementById("reader").classList.remove("hidden");
}

// Chế độ tối
document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
