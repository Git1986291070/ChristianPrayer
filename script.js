// 图片加载优化方案
const UNSPLASH_ACCESS_KEY = 'r6T869agDialqiZyfj0S9g6FjdaW2bYVtMWgiKdEMu0'; // 你的API密钥

// 使用正式API端点获取图片
async function getChristianImage(query) {
    try {
        const apiUrl = `https://api.unsplash.com/photos/random?query=${query}+christian&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.urls.regular;
    } catch (error) {
        console.error('图片加载失败:', error);
        return 'fallback-image.jpg'; // 备用图片路径
    }
}

// 优化后的内容加载
async function loadContent() {
    try {
        const [image1, image2] = await Promise.all([
            getChristianImage('prayer'),
            getChristianImage('bible')
        ]);

        // 设置图片源并移除加载状态
        document.getElementById('image1').src = image1;
        document.getElementById('image2').src = image2;

        // 移除加载提示
        document.querySelectorAll('.prayer-image').forEach(img => {
            img.style.background = 'none';
            img.style.position = 'static';
        });

        const bibleResponse = await fetch('https://bible-api.com/?random=verse');
        const bibleData = await bibleResponse.json();
        document.getElementById('verse-text').textContent = bibleData.text;
        document.getElementById('verse-reference').textContent = 
            `${bibleData.reference} (${bibleData.translation_name})`;
    } catch (error) {
        console.error('Load Fail:', error);
        document.getElementById('verse-text').textContent = "Daily scripture: Rest and know that I am God! (Psalm 46:10)";
    }
}

// 优化按钮生成
const moods = ['Peace', 'Joy', 'Hope', 'Strength', 'Faith', 'Love', 'Patience', 'Gratitude'];
document.getElementById('buttons').innerHTML = moods.map((mood, index) => `
    <button class="mood-btn ${mood.toLowerCase()}" onclick="loadMoodContent('${mood}')">
        ${mood}
    </button>
`).join('');

// 新增跳转函数
function loadMoodContent(mood) {
    if (mood === 'Peace') {
        window.location.href = 'peace.html';
    }
 if (mood === 'Faith') {
        window.location.href = 'faith.html';
    }
if (mood === 'Hope') {
        window.location.href = 'hope.html';
    }
if (mood === 'Joy') {
        window.location.href = 'joy.html';
    }
if (mood === 'Love') {
        window.location.href = 'love.html';
    }
if (mood === 'Patience') {
        window.location.href = 'patience.html';
    }
if (mood === 'Peace') {
        window.location.href = 'peace.html';
    }
if (mood === 'Strength') {
        window.location.href = 'strength.html';
    }
if (mood === 'Gratitude') {
        window.location.href = 'gratitude.html';
    }
    // 这里可以添加其他心情的跳转逻辑
}

// 优化聊天功能
function addMessage(role, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value;
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        // 这里可以添加发送消息到服务器等逻辑
        // 示例：发送一个简单的回复
        setTimeout(() => {
            addMessage('bot', 'This is a sample response.');
        }, 500);
    }
}

// 替换为colseAI API配置
const OPENAI_API_KEY = 'sk-IUYPsehop8h6LrToXU76ymyCpvJ55SUp4RjJ4AqTBYFu9A5V';
const OPENAI_API_URL = 'https://api.openai-proxy.org/v1/chat/completions';

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    addMessage('user', userInput);
    document.getElementById('user-input').value = '';

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "You are a Christian prayer assistant, answer questions in English with Bible verses"
                }, {
                    role: "user",
                    content: userInput
                }]
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        addMessage('bot', botMessage);
    } catch (error) {
        console.error('Error:', error);
        addMessage('bot', 'The service is temporarily unavailable, please try again later');
    }
}

// 初始化加载
loadContent();