// 写真データ
const photoData = [
    {
        id: 1,
        src: "image/IMG_4922.jpeg",
        alt: "静寂の森林小径",
        title: "静寂の森林小径",
        description: "木漏れ日が織りなす緑の回廊を歩く午後のひととき。都市の喧騒を忘れさせてくれる自然の静寂に包まれて、心が洗われるような感覚を味わいました。一歩一歩踏みしめる土の感触と鳥のさえずりが、穏やかな時間を演出してくれます。",
        date: "2024.04.10",
        location: "高尾山",
        tags: ["森林", "自然", "散歩"],
        category: "nature",
        featured: true
    },
    {
        id: 2,
        src: "image/IMG_4948.jpeg",
        alt: "夕暮れの湖面",
        title: "夕暮れの湖面",
        description: "鏡のような湖面に映る夕日の輝き。風のない静かな夕刻、水面が完璧な鏡となって空の美しさを倍増させています。この瞬間の静寂と美しさに、自然の持つ神秘的な力を感じました。時の流れがゆっくりと感じられる特別な時間です。",
        date: "2024.06.15",
        location: "芦ノ湖",
        tags: ["夕日", "湖", "リフレクション"],
        category: "nature",
        featured: false
    },
    {
        id: 3,
        src: "image/IMG_4955.jpeg",
        alt: "伝統工芸の美",
        title: "伝統工芸の美",
        description: "職人の手によって一つ一つ丁寧に作られた伝統工芸品の精巧な美しさ。繊細な模様と色合いに、長い時間をかけて培われた技術の素晴らしさを感じます。現代でも受け継がれる日本の美意識と職人精神に深い感銘を受けました。",
        date: "2024.03.22",
        location: "伝統工芸館",
        tags: ["工芸", "伝統", "アート"],
        category: "architecture",
        featured: false
    },
    {
        id: 4,
        src: "image/IMG_4977.jpeg",
        alt: "黄昏の街角カフェ",
        title: "黄昏の街角カフェ",
        description: "温かな灯りが漏れる小さなカフェの窓辺。一日の終わりに立ち寄った素敵な空間で、コーヒーの香りとゆったりとした時間を楽しみました。街の喧騒から離れた隠れ家のような場所で、心からリラックスできる特別なひとときです。",
        date: "2024.05.08",
        location: "代官山",
        tags: ["カフェ", "黄昏", "都市"],
        category: "architecture",
        featured: true
    },
    {
        id: 5,
        src: "image/IMG_4980.jpeg",
        alt: "色彩のハーモニー",
        title: "色彩のハーモニー",
        description: "偶然出会った色とりどりの花々が織りなす自然のパレット。赤、黄、紫、白...それぞれが主張しながらも調和する美しい色彩の競演に心を奪われました。自然が作り出すアートワークの前では、人工的な美しさも霞んで見えます。",
        date: "2024.07.12",
        location: "花畑",
        tags: ["花", "色彩", "自然アート"],
        category: "abstract",
        featured: false
    },
    {
        id: 6,
        src: "image/IMG_4995.jpeg",
        alt: "友との語らい",
        title: "友との語らい",
        description: "久しぶりに集まった大切な友人たちとの楽しい時間。笑い声が絶えない賑やかな集まりで、学生時代の思い出話に花が咲きました。時間が経っても変わらない友情の大切さを改めて実感した、心温まる一日でした。",
        date: "2024.01.20",
        location: "お気に入りのレストラン",
        tags: ["友達", "思い出", "再会"],
        category: "memories",
        featured: false
    },
    {
        id: 7,
        src: "image/IMG_5020.jpeg",
        alt: "夏祭りの賑わい",
        title: "夏祭りの賑わい",
        description: "地域の夏祭りで体験した日本の伝統文化の魅力。色とりどりの浴衣を着た人々、屋台の香り、太鼓の音が響く活気あふれる会場。子供の頃から慣れ親しんだ祭りの雰囲気に、懐かしさと新鮮さを同時に感じた特別な夜でした。",
        date: "2024.02.14",
        location: "地元神社",
        tags: ["祭り", "伝統", "夏"],
        category: "memories",
        featured: true
    },
    {
        id: 8,
        src: "image/IMG_5024.jpeg",
        alt: "桜舞う春の公園",
        title: "桜舞う春の公園",
        description: "満開の桜が風に舞い散る美しい春の一日。淡いピンクの花びらがひらひらと舞い踊る様子は、まるで自然が奏でる詩のようでした。ベンチに座って桜を眺めながら、季節の移ろいの美しさと日本の春の特別さを心から感じました。",
        date: "2024.05.25",
        location: "井の頭公園",
        tags: ["桜", "春", "花見"],
        category: "nature",
        featured: false
    },
    {
        id: 9,
        src: "image/IMG_5026.jpeg",
        alt: "未来への階段",
        title: "未来への階段",
        description: "光と影が織りなすモダンな空間デザイン。シンプルでありながら洗練された建築の美しさに魅了されました。一歩一歩上がる階段は、まるで未来へと続く道のよう。現代建築が持つ機能美と芸術性の素晴らしい融合を体感できました。",
        date: "2024.06.10",
        location: "現代美術館",
        tags: ["モダン", "建築", "未来"],
        category: "architecture",
        featured: false
    },
    {
        id: 10,
        src: "image/IMG_5041.jpeg",
        alt: "水面に映る空",
        title: "水面に映る空",
        description: "静寂な水面に映る雲と空の美しいリフレクション。現実と映像の境界があいまいになる幻想的な瞬間に出会いました。水鏡が作り出す上下対称の世界は、まるで別次元への入り口のよう。自然が生み出すアートの神秘性に深く感動しました。",
        date: "2024.07.20",
        location: "奥多摩湖",
        tags: ["水面", "リフレクション", "幻想"],
        category: "abstract",
        featured: false
    },
    {
        id: 11,
        src: "image/nier-automata.jpg",
        alt: "NieR:Automata",
        title: "NieR:Automata",
        description: "美しくも儚い世界観に心を奪われた傑作ゲーム。人間性について深く考えさせられる哲学的なストーリーと、息をのむような美しい音楽が印象的でした。プレイする度に新たな発見がある素晴らしい作品です。",
        date: "2024.03.15",
        location: "ゲーム画面",
        tags: ["ゲーム", "NieR", "思い出"],
        category: "memories",
        featured: true
    },
    {
        id: 12,
        src: "image/overwatch-logo.jpg",
        alt: "Overwatch",
        title: "Overwatch",
        description: "世界中のプレイヤーと協力して戦う楽しさを教えてくれたゲーム。多様なヒーローたちの個性的な能力を活かしたチームプレイの重要性を学びました。友達と一緒にプレイした楽しい思い出が詰まっています。",
        date: "2024.04.20",
        location: "ゲーム画面",
        tags: ["ゲーム", "Overwatch", "協力"],
        category: "memories",
        featured: false
    },
    {
        id: 13,
        src: "image/valorant-agents.jpg",
        alt: "Valorant",
        title: "Valorant",
        description: "各エージェントの特殊能力を駆使した戦略的なFPSゲーム。正確な射撃技術と戦術的思考が求められる奥深いゲームプレイに夢中になりました。チームメイトとの連携で勝利を掴んだ時の達成感は格別です。",
        date: "2024.06.08",
        location: "ゲーム画面",
        tags: ["ゲーム", "Valorant", "戦略"],
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
