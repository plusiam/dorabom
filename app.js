/* ========================================
   돌아봄 - 6학년 졸업 감사 리스트
   메인 JavaScript
   ======================================== */

// ==================== 데이터 구조 ====================
// 앱 데이터 (LocalStorage에 저장됨)
let appData = {
    userName: '',
    categories: {
        moment: [],    // 의미 있던 순간
        memory: [],    // 소중한 추억
        person: [],    // 고마웠던 사람
        favorite: [],  // 내가 좋아했던 것
        future: []     // 앞으로의 다짐
    },
    letter: {
        to: '',
        content: '',
        feeling: '',
        promise: ''
    },
    images: [],        // 추억 사진 (Base64)
    completedCategories: []
};

// 카테고리 정보
const categoryInfo = {
    moment: {
        icon: '⭐',
        title: '의미 있던 순간',
        guides: [
            '가장 뿌듯했던 순간은 언제였나요?',
            '"내가 해냈다!"고 느꼈던 일이 있나요?',
            '힘들었지만 포기하지 않았던 경험은?',
            '처음으로 도전해본 일은 무엇인가요?'
        ]
    },
    memory: {
        icon: '📸',
        title: '소중한 추억',
        guides: [
            '친구들과 가장 재미있었던 일은?',
            '학교에서 있었던 잊지 못할 사건은?',
            '수학여행/현장학습에서의 추억은?',
            '웃음이 나는 재미있는 에피소드는?'
        ]
    },
    person: {
        icon: '💝',
        title: '고마웠던 사람',
        guides: [
            '힘들 때 도와준 친구는 누구인가요?',
            '기억에 남는 선생님은 누구인가요?',
            '언제나 응원해준 가족에게 고마운 점은?',
            '나를 믿어준 사람은 누구인가요?'
        ]
    },
    favorite: {
        icon: '🌟',
        title: '내가 좋아했던 것',
        guides: [
            '가장 재미있었던 수업/과목은?',
            '학교에서 좋아했던 장소는?',
            '즐거웠던 동아리/방과후 활동은?',
            '점심시간에 자주 했던 일은?'
        ]
    },
    future: {
        icon: '🌱',
        title: '앞으로의 다짐',
        guides: [
            '중학교에 가서도 간직하고 싶은 것은?',
            '계속 연락하고 싶은 친구는?',
            '새로운 환경에서 지키고 싶은 나의 모습은?',
            '미래의 나에게 해주고 싶은 말은?'
        ]
    }
};

// 현재 선택된 카테고리
let currentCategory = '';

// ==================== 접근성 유틸리티 ====================
// 스크린 리더 알림 함수
function announceToScreenReader(message, priority = 'polite') {
    const announcerId = priority === 'assertive' ? 'a11y-announce' : 'a11y-status';
    let announcer = document.getElementById(announcerId);

    // 알림 요소가 없으면 생성
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = announcerId;
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
    }

    // 메시지 설정 (변경 감지를 위해 빈 문자열로 먼저 설정)
    announcer.textContent = '';
    setTimeout(() => {
        announcer.textContent = message;
    }, 100);
}

// 화면 제목 가져오기 (스크린 리더용)
function getScreenTitle(screenId) {
    const titles = {
        'screen-start': t('start_title') || '돌아봄 시작',
        'screen-name': t('name_greeting') || '이름 입력',
        'screen-hub': (appData.userName || '친구') + '의 돌아봄',
        'screen-category': categoryInfo[currentCategory]?.title || '카테고리',
        'screen-letter': t('letter_title') || '감사 편지',
        'screen-result': (appData.userName || '친구') + t('result_title') || '결과 화면'
    };
    return titles[screenId] || '화면';
}

// ==================== 초기화 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 다국어 초기화
    if (typeof initI18n === 'function') {
        initI18n();
    }

    loadData();
    updateUI();

    // 이름 입력 필드 엔터 키 처리
    document.getElementById('user-name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveName();
        }
    });
});

// ==================== 데이터 저장/불러오기 ====================
// LocalStorage에서 데이터 불러오기
function loadData() {
    const saved = localStorage.getItem('dorabom-data');
    if (saved) {
        appData = JSON.parse(saved);
    }
}

// LocalStorage에 데이터 저장
function saveData() {
    localStorage.setItem('dorabom-data', JSON.stringify(appData));
}

// ==================== 화면 전환 ====================
function goToScreen(screenId) {
    // 모든 화면 숨기기
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // 선택한 화면 표시
    const targetScreen = document.getElementById(screenId);
    targetScreen.classList.add('active');

    // 화면별 초기화
    if (screenId === 'screen-hub') {
        updateHubUI();
    } else if (screenId === 'screen-letter') {
        loadLetterData();
    } else if (screenId === 'screen-result') {
        renderResult();
    }

    // 스크롤 맨 위로
    window.scrollTo(0, 0);

    // 접근성: 포커스 관리
    setTimeout(() => {
        // 화면 내 첫 번째 포커스 가능한 요소 또는 제목에 포커스
        const focusTarget = targetScreen.querySelector('h1, h2, [autofocus], input:not([type="hidden"]), button.btn-primary');
        if (focusTarget) {
            // 제목 요소는 tabindex 추가하여 포커스 가능하게
            if (focusTarget.tagName === 'H1' || focusTarget.tagName === 'H2') {
                focusTarget.setAttribute('tabindex', '-1');
            }
            focusTarget.focus();
        }
    }, 100);

    // 접근성: 스크린 리더에 화면 전환 알림
    announceToScreenReader(getScreenTitle(screenId) + ' 화면으로 이동했습니다');
}

// ==================== UI 업데이트 ====================
function updateUI() {
    // 이름이 저장되어 있으면 허브로 바로 이동
    if (appData.userName) {
        updateDisplayName();
        // 자동으로 허브로 이동하지 않음 (시작 화면 유지)
    }
}

// 이름 표시 업데이트
function updateDisplayName() {
    const name = appData.userName || '친구';
    document.getElementById('display-name').textContent = name;
    document.getElementById('letter-from-name').textContent = name;
    document.getElementById('result-name').textContent = name;
}

// 허브 UI 업데이트
function updateHubUI() {
    updateDisplayName();

    // 각 카테고리 완료 상태 표시
    const categories = ['moment', 'memory', 'person', 'favorite', 'future'];
    let completedCount = 0;

    categories.forEach(cat => {
        const card = document.querySelector(`[data-category="${cat}"]`);
        const isCompleted = appData.categories[cat].length > 0;

        if (isCompleted) {
            card.classList.add('completed');
            completedCount++;
        } else {
            card.classList.remove('completed');
        }
    });

    // 진행률 업데이트
    document.getElementById('progress-count').textContent = completedCount;
    document.getElementById('progress-fill').style.width = (completedCount / 5 * 100) + '%';

    // ARIA 속성 업데이트
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', completedCount);
        progressBar.setAttribute('aria-label', `5개 카테고리 중 ${completedCount}개 완료`);
    }

    // 5개 완료 시 편지 버튼 활성화
    const letterBtn = document.getElementById('btn-letter');
    if (completedCount >= 5) {
        letterBtn.disabled = false;
        letterBtn.setAttribute('aria-disabled', 'false');
    } else {
        letterBtn.disabled = true;
        letterBtn.setAttribute('aria-disabled', 'true');
    }
}

// ==================== 이름 저장 ====================
function saveName() {
    const nameInput = document.getElementById('user-name');
    const name = nameInput.value.trim();

    if (!name) {
        nameInput.focus();
        nameInput.classList.add('shake');
        setTimeout(() => nameInput.classList.remove('shake'), 500);
        return;
    }

    appData.userName = name;
    saveData();
    updateDisplayName();
    goToScreen('screen-hub');
}

// ==================== 카테고리 관련 ====================
// 카테고리 열기
function openCategory(category) {
    currentCategory = category;
    const info = categoryInfo[category];

    // 카테고리 정보 표시
    document.getElementById('current-category-icon').textContent = info.icon;
    document.getElementById('current-category-title').textContent = info.title;

    // 질문 가이드 렌더링
    const guideContent = document.getElementById('guide-content');
    guideContent.innerHTML = info.guides.map(g => `<p>${g}</p>`).join('');

    // 기존 입력 항목 렌더링
    renderItems();

    // 화면 전환
    goToScreen('screen-category');
}

// 질문 가이드 토글
function toggleGuide() {
    const content = document.getElementById('guide-content');
    const arrow = document.getElementById('guide-arrow');
    const button = document.querySelector('.guide-toggle');

    content.classList.toggle('open');
    const isOpen = content.classList.contains('open');
    arrow.textContent = isOpen ? '▲' : '▼';

    // 접근성: aria-expanded 업데이트
    if (button) {
        button.setAttribute('aria-expanded', isOpen.toString());
    }
}

// 입력 항목 렌더링
function renderItems() {
    const container = document.getElementById('items-container');
    const items = appData.categories[currentCategory];

    // 최소 3개 항목 보장
    while (items.length < 3) {
        items.push('');
    }

    container.innerHTML = items.map((item, index) => `
        <div class="item-input">
            <input type="text"
                   value="${escapeHtml(item)}"
                   placeholder="${index + 1}번째 항목"
                   onchange="updateItem(${index}, this.value)"
                   onkeypress="handleItemKeypress(event, ${index})">
            ${items.length > 3 ? `<button class="item-delete" onclick="deleteItem(${index})">×</button>` : ''}
        </div>
    `).join('');
}

// 항목 추가
function addItem() {
    if (appData.categories[currentCategory].length >= 10) {
        alert('최대 10개까지 입력할 수 있어요!');
        return;
    }
    appData.categories[currentCategory].push('');
    renderItems();

    // 새 항목에 포커스
    const inputs = document.querySelectorAll('.item-input input');
    inputs[inputs.length - 1].focus();
}

// 항목 업데이트
function updateItem(index, value) {
    appData.categories[currentCategory][index] = value;
}

// 항목 삭제
function deleteItem(index) {
    appData.categories[currentCategory].splice(index, 1);
    renderItems();
}

// 엔터 키 처리
function handleItemKeypress(event, index) {
    if (event.key === 'Enter') {
        const inputs = document.querySelectorAll('.item-input input');
        if (index < inputs.length - 1) {
            inputs[index + 1].focus();
        } else {
            addItem();
        }
    }
}

// 카테고리 저장
function saveCategory() {
    // 빈 항목 제거
    appData.categories[currentCategory] = appData.categories[currentCategory].filter(item => item.trim());

    saveData();
    goToScreen('screen-hub');
}

// ==================== 감사 편지 ====================
// 편지 데이터 불러오기
function loadLetterData() {
    document.getElementById('letter-to').value = appData.letter.to || '';
    document.getElementById('letter-content').value = appData.letter.content || '';
    document.getElementById('letter-feeling').value = appData.letter.feeling || '';
    document.getElementById('letter-promise').value = appData.letter.promise || '';
    document.getElementById('letter-from-name').textContent = appData.userName || '친구';
    renderImages();
}

// 편지 저장
function saveLetter() {
    appData.letter = {
        to: document.getElementById('letter-to').value.trim(),
        content: document.getElementById('letter-content').value.trim(),
        feeling: document.getElementById('letter-feeling').value.trim(),
        promise: document.getElementById('letter-promise').value.trim()
    };

    if (!appData.letter.to || !appData.letter.content) {
        alert('받는 사람과 고마웠던 일은 꼭 적어주세요!');
        return;
    }

    saveData();
    goToScreen('screen-result');
}

// ==================== 결과 화면 ====================
function renderResult() {
    const container = document.getElementById('result-content');
    let html = '';

    // 각 카테고리 렌더링
    const categoryOrder = ['moment', 'memory', 'person', 'favorite', 'future'];

    categoryOrder.forEach(cat => {
        const info = categoryInfo[cat];
        const items = appData.categories[cat].filter(item => item.trim());

        if (items.length > 0) {
            html += `
                <div class="result-section">
                    <div class="result-section-title">
                        <span>${info.icon}</span> ${info.title}
                    </div>
                    <ul class="result-items">
                        ${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    });

    // 추억 사진 렌더링
    if (appData.images && appData.images.length > 0) {
        html += `
            <div class="result-section">
                <div class="result-section-title">
                    <span>📸</span> 추억 사진
                </div>
                <div class="result-images">
                    ${appData.images.map(img => `<img src="${img.data}" alt="${escapeHtml(img.name)}">`).join('')}
                </div>
            </div>
        `;
    }

    // 편지 렌더링
    if (appData.letter.to) {
        html += `
            <div class="result-section">
                <div class="result-section-title">
                    <span>💌</span> 감사 편지
                </div>
                <div class="result-letter">
                    <div class="result-letter-to">To. ${escapeHtml(appData.letter.to)}</div>
                    <div class="result-letter-content">
                        ${appData.letter.content ? `<p>${escapeHtml(appData.letter.content)}</p>` : ''}
                        ${appData.letter.feeling ? `<p>${escapeHtml(appData.letter.feeling)}</p>` : ''}
                        ${appData.letter.promise ? `<p>${escapeHtml(appData.letter.promise)}</p>` : ''}
                    </div>
                    <div class="result-letter-from">From. ${escapeHtml(appData.userName)}</div>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

// ==================== 저장 기능 ====================
// 이미지로 저장
async function saveAsImage() {
    const captureArea = document.getElementById('capture-area');

    // 캡처용 HTML 생성
    captureArea.innerHTML = createCaptureHTML();
    captureArea.style.left = '0';
    captureArea.style.position = 'fixed';
    captureArea.style.top = '0';
    captureArea.style.zIndex = '-1';

    try {
        const canvas = await html2canvas(captureArea, {
            scale: 2,
            backgroundColor: '#FFF9F0',
            useCORS: true
        });

        // 다운로드
        const link = document.createElement('a');
        link.download = `돌아봄_${appData.userName}_${getDateString()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

    } catch (error) {
        console.error('이미지 저장 실패:', error);
        alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
        captureArea.style.left = '-9999px';
        captureArea.style.position = 'absolute';
    }
}

// PDF로 저장
async function saveAsPDF() {
    const captureArea = document.getElementById('capture-area');

    // 캡처용 HTML 생성
    captureArea.innerHTML = createCaptureHTML();
    captureArea.style.left = '0';
    captureArea.style.position = 'fixed';
    captureArea.style.top = '0';
    captureArea.style.zIndex = '-1';

    try {
        const canvas = await html2canvas(captureArea, {
            scale: 2,
            backgroundColor: '#FFF9F0',
            useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;

        // A4 세로 기준
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // 이미지 비율 계산
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.9;

        const finalWidth = imgWidth * ratio;
        const finalHeight = imgHeight * ratio;
        const x = (pdfWidth - finalWidth) / 2;
        const y = 10;

        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
        pdf.save(`돌아봄_${appData.userName}_${getDateString()}.pdf`);

    } catch (error) {
        console.error('PDF 저장 실패:', error);
        alert('PDF 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
        captureArea.style.left = '-9999px';
        captureArea.style.position = 'absolute';
    }
}

// 캡처용 HTML 생성
function createCaptureHTML() {
    let sectionsHTML = '';
    const categoryOrder = ['moment', 'memory', 'person', 'favorite', 'future'];

    categoryOrder.forEach(cat => {
        const info = categoryInfo[cat];
        const items = appData.categories[cat].filter(item => item.trim());

        if (items.length > 0) {
            sectionsHTML += `
                <div class="capture-section">
                    <div class="capture-section-title">
                        <span>${info.icon}</span> ${info.title}
                    </div>
                    <ul class="capture-items">
                        ${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    });

    // 추억 사진
    if (appData.images && appData.images.length > 0) {
        sectionsHTML += `
            <div class="capture-section">
                <div class="capture-section-title">
                    <span>📸</span> 추억 사진
                </div>
                <div class="capture-images">
                    ${appData.images.map(img => `<img src="${img.data}" alt="${escapeHtml(img.name)}" style="max-width: 200px; margin: 8px; border-radius: 8px;">`).join('')}
                </div>
            </div>
        `;
    }

    // 편지
    if (appData.letter.to) {
        sectionsHTML += `
            <div class="capture-section">
                <div class="capture-section-title">
                    <span>💌</span> 감사 편지
                </div>
                <div class="capture-letter">
                    <div class="capture-letter-to">To. ${escapeHtml(appData.letter.to)}</div>
                    <div class="capture-letter-content">
                        ${appData.letter.content ? escapeHtml(appData.letter.content) + '<br><br>' : ''}
                        ${appData.letter.feeling ? escapeHtml(appData.letter.feeling) + '<br><br>' : ''}
                        ${appData.letter.promise ? escapeHtml(appData.letter.promise) : ''}
                    </div>
                    <div class="capture-letter-from">From. ${escapeHtml(appData.userName)}</div>
                </div>
            </div>
        `;
    }

    return `
        <div class="capture-card">
            <div class="capture-header">
                <h1>🎓 ${escapeHtml(appData.userName)}의 돌아봄</h1>
                <p>초등학교 6년간의 감사 기록</p>
            </div>
            ${sectionsHTML}
            <div class="capture-footer">
                돌아봄 - 지나온 시간에 대한 감사 | ${getDateString()}
            </div>
        </div>
    `;
}

// ==================== 유틸리티 ====================
// HTML 이스케이프
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 날짜 문자열
function getDateString() {
    const now = new Date();
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
}

// ==================== 이미지 관리 ====================
// 이미지 업로드
function uploadImage() {
    if (appData.images.length >= 5) {
        alert('최대 5장까지 업로드할 수 있어요!');
        return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 파일 크기 체크 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('이미지 크기는 5MB 이하여야 합니다.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = {
                id: Date.now(),
                data: event.target.result,
                name: file.name
            };
            appData.images.push(imageData);
            saveData();
            renderImages();
        };
        reader.readAsDataURL(file);
    };

    input.click();
}

// 이미지 삭제
function deleteImage(id) {
    if (confirm('이 사진을 삭제하시겠어요?')) {
        appData.images = appData.images.filter(img => img.id !== id);
        saveData();
        renderImages();
    }
}

// 이미지 렌더링
function renderImages() {
    const container = document.getElementById('images-container');
    if (!container) return;

    if (appData.images.length === 0) {
        container.innerHTML = '<p class="no-images">아직 사진이 없어요. 추억 사진을 추가해보세요!</p>';
        return;
    }

    container.innerHTML = appData.images.map(img => `
        <div class="image-item">
            <img src="${img.data}" alt="${escapeHtml(img.name)}">
            <button class="image-delete" onclick="deleteImage(${img.id})">×</button>
        </div>
    `).join('');
}

// ==================== 데이터 백업/복원 ====================
// 데이터를 JSON 파일로 내보내기
function exportData() {
    if (!appData.userName) {
        alert('저장할 데이터가 없습니다.');
        return;
    }

    const dataStr = JSON.stringify(appData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = `돌아봄_백업_${appData.userName}_${getDateString()}.json`;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
    alert('데이터가 백업되었습니다!\n파일을 안전한 곳에 보관해주세요.');
}

// JSON 파일에서 데이터 불러오기
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);

                // 데이터 구조 검증
                if (!importedData.userName || !importedData.categories) {
                    throw new Error('올바른 백업 파일이 아닙니다.');
                }

                if (confirm('불러온 데이터로 현재 데이터를 덮어쓰시겠어요?')) {
                    appData = importedData;
                    saveData();
                    updateUI();
                    goToScreen('screen-hub');
                    alert('데이터를 성공적으로 불러왔습니다!');
                }
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
                alert('파일을 읽는 중 오류가 발생했습니다.\n올바른 백업 파일인지 확인해주세요.');
            }
        };
        reader.readAsText(file);
    };

    input.click();
}

// 모든 데이터 초기화
function resetAll() {
    if (confirm('정말 처음부터 다시 하시겠어요?\n모든 내용이 지워집니다.')) {
        localStorage.removeItem('dorabom-data');
        appData = {
            userName: '',
            categories: {
                moment: [],
                memory: [],
                person: [],
                favorite: [],
                future: []
            },
            letter: {
                to: '',
                content: '',
                feeling: '',
                promise: ''
            },
            images: [],
            completedCategories: []
        };
        document.getElementById('user-name').value = '';
        goToScreen('screen-start');
    }
}
