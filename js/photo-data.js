// 写真データ（実在する画像パスに修正済み）
const photoData = [
    {
        id: 1,
        src: "image/IMG_4922.jpeg",
        alt: "木漏れ日の遊歩道",
        title: "木漏れ日の遊歩道",
        description: "木々の間から差し込む光が美しい散策路。",
        date: "2024.04.10",
        location: "遊歩道",
        tags: ["自然", "散歩"],
        category: "nature",
        featured: false
    },
    {
        id: 2,
        src: "image/IMG_4948.jpeg",
        alt: "夕暮れの湖面",
        title: "夕暮れの湖面",
        description: "夕日が水面に映る静かな湖の風景。",
        date: "2024.06.15",
        location: "湖畔",
        tags: ["夕暮れ", "湖", "反射"],
        category: "nature",
        featured: true
    },
    {
        id: 3,
        src: "image/IMG_4955.jpeg",
        alt: "工芸品のディテール",
        title: "工芸品のディテール",
        description: "手仕事の美しさが際立つ装飾のクローズアップ。",
        date: "2024.03.22",
        location: "展示室",
        tags: ["工芸", "アート"],
        category: "architecture",
        featured: false
    },
    {
        id: 4,
        src: "image/IMG_4977.jpeg",
        alt: "黄昏のカフェ",
        title: "黄昏のカフェ",
        description: "夕暮れ時のやわらかな灯りが印象的な街角のカフェ。",
        date: "2024.05.08",
        location: "街角",
        tags: ["カフェ", "都市"],
        category: "architecture",
        featured: true
    },
    {
        id: 5,
        src: "image/IMG_4980.jpeg",
        alt: "色とりどりの花",
        title: "色とりどりの花",
        description: "多彩な花々が作る鮮やかな色の調和。",
        date: "2024.07.12",
        location: "花畑",
        tags: ["花", "色彩"],
        category: "abstract",
        featured: false
    },
    {
        id: 6,
        src: "image/IMG_4995.jpeg",
        alt: "テーブルを囲む時間",
        title: "テーブルを囲む時間",
        description: "会話が弾む温かなひとときの記録。",
        date: "2024.01.20",
        location: "レストラン",
        tags: ["思い出", "食事"],
        category: "memories",
        featured: false
    },
    {
        id: 7,
        src: "image/IMG_5020.jpeg",
        alt: "にぎわいの夜",
        title: "にぎわいの夜",
        description: "灯りと人の流れが作る活気ある夜の風景。",
        date: "2024.02.14",
        location: "イベント",
        tags: ["夜景", "イベント"],
        category: "memories",
        featured: true
    },
    {
        id: 8,
        src: "image/IMG_5024.jpeg",
        alt: "春の公園",
        title: "春の公園",
        description: "柔らかな光に包まれた穏やかな春の景色。",
        date: "2024.05.25",
        location: "公園",
        tags: ["春", "風景"],
        category: "nature",
        featured: false
    },
    {
        id: 9,
        src: "image/IMG_5026.jpeg",
        alt: "モダンな階段",
        title: "モダンな階段",
        description: "直線的な意匠が印象的な屋内階段。",
        date: "2024.06.10",
        location: "現代建築",
        tags: ["建築", "階段"],
        category: "architecture",
        featured: false
    },
    {
        id: 10,
        src: "image/IMG_5041.jpeg",
        alt: "水面のリフレクション",
        title: "水面のリフレクション",
        description: "空と雲が水面に映り込む穏やかな景色。",
        date: "2024.07.20",
        location: "湖面",
        tags: ["反射", "水面"],
        category: "nature",
        featured: false
    },
    {
        id: 11,
        src: "image/nier-automata.jpg",
        alt: "NieR:Automata",
        title: "NieR:Automata",
        description: "ゲーム『NieR:Automata』のキービジュアル。",
        date: "2024.03.15",
        location: "ゲーム画面",
        tags: ["ゲーム", "NieR"],
        category: "memories",
        featured: true
    },
    {
        id: 12,
        src: "image/overwatch-logo.jpg",
        alt: "Overwatch ロゴ",
        title: "Overwatch ロゴ",
        description: "ゲーム『Overwatch』の公式ロゴ。",
        date: "2024.04.20",
        location: "ロゴ",
        tags: ["ゲーム", "Overwatch"],
        category: "memories",
        featured: false
    },
    {
        id: 13,
        src: "image/valorant-agents.jpg",
        alt: "VALORANT エージェント",
        title: "VALORANT エージェント",
        description: "『VALORANT』のエージェント集合イメージ。",
        date: "2024.06.08",
        location: "イメージ",
        tags: ["ゲーム", "VALORANT"],
        category: "memories",
        featured: false
    }
];

// 写真アイテムを生成する関数
function generatePhotoItem(photo) {
    const featuredClass = photo.featured ? ' featured' : '';
    const tagsHtml = photo.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    return `
        <div class="photo-item${featuredClass}" data-category="${photo.category}">
            <img src="${photo.src}" alt="${photo.alt}" class="gallery-image">
            <div class="photo-info">
                <h4 class="photo-title">${photo.title}</h4>
                <p class="photo-description">${photo.description}</p>
                <div class="photo-meta">
                    <span class="photo-date">${photo.date}</span>
                    <span class="photo-location">Loc: ${photo.location}</span>
                    <div class="photo-tags">
                        ${tagsHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 写真ギャラリーを初期化する関数
function initializePhotoGallery() {
    const galleryContainer = document.querySelector('.photo-gallery');
    if (galleryContainer) {
        galleryContainer.innerHTML = photoData.map(photo => generatePhotoItem(photo)).join('');
    }
}

// DOMが読み込まれた後に写真ギャラリーを初期化
document.addEventListener('DOMContentLoaded', function() {
    initializePhotoGallery();
});
