// 趣味ページ専用JavaScript
// YoRHa Unit #2025 - Hobby Database

document.addEventListener('DOMContentLoaded', function() {
    // 統計バーのアニメーション
    const statBars = document.querySelectorAll('.stat-fill');
    
    const animateStatBars = () => {
        statBars.forEach((bar, index) => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-out';
                bar.style.width = targetWidth;
            }, index * 200);
        });
    };
    
    // スクロール時の統計バーアニメーション
    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatBars();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // 趣味カードのインタラクティブ効果
    const hobbyCards = document.querySelectorAll('.hobby-card');
    
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // ホバー時の3D効果
            this.style.transform = 'translateY(-5px) rotateX(5deg)';
            this.style.transition = 'all 0.3s ease';
            
            // レベル表示の強調
            const level = this.querySelector('.hobby-level');
            if (level) {
                level.style.animation = 'levelGlow 0.5s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            
            const level = this.querySelector('.hobby-level');
            if (level) {
                level.style.animation = '';
            }
        });
        
        // クリック時の詳細展開エフェクト
        card.addEventListener('click', function() {
            this.style.animation = 'cardClick 0.3s ease-in-out';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // 活動ステータスの動的更新
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach((item, index) => {
        // 進捗バーの追加（存在する場合）
        const progressText = item.querySelector('.activity-progress');
        if (progressText && progressText.textContent.includes('%')) {
            const percentage = progressText.textContent.match(/\d+/)[0];
            
            // 進捗バーの作成
            const progressBar = document.createElement('div');
            progressBar.className = 'activity-progress-bar';
            progressBar.innerHTML = `
                <div class="progress-fill" style="width: ${percentage}%"></div>
            `;
            
            item.appendChild(progressBar);
        }
        
        // ランダムな活動更新シミュレーション
        setTimeout(() => {
            item.style.opacity = '0.7';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 100);
        }, index * 2000 + Math.random() * 3000);
    });
    
    // カテゴリごとの統計計算
    const calculateCategoryStats = () => {
        const categories = document.querySelectorAll('.hobby-category');
        let totalHobbies = 0;
        let activeCount = 0;
        
        categories.forEach(category => {
            const status = category.querySelector('.category-status');
            const cards = category.querySelectorAll('.hobby-card');
            
            totalHobbies += cards.length;
            
            if (status && status.textContent.includes('ACTIVE')) {
                activeCount += cards.length;
            }
        });
        
        console.log(`Total hobbies: ${totalHobbies}, Active: ${activeCount}`);
        
        // 動的な統計更新
        updateDynamicStats(totalHobbies, activeCount);
    };
    
    // 動的統計の更新
    const updateDynamicStats = (total, active) => {
        // 新しい統計項目を追加する場合
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid && !document.querySelector('.dynamic-stat')) {
            const dynamicStat = document.createElement('div');
            dynamicStat.className = 'stat-item dynamic-stat';
            dynamicStat.innerHTML = `
                <div class="stat-value">${active}/${total}</div>
                <div class="stat-label">アクティブ趣味</div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${(active/total)*100}%"></div>
                </div>
            `;
            statsGrid.appendChild(dynamicStat);
        }
    };
    
    // タグのインタラクティブ機能
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 同じタグを持つカードをハイライト
            const tagText = this.textContent;
            const allTags = document.querySelectorAll('.tag');
            const relatedCards = [];
            
            allTags.forEach(t => {
                if (t.textContent === tagText) {
                    const card = t.closest('.hobby-card');
                    relatedCards.push(card);
                }
            });
            
            // 関連カードの一時的ハイライト
            relatedCards.forEach(card => {
                card.style.border = '2px solid #7877c6';
                card.style.boxShadow = '0 0 20px rgba(120, 119, 198, 0.5)';
                
                setTimeout(() => {
                    card.style.border = '1px solid rgba(120, 119, 198, 0.2)';
                    card.style.boxShadow = '';
                }, 1500);
            });
            
            // タグのフィードバック
            this.style.background = 'rgba(120, 119, 198, 0.5)';
            this.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.style.background = 'rgba(120, 119, 198, 0.2)';
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // ナビゲーションのスムーズスクロール（ページ内リンクの場合）
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // 初期化処理
    calculateCategoryStats();
    
    // カテゴリヘッダーのアニメーション
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(-20px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    });
    
    categoryHeaders.forEach(header => {
        headerObserver.observe(header);
    });
});

// CSSアニメーションの追加（動的に）
const style = document.createElement('style');
style.textContent = `
    @keyframes levelGlow {
        0%, 100% { 
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.3); 
        }
        50% { 
            box-shadow: 0 0 15px rgba(76, 175, 80, 0.8); 
        }
    }
    
    @keyframes cardClick {
        0% { transform: scale(1); }
        50% { transform: scale(0.98); }
        100% { transform: scale(1); }
    }
    
    .activity-progress-bar {
        width: 60px;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
        margin-left: auto;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #7877c6, #4caf50);
        border-radius: 2px;
        transition: width 0.8s ease;
    }
`;

document.head.appendChild(style);
