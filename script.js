document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const searchInput = document.getElementById("search");
    const genreFilter = document.getElementById("genreFilter");
    const mangaList = document.getElementById("manga-list");
    const mangaContent = document.getElementById("manga-content");
    const prevChapter = document.getElementById("prevChapter");
    const nextChapter = document.getElementById("nextChapter");
    const autoRead = document.getElementById("autoRead");

    let currentManga = null;
    let currentChapter = 0;
    let autoReadInterval = null;

    // Chế độ Dark Mode
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Gọi API Jikan để lấy danh sách manga
    async function fetchManga() {
        try {
            const response = await fetch("https://api.jikan.moe/v4/manga");
            const data = await response.json();
            displayManga(data.data);
            populateGenres(data.data);
        } catch (error) {
            console.error("Lỗi tải truyện:", error);
        }
    }

    function displayManga(mangaArray) {
        mangaList.innerHTML = "";
        mangaArray.forEach(manga => {
            let mangaItem = document.createElement("div");
            mangaItem.classList.add("manga-item");
            mangaItem.innerHTML = `<img src="${manga.images.jpg.image_url}" alt="${manga.title}"><h3>${manga.title}</h3>`;
            mangaItem.addEventListener("click", () => loadMangaDetails(manga));
            mangaList.appendChild(mangaItem);
        });
    }

    function populateGenres(mangaArray) {
        let genres = new Set();
        mangaArray.forEach(manga => {
            manga.genres.forEach(genre => {
                genres.add(genre.name);
            });
        });
        genres.forEach(genre => {
            let option = document.createElement("option");
            option.value = genre.toLowerCase();
            option.textContent = genre;
            genreFilter.appendChild(option);
        });
    }

    async function loadMangaDetails(manga) {
        currentManga = manga;
        currentChapter = 0;
        displayMangaContent();
    }

    function displayMangaContent() {
        if (currentManga && currentManga.chapters && currentManga.chapters.length > 0) {
            mangaContent.innerHTML = `<h2>${currentManga.chapters[currentChapter].title}</h2><p>${currentManga.chapters[currentChapter].content}</p>`;
        } else {
            mangaContent.innerHTML = "<p>Không có nội dung cho chương này.</p>";
        }
    }

    prevChapter.addEventListener("click", () => {
        if (currentChapter > 0) {
            currentChapter--;
            displayMangaContent();
        }
    });

    nextChapter.addEventListener("click", () => {
        if (currentChapter < currentManga.chapters.length - 1) {
            currentChapter++;
            displayMangaContent();
        }
    });

    autoRead.addEventListener("click", () => {
        if (autoReadInterval) {
            clearInterval(autoReadInterval);
            autoReadInterval = null;
            autoRead.textContent = "Tự động đọc";
        } else {
            autoRead.textContent = "Dừng tự động đọc";
            autoReadInterval = setInterval(() => {
                if (currentChapter < currentManga.chapters.length - 1) {
                    currentChapter++;
                    displayMangaContent();
                } else {
                    clearInterval(autoReadInterval13
