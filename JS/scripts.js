// JavaScript code
let videosInitialized = false;

function initializeVideos() {
    const videos = document.querySelectorAll('.video');
    videos.forEach(video => {
        video.play().catch(error => {
            console.error('Error playing video:', error);
        });
    });
    videosInitialized = true;
}

function showVideo(videoId) {
    if (!videosInitialized) {
        initializeVideos();
    }

    const videos = document.querySelectorAll('.video');
    videos.forEach(video => {
        if (video.id === videoId) {
            video.style.display = 'block';
            video.muted = false;
        } else {
            video.style.display = 'none';
            video.muted = true;
        }
    });
}

function sendDanmu(danmuText) {
    console.log('Attempting to send danmu:', danmuText);

    if (!danmuText || danmuText.trim() === '') {
        console.warn('Attempted to send empty danmu');
        showFeedback('请输入弹幕内容！', 'warning');
        return;
    }

    const danmuContainer = document.getElementById('danmu');
    if (!danmuContainer) {
        console.error('Danmu container not found');
        showFeedback('发送失败，请刷新页面重试。', 'error');
        return;
    }

    const danmuElement = document.createElement('div');
    danmuElement.className = 'danmu-message';
    danmuElement.textContent = danmuText;
    danmuContainer.appendChild(danmuElement);

    console.log('Danmu element created and inserted');

    setTimeout(() => {
        danmuElement.style.transform = 'translateY(0)';
        danmuElement.style.opacity = '1';
        console.log('Danmu animation applied');
    }, 10);

    while (danmuContainer.children.length > 50) {
        danmuContainer.removeChild(danmuContainer.firstChild);
    }

    showFeedback('弹幕发送成功！', 'success');
}

function generateRandomDanmu() {
    const randomComments = [
        '这真是太棒了！',
        '我喜欢这个视频！',
        '哈哈哈，笑死我了！',
        '这是什么鬼？',
        '太有趣了！',
        '我也想试试！'
    ];
    const randomIndex = Math.floor(Math.random() * randomComments.length);
    sendDanmu(randomComments[randomIndex]);
}

function showFeedback(message, type) {
    const feedbackElement = document.getElementById('feedback');
    if (!feedbackElement) {
        console.error('Feedback element not found');
        return;
    }

    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${type}`;
    feedbackElement.style.display = 'block';

    setTimeout(() => {
        feedbackElement.style.display = 'none';
    }, 3000);
}

function initializeDanmuInput() {
    console.log('Initializing danmu input');

    const danmuInput = document.getElementById('danmuInput');
    const sendButton = document.getElementById('sendDanmu');

    if (!danmuInput || !sendButton) {
        console.error('Danmu input elements not found');
        return;
    }

    console.log('Danmu input elements found');

    function sendDanmuFromInput() {
        console.log('sendDanmuFromInput called');
        const danmuText = danmuInput.value.trim();
        if (danmuText) {
            sendDanmu(danmuText);
            danmuInput.value = '';
        } else {
            showFeedback('请输入弹幕内容！', 'warning');
        }
    }

    sendButton.addEventListener('click', (event) => {
        console.log('Send button clicked');
        event.preventDefault();
        sendDanmuFromInput();
    });

    danmuInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            event.preventDefault();
            sendDanmuFromInput();
        }
    });

    console.log('Event listeners added');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    initializeDanmuInput();
    setInterval(generateRandomDanmu, 5000);
});

generateRandomDanmu();