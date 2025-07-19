// 数当てゲーム変数
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 7;
let guessHistory = [];
let gameActive = true;

// DOM読み込み完了後の処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to Souta\'s Portfolio!');
    
    // モバイルメニューの初期化
    initMobileMenu();
    
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
window.addEventListener('load', function() {
    // ページ読み込み完了後の処理
    document.body.classList.add('loaded');
});
