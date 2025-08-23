// 音楽データ
const musicData = {
    gameMusic: [
        {
            id: 1,
            trackNumber: "01",
            name: "City Ruins (Rays of Light)",
            artist: "Keiichi Okabe",
            album: "NieR:Automata",
            description: "廃墟都市の美しさと切なさを表現した名曲。探索中によく聴いています。",
            rating: 5,
            featured: true
        },
        {
            id: 2,
            trackNumber: "02",
            name: "Amusement Park",
            artist: "Keiichi Okabe",
            album: "NieR:Automata",
            description: "遊園地の幻想的な雰囲気が心に響く楽曲。",
            rating: 5,
            featured: false
        },
        {
            id: 3,
            trackNumber: "03",
            name: "Peaceful Sleep",
            artist: "Keiichi Okabe",
            album: "NieR:Automata",
            description: "静寂の中に込められた深い感情を感じる楽曲。",
            rating: 4,
            featured: false
        },
        {
            id: 4,
            trackNumber: "04",
            name: "To Far Away Times",
            artist: "Yasunori Mitsuda",
            album: "Chrono Trigger",
            description: "時を超える壮大な物語を彩る感動的なエンディング曲。",
            rating: 5,
            featured: false
        }
    ],
    animeMusic: [
        {
            id: 1,
            trackNumber: "01",
            name: "残酷な天使のテーゼ",
            artist: "高橋洋子",
            album: "新世紀エヴァンゲリオン",
            description: "力強いメロディーと深い歌詞が印象的な名曲。",
            rating: 5,
            featured: true
        },
        {
            id: 2,
            trackNumber: "02",
            name: "紅蓮華",
            artist: "LiSA",
            album: "鬼滅の刃",
            description: "情熱的で力強い歌声が心を打つ楽曲。",
            rating: 4,
            featured: false
        },
        {
            id: 3,
            trackNumber: "03",
            name: "Moonlight Densetsu",
            artist: "DALI",
            album: "美少女戦士セーラームーン",
            description: "懐かしさと美しさを感じる不朽の名曲。",
            rating: 4,
            featured: false
        }
    ],
    instrumental: [
        {
            id: 1,
            trackNumber: "01",
            name: "River Flows in You",
            artist: "Yiruma",
            album: "",
            description: "美しいピアノの旋律が心を癒す楽曲。集中したい時に最適。",
            rating: 5,
            featured: true
        },
        {
            id: 2,
            trackNumber: "02",
            name: "Experience",
            artist: "Ludovico Einaudi",
            album: "",
            description: "感情的な深みを持つ現代クラシックの傑作。",
            rating: 4,
            featured: false
        }
    ]
};

// 現在再生中の楽曲データ
const nowPlayingData = {
    title: "Weight of the World (End of YoRHa)",
    artist: "Keiichi Okabe feat. J'Nique Nicole",
    album: "NieR:Automata Original Soundtrack",
    currentTime: "03:42",
    totalTime: "05:28",
    progress: 68
};

// 音楽統計データ
const musicStats = {
    totalTracks: 342,
    weeklyPlaytime: "28h",
    favoriteArtists: 15,
    playlists: 8
};

// 楽曲アイテムを生成する関数
function generateTrackItem(track) {
    const featuredClass = track.featured ? ' featured' : '';
    const stars = '★'.repeat(track.rating) + '☆'.repeat(5 - track.rating);
    
    return `
        <div class="track-item${featuredClass}">
            <div class="track-number">${track.trackNumber}</div>
            <div class="track-details">
                <div class="track-name">${track.name}</div>
                <div class="track-meta">${track.album ? track.album + ' - ' : ''}${track.artist}</div>
                <div class="track-description">${track.description}</div>
            </div>
            <div class="track-actions">
                <button class="play-btn">▶️</button>
                <div class="track-rating">${stars}</div>
            </div>
        </div>
    `;
}

// 音楽カテゴリーを生成する関数
function generateMusicCategory(categoryData, icon, title, titleEn) {
    const trackCount = categoryData.length;
    const tracksHtml = categoryData.map(track => generateTrackItem(track)).join('');
    
    return `
        <div class="music-category">
            <div class="category-header">
                <span class="category-icon">${icon}</span>
                <h3 class="category-title">${title} / ${titleEn}</h3>
                <span class="track-count">${trackCount} tracks</span>
            </div>
            <div class="track-list">
                ${tracksHtml}
            </div>
        </div>
    `;
}

// 音楽セクションを初期化する関数
function initializeMusicSection() {
    const musicCategoriesContainer = document.querySelector('.music-categories');
    if (musicCategoriesContainer) {
        const categoriesHtml = 
            generateMusicCategory(musicData.gameMusic, '🎮', 'ゲーム音楽', 'GAME SOUNDTRACKS') +
            generateMusicCategory(musicData.animeMusic, '🎌', 'アニメ音楽', 'ANIME SOUNDTRACKS') +
            generateMusicCategory(musicData.instrumental, '🎹', 'インストゥルメンタル', 'INSTRUMENTAL');
        
        musicCategoriesContainer.innerHTML = categoriesHtml;
    }
}

// DOMが読み込まれた後に音楽セクションを初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeMusicSection();
});
