// ギャラリーページ専用ロード画面
class GalleryLoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressFill = document.getElementById('progressFill');
        this.progressPercentage = document.getElementById('progressPercentage');
        this.statusLine = document.getElementById('statusLine');
        this.currentProgress = 0;
        this.loadingMessages = [
            '音楽ライブラリ 初期化中...',
            '写真アーカイブ 読み込み中...',
            'メディア データ 解析中...',
            'アートワーク 処理中...',
            'ギャラリー インデックス 構築中...',
            'プレビュー システム 準備中...',
            'ギャラリー アーカイブ 準備完了'
        ];
        this.currentMessageIndex = 0;
    }

    start() {
        this.loadingScreen.style.display = 'flex';
        this.simulateLoading();
    }

    simulateLoading() {
        const loadingInterval = setInterval(() => {
            if (this.currentProgress < 100) {
                const increment = Math.random() * 12 + 8;
                this.currentProgress = Math.min(this.currentProgress + increment, 100);
                
                this.progressFill.style.width = `${this.currentProgress}%`;
                this.progressPercentage.textContent = `${Math.floor(this.currentProgress)}%`;
                
                if (this.currentProgress > (this.currentMessageIndex + 1) * (100 / this.loadingMessages.length)) {
                    this.currentMessageIndex = Math.min(this.currentMessageIndex + 1, this.loadingMessages.length - 1);
                    this.statusLine.textContent = this.loadingMessages[this.currentMessageIndex];
                }
            } else {
                clearInterval(loadingInterval);
                setTimeout(() => this.complete(), 500);
            }
        }, 250);
    }

    complete() {
        this.loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loader = new GalleryLoadingScreen();
    loader.start();
});
