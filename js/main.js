// 数当てゲーム変数
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 7;
let guessHistory = [];
let gameActive = true;

// 背景スライドショー変数
let backgroundSlides = [];
let currentBackgroundSlide = 0;
let backgroundInterval;

// DOM読み込み完了後の処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to Souta\'s Portfolio!');
    
    // 背景スライドショーの初期化
    initializeBackgroundSlideshow();
    
    // モバイルメニューの初期化
    initMobileMenu();
    
    // ヒーロースライドショーの初期化（indexページのみ）
    if (document.querySelector('.hero-slideshow')) {
        initializeHeroSlideshow();
    }
    
    // ゲーム機能の初期化（hobbyページのみ）
    if (document.getElementById('guessBtn')) {
        initializeGame();
    }
    
    // お問い合わせフォームの初期化
    if (document.getElementById('contactForm')) {
        initializeContactForm();
    }
    
    // FAQの初期化
    if (document.querySelector('.faq-question')) {
        initializeFAQ();
    }
    
    // スムーススクロールの実装
    initializeSmoothScroll();
});

// モバイルメニューの初期化
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-nav-open');
            
            // ハンバーガーメニューのアニメーション
            menuToggle.classList.toggle('active');
        });
        
        // メニュー項目をクリックしたときにメニューを閉じる
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-nav-open');
                menuToggle.classList.remove('active');
            });
        });
        
        // 画面外をクリックしたときにメニューを閉じる
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('mobile-nav-open');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// 背景スライドショーの初期化
function initializeBackgroundSlideshow() {
    backgroundSlides = document.querySelectorAll('.background-slide');
    
    if (backgroundSlides.length > 0) {
        // 画像をランダムに並び替え
        const slideArray = Array.from(backgroundSlides);
        shuffleArray(slideArray);
        
        // ランダムな間隔（3-7秒）で背景を切り替え
        startBackgroundSlideshow();
    }
}

// 配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 背景スライドショーを開始
function startBackgroundSlideshow() {
    // 初回は即座に実行
    showNextBackgroundSlide();
    
    // ランダムな間隔で継続的に実行
    backgroundInterval = setInterval(() => {
        showNextBackgroundSlide();
        // 次の間隔もランダムに設定（3-7秒）
        clearInterval(backgroundInterval);
        const randomInterval = Math.random() * 4000 + 3000; // 3000-7000ms
        backgroundInterval = setInterval(showNextBackgroundSlide, randomInterval);
    }, Math.random() * 4000 + 3000);
}

// 次の背景スライドを表示
function showNextBackgroundSlide() {
    if (backgroundSlides.length === 0) return;
    
    // 現在のスライドを非アクティブに
    backgroundSlides[currentBackgroundSlide].classList.remove('active');
    
    // 次のスライドをランダムに選択
    let nextSlide;
    do {
        nextSlide = Math.floor(Math.random() * backgroundSlides.length);
    } while (nextSlide === currentBackgroundSlide && backgroundSlides.length > 1);
    
    currentBackgroundSlide = nextSlide;
    
    // 新しいスライドをアクティブに
    backgroundSlides[currentBackgroundSlide].classList.add('active');
}

// 数当てゲームの初期化
function initializeGame() {
    const guessBtn = document.getElementById('guessBtn');
    const resetBtn = document.getElementById('resetBtn');
    const guessInput = document.getElementById('guessInput');
    
    if (guessBtn && resetBtn && guessInput) {
        guessBtn.addEventListener('click', makeGuess);
        resetBtn.addEventListener('click', resetGame);
        
        // エンターキーでも予想できるようにする
        guessInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                makeGuess();
            }
        });
    }
}

// 予想処理
function makeGuess() {
    if (!gameActive) return;
    
    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);
    
    // 入力値の検証
    if (isNaN(guess) || guess < 1 || guess > 100) {
        updateMessage('1から100の間の数字を入力してください！', 'error');
        return;
    }
    
    // 履歴に追加
    guessHistory.push(guess);
    attemptsLeft--;
    
    updateAttemptsDisplay();
    updateHistory();
    
    if (guess === secretNumber) {
        // 正解
        updateMessage(`🎉 正解！答えは ${secretNumber} でした！`, 'success');
        endGame(true);
    } else if (attemptsLeft === 0) {
        // ゲームオーバー
        updateMessage(`😢 ゲームオーバー！答えは ${secretNumber} でした。`, 'error');
        endGame(false);
    } else {
        // ヒントを表示
        const hint = guess < secretNumber ? '大きい数字です' : '小さい数字です';
        updateMessage(`${hint}　残り ${attemptsLeft} 回`, 'hint');
    }
    
    guessInput.value = '';
}

// メッセージ更新
function updateMessage(text, type) {
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = text;
        messageElement.className = `game-message ${type}`;
    }
}

// 試行回数表示更新
function updateAttemptsDisplay() {
    const attemptsElement = document.getElementById('attemptsLeft');
    if (attemptsElement) {
        attemptsElement.textContent = attemptsLeft;
    }
}

// 履歴表示更新
function updateHistory() {
    const historyElement = document.getElementById('history');
    if (historyElement) {
        historyElement.innerHTML = '<h5>予想履歴:</h5>' + 
            guessHistory.map(guess => `<span class="guess-item">${guess}</span>`).join(' ');
    }
}

// ゲーム終了処理
function endGame(won) {
    gameActive = false;
    const guessBtn = document.getElementById('guessBtn');
    const guessInput = document.getElementById('guessInput');
    const resetBtn = document.getElementById('resetBtn');
    
    if (guessBtn) guessBtn.style.display = 'none';
    if (guessInput) guessInput.disabled = true;
    if (resetBtn) resetBtn.style.display = 'inline-block';
}

// ゲームリセット
function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 7;
    guessHistory = [];
    gameActive = true;
    
    const guessBtn = document.getElementById('guessBtn');
    const guessInput = document.getElementById('guessInput');
    const resetBtn = document.getElementById('resetBtn');
    const historyElement = document.getElementById('history');
    
    if (guessBtn) guessBtn.style.display = 'inline-block';
    if (guessInput) {
        guessInput.disabled = false;
        guessInput.value = '';
    }
    if (resetBtn) resetBtn.style.display = 'none';
    if (historyElement) historyElement.innerHTML = '';
    
    updateAttemptsDisplay();
    updateMessage('さあ、始めましょう！', '');
}

// お問い合わせフォームの初期化
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const inquiryType = formData.get('inquiryType');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const privacy = formData.get('privacy');
            
            // 必須項目のチェック
            if (!firstName || !lastName || !email || !inquiryType || !subject || !message || !privacy) {
                alert('すべての必須項目を入力してください。');
                return;
            }
            
            // メールアドレスの簡単な検証
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('正しいメールアドレスを入力してください。');
                return;
            }
            
            // 送信処理のシミュレーション
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // ボタンの状態を変更
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            
            // 2秒後に完了メッセージを表示
            setTimeout(() => {
                const fullName = `${firstName} ${lastName}`;
                const inquiryTypeText = getInquiryTypeText(inquiryType);
                
                alert(`お問い合わせありがとうございます、${fullName}さん！\n\n` +
                      `【お問い合わせ内容】\n` +
                      `種別: ${inquiryTypeText}\n` +
                      `件名: ${subject}\n\n` +
                      `内容を確認いたしました。\n` +
                      `24時間以内にご返信させていただきます。\n\n` +
                      `（このサイトはデモなので、実際のメール送信は行われません）`);
                
                // フォームをリセット
                form.reset();
                
                // ボタンの状態を元に戻す
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                
                // 成功メッセージを表示
                showSuccessMessage();
                
            }, 2000);
        });
    }
}

// お問い合わせ種別のテキストを取得
function getInquiryTypeText(value) {
    const types = {
        'web-development': 'Web制作・開発',
        'design': 'デザイン',
        'photography': '写真撮影',
        'collaboration': 'コラボレーション',
        'consultation': '相談・アドバイス',
        'other': 'その他'
    };
    return types[value] || value;
}

// 成功メッセージを表示
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✅</div>
            <h4>送信完了</h4>
            <p>お問い合わせありがとうございました。<br>24時間以内にご返信いたします。</p>
        </div>
    `;
    
    // スタイルを設定
    successMessage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const successContent = successMessage.querySelector('.success-content');
    successContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    `;
    
    const successIcon = successMessage.querySelector('.success-icon');
    successIcon.style.cssText = `
        font-size: 3rem;
        margin-bottom: 1rem;
    `;
    
    document.body.appendChild(successMessage);
    
    // 3秒後にメッセージを削除
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 3000);
    
    // クリックで閉じる
    successMessage.addEventListener('click', function(e) {
        if (e.target === successMessage) {
            successMessage.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 300);
        }
    });
}

// FAQの初期化
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // 他のFAQを閉じる
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // クリックされたFAQを開く/閉じる
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// スムーススクロールの実装
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ページロード時のアニメーション

// ヒーロースライドショー機能
function initializeHeroSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length || !indicators.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;
    
    // スライド切り替え関数（3D回転効果付き）
    function showSlide(index, direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;
        
        const previousSlide = currentSlide;
        currentSlide = index;
        
        // 全てのスライドからクラスを削除
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
            indicators[i].classList.remove('active');
        });
        
        // 前のスライドにアニメーション準備クラスを追加
        if (direction === 'next') {
            slides[previousSlide].classList.add('prev');
        } else {
            slides[previousSlide].classList.add('next');
        }
        
        // 少し遅延してから新しいスライドを表示
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
            
            // アニメーション完了後にフラグをリセット
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }, 100);
    }
    
    // 次のスライドに移動（右回転）
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next, 'next');
    }
    
    // 前のスライドに移動（左回転）
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev, 'prev');
    }
    
    // 自動スライドショーを開始
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // 5秒間隔に変更
    }
    
    // 自動スライドショーを停止
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // イベントリスナーの設定
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (isAnimating) return;
            stopSlideshow();
            nextSlide();
            setTimeout(startSlideshow, 1000); // 1秒後に再開
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (isAnimating) return;
            stopSlideshow();
            prevSlide();
            setTimeout(startSlideshow, 1000); // 1秒後に再開
        });
    }
    
    // インジケーターのクリックイベント
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (isAnimating || index === currentSlide) return;
            stopSlideshow();
            const direction = index > currentSlide ? 'next' : 'prev';
            showSlide(index, direction);
            setTimeout(startSlideshow, 1000); // 1秒後に再開
        });
    });
    
    // スライドショーエリアにマウスが乗ったら一時停止
    const slideshowContainer = document.querySelector('.hero-slideshow');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', () => {
            if (!isAnimating) {
                startSlideshow();
            }
        });
    }
    
    // 初期化：最初のスライドを表示し、自動スライドショーを開始
    slides[0].classList.add('active');
    indicators[0].classList.add('active');
    startSlideshow();
    
    // ページが非表示になったらスライドショーを停止（パフォーマンス対策）
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlideshow();
        } else if (!isAnimating) {
            startSlideshow();
        }
    });
    
    // タッチイベント対応（スワイプ機能）
    let startX = 0;
    let startY = 0;
    
    slideshowContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    slideshowContainer.addEventListener('touchend', (e) => {
        if (isAnimating) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // 水平方向の移動が垂直方向より大きい場合のみスワイプとして認識
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            stopSlideshow();
            if (diffX > 0) {
                nextSlide(); // 左スワイプ
            } else {
                prevSlide(); // 右スワイプ
            }
            setTimeout(startSlideshow, 1000);
        }
    });
}
window.addEventListener('load', function() {
    // ページ読み込み完了後の処理
    document.body.classList.add('loaded');
});
