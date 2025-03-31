const API_URL = "https://api.mangahook.com/v1/manga"; 
let autoScroll = false;
let scrollInterval;

document.addEventListener("DOMContentLoaded", () => {
    checkLogin();
    fetchManga();
    loadGenres();
});

function checkLogin() {
    if (localStorage.getItem("user")) {
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");
    }
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("user", username);
        location.reload();
    } else {
        document.getElementById("login-error").textContent = "Vui lòng nhập đầy đủ thông tin!";
    }
}

function fetchManga() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            displayManga(data.manga);
        })
        .catch(error => console.error("Lỗi tải truyện:", error));
}

function displayManga(mangas) {
    const mangaList = document.getElementById("manga-list");
    mangaList.innerHTML = "";

    mangas.forEach(manga => {
        const mangaItem = document.createElement("div");
        mangaItem.classList.add("manga-item");
        mangaItem.innerHTML = `
            <img src="${manga.image}" alt="${manga.title}" onclick="openReader('${manga.id}')">
            <p>${manga.title}</p>
        `;
        mangaList.appendChild(mangaItem);
    });
}

function loadGenres() {
    const genres = ["Action", "Romance", "Fantasy", "Horror", "Comedy"];
    const genreSelect = document.getElementById("genre-select");

    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.toLowerCase();
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}

function filterByGenre() {
    const selectedGenre = document.getElementById("genre-select").value;
    console.log("Lọc theo thể loại:", selectedGenre);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function openReader(mangaId) {
    document.getElementById("manga-list").classList.add("hidden");
    document.getElementById("reader-container").classList.remove("hidden");

    fetch(`${API_URL}/${mangaId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("manga-reader").innerHTML = data.chapters.map(chapter => `
                <p onclick="readChapter('${mangaId}', '${chapter.id}')">${chapter.title}</p>
            `).join("");
        });
}

function readChapter(mangaId, chapterId) {
    fetch(`${API_URL}/${mangaId}/chapters/${chapterId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("manga-reader").innerHTML = data.pages.map(page => `
                <img src="${page.image}" alt="Trang truyện">
            `).join("");

            localStorage.setItem("lastRead", JSON.stringify({ mangaId, chapterId }));
        });
}

function closeReader() {
    document.getElementById("manga-list").classList.remove("hidden");
    document.getElementById("reader-container").classList.add("hidden");
}

function toggleAutoScroll() {
    autoScroll = !autoScroll;

    if (autoScroll) {
        scrollInterval = setInterval(() => {
            window.scrollBy(0, 1);
        }, 50);
    } else {
        clearInterval(scrollInterval);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const lastRead = JSON.parse(localStorage.getItem("lastRead"));

    if (lastRead) {
        openReader(lastRead.mangaId);
        readChapter(lastRead.mangaId, lastRead.chapterId);
    }
});
