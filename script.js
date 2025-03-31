document.addEventListener("DOMContentLoaded", () => {
    loadGenres();
    loadMangaList();
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username && password) {
        localStorage.setItem("loggedInUser", username);
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("appContainer").style.display = "block";
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
}

function loadMangaList() {
    fetch("https://api.jikan.moe/v4/manga")
        .then(response => response.json())
        .then(data => {
            let mangaList = document.getElementById("mangaList");
            mangaList.innerHTML = "";

            data.data.forEach(manga => {
                let mangaItem = document.createElement("div");
                mangaItem.classList.add("manga-item");
                mangaItem.innerHTML = `<img src="${manga.images.jpg.image_url}" onclick="loadChapters(${manga.mal_id})"><br>${manga.title}`;
                mangaList.appendChild(mangaItem);
            });
        })
        .catch(error => console.error("Lỗi tải danh sách truyện:", error));
}

function loadChapters(mangaId) {
    fetch(`https://api.jikan.moe/v4/manga/${mangaId}/chapters`)
        .then(response => response.json())
        .then(data => {
            let chapterList = document.getElementById("chapterList");
            chapterList.innerHTML = "";
            document.getElementById("mangaList").style.display = "none";
            chapterList.style.display = "block";

            data.data.forEach(chapter => {
                let chapterItem = document.createElement("button");
                chapterItem.textContent = chapter.title;
                chapterItem.onclick = () => loadChapterContent(mangaId, chapter.chapter_id);
                chapterList.appendChild(chapterItem);
            });
        })
        .catch(error => console.error("Lỗi tải danh sách chương:", error));
}

function loadChapterContent(mangaId, chapterId) {
    document.getElementById("chapterList").style.display = "none";
    document.getElementById("readerContainer").style.display = "block";

    let reader = document.getElementById("mangaReader");
    reader.innerHTML = `<p>Hiển thị nội dung chương ${chapterId} của truyện ID ${mangaId}</p>`;

    localStorage.setItem("lastRead", JSON.stringify({ mangaId, chapterId }));
}

function prevChapter() {
    alert("Chức năng chưa được hỗ trợ.");
}

function nextChapter() {
    alert("Chức năng chưa được hỗ trợ.");
}

let autoReadInterval;
function toggleAutoRead() {
    if (autoReadInterval) {
        clearInterval(autoReadInterval);
        autoReadInterval = null;
    } else {
        autoReadInterval = setInterval(() => nextChapter(), 5000);
    }
}

document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

function searchManga() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let mangaItems = document.querySelectorAll(".manga-item");

    mangaItems.forEach(item => {
        let title = item.textContent.toLowerCase();
        item.style.display = title.includes(query) ? "block" : "none";
    });
}

function loadGenres() {
    let genreSelect = document.getElementById("genreFilter");
    let genres = ["Action", "Comedy", "Drama", "Fantasy", "Romance"];

    genres.forEach(genre => {
        let option = document.createElement("option");
        option.value = genre.toLowerCase();
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}

function filterManga() {
    let selectedGenre = document.getElementById("genreFilter").value;
    if (selectedGenre) {
        fetch(`https://api.jikan.moe/v4/manga?genres=${selectedGenre}`)
            .then(response => response.json())
            .then(data => {
                let mangaList = document.getElementById("mangaList");
                mangaList.innerHTML = "";

                data.data.forEach(manga => {
                    let mangaItem = document.createElement("div");
                    mangaItem.classList.add("manga-item");
                    mangaItem.innerHTML = `<img src="${manga.images.jpg.image_url}" onclick="loadChapters(${manga.mal_id})"><br>${manga.title}`;
                    mangaList.appendChild(mangaItem);
                });
            })
            .catch(error => console.error("Lỗi tải thể loại:", error));
    } else {
        loadMangaList();
    }
}
