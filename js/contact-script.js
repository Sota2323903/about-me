// お問い合わせページ専用JavaScript
// YoRHa Unit #2025 - Communication Terminal

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('contactForm');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearForm');
    const charCountElement = document.getElementById('charCount');
    const messageContent = document.getElementById('messageContent');
    const transmissionStatus = document.getElementById('transmissionStatus');
    
    // 文字数カウンター
    const updateCharCount = () => {
        const currentLength = messageContent.value.length;
        const maxLength = 2000;
        
        charCountElement.textContent = currentLength;
        
        // 文字数に応じて色を変更
        if (currentLength > maxLength * 0.9) {
            charCountElement.style.color = '#f44336';
        } else if (currentLength > maxLength * 0.7) {
            charCountElement.style.color = '#ff9800';
        } else {
            charCountElement.style.color = '#7877c6';
        }
        
        // 最大文字数を超えた場合の処理
        if (currentLength > maxLength) {
            messageContent.value = messageContent.value.substring(0, maxLength);
            charCountElement.textContent = maxLength;
        }
    };
    
    messageContent.addEventListener('input', updateCharCount);
    
    // フォームバリデーション
    const validateForm = () => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            const errorElement = field.parentNode.querySelector('.error-message');
            
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#f44336';
                
                if (!errorElement) {
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.textContent = 'この項目は必須です';
                    error.style.color = '#f44336';
                    error.style.fontSize = '0.8rem';
                    error.style.marginTop = '5px';
                    error.style.fontFamily = 'Orbitron, monospace';
                    field.parentNode.appendChild(error);
                }
            } else {
                field.style.borderColor = 'rgba(120, 119, 198, 0.3)';
                if (errorElement) {
                    errorElement.remove();
                }
            }
        });
        
        // メールアドレスの形式チェック
        const emailField = document.getElementById('senderEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailField.value && !emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = '#f44336';
            
            let errorElement = emailField.parentNode.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = '#f44336';
                errorElement.style.fontSize = '0.8rem';
                errorElement.style.marginTop = '5px';
                errorElement.style.fontFamily = 'Orbitron, monospace';
                emailField.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = '有効なメールアドレスを入力してください';
        }
        
        return isValid;
    };
    
    // フォーム送信処理
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showTransmissionStatus('エラー: 入力内容を確認してください', 'error');
            return;
        }
        
        // 送信ボタンのローディング状態
        sendBtn.classList.add('loading');
        sendBtn.disabled = true;
        
        // 送信プロセスのシミュレーション
        await simulateTransmission();
        
        // 固定宛先にmailtoで送信（既定メーラーを起動）
        try {
            const to = 'KTC25A31E0003@edu.kyoto-tech.ac.jp';
            const name = document.getElementById('senderName').value.trim();
            const email = document.getElementById('senderEmail').value.trim();
            const type = document.getElementById('messageType').value;
            const priority = (form.querySelector('input[name="priority"]:checked')?.value || 'normal').toUpperCase();
            const content = messageContent.value.trim();

            const typeLabelMap = {
                'general': 'General',
                'collaboration': 'Collaboration',
                'technical': 'Technical',
                'creative': 'Creative',
                'philosophy': 'Philosophy',
                'other': 'Other'
            };

            const typeLabel = typeLabelMap[type] || 'Unspecified';

            const subject = encodeURIComponent(`[${priority}] Message from ${name || 'Anonymous'} (${typeLabel})`);
            const bodyLines = [
                `Sender: ${name || 'N/A'}`,
                `Email: ${email || 'N/A'}`,
                `Type: ${typeLabel}`,
                `Priority: ${priority}`,
                '',
                '--- Message ---',
                content || '(no content)'
            ];
            const body = encodeURIComponent(bodyLines.join('\n'));
            const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;

            // メーラー起動（ポップアップブロックを避けるため同期クリックに近いタイミング）
            window.location.href = mailtoUrl;
        } catch (_) {
            // 失敗してもフォームの成功フローは継続
        }
        
        // 送信完了
        sendBtn.classList.remove('loading');
        sendBtn.disabled = false;
        
        showTransmissionStatus('メッセージを正常に送信しました', 'success');
        
        // フォームリセット（成功時）
        setTimeout(() => {
            form.reset();
            updateCharCount();
            hideTransmissionStatus();
        }, 3000);
    };
    
    // 送信プロセスのシミュレーション
    const simulateTransmission = () => {
        return new Promise((resolve) => {
            showTransmissionStatus('暗号化中...', 'processing');
            
            setTimeout(() => {
                showTransmissionStatus('データ送信中...', 'processing', 30);
                
                setTimeout(() => {
                    showTransmissionStatus('確認中...', 'processing', 70);
                    
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }, 1500);
            }, 1000);
        });
    };
    
    // 送信ステータス表示
    const showTransmissionStatus = (message, type, progress = 0) => {
        const statusMessage = transmissionStatus.querySelector('.status-message');
        const progressFill = transmissionStatus.querySelector('.progress-fill');
        
        statusMessage.textContent = message;
        progressFill.style.width = progress + '%';
        
        transmissionStatus.className = 'transmission-status show';
        
        // ステータスに応じて色を変更
        switch (type) {
            case 'error':
                statusMessage.style.color = '#f44336';
                progressFill.style.background = '#f44336';
                break;
            case 'success':
                statusMessage.style.color = '#4caf50';
                progressFill.style.background = '#4caf50';
                progressFill.style.width = '100%';
                break;
            case 'processing':
                statusMessage.style.color = '#7877c6';
                progressFill.style.background = 'linear-gradient(90deg, #7877c6, #4caf50)';
                break;
        }
    };
    
    // 送信ステータス非表示
    const hideTransmissionStatus = () => {
        transmissionStatus.classList.remove('show');
    };
    
    // フォームクリア処理
    const handleClear = () => {
        if (confirm('入力内容をすべてクリアしますか？')) {
            form.reset();
            updateCharCount();
            hideTransmissionStatus();
            
            // エラーメッセージの削除
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.remove());
            
            // フィールドの枠線リセット
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.style.borderColor = 'rgba(120, 119, 198, 0.3)';
            });
            
            // クリア完了のフィードバック
            showTransmissionStatus('フォームをクリアしました', 'success');
            setTimeout(hideTransmissionStatus, 2000);
        }
    };
    
    // イベントリスナーの設定
    form.addEventListener('submit', handleSubmit);
    clearBtn.addEventListener('click', handleClear);
    
    // リアルタイムバリデーション
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#f44336';
            } else {
                input.style.borderColor = 'rgba(120, 119, 198, 0.3)';
                const errorElement = input.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            }
        });
        
        input.addEventListener('focus', () => {
            input.style.borderColor = 'rgba(120, 119, 198, 0.6)';
        });
    });
    
    // 優先度ラジオボタンのアニメーション
    const priorityLabels = document.querySelectorAll('.priority-label');
    priorityLabels.forEach(label => {
        label.addEventListener('click', function() {
            // 一時的なフラッシュ効果
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 15px rgba(120, 119, 198, 0.5)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = 'none';
            }, 150);
        });
    });
    
    // 接続状況のシミュレーション
    const updateConnectionStatus = () => {
        const signalBars = document.querySelectorAll('.bar');
        const connectionQuality = Math.floor(Math.random() * 5) + 1;
        
        signalBars.forEach((bar, index) => {
            if (index < connectionQuality) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });
        
        // 接続品質に応じて応答時間を更新
        const responseTime = document.querySelector('.status-item:nth-child(2) .status-value');
        const responseTimes = ['即座に', '2時間以内', '4時間以内', '12時間以内', '24時間以内'];
        responseTime.textContent = responseTimes[5 - connectionQuality] || '24時間以内';
    };
    
    // 定期的な接続状況更新
    setInterval(updateConnectionStatus, 5000);
    
    // オペレーターステータスの更新
    const operatorStatuses = [
        'オペレーター待機中...',
        'メッセージ処理中...',
        '他の通信対応中...',
        'システムチェック中...',
        'データ解析中...'
    ];
    
    const updateOperatorStatus = () => {
        const statusElement = document.querySelector('.operator-status');
        const randomStatus = operatorStatuses[Math.floor(Math.random() * operatorStatuses.length)];
        
        statusElement.style.opacity = '0';
        setTimeout(() => {
            statusElement.textContent = randomStatus;
            statusElement.style.opacity = '1';
        }, 300);
    };
    
    // 定期的なオペレーターステータス更新
    setInterval(updateOperatorStatus, 8000);
    
    // 初期化
    updateCharCount();
    updateConnectionStatus();
    
    // キーボードショートカット
    document.addEventListener('keydown', (e) => {
        // Ctrl+Enter で送信
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
        
        // Escape でフォームクリア確認
        if (e.key === 'Escape') {
            const hasContent = Array.from(inputs).some(input => input.value.trim());
            if (hasContent) {
                handleClear();
            }
        }
    });
    
    // フォーカス管理
    const firstInput = form.querySelector('input');
    if (firstInput) {
        firstInput.focus();
    }
    
    console.log('Communication Terminal initialized successfully');
});
