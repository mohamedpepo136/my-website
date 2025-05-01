// إخفاء جميع وصف الألعاب عند البداية
document.addEventListener("DOMContentLoaded", () => {
    const descriptions = document.querySelectorAll(".game-description");
    descriptions.forEach(desc => desc.style.display = "none");
});

// عرض اللعبة المختارة فقط
function showGame(id) {
    const descriptions = document.querySelectorAll(".game-description");
    descriptions.forEach(desc => desc.style.display = "none");

    const selected = document.getElementById(id);
    if (selected) {
        selected.style.display = "block";
        window.scrollTo({ top: selected.offsetTop - 50, behavior: "smooth" });
    }
}

// 🧠 الجوال على الرأس
let words = ["قطة", "كرة", "شجرة", "هاتف", "كتاب"];
let currentWordIndex = 0;
let score = 0;

function startGame() {
    currentWordIndex = 0;
    score = 0;
    document.getElementById("score").innerText = `النقاط: ${score}`;
    document.getElementById("word-display").innerText = words[currentWordIndex];
}

function nextWord() {
    currentWordIndex++;
    if (currentWordIndex < words.length) {
        document.getElementById("word-display").innerText = words[currentWordIndex];
        score++;
        document.getElementById("score").innerText = `النقاط: ${score}`;
    } else {
        document.getElementById("word-display").innerText = "انتهت الكلمات!";
    }
}

function skipWord() {
    currentWordIndex++;
    if (currentWordIndex < words.length) {
        document.getElementById("word-display").innerText = words[currentWordIndex];
    } else {
        document.getElementById("word-display").innerText = "انتهت الكلمات!";
    }
}

// 🕵️‍♂️ المافيا
function assignRoles() {
    const count = parseInt(document.getElementById("mafia-players-count").value);
    if (isNaN(count) || count < 5 || count > 12) return alert("أدخل عددًا صحيحًا بين 5 و12");

    const roles = ["مافيا", "شرطي", "طبيب", "مواطن"];
    let assigned = [];
    for (let i = 0; i < count; i++) {
        const role = roles[Math.floor(Math.random() * roles.length)];
        assigned.push(`اللاعب ${i + 1}: ${role}`);
    }

    document.getElementById("roles-output").innerText = assigned.join("\n");
}

// 🎭 خارج الموضوع
let outsidePlayers = [];
let currentOutsideIndex = 0;

function startOutsideTopic() {
    const count = parseInt(document.getElementById("outside-player-count").value);
    const secret = document.getElementById("secret-word").value.trim();
    if (isNaN(count) || count < 3 || !secret) return alert("أدخل البيانات بشكل صحيح.");

    outsidePlayers = Array(count).fill(secret);
    const outsiderIndex = Math.floor(Math.random() * count);
    outsidePlayers[outsiderIndex] = "أنت خارج الموضوع!";
    currentOutsideIndex = 0;

    document.getElementById("outside-output").innerText = `اللاعب ${currentOutsideIndex + 1}: ${outsidePlayers[currentOutsideIndex]}`;
}

function nextOutsidePlayer() {
    currentOutsideIndex++;
    if (currentOutsideIndex < outsidePlayers.length) {
        document.getElementById("outside-output").innerText = `اللاعب ${currentOutsideIndex + 1}: ${outsidePlayers[currentOutsideIndex]}`;
    } else {
        document.getElementById("outside-output").innerText = "تم توزيع الجميع.";
    }
}

// ❓ مين فينا؟
function submitWhoQuestion() {
    const question = document.getElementById("who-question").value;
    document.getElementById("who-question-display").innerText = question ? question : "يرجى إدخال سؤال.";
}

// 🧩 الصور المتشابهة – placeholder
function startMatchingGame() {
    document.getElementById("game-board").innerText = "تم بدء اللعبة! (تحتاج إلى برمجة بطاقات الصور)";
    document.getElementById("matching-score").innerText = "المحاولات: 0";
}

// 🔢 الصناديق
function startBoxesGame() {
    const board = document.getElementById("boxes-board");
    board.innerHTML = "";
    let numbers = Array.from({ length: 20 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

    numbers.forEach(num => {
        let btn = document.createElement("button");
        btn.innerText = num;
        btn.className = "game-btn";
        btn.onclick = () => {
            btn.disabled = true;
            btn.style.opacity = 0.5;
        };
        board.appendChild(btn);
    });

    document.getElementById("boxes-status").innerText = "ابدأ بالنقر على الأرقام بالترتيب!";
}

// ⚡ الأسرع
let startTime;

function startFastestGame() {
    document.getElementById("fastest-status").innerText = "استعد...";
    document.getElementById("fastest-btn").style.display = "none";
    setTimeout(() => {
        document.getElementById("fastest-status").innerText = "اضغط الآن!";
        document.getElementById("fastest-btn").style.display = "inline-block";
        startTime = Date.now();
    }, Math.random() * 2000 + 1000);
}

function finishFastestGame() {
    const endTime = Date.now();
    const reaction = ((endTime - startTime) / 1000).toFixed(2);
    document.getElementById("fastest-time").innerText = `الزمن: ${reaction} ثانية`;
}

// التوازن – placeholder
function startBalanceGame() {
    document.getElementById("balance-status").innerText = "حافظ على التوازن!";
    document.getElementById("balance-btn").style.display = "inline-block";
    document.getElementById("balance-instructions").innerText = "ارفع يدك اليمنى وقف على رجل واحدة 😄";
    startTime = Date.now();
}

function checkBalance() {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    document.getElementById("balance-time").innerText = `المدة: ${duration} ثانية`;
}

// الكنز – placeholder
function startTreasureGame() {
    document.getElementById("treasure-status").innerText = "يتم الآن إعداد لوحة البحث...";
    document.getElementById("treasure-board").innerText = "لوحة الكنز قيد التنفيذ.";
}

// بدون كلام
function startSilentGame() {
    document.getElementById("silent-status").innerText = "قم بالتمثيل الآن!";
    document.getElementById("silent-title").innerText = "عنوان تمثيلي عشوائي";
}

function checkSilentGuess() {
    const guess = document.getElementById("silent-guess").value.toLowerCase();
    if (guess === "عنوان") {
        document.getElementById("silent-result").innerText = "إجابة صحيحة!";
    }
}

// غمزة القاتل – placeholder
function startWinkMurderGame() {
    document.getElementById("wink-murder-status").innerText = "ابدأ اللعب: على القاتل أن يغمز للضحايا!";
    document.getElementById("wink-murder-players").innerText = "قائمة اللاعبين قيد التنفيذ...";
}

// الجاسوس – placeholder
function startSpyGame() {
    document.getElementById("spy-status").innerText = "يتم اختيار الجاسوس...";
    document.getElementById("spy-players").innerText = "المحتوى قيد التنفيذ...";
}


function savePlayerScore(name, score) {
    document.cookie = `player_${name}=${score}; path=/; max-age=86400`; // يبقى ليوم واحد
}

function getPlayerScore(name) {
    const match = document.cookie.match(new RegExp('(^| )player_' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function displaySavedScores() {
    const cookies = document.cookie.split("; ");
    let list = cookies.filter(c => c.startsWith("player_")).map(c => {
        const [key, value] = c.split("=");
        return `${key.replace("player_", "")}: ${value} نقطة`;
    });
    alert("الدرجات المحفوظة:\n" + list.join("\n"));
}
