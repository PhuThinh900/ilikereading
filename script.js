let loggedInUser = null;
let currentStory = null;
let currentChapterIndex = 0;

const stories = [
    { title: "Thiên Quan Tứ Phúc", category: "Đam mỹ", chapters: ["Chương 1: Mở đầu", "Chương 2: Gặp gỡ"] },
    { title: "Cô Vợ Tổng Tài", category: "Ngôn tình", chapters: ["Chương 1: Bắt đầu", "Chương 2: Tiến triển"] },
    { title: "Tình Yêu Hai Nữ", category: "Bách hợp", chapters: ["Chương 1: Trái tim rung động", "Chương 2: Nụ hôn đầu"] }
];

function handleLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username && password) {
        loggedInUser = username;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("home-section").style.display = "block";
        loadStories();
    } else {
        alert("Vui lòng nhập tài khoản và mật khẩu!");
    }
}

function loadStories() {
    let storiesList = document.getElementById("stories-list");
    storiesList.innerHTML = "";
    stories.forEach((story, index) => {
        let storyCard = document.createElement("div");
        storyCard.className = "story-card";
        storyCard.innerText = story.title;
        storyCard.onclick = () => openStory(index);
        storiesList.appendChild(storyCard);
    });
}

function filterStories(category) {
    let storiesList = document.getElementById("stories-list");
    storiesList.innerHTML = "";
    stories.filter(story => story.category === category).forEach((story, index) => {
        let storyCard = document.createElement("div");
        storyCard.className = "story-card";
        storyCard.innerText = story.title;
        storyCard.onclick = () => openStory(index);
        storiesList.appendChild(storyCard);
    });
}

function openStory(index) {
    currentStory = stories[index];
    currentChapterIndex = 0;
    document.getElementById("home-section").style.display = "none";
    document.getElementById("reader-section").style.display = "block";
    document.getElementById("story-title").innerText = currentStory.title;
    loadChapter();
}

function loadChapter() {
    if (currentStory) {
        document.getElementById("chapter-title").innerText = currentStory.chapters[currentChapterIndex];
        document.getElementById("chapter-content").innerText = `Nội dung của ${currentStory.chapters[currentChapterIndex]}`;
        let select = document.getElementById("chapter-select");
        select.innerHTML = "";
        currentStory.chapters.forEach((chapter, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.innerText = chapter;
            select.appendChild(option);
        });
        select.value = currentChapterIndex;
    }
}

function nextChapter() {
    if (currentChapterIndex < currentStory.chapters.length - 1) {
        currentChapterIndex++;
        loadChapter();
    }
}

function prevChapter() {
    if (currentChapterIndex > 0) {
        currentChapterIndex--;
        loadChapter();
    }
}

function selectChapter(index) {
    currentChapterIndex = parseInt(index);
    loadChapter();
}

function backToHome() {
    document.getElementById("reader-section").style.display = "none";
    document.getElementById("home-section").style.display = "block";
}
