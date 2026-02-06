/* ========================================
   돌아봄 - 템플릿 시스템
   다양한 편지 템플릿 관리
   ======================================== */

const templateSystem = {
    // 템플릿 정의
    templates: {
        classic: {
            id: 'classic',
            name: '클래식 레터',
            description: '전통적인 손편지 스타일',
            icon: '💌',
            cssFile: 'templates/template-classic.css',
            background: '#FFF9F0'
        },
        album: {
            id: 'album',
            name: '졸업 앨범',
            description: '추억 사진이 돋보이는 앨범',
            icon: '📸',
            cssFile: 'templates/template-album.css',
            background: '#FFFDF8'
        },
        colorful: {
            id: 'colorful',
            name: '컬러풀 스토리북',
            description: '밝고 경쾌한 동화책 스타일',
            icon: '🌈',
            cssFile: 'templates/template-colorful.css',
            background: '#FFF9F0'
        },
        minimal: {
            id: 'minimal',
            name: '미니멀 모던',
            description: '깔끔하고 세련된 디자인',
            icon: '✨',
            cssFile: 'templates/template-minimal.css',
            background: '#FFFFFF'
        },
        timeline: {
            id: 'timeline',
            name: '타임라인 스크랩북',
            description: '시간순 스크랩북 스타일',
            icon: '📍',
            cssFile: 'templates/template-timeline.css',
            background: '#FFF9F0'
        },
        paper: {
            id: 'paper',
            name: '페이퍼 아트',
            description: '입체감 있는 종이 아트',
            icon: '🎨',
            cssFile: 'templates/template-paper.css',
            background: '#F5F0EB'
        }
    },

    // 현재 선택된 템플릿
    currentTemplate: 'classic',

    // 템플릿 CSS 로드
    loadTemplateCSS: function(templateId) {
        const template = this.templates[templateId];
        if (!template) return;

        // 기존 템플릿 CSS 제거
        const existingLinks = document.querySelectorAll('link[data-template-css]');
        existingLinks.forEach(link => link.remove());

        // 새 템플릿 CSS 추가
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = template.cssFile;
        link.setAttribute('data-template-css', templateId);
        document.head.appendChild(link);
    },

    // 템플릿 HTML 생성
    renderTemplate: function(templateId, data) {
        const template = this.templates[templateId];
        if (!template) return '';

        // 템플릿별 렌더링
        switch (templateId) {
            case 'classic':
                return this.renderClassic(data);
            case 'album':
                return this.renderAlbum(data);
            case 'colorful':
                return this.renderColorful(data);
            case 'minimal':
                return this.renderMinimal(data);
            case 'timeline':
                return this.renderTimeline(data);
            case 'paper':
                return this.renderPaper(data);
            default:
                return this.renderClassic(data);
        }
    },

    // 클래식 레터 템플릿
    renderClassic: function(data) {
        const categoryOrder = ['moment', 'memory', 'person', 'favorite', 'future'];
        let sectionsHTML = '';

        categoryOrder.forEach(cat => {
            const info = categoryInfo[cat];
            const items = data.categories[cat].filter(item => item.trim());
            if (items.length > 0) {
                sectionsHTML += `
                    <div class="template-section">
                        <h3 class="section-title">${info.icon} ${info.title}</h3>
                        <ul class="section-items">
                            ${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        });

        // 추억 사진
        let imagesHTML = '';
        if (data.images && data.images.length > 0) {
            imagesHTML = `
                <div class="template-section">
                    <h3 class="section-title">📸 추억 사진</h3>
                    <div class="classic-images">
                        ${data.images.map(img =>
                            `<img src="${img.data}" alt="${escapeHtml(img.name)}">`
                        ).join('')}
                    </div>
                </div>
            `;
        }

        // 편지
        let letterHTML = '';
        if (data.letter.to) {
            letterHTML = `
                <div class="template-section letter-section">
                    <h3 class="section-title">💌 감사 편지</h3>
                    <div class="classic-letter">
                        <div class="letter-to">To. ${escapeHtml(data.letter.to)}</div>
                        <div class="letter-content">
                            ${data.letter.content ? `<p>${escapeHtml(data.letter.content)}</p>` : ''}
                            ${data.letter.feeling ? `<p>${escapeHtml(data.letter.feeling)}</p>` : ''}
                            ${data.letter.promise ? `<p>${escapeHtml(data.letter.promise)}</p>` : ''}
                        </div>
                        <div class="letter-from">From. ${escapeHtml(data.userName)}</div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="template-classic">
                <div class="classic-header">
                    <div class="stamp-decoration">📮</div>
                    <h1 class="main-title">${escapeHtml(data.userName)}의 돌아봄</h1>
                    <p class="subtitle">초등학교 6년간의 감사 기록</p>
                </div>
                ${sectionsHTML}
                ${imagesHTML}
                ${letterHTML}
                <div class="classic-footer">
                    돌아봄 - 지나온 시간에 대한 감사 | ${getDateString()}
                </div>
            </div>
        `;
    },

    // 졸업 앨범 템플릿
    renderAlbum: function(data) {
        const categoryOrder = ['moment', 'memory', 'person', 'favorite', 'future'];
        let sectionsHTML = '';

        categoryOrder.forEach(cat => {
            const info = categoryInfo[cat];
            const items = data.categories[cat].filter(item => item.trim());
            if (items.length > 0) {
                sectionsHTML += `
                    <div class="album-section">
                        <h3 class="album-title">${info.icon} ${info.title}</h3>
                        <div class="album-items">
                            ${items.map(item =>
                                `<div class="album-card">${escapeHtml(item)}</div>`
                            ).join('')}
                        </div>
                    </div>
                `;
            }
        });

        // 사진 갤러리 (큰 사이즈)
        let photosHTML = '';
        if (data.images && data.images.length > 0) {
            photosHTML = `
                <div class="album-section">
                    <h3 class="album-title">📸 우리들의 추억</h3>
                    <div class="photo-grid">
                        ${data.images.map(img => `
                            <div class="photo-frame">
                                <img src="${img.data}" alt="${escapeHtml(img.name)}">
                                <div class="photo-caption">${escapeHtml(img.name)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // 편지
        let letterHTML = '';
        if (data.letter.to) {
            letterHTML = `
                <div class="album-section">
                    <h3 class="album-title">💌 마음을 담은 편지</h3>
                    <div class="album-letter">
                        <div class="letter-to">To. ${escapeHtml(data.letter.to)}</div>
                        <div class="letter-body">
                            ${data.letter.content ? `<p>${escapeHtml(data.letter.content)}</p>` : ''}
                            ${data.letter.feeling ? `<p>${escapeHtml(data.letter.feeling)}</p>` : ''}
                            ${data.letter.promise ? `<p>${escapeHtml(data.letter.promise)}</p>` : ''}
                        </div>
                        <div class="letter-from">From. ${escapeHtml(data.userName)}</div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="template-album">
                <div class="album-cover">
                    <div class="graduation-cap">🎓</div>
                    <h1>${escapeHtml(data.userName)}의 추억 앨범</h1>
                    <p>Memories</p>
                </div>
                ${photosHTML}
                ${sectionsHTML}
                ${letterHTML}
            </div>
        `;
    },

    // 컬러풀 스토리북 템플릿
    renderColorful: function(data) {
        const categoryOrder = ['moment', 'memory', 'person', 'favorite', 'future'];
        const colors = ['#FFE5E5', '#E5F5FF', '#FFF9E5', '#F0E5FF', '#E5FFEE'];
        let sectionsHTML = '';

        categoryOrder.forEach((cat, index) => {
            const info = categoryInfo[cat];
            const items = data.categories[cat].filter(item => item.trim());
            if (items.length > 0) {
                sectionsHTML += `
                    <div class="colorful-block" style="background: linear-gradient(135deg, ${colors[index]} 0%, ${colors[index]}88 100%);">
                        <div class="block-icon">${info.icon}</div>
                        <h3 class="block-title">${info.title}</h3>
                        <div class="block-items">
                            ${items.map(item =>
                                `<div class="speech-bubble">${escapeHtml(item)}</div>`
                            ).join('')}
                        </div>
                    </div>
                `;
            }
        });

        // 사진
        let imagesHTML = '';
        if (data.images && data.images.length > 0) {
            imagesHTML = `
                <div class="colorful-block" style="background: linear-gradient(135deg, #FFDEE5 0%, #FFDEE588 100%);">
                    <div class="block-icon">📸</div>
                    <h3 class="block-title">추억 사진</h3>
                    <div class="colorful-images">
                        ${data.images.map(img =>
                            `<img src="${img.data}" alt="${escapeHtml(img.name)}">`
                        ).join('')}
                    </div>
                </div>
            `;
        }

        // 편지
        let letterHTML = '';
        if (data.letter.to) {
            letterHTML = `
                <div class="colorful-block" style="background: linear-gradient(135deg, #FFE5F5 0%, #FFE5F588 100%);">
                    <div class="block-icon">💌</div>
                    <h3 class="block-title">감사 편지</h3>
                    <div class="colorful-letter">
                        <div class="letter-bubble">
                            <strong>To. ${escapeHtml(data.letter.to)}</strong>
                            ${data.letter.content ? `<p>${escapeHtml(data.letter.content)}</p>` : ''}
                            ${data.letter.feeling ? `<p>${escapeHtml(data.letter.feeling)}</p>` : ''}
                            ${data.letter.promise ? `<p>${escapeHtml(data.letter.promise)}</p>` : ''}
                            <div class="bubble-from">From. ${escapeHtml(data.userName)}</div>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="template-colorful">
                <div class="rainbow-header">
                    <h1 class="colorful-title">${escapeHtml(data.userName)}의 돌아봄</h1>
                    <p class="colorful-subtitle">알록달록 추억 이야기</p>
                </div>
                ${sectionsHTML}
                ${imagesHTML}
                ${letterHTML}
            </div>
        `;
    },

    // 미니멀 모던 템플릿
    renderMinimal: function(data) {
        const categoryOrder = ['moment', 'memory', 'person', 'favorite', 'future'];
        let sectionsHTML = '';

        categoryOrder.forEach(cat => {
            const info = categoryInfo[cat];
            const items = data.categories[cat].filter(item => item.trim());
            if (items.length > 0) {
                sectionsHTML += `
                    <div class="minimal-section">
                        <h3 class="minimal-title">
                            <span class="title-icon">${info.icon}</span>
                            ${info.title}
                        </h3>
                        <ul class="minimal-list">
                            ${items.map((item, idx) =>
                                `<li><span class="item-number">${String(idx + 1).padStart(2, '0')}</span> ${escapeHtml(item)}</li>`
                            ).join('')}
                        </ul>
                    </div>
                `;
            }
        });

        // 사진
        let imagesHTML = '';
        if (data.images && data.images.length > 0) {
            imagesHTML = `
                <div class="minimal-section">
                    <h3 class="minimal-title">
                        <span class="title-icon">📸</span>
                        추억
                    </h3>
                    <div class="minimal-images">
                        ${data.images.map(img =>
                            `<div class="minimal-photo"><img src="${img.data}" alt="${escapeHtml(img.name)}"></div>`
                        ).join('')}
                    </div>
                </div>
            `;
        }

        // 편지
        let letterHTML = '';
        if (data.letter.to) {
            letterHTML = `
                <div class="minimal-section">
                    <h3 class="minimal-title">
                        <span class="title-icon">💌</span>
                        감사
                    </h3>
                    <div class="minimal-letter">
                        <div class="letter-recipient">To. ${escapeHtml(data.letter.to)}</div>
                        <div class="letter-text">
                            ${data.letter.content ? `<p>${escapeHtml(data.letter.content)}</p>` : ''}
                            ${data.letter.feeling ? `<p>${escapeHtml(data.letter.feeling)}</p>` : ''}
                            ${data.letter.promise ? `<p>${escapeHtml(data.letter.promise)}</p>` : ''}
                        </div>
                        <div class="letter-sender">${escapeHtml(data.userName)}</div>
                    </div>
                </div>
            `;
        }

        // 동적 연도 계산 (초등학교 6년: 현재년도 - 6 ~ 현재년도)
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 6;
        const yearRange = `${startYear}—${currentYear}`;

        return `
            <div class="template-minimal">
                <header class="minimal-header">
                    <h1 class="minimal-main-title">${escapeHtml(data.userName)}</h1>
                    <div class="minimal-divider"></div>
                    <p class="minimal-subtitle">REFLECTION · ${yearRange}</p>
                </header>
                ${sectionsHTML}
                ${imagesHTML}
                ${letterHTML}
                <footer class="minimal-footer">
                    ${getDateString()}
                </footer>
            </div>
        `;
    },

    // 타임라인 스크랩북 템플릿
    renderTimeline: function(data) {
        const categoryOrder = ['moment', 'memory', 'person', 'favorite', 'future'];
        let timelineHTML = '';

        categoryOrder.forEach(cat => {
            const info = categoryInfo[cat];
            const items = data.categories[cat].filter(item => item.trim());
            if (items.length > 0) {
                timelineHTML += `
                    <div class="timeline-item">
                        <div class="timeline-pin">${info.icon}</div>
                        <div class="timeline-content">
                            <h3 class="timeline-title">${info.title}</h3>
                            <div class="scrapbook-items">
                                ${items.map(item =>
                                    `<div class="scrapbook-note">${escapeHtml(item)}</div>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        // 사진
        let imagesHTML = '';
        if (data.images && data.images.length > 0) {
            imagesHTML = `
                <div class="timeline-item">
                    <div class="timeline-pin">📸</div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">추억 사진</h3>
                        <div class="timeline-photos">
                            ${data.images.map(img =>
                                `<div class="polaroid"><img src="${img.data}" alt="${escapeHtml(img.name)}"><div class="polaroid-caption">${escapeHtml(img.name)}</div></div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        // 편지
        let letterHTML = '';
        if (data.letter.to) {
            letterHTML = `
                <div class="timeline-item">
                    <div class="timeline-pin">💌</div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">감사 편지</h3>
                        <div class="timeline-letter">
                            <div class="washi-tape"></div>
                            <div class="letter-paper">
                                <div>To. ${escapeHtml(data.letter.to)}</div>
                                ${data.letter.content ? `<p>${escapeHtml(data.letter.content)}</p>` : ''}
                                ${data.letter.feeling ? `<p>${escapeHtml(data.letter.feeling)}</p>` : ''}
                                ${data.letter.promise ? `<p>${escapeHtml(data.letter.promise)}</p>` : ''}
                                <div class="letter-signature">From. ${escapeHtml(data.userName)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="template-timeline">
                <div class="scrapbook-header">
                    <h1 class="scrapbook-title">${escapeHtml(data.userName)}의 이야기</h1>
                    <div class="header-stickers">
                        <span class="sticker">⭐</span>
                        <span class="sticker">💝</span>
                        <span class="sticker">🌟</span>
                    </div>
                </div>
                <div class="timeline-container">
                    ${timelineHTML}
                    ${imagesHTML}
                    ${letterHTML}
                </div>
            </div>
        `;
    },

    // 페이퍼 아트 템플릿
    renderPaper: function(data) {
        const categoryOrder = ['moment', 'memory', 'person', 'favorite', 'future'];
        const layerColors = ['#FFF5E8', '#FFE8E8', '#E8F5FF', '#F5E8FF', '#E8FFE8'];
        let layersHTML = '';

        categoryOrder.forEach((cat, index) => {
            const info = categoryInfo[cat];
            const items = data.categories[cat].filter(item => item.trim());
            if (items.length > 0) {
                layersHTML += `
                    <div class="paper-layer" style="background: ${layerColors[index]};">
                        <div class="layer-icon">${info.icon}</div>
                        <h3 class="layer-title">${info.title}</h3>
                        <div class="layer-items">
                            ${items.map(item =>
                                `<div class="paper-item">${escapeHtml(item)}</div>`
                            ).join('')}
                        </div>
                    </div>
                `;
            }
        });

        // 사진
        let imagesHTML = '';
        if (data.images && data.images.length > 0) {
            imagesHTML = `
                <div class="paper-layer" style="background: #FFEFDB;">
                    <div class="layer-icon">📸</div>
                    <h3 class="layer-title">추억 사진</h3>
                    <div class="paper-images">
                        ${data.images.map(img =>
                            `<div class="paper-photo"><img src="${img.data}" alt="${escapeHtml(img.name)}"></div>`
                        ).join('')}
                    </div>
                </div>
            `;
        }

        // 편지
        let letterHTML = '';
        if (data.letter.to) {
            letterHTML = `
                <div class="paper-layer" style="background: #FFE8F5;">
                    <div class="layer-icon">💌</div>
                    <h3 class="layer-title">감사 편지</h3>
                    <div class="paper-letter">
                        <div class="letter-header">To. ${escapeHtml(data.letter.to)}</div>
                        <div class="letter-content">
                            ${data.letter.content ? `<p>${escapeHtml(data.letter.content)}</p>` : ''}
                            ${data.letter.feeling ? `<p>${escapeHtml(data.letter.feeling)}</p>` : ''}
                            ${data.letter.promise ? `<p>${escapeHtml(data.letter.promise)}</p>` : ''}
                        </div>
                        <div class="letter-footer">From. ${escapeHtml(data.userName)}</div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="template-paper">
                <div class="paper-header">
                    <h1 class="paper-title">${escapeHtml(data.userName)}의 돌아봄</h1>
                    <p class="paper-subtitle">감사의 기록</p>
                </div>
                ${layersHTML}
                ${imagesHTML}
                ${letterHTML}
                <div class="paper-footer">
                    <div class="footer-cutout">${getDateString()}</div>
                </div>
            </div>
        `;
    }
};

// 전역 함수로 노출 (다른 파일에서 사용)
window.templateSystem = templateSystem;
