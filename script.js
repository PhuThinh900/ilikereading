let stories = [];
let currentStory = null;
let currentChapterIndex = 0;
let currentChapters = [];

async function fetchStories() {
    try {
        const response = await fetch('https://api.example.com/free-stories');
        stories = await response.json();
        displayStories();
    } catch (error) {
        console.error("Lỗi tải danh sách truyện:", error);
    }
}

function displayStories() {
    const storyList = document.getElementById("story-list");
    storyList.innerHTML = "";
    stories.forEach((story, index) => {
        let li = document.createElement("li");
        li.textContent = story.title;
        li.onclick = () => selectStory(index);
        storyList.appendChild(li);
    });
}

function searchStories() {
    const query = document.getElementById("search-story").value.toLowerCase();
    const filteredStories = stories.filter(story => story.title.toLowerCase().includes(query));
    
    const storyList = document.getElementById("story-list");
    storyList.innerHTML = "";
    filteredStories.forEach((story, index) => {
        let li = document.createElement("li");
        li.textContent = story.title;
        li.onclick = () => selectStory(index);
        storyList.appendChild(li);
    });
}

async function selectStory(index) {
    currentStory = stories[index];
    document.getElementById("story-title").textContent = currentStory.title;
    document.getElementById("story-section").classList.add("hidden");
    document.getElementById("reader-section").classList.remove("hidden");

    try {
        const response = await fetch(`https://api.example.com/story/${currentStory.id}/chapters`);
        currentChapters = await response.json();
        loadChapter(0);
    } catch (error) {
        console.error("Lỗi tải chương truyện:", error);
    }
}

function loadChapter(index) {
    if (index < 0 || index >= currentChapters.length) return;

    currentChapterIndex = index;
    document.getElementById("chapter-title").textContent = currentChapters[index].title;
    document.getElementById("chapter-content").textContent = currentChapters[index].content;

    document.getElementById("prev-btn").disabled = index === 0;
    document.getElementById("next-btn").disabled = index === currentChapters.length - 1;

    const select = document.getElementById("chapter-select");
    select.innerHTML = "";
    currentChapters.forEach((chap, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = chap.title;
        select.appendChild(option);
    });
    select.value = index;
}

function prevChapter() {
    loadChapter(currentChapterIndex - 1);
}

function nextChapter() {
    loadChapter(currentChapterIndex + 1);
}

function selectChapter(index) {
    loadChapter(parseInt(index));
}

function readChapter() {
    let speech = new SpeechSynthesisUtterance();
    speech.text = document.getElementById("chapter-content").textContent;
    speech.lang = "vi-VN";
    window.speechSynthesis.speak(speech);
}

function handleLogin() {
    let username = document.getElementById("username").value;
    if (username.trim()) {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("story-section").classList.remove("hidden");
        fetchStories();
    }
}

function logout() {
    document.getElementById("reader-section").classList.add("hidden");
    document.getElementById("story-section").classList.remove("hidden");
}
