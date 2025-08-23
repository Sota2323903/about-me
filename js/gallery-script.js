// ギャラリーページ専用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 既存の初期化関数
    initializeGallery();
});

function initializeGallery() {
    setupTabSwitching();
    setupPhotoFilters();
    initializeMusicPlayer();
    animateProgressBars();
    setupPhotoInteractions();
    startGalleryAnimations();
    enhanceAccessibility();
}

// タブ切り替え機能
function setupTabSwitching() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const sections = document.querySelectorAll('.gallery-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // タブの状態更新
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // セクションの表示切り替え
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTab + '-section') {
                    section.classList.add('active');
                    
                    // セクション切り替え時のアニメーション
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 50);
                }
            });
            
            // アクティブセクションに応じた初期化
            if (targetTab === 'music') {
                initializeMusicPlayer();
                animateProgressBars();
            } else if (targetTab === 'photos') {
                setupPhotoFilters();
                animatePhotoGallery();
            }
        });
    });
}

// 写真フィルター機能
function setupPhotoFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // フィルターボタンの状態更新
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 写真アイテムのフィルタリング
            photoItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || category === filterValue;
                
                if (shouldShow) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // フィルター適用の視覚的フィードバック
            showFilterFeedback(filterValue);
        });
    });
}

function showFilterFeedback(filterValue) {
    const photoGallery = document.querySelector('.photo-gallery');
    const feedback = document.createElement('div');
    feedback.className = 'filter-feedback';
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(120, 119, 198, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const filterNames = {
        'all': 'すべての写真',
        'nature': '自然写真',
        'architecture': '建築写真',
        'abstract': '抽象写真',
        'memories': '思い出の写真'
    };
    
    feedback.textContent = `フィルター: ${filterNames[filterValue]}`;
    document.body.appendChild(feedback);
    
    setTimeout(() => feedback.style.opacity = '1', 10);
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => document.body.removeChild(feedback), 300);
    }, 1500);
}

// 音楽プレイヤー機能
function initializeMusicPlayer() {
    const playButtons = document.querySelectorAll('.play-btn');
    const progressBar = document.querySelector('.progress-fill');
    const trackTime = document.querySelector('.track-time');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const trackItem = this.closest('.track-item');
            playTrack(trackItem, this);
        });
    });
    
    // プログレスバーのクリック機能
    const progressContainer = document.querySelector('.progress-bar');
    if (progressContainer) {
        progressContainer.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = (clickX / rect.width) * 100;
            updateProgress(percentage);
        });
    }
}

function playTrack(trackItem, button) {
    // 他のプレイボタンをリセット
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.textContent = '▶️';
        btn.closest('.track-item').classList.remove('playing');
    });
    
    // 現在の楽曲を再生状態に
    button.textContent = '⏸️';
    trackItem.classList.add('playing');
    
    // 現在再生中セクションを更新
    updateNowPlaying(trackItem);
    
    // プログレスバーのアニメーション開始
    startProgressAnimation();
    
    // 視覚的フィードバック
    showPlayingFeedback(trackItem);
}

function updateNowPlaying(trackItem) {
    const trackName = trackItem.querySelector('.track-name').textContent;
    const trackMeta = trackItem.querySelector('.track-meta').textContent;
    
    const currentTrack = document.querySelector('.current-track');
    if (currentTrack) {
        const titleElement = currentTrack.querySelector('.track-title');
        const artistElement = currentTrack.querySelector('.track-artist');
        
        if (titleElement) titleElement.textContent = trackName;
        if (artistElement) artistElement.textContent = trackMeta.split(' - ')[1] || trackMeta;
    }
}

function startProgressAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
        
        // 5分28秒 = 328秒のアニメーション
        const duration = 328000; // ミリ秒
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            
            progressFill.style.width = progress + '%';
            updateTimeDisplay(elapsed, duration);
            
            if (progress < 100) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}

function updateTimeDisplay(elapsed, total) {
    const trackTimeElement = document.querySelector('.track-time');
    if (trackTimeElement) {
        const currentMinutes = Math.floor(elapsed / 60000);
        const currentSeconds = Math.floor((elapsed % 60000) / 1000);
        const totalMinutes = Math.floor(total / 60000);
        const totalSeconds = Math.floor((total % 60000) / 1000);
        
        const currentTime = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        const totalTime = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
        
        trackTimeElement.innerHTML = `<span>${currentTime}</span> / <span>${totalTime}</span>`;
    }
}

function showPlayingFeedback(trackItem) {
    const trackName = trackItem.querySelector('.track-name').textContent;
    const feedback = document.createElement('div');
    feedback.className = 'playing-feedback';
    feedback.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: rgba(76, 175, 80, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-family: 'Orbitron', monospace;
        font-size: 0.9rem;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    feedback.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span>🎵</span>
            <div>
                <div style="font-weight: 600;">再生中</div>
                <div style="font-size: 0.8rem; opacity: 0.9;">${trackName}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateX(100px)';
        setTimeout(() => document.body.removeChild(feedback), 300);
    }, 3000);
}

// プログレスバーのアニメーション
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width') || '0%';
            bar.style.width = width;
        }, index * 100);
    });
}

// 写真のインタラクション
function setupPhotoInteractions() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            showPhotoModal(this);
        });
        
        // ホバーエフェクト
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function showPhotoModal(photoItem) {
    const title = photoItem.querySelector('.photo-title').textContent;
    const description = photoItem.querySelector('.photo-description').textContent;
    const date = photoItem.querySelector('.photo-date').textContent;
    const location = photoItem.querySelector('.photo-location').textContent;
    const tags = Array.from(photoItem.querySelectorAll('.tag')).map(tag => tag.textContent);
    
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(20, 20, 20, 0.95);
        border: 2px solid rgba(120, 119, 198, 0.5);
        border-radius: 15px;
        padding: 30px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        backdrop-filter: blur(15px);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="color: #7877c6; font-family: 'Orbitron', monospace; margin: 0; font-size: 1.3rem;">${title}</h3>
            <button class="close-modal" style="background: none; border: none; color: #7877c6; font-size: 1.5rem; cursor: pointer;">×</button>
        </div>
        
        <div style="height: 200px; background: linear-gradient(135deg, rgba(120, 119, 198, 0.1), rgba(120, 119, 198, 0.05)); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid rgba(120, 119, 198, 0.2);">
            <span style="font-size: 4rem; opacity: 0.5;">${photoItem.querySelector('.placeholder-icon').textContent}</span>
        </div>
        
        <div style="color: #e8e8e8; line-height: 1.6; margin-bottom: 20px;">
            <p>${description}</p>
        </div>
        
        <div style="display: grid; gap: 10px; margin-bottom: 20px;">
            <div style="color: #b8b8b8; font-family: 'Orbitron', monospace; font-size: 0.9rem;">
                📅 ${date}
            </div>
            <div style="color: #b8b8b8; font-family: 'Orbitron', monospace; font-size: 0.9rem;">
                ${location}
            </div>
        </div>
        
        <div>
            <div style="color: #7877c6; font-family: 'Orbitron', monospace; font-size: 0.9rem; margin-bottom: 10px;">タグ:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${tags.map(tag => `<span style="padding: 4px 12px; background: rgba(120, 119, 198, 0.2); color: #7877c6; border-radius: 12px; font-size: 0.8rem; border: 1px solid rgba(120, 119, 198, 0.3);">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // モーダルを閉じる機能
    const closeBtn = modalContent.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => closePhotoModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePhotoModal(modal);
    });
}

function closePhotoModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('div').style.transform = 'scale(0.8)';
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// ギャラリーアニメーション
function startGalleryAnimations() {
    // スキャンドットのアニメーション
    const scanDots = document.querySelectorAll('.scan-dot');
    scanDots.forEach(dot => {
        setInterval(() => {
            const duration = 1 + Math.random() * 2;
            dot.style.animationDuration = `${duration}s`;
        }, 3000);
    });
    
    // ページロード時のアニメーション
    const animateElements = document.querySelectorAll('.music-category, .photo-item, .stats-grid');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

function animatePhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 100);
    });
}

// アクセシビリティ強化
function enhanceAccessibility() {
    // キーボードナビゲーション
    const interactiveElements = document.querySelectorAll('.gallery-tab, .filter-btn, .play-btn, .photo-item');
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
    
    // ARIAラベルの設定
    const tabs = document.querySelectorAll('.gallery-tab');
    tabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-label', `ギャラリータブ ${index + 1}`);
    });
    
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `写真 ${index + 1}: ${item.querySelector('.photo-title').textContent}`);
    });
}

// キーボードショートカット
document.addEventListener('keydown', function(event) {
    // Escキーでモーダルを閉じる
    if (event.key === 'Escape') {
        const modal = document.querySelector('.photo-modal');
        if (modal) {
            closePhotoModal(modal);
        }
    }
    
    // 数字キーでタブ切り替え
    if (event.key === '1') {
        document.querySelector('[data-tab="music"]').click();
    } else if (event.key === '2') {
        document.querySelector('[data-tab="photos"]').click();
    }
    
    // スペースキーで音楽の再生/停止
    if (event.key === ' ' && event.target.tagName !== 'BUTTON') {
        event.preventDefault();
        const activePlayBtn = document.querySelector('.play-btn');
        if (activePlayBtn) {
            activePlayBtn.click();
        }
    }
});

// エラーハンドリング
window.addEventListener('error', function(event) {
    console.error('Gallery page error:', event.error);
});

// パフォーマンス監視
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Gallery page loaded in ${loadTime.toFixed(2)}ms`);
});
