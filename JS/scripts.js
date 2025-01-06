document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const navBtns = document.querySelectorAll('.nav-btn');
    const infoBtns = document.querySelectorAll('.info-btn');
    const infoContents = document.querySelectorAll('.info-content');
    const commentInput = document.getElementById('commentInput');
    const sendComment = document.getElementById('sendComment');
    const commentList = document.getElementById('commentList');

    // 预加载所有视频
    const videoUrls = Array.from(navBtns).map(btn => btn.dataset.url);
    let currentVideoIndex = 0;

    function loadNextVideo() {
        if (currentVideoIndex < videoUrls.length) {
            const iframe = document.createElement('iframe');
            iframe.src = videoUrls[currentVideoIndex];
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            currentVideoIndex++;
            setTimeout(loadNextVideo, 100); // 每100毫秒加载一个视频
        }
    }

    loadNextVideo();

    // 初始化视频播放器
    function initializePlayer(url) {
        videoPlayer.src = url;
    }

    // 切换视频
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            initializePlayer(this.dataset.url);
        });
    });

    // 切换信息区域
    infoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            infoBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            infoContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === this.dataset.target) {
                    content.classList.add('active');
                }
            });
        });
    });

    // 发送评论
    sendComment.addEventListener('click', function() {
        const comment = commentInput.value.trim();
        if (comment) {
            addComment(comment);
            commentInput.value = '';
        }
    });

    // 添加评论
    function addComment(text) {
        const commentElement = document.createElement('p');
        commentElement.textContent = text;
        commentList.insertBefore(commentElement, commentList.firstChild);
    }

    // 随机生成评论
    const randomComments = [
        "这期节目太棒了！",
        "主持人说得真好，很有共鸣。",
        "终于明白为什么会有代沟了。",
        "希望能多做一些类似的节目。",
        "这个观点我完全同意！",
        "感谢节目组的用心制作。",
        "学到了很多，谢谢分享！",
        "这个话题真的很有意义。",
        "期待下一期的内容。",
        "每次听都有新的收获。"
    ];

    function generateRandomComment() {
        const randomIndex = Math.floor(Math.random() * randomComments.length);
        addComment(randomComments[randomIndex]);
    }

    // 每3秒生成一条随机评论
    setInterval(generateRandomComment, 3000);

    // 初始化第一个视频
    initializePlayer(navBtns[0].dataset.url);

    // 调整视频容器大小
    function resizeVideoContainer() {
        const videoContainer = document.querySelector('.video-container');
        const aspectRatio = 16 / 9;
        const containerWidth = videoContainer.offsetWidth;
        const containerHeight = containerWidth / aspectRatio;
        videoContainer.style.paddingTop = `${containerHeight}px`;
    }

    // 页面加载和调整大小时调整视频容器
    window.addEventListener('load', resizeVideoContainer);
    window.addEventListener('resize', resizeVideoContainer);

    // 优化移动端布局
    function optimizeMobileLayout() {
        const isMobile = window.innerWidth <= 768;
        const navbar = document.querySelector('.navbar');
        const infoNav = document.querySelector('.info-nav');

        if (isMobile) {
            navbar.classList.add('mobile');
            infoNav.classList.add('mobile');
        } else {
            navbar.classList.remove('mobile');
            infoNav.classList.remove('mobile');
        }
    }

    // 页面加载和调整大小时优化移动端布局
    window.addEventListener('load', optimizeMobileLayout);
    window.addEventListener('resize', optimizeMobileLayout);
});

