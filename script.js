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
    const API_URL = "https://api.jikan.moe/v4/manga";

    // Lấy danh sách truyện
    function fetchMangaList() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                mangaListContainer.innerHTML = "";
                data.data.slice(0, 20).forEach(manga => {
                    let mangaItem = document.createElement("div");
                    mangaItem.classList.add("manga-item");
                    mangaItem.innerHTML = `
                        <img src="${manga.images.jpg.image_url}" alt="${manga.title}">
                        <p>${manga.title}</p>
                    `;
                    mangaItem.onclick = () => loadChapters(manga.mal_id);
                    mangaListContainer.appendChild(mangaItem);
                });
            })
            .catch(error => console.error("Lỗi tải truyện:", error));
    }

    // Lấy danh sách chương
    function loadChapters(mangaId) {
        fetch(`https://api.jikan.moe/v4/manga/${mangaId}/chapters`)
            .then(response => response.json())
            .then(data => {
                chapterListContainer.innerHTML = "";
                chapterListContainer.classList.remove("hidden");
                data.data.forEach(chapter => {
                    let chapterItem = document.createElement("button");
                    chapterItem.textContent = `Chương ${chapter.chapter}: ${chapter.title}`;
                    chapterItem.onclick = () => readChapter(chapter);
                    chapterListContainer.appendChild(chapterItem);
                });
            })
            .catch(error => console.error("Lỗi tải chương:", error));
    }

    // Đọc chương truyện
    function readChapter(chapter) {
        readerContainer.innerHTML = `<h2>Đọc: ${chapter.title}</h2><p>Chương ${chapter.chapter} đang được hiển thị.</p>`;
        readerContainer.classList.remove("hidden");
    }

    // Dark Mode
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Đăng nhập
    loginBtn.addEventListener("click", function () {
        loginModal.style.display = "block";
    });

    closeLogin.addEventListener("click", function () {
        loginModal.style.display = "none";
    });

    submitLogin.addEventListener("click", function () {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username && password) {
            currentUser = username;
            loginBtn.textContent = `Xin chào, ${username}`;
            loginModal.style.display = "none";
        } else {
            alert("Vui lòng nhập tài khoản và mật khẩu");
        }
    });

    // Tải truyện khi vào trang
    fetchMangaList();
});
