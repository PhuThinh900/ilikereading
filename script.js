document.addEventListener("DOMContentLoaded", function () {
    const mangaListContainer = document.getElementById("mangaList");
    const chapterListContainer = document.getElementById("chapterList");
    const readerContainer = document.getElementById("readerContainer");
    const searchInput = document.getElementById("searchInput");
    const genreFilter = document.getElementById("genreFilter");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeLogin = document.getElementById("closeLogin");
    const submitLogin = document.getElementById("submitLogin");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    let currentUser = null;
    const API_URL = "https://mangahook-api.vercel.app/api"; // API MangaHook

    // Lấy danh sách truyện
    function fetchMangaList() {
        fetch(`${API_URL}/mangaList`)
            .then(response => response.json())
            .then(data => {
                mangaListContainer.innerHTML = "";
                data.mangaList.forEach(manga => {
                    let mangaItem = document.createElement("div");
                    mangaItem.classList.add("manga-item");
                    mangaItem.innerHTML = `
                        <img src="${manga.image}" alt="${manga.title}">
                        <p>${manga.title}</p>
                    `;
                    mangaItem.onclick = () => loadChapters(manga.id);
                    mangaListContainer.appendChild(mangaItem);
                });
            })
            .catch(error => console.error("Lỗi tải truyện:", error));
    }

    // Lấy danh sách chương
    function loadChapters(mangaId) {
        fetch(`${API_URL}/manga/${mangaId}`)
            .then(response => response.json())
            .then(data => {
                chapterListContainer.innerHTML = "";
                chapterListContainer.classList.remove("hidden");
                data.chapters.forEach(chapter => {
                    let chapterItem = document.createElement("button");
                    chapterItem.textContent = `Chương ${chapter.chapter}: ${chapter.title}`;
                    chapterItem.onclick = () => readChapter(mangaId, chapter.chapter);
                    chapterListContainer.appendChild(chapterItem);
                });
            })
            .catch(error => console.error("Lỗi tải chương:", error));
    }

    // Đọc chương truyện
    function readChapter(mangaId, chapterNumber) {
        fetch(`${API_URL}/manga0
