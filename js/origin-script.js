// 出身地ページ専用JavaScript

// 出身地ページ専用ロード画面クラス
class OriginLoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressFill = document.getElementById('progressFill');
        this.progressPercentage = document.getElementById('progressPercentage');
        this.statusLine = document.getElementById('statusLine');
        this.currentProgress = 0;
        this.loadingMessages = [
            '地理情報システム 初期化中...',
            '位置情報 取得中...',
            '文化分析 システム 起動中...',
            '環境影響 データ 解析中...',
            '記憶アーカイブ アクセス中...',
            'ギャラリー モジュール 準備中...',
            '出身地データベース 準備完了'
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
        }, 220);
    }

    complete() {
        this.loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // ローディング画面を初期化
    const loader = new OriginLoadingScreen();
    loader.start();
    
    // ページの初期化
    initializeOriginPage();
});

function initializeOriginPage() {
    animateStatusBars();
    addPanelHoverEffects();
    simulateGeolocationScan();
    initializeLocationAnalysis();
    addMemoryAnimations();
    setupConnectionAnalysis();
    startRealTimeUpdates();
    enhanceAccessibility();
    initializeGalleryNavigation();
    addGalleryAnimations();
    initializeTouchSupport();
}

// ステータスバーのアニメーション
function animateStatusBars() {
    const statBars = document.querySelectorAll('.stat-fill');
    const connectionBars = document.querySelectorAll('.connection-fill');
    
    statBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width') || '0%';
            bar.style.width = width;
        }, index * 200);
    });
    
    connectionBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width') || '0%';
            bar.style.width = width;
        }, (statBars.length + index) * 200);
    });
}

// パネルのホバーエフェクト
function addPanelHoverEffects() {
    const panels = document.querySelectorAll('.geo-panel, .culture-panel, .environment-analysis, .memory-archive, .current-location');
    
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 40px rgba(120, 119, 198, 0.2)';
        });
        
        panel.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });
}

// 地理的位置スキャンのシミュレーション
function simulateGeolocationScan() {
    const scanStatus = document.querySelector('.scan-status');
    const scanMessages = [
        'GPS座標を取得中...',
        '地理データを解析中...',
        '気候情報を統合中...',
        '地理的スキャン完了',
        'データベース同期完了'
    ];
    
    let messageIndex = 0;
    
    const updateScanStatus = () => {
        if (scanStatus && messageIndex < scanMessages.length) {
            scanStatus.querySelector('span').textContent = scanMessages[messageIndex];
            messageIndex++;
            
            if (messageIndex < scanMessages.length) {
                setTimeout(updateScanStatus, 1500);
            }
        }
    };
    
    setTimeout(updateScanStatus, 1000);
}

// 位置分析の初期化
function initializeLocationAnalysis() {
    const analysisStatus = document.querySelector('.analysis-status');
    const analysisMessages = [
        '文化データを収集中...',
        '歴史的背景を分析中...',
        '環境要因を評価中...',
        '文化分析完了',
        'アーカイブ更新完了'
    ];
    
    let messageIndex = 0;
    
    const updateAnalysisStatus = () => {
        if (analysisStatus && messageIndex < analysisMessages.length) {
            analysisStatus.querySelector('span').textContent = analysisMessages[messageIndex];
            messageIndex++;
            
            if (messageIndex < analysisMessages.length) {
                setTimeout(updateAnalysisStatus, 2000);
            }
        }
    };
    
    setTimeout(updateAnalysisStatus, 3000);
}

// メモリーアイテムのアニメーション
function addMemoryAnimations() {
    const memoryItems = document.querySelectorAll('.memory-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    memoryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// 接続分析のセットアップ
function setupConnectionAnalysis() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            showLocationDetails(this);
        });
    });
}

function showLocationDetails(card) {
    const cardType = card.classList.contains('origin') ? 'origin' : 'current';
    const details = getLocationDetails(cardType);
    
    // モーダル風の詳細表示
    const modal = createLocationModal(details);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

function getLocationDetails(type) {
    const details = {
        origin: {
            title: '出身地詳細データ',
            timezone: 'JST (UTC+9)',
            population: '約1,400万人（首都圏）',
            characteristics: [
                '四季の変化が明確',
                '豊富な文化的多様性',
                '高度な都市インフラ',
                '伝統と現代の融合'
            ]
        },
        current: {
            title: '現在位置詳細データ',
            timezone: 'JST (UTC+9)',
            connection: '出身地との同期率: 98.7%',
            characteristics: [
                'リアルタイム環境監視',
                'アクティブな文化的参加',
                '継続的な学習環境',
                '安定した生活基盤'
            ]
        }
    };
    
    return details[type];
}

function createLocationModal(details) {
    const modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: rgba(20, 20, 20, 0.95);
        border: 2px solid rgba(120, 119, 198, 0.5);
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        backdrop-filter: blur(15px);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="color: #7877c6; font-family: 'Orbitron', monospace; margin: 0;">${details.title}</h3>
            <button class="close-modal" style="background: none; border: none; color: #7877c6; font-size: 1.5rem; cursor: pointer;">×</button>
        </div>
        <div style="color: #e8e8e8; line-height: 1.6;">
            <p><strong>タイムゾーン:</strong> ${details.timezone}</p>
            ${details.population ? `<p><strong>人口:</strong> ${details.population}</p>` : ''}
            ${details.connection ? `<p><strong>接続状況:</strong> ${details.connection}</p>` : ''}
            <h4 style="color: #7877c6; font-family: 'Orbitron', monospace;">特徴:</h4>
            <ul>
                ${details.characteristics.map(char => `<li>${char}</li>`).join('')}
            </ul>
        </div>
    `;
    
    modal.appendChild(modalContent);
    
    // モーダルを閉じる機能
    const closeBtn = modalContent.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
    
    return modal;
}

function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// リアルタイム更新
function startRealTimeUpdates() {
    updateSystemTime();
    updateScanProgress();
    
    // 1秒ごとに時刻を更新
    setInterval(updateSystemTime, 1000);
    
    // 5秒ごとにスキャン進捗を更新
    setInterval(updateScanProgress, 5000);
}

function updateSystemTime() {
    const timeElements = document.querySelectorAll('.system-time');
    const now = new Date();
    const timeString = now.toLocaleTimeString('ja-JP', { 
        hour12: false,
        timeZone: 'Asia/Tokyo'
    });
    
    timeElements.forEach(element => {
        if (element) {
            element.textContent = `JST ${timeString}`;
        }
    });
}

function updateScanProgress() {
    const scanDots = document.querySelectorAll('.scan-dot, .status-indicator, .gps-signal');
    
    scanDots.forEach(dot => {
        // ランダムにパルスアニメーションの速度を変更
        const duration = 1 + Math.random() * 2; // 1-3秒の範囲
        dot.style.animationDuration = `${duration}s`;
    });
}

// エラーハンドリング
window.addEventListener('error', function(event) {
    console.error('Origin page error:', event.error);
});

// パフォーマンス監視
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Origin page loaded in ${loadTime.toFixed(2)}ms`);
    
    // ページロード完了を示すイベント
    document.body.classList.add('page-loaded');
});

// ギャラリーナビゲーション機能
function initializeGalleryNavigation() {
    const previewBtn = document.getElementById('previewBtn');
    const accessGalleryBtn = document.getElementById('accessGalleryBtn');
    const previewItems = document.querySelectorAll('.preview-item');
    
    // プレビューボタンの機能
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            showGalleryPreview();
        });
    }
    
    // ギャラリーアクセスボタンのアニメーション
    if (accessGalleryBtn) {
        accessGalleryBtn.addEventListener('click', function(e) {
            // 既にボタンにhrefが設定されているため追加ナビゲーションは不要
            showLoadingAnimation(this);
        });
    }
    
    // プレビューアイテムのインタラクション
    previewItems.forEach((item) => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px)';
                }, 200);
            }, 100);
        });
        
        // ホバーエフェクトの強化
        item.addEventListener('mouseenter', function() {
            const placeholder = this.querySelector('.preview-placeholder');
            if (placeholder) {
                placeholder.style.boxShadow = '0 0 25px rgba(120, 119, 198, 0.4)';
                placeholder.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const placeholder = this.querySelector('.preview-placeholder');
            if (placeholder) {
                placeholder.style.boxShadow = '';
                placeholder.style.transform = 'scale(1)';
            }
        });
    });
}

// ギャラリープレビュー表示
function showGalleryPreview() {
    const previewItems = document.querySelectorAll('.preview-item');
    
    previewItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'previewPulse 0.6s ease-out';
            
            // アニメーション終了後にリセット
            setTimeout(() => {
                item.style.animation = '';
            }, 600);
        }, index * 150);
    });
    
    // プレビューメッセージを表示
    showTemporaryMessage('プレビューデータを読み込み中...', 2000);
}

// ローディングアニメーション表示
function showLoadingAnimation(button) {
    const loadingIndicator = button.querySelector('.btn-loading-indicator');
    const btnText = button.querySelector('.btn-text');
    
    if (loadingIndicator && btnText) {
        loadingIndicator.style.opacity = '1';
        btnText.textContent = 'アクセス中...';
        button.style.pointerEvents = 'none';
        
        // ボタンの色を変更
        button.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
    }
}

// 一時的なメッセージ表示
function showTemporaryMessage(message, duration = 3000) {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.temp-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 新しいメッセージを作成
    const messageElement = document.createElement('div');
    messageElement.className = 'temp-message';
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(120, 119, 198, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-family: 'Orbitron', monospace;
        font-size: 0.9rem;
        z-index: 1000;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 25px rgba(120, 119, 198, 0.3);
        animation: slideInFade 0.5s ease-out;
    `;
    
    document.body.appendChild(messageElement);
    
    // 指定時間後に削除
    setTimeout(() => {
        messageElement.style.animation = 'slideOutFade 0.5s ease-in forwards';
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, duration);
}

// CSS アニメーションを動的に追加
function addGalleryAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes previewPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideInFade {
            0% { 
                opacity: 0; 
                transform: translateX(100px); 
            }
            100% { 
                opacity: 1; 
                transform: translateX(0); 
            }
        }
        
        @keyframes slideOutFade {
            0% { 
                opacity: 1; 
                transform: translateX(0); 
            }
            100% { 
                opacity: 0; 
                transform: translateX(100px); 
            }
        }
    `;
    document.head.appendChild(style);
}
