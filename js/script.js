// YoRHa Unit #2025 Profile - JavaScript
// アニメーション効果とインタラクション

document.addEventListener('DOMContentLoaded', function() {
    // カード要素のアニメーション
    const cards = document.querySelectorAll('.card, .location, .skill');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    });
    
    // 各カードにオブザーバーを適用
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // 探索エリアのクリックエフェクト
    const locations = document.querySelectorAll('.location');
    locations.forEach(location => {
        location.addEventListener('click', function() {
            // クリック時の光るエフェクト
            this.style.background = 'rgba(120, 119, 198, 0.3)';
            this.style.boxShadow = '0 0 20px rgba(120, 119, 198, 0.5)';
            
            setTimeout(() => {
                this.style.background = 'rgba(120, 119, 198, 0.1)';
                this.style.boxShadow = 'none';
            }, 200);
        });
    });
    
    // スキルカードのホバーエフェクト強化
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 連絡先アイテムのクリックエフェクト
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // パルス効果
            this.style.animation = 'pulse 0.3s ease-in-out';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // システムステータスの数値アニメーション
    const statusValues = document.querySelectorAll('.status-value');
    statusValues.forEach(value => {
        const text = value.textContent;
        if (text === '98%') {
            animateNumber(value, 0, 98, 1000, '%');
        }
    });
    
    // タイトルのタイピングエフェクト（オプション）
    const title = document.querySelector('.title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // 少し遅延してからタイピング開始
        setTimeout(typeWriter, 500);
    }
});

// 数値アニメーション関数
function animateNumber(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// パフォーマンス監視（開発用）
if (typeof performance !== 'undefined') {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`YoRHa Profile loaded in ${loadTime.toFixed(2)}ms`);
    });
}
