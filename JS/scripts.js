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
    if (!danmuText || danmuText.trim() === '') {
        showFeedback('请输入弹幕内容！', 'warning');
        return;
    }

    const danmuContainer = document.getElementById('danmu');
    if (!danmuContainer) {
        showFeedback('发送失败，请刷新页面重试。', 'error');
        return;
    }

    const danmuElement = document.createElement('div');
    danmuElement.className = 'danmu-message fade-in';
    danmuElement.textContent = danmuText;

    // 将新弹幕添加到容器顶部
    danmuContainer.insertBefore(danmuElement, danmuContainer.firstChild);

    // 如果弹幕数量超过限制，删除最早的弹幕
    const maxDanmu = 50;
    while (danmuContainer.children.length > maxDanmu) {
        danmuContainer.removeChild(danmuContainer.lastChild);
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
    const danmuInput = document.getElementById('danmuInput');
    const sendButton = document.getElementById('sendDanmu');

    if (!danmuInput || !sendButton) {
        console.error('Danmu input elements not found');
        return;
    }

    function sendDanmuFromInput() {
        const danmuText = danmuInput.value.trim();
        if (danmuText) {
            sendDanmu(danmuText);
            danmuInput.value = '';
        } else {
            showFeedback('请输入弹幕内容！', 'warning');
        }
    }

    sendButton.addEventListener('click', (event) => {
        event.preventDefault();
        sendDanmuFromInput();
    });

    danmuInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendDanmuFromInput();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDanmuInput();
    setInterval(generateRandomDanmu, 5000);
});

// 初始生成一条随机弹幕
generateRandomDanmu();