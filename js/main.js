// 背景画像のリスト
const backgroundImages = [
    'image/IMG_4918.jpeg',
    'image/IMG_4948.jpeg',
    'image/IMG_4980.jpeg',
    'image/IMG_5025.jpeg',
    'image/IMG_5026.jpeg',
    'image/IMG_5041.jpeg',
    'image/IMG_5103.jpeg'
];

// 現在の背景画像インデックス
let currentImageIndex = 0;

// DOM要素の取得
const backgroundSlider = document.getElementById('background-slider');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contactForm');

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    // 最初の背景画像を設定
    setBackgroundImage();
    
    // 背景画像を定期的に変更（5秒間隔）
    setInterval(changeBackgroundImage, 5000);
    
    // ナビゲーションイベントリスナーを設定
    setupNavigation();
    
    // ハンバーガーメニューのイベントリスナーを設定
    setupHamburgerMenu();
    
    // スクロールイベントリスナーを設定
    setupScrollEvents();
    
    // フォームのイベントリスナーを設定
    setupContactForm();
    
    // 初期ページを表示
    showSection('home');
});

// 背景画像を設定する関数
function setBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    backgroundSlider.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
    currentImageIndex = randomIndex;
}

// 背景画像を変更する関数
function changeBackgroundImage() {
    // ホームページが表示されている時のみ背景を変更
    const homeSection = document.getElementById('home');
    if (homeSection.classList.contains('active')) {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * backgroundImages.length);
        } while (nextIndex === currentImageIndex);
        
        backgroundSlider.style.opacity = '0';
        
        setTimeout(() => {
            backgroundSlider.style.backgroundImage = `url('${backgroundImages[nextIndex]}')`;
            backgroundSlider.style.opacity = '1';
            currentImageIndex = nextIndex;
        }, 1000);
    }
}

// ナビゲーションセットアップ
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 外部リンク（.html ファイル）の場合はデフォルト動作を許可
            if (href.includes('.html')) {
                return; // ページ遷移を許可
            }
            
            // ハッシュリンクの場合のみ preventDefault
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // アクティブなナビリンクを更新
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // セクションを表示
                showSection(targetId);
            }
            
            // モバイルメニューを閉じる
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// セクションを表示する関数
function showSection(targetId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // ホームページ以外では背景を隠す
        if (targetId === 'home') {
            backgroundSlider.style.zIndex = '-2';
            backgroundSlider.style.opacity = '1';
        } else {
            backgroundSlider.style.zIndex = '-2';
            backgroundSlider.style.opacity = '0';
        }
        
        // セクションタイトルのアニメーション
        animateSectionTitle(targetSection);
    }
}

// セクションタイトルのアニメーション
function animateSectionTitle(section) {
    const title = section.querySelector('.section-title');
    if (title && section.id !== 'home') {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ハンバーガーメニューセットアップ
function setupHamburgerMenu() {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// モバイルメニューの切り替え
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// スクロールイベントセットアップ
function setupScrollEvents() {
    window.addEventListener('scroll', function() {
        // ナビバーの背景を調整
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// お問い合わせフォームセットアップ
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }
}

// フォーム送信処理
function handleFormSubmit() {
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject') || 'お問い合わせ';
    const message = formData.get('message');
    
    // 簡単なバリデーション
    if (!name || !email || !message) {
        showNotification('必須項目を入力してください。', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('正しいメールアドレスを入力してください。', 'error');
        return;
    }
    
    // フォーム送信の成功メッセージ（実際の送信処理はサーバーサイドで実装）
    showNotification('お問い合わせを受け付けました。ありがとうございます！', 'success');
    contactForm.reset();
}

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知表示
function showNotification(message, type = 'info') {
    // 既存の通知があれば削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 通知要素を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // スタイルを設定
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // アニメーションで表示
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒後に非表示
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// スムーズスクロール機能（内部リンク用）
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// キーボードナビゲーション
document.addEventListener('keydown', function(e) {
    // Escキーでモバイルメニューを閉じる
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // 数字キーでページ切り替え
    const keyNumber = parseInt(e.key);
    if (keyNumber >= 1 && keyNumber <= 5 && !e.ctrlKey && !e.altKey) {
        const pages = ['home', 'about', 'hobbies', 'games', 'contact'];
        const targetPage = pages[keyNumber - 1];
        if (targetPage) {
            // 対応するナビリンクを見つけてクリック
            const navLink = document.querySelector(`a[href="#${targetPage}"]`);
            if (navLink) {
                navLink.click();
            }
        }
    }
});

// ページ遷移のアニメーション効果を向上
function enhancePageTransitions() {
    sections.forEach(section => {
        const cards = section.querySelectorAll('.hobby-card, .game-card, .info-item');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    });
}

// インターセクションオブザーバーでアニメーション
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を監視
    document.querySelectorAll('.hobby-card, .game-card, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ページ読み込み完了後の追加設定
window.addEventListener('load', function() {
    // スクロールアニメーションを設定
    setupScrollAnimations();
    
    // 全ての画像の読み込みを確認
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', function() {
                console.log(`画像が読み込まれました: ${img.src}`);
            });
        }
    });
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.error);
});

// パフォーマンス最適化：Intersection Observer for lazy loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
