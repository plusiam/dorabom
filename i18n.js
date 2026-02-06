/* ========================================
   돌아봄 - 다국어 지원 시스템
   Internationalization (i18n)
   ======================================== */

// 지원 언어
const LANGUAGES = {
    ko: '한국어',
    en: 'English',
    zh: '中文',
    vi: 'Tiếng Việt'
};

// 현재 언어
let currentLang = 'ko';

// 번역 데이터
const translations = {
    ko: {
        // 공통
        app_name: '돌아봄',
        back: '돌아가기',
        next: '다음으로',
        save: '저장하고 돌아가기',
        edit: '수정하기',
        reset: '처음부터 다시 하기',

        // 시작 화면
        start_title: '돌아봄',
        start_subtitle: '초등학교 6년, 감사했던 순간들',
        start_intro_1: '버킷리스트가 앞으로 하고 싶은 것이라면,',
        start_intro_2: '돌아봄은 지나온 시간에 대한 감사입니다.',
        start_button: '시작하기 ✨',

        // 이름 입력
        name_greeting: '안녕! 네 이름을 알려줘',
        name_placeholder: '이름을 입력해줘',

        // 카테고리
        category_moment: '의미 있던 순간',
        category_memory: '소중한 추억',
        category_person: '고마웠던 사람',
        category_favorite: '내가 좋아했던 것',
        category_future: '앞으로의 다짐',

        progress_label: '진행률',
        letter_button: '💌 감사 편지 쓰기',

        // 가이드 질문
        guide_toggle: '💭 질문 가이드',

        moment_guide_1: '가장 뿌듯했던 순간은 언제였나요?',
        moment_guide_2: '"내가 해냈다!"고 느꼈던 일이 있나요?',
        moment_guide_3: '힘들었지만 포기하지 않았던 경험은?',
        moment_guide_4: '처음으로 도전해본 일은 무엇인가요?',

        memory_guide_1: '친구들과 가장 재미있었던 일은?',
        memory_guide_2: '학교에서 있었던 잊지 못할 사건은?',
        memory_guide_3: '수학여행/현장학습에서의 추억은?',
        memory_guide_4: '웃음이 나는 재미있는 에피소드는?',

        person_guide_1: '힘들 때 도와준 친구는 누구인가요?',
        person_guide_2: '기억에 남는 선생님은 누구인가요?',
        person_guide_3: '언제나 응원해준 가족에게 고마운 점은?',
        person_guide_4: '나를 믿어준 사람은 누구인가요?',

        favorite_guide_1: '가장 재미있었던 수업/과목은?',
        favorite_guide_2: '학교에서 좋아했던 장소는?',
        favorite_guide_3: '즐거웠던 동아리/방과후 활동은?',
        favorite_guide_4: '점심시간에 자주 했던 일은?',

        future_guide_1: '중학교에 가서도 간직하고 싶은 것은?',
        future_guide_2: '계속 연락하고 싶은 친구는?',
        future_guide_3: '새로운 환경에서 지키고 싶은 나의 모습은?',
        future_guide_4: '미래의 나에게 해주고 싶은 말은?',

        // 감사 편지
        letter_title: '💌 감사 편지',
        letter_intro: '가장 고마운 사람에게 마음을 전해보세요',
        letter_to: 'To.',
        letter_from: 'From.',
        letter_to_placeholder: '받는 사람',
        letter_content_label: '고마웠던 일',
        letter_content_placeholder: '어떤 일이 고마웠나요?',
        letter_feeling_label: '그때 내 마음',
        letter_feeling_placeholder: '그때 어떤 기분이었나요?',
        letter_promise_label: '앞으로의 다짐',
        letter_promise_placeholder: '앞으로 어떻게 하고 싶나요?',
        letter_complete: '편지 완성하기',

        // 이미지
        images_title: '📸 추억 사진',
        images_add: '+ 사진 추가',
        images_empty: '아직 사진이 없어요. 추억 사진을 추가해보세요!',

        // 결과
        result_title: '의 돌아봄',
        result_subtitle: '초등학교 6년간의 감사 기록',
        save_image: '📷 이미지로 저장',
        save_pdf: '📄 PDF로 저장',
        backup_data: '💾 데이터 백업하기',
        import_data: '📂 데이터 불러오기',

        // 메시지
        alert_name_required: '이름을 입력해주세요!',
        alert_letter_required: '받는 사람과 고마웠던 일은 꼭 적어주세요!',
        alert_max_items: '최대 10개까지 입력할 수 있어요!',
        alert_max_images: '최대 5장까지 업로드할 수 있어요!',
        alert_image_size: '이미지 크기는 5MB 이하여야 합니다.',
        alert_delete_image: '이 사진을 삭제하시겠어요?',
        alert_reset_confirm: '정말 처음부터 다시 하시겠어요?\n모든 내용이 지워집니다.',
        alert_backup_success: '데이터가 백업되었습니다!\n파일을 안전한 곳에 보관해주세요.',
        alert_import_confirm: '불러온 데이터로 현재 데이터를 덮어쓰시겠어요?',
        alert_import_success: '데이터를 성공적으로 불러왔습니다!',
        alert_import_error: '파일을 읽는 중 오류가 발생했습니다.\n올바른 백업 파일인지 확인해주세요.',
        alert_no_data: '저장할 데이터가 없습니다.',

        footer_text: '돌아봄 - 지나온 시간에 대한 감사'
    },

    en: {
        // Common
        app_name: 'Reflection',
        back: 'Back',
        next: 'Next',
        save: 'Save & Return',
        edit: 'Edit',
        reset: 'Start Over',

        // Start screen
        start_title: 'Reflection',
        start_subtitle: '6 Years of Elementary School',
        start_intro_1: 'If bucket list is about what you want to do,',
        start_intro_2: 'Reflection is about gratitude for the past.',
        start_button: 'Start ✨',

        // Name input
        name_greeting: 'Hi! What\'s your name?',
        name_placeholder: 'Enter your name',

        // Categories
        category_moment: 'Meaningful Moments',
        category_memory: 'Precious Memories',
        category_person: 'People I\'m Grateful For',
        category_favorite: 'Things I Loved',
        category_future: 'Future Promises',

        progress_label: 'Progress',
        letter_button: '💌 Write Thank You Letter',

        // Guide questions
        guide_toggle: '💭 Question Guide',

        moment_guide_1: 'When did you feel most proud?',
        moment_guide_2: 'When did you feel "I did it!"?',
        moment_guide_3: 'When did you not give up despite difficulties?',
        moment_guide_4: 'What did you try for the first time?',

        memory_guide_1: 'What was the most fun with friends?',
        memory_guide_2: 'What unforgettable event happened at school?',
        memory_guide_3: 'What memories from field trips?',
        memory_guide_4: 'What funny episode do you remember?',

        person_guide_1: 'Who helped you when you were struggling?',
        person_guide_2: 'Which teacher do you remember?',
        person_guide_3: 'What are you grateful for to your family?',
        person_guide_4: 'Who believed in you?',

        favorite_guide_1: 'What was your favorite class/subject?',
        favorite_guide_2: 'What was your favorite place at school?',
        favorite_guide_3: 'What club/after-school activity did you enjoy?',
        favorite_guide_4: 'What did you often do during lunch?',

        future_guide_1: 'What do you want to keep in middle school?',
        future_guide_2: 'Which friends do you want to stay in touch with?',
        future_guide_3: 'What kind of person do you want to be?',
        future_guide_4: 'What do you want to tell your future self?',

        // Thank you letter
        letter_title: '💌 Thank You Letter',
        letter_intro: 'Share your gratitude with someone special',
        letter_to: 'To.',
        letter_from: 'From.',
        letter_to_placeholder: 'Recipient',
        letter_content_label: 'What I\'m grateful for',
        letter_content_placeholder: 'What made you grateful?',
        letter_feeling_label: 'How I felt',
        letter_feeling_placeholder: 'How did you feel then?',
        letter_promise_label: 'My promise',
        letter_promise_placeholder: 'What do you want to do?',
        letter_complete: 'Complete Letter',

        // Images
        images_title: '📸 Memory Photos',
        images_add: '+ Add Photo',
        images_empty: 'No photos yet. Add your memory photos!',

        // Result
        result_title: '\'s Reflection',
        result_subtitle: '6 Years of Gratitude',
        save_image: '📷 Save as Image',
        save_pdf: '📄 Save as PDF',
        backup_data: '💾 Backup Data',
        import_data: '📂 Import Data',

        // Messages
        alert_name_required: 'Please enter your name!',
        alert_letter_required: 'Please write the recipient and what you\'re grateful for!',
        alert_max_items: 'You can add up to 10 items!',
        alert_max_images: 'You can upload up to 5 photos!',
        alert_image_size: 'Image size must be under 5MB.',
        alert_delete_image: 'Delete this photo?',
        alert_reset_confirm: 'Are you sure you want to start over?\nAll data will be deleted.',
        alert_backup_success: 'Data backed up successfully!\nPlease keep the file safe.',
        alert_import_confirm: 'Overwrite current data with imported data?',
        alert_import_success: 'Data imported successfully!',
        alert_import_error: 'Error reading file.\nPlease check if it\'s a valid backup file.',
        alert_no_data: 'No data to save.',

        footer_text: 'Reflection - Gratitude for the Past'
    },

    zh: {
        // 공통
        app_name: '回顾',
        back: '返回',
        next: '下一步',
        save: '保存并返回',
        edit: '编辑',
        reset: '重新开始',

        // 시작 화면
        start_title: '回顾',
        start_subtitle: '过去时光的感恩记录',
        start_intro_1: '如果愿望清单是未来想做的事，',
        start_intro_2: '回顾就是对过去的感恩。',
        start_button: '开始 ✨',

        // 이름 입력
        name_greeting: '你好！请告诉我你的名字',
        name_placeholder: '输入名字',

        // 카테고리
        category_moment: '有意义的时刻',
        category_memory: '珍贵的回忆',
        category_person: '感谢的人',
        category_favorite: '我喜欢的事',
        category_future: '未来的决心',

        progress_label: '进度',
        letter_button: '💌 写感谢信',

        // 가이드 질문
        guide_toggle: '💭 问题指南',

        moment_guide_1: '最自豪的时刻是什么时候？',
        moment_guide_2: '有没有"我做到了！"的经历？',
        moment_guide_3: '虽然困难但没有放弃的经验是？',
        moment_guide_4: '第一次挑战的事情是什么？',

        memory_guide_1: '和一起的人最有趣的事是什么？',
        memory_guide_2: '有没有难忘的特别时刻？',
        memory_guide_3: '旅行或外出的回忆是？',
        memory_guide_4: '有什么好笑的趣事？',

        person_guide_1: '困难时帮助我的人是谁？',
        person_guide_2: '有没有印象深刻的导师或同事？',
        person_guide_3: '对总是支持我的家人有什么感激的？',
        person_guide_4: '相信我的人是谁？',

        favorite_guide_1: '最有趣的活动或事情是？',
        favorite_guide_2: '经常去的地方或空间是？',
        favorite_guide_3: '愉快的聚会或爱好活动是？',
        favorite_guide_4: '空闲时间经常做的事是？',

        future_guide_1: '今后想要珍惜的是什么？',
        future_guide_2: '想继续联系的人是？',
        future_guide_3: '在新环境中想保持的我的样子是？',
        future_guide_4: '想对未来的自己说什么？',

        // 감사 편지
        letter_title: '💌 感谢信',
        letter_intro: '向最感谢的人传达心意',
        letter_to: '致',
        letter_from: '来自',
        letter_to_placeholder: '收件人',
        letter_content_label: '感激的事',
        letter_content_placeholder: '什么事让你感激？',
        letter_feeling_label: '当时的心情',
        letter_feeling_placeholder: '那时是什么感觉？',
        letter_promise_label: '今后的决心',
        letter_promise_placeholder: '今后想怎么做？',
        letter_complete: '完成信件',

        // 이미지
        images_title: '📸 回忆照片',
        images_add: '+ 添加照片',
        images_empty: '还没有照片。添加回忆照片吧！',

        // 결과
        result_title: '的回顾',
        result_subtitle: '感恩记录',
        save_image: '📷 保存为图片',
        save_pdf: '📄 保存为PDF',
        backup_data: '💾 备份数据',
        import_data: '📂 导入数据',

        // 메시지
        alert_name_required: '请输入名字！',
        alert_letter_required: '请务必填写收件人和感激的事！',
        alert_max_items: '最多可以输入10项！',
        alert_max_images: '最多可以上传5张照片！',
        alert_image_size: '图片大小必须在5MB以下。',
        alert_delete_image: '要删除这张照片吗？',
        alert_reset_confirm: '真的要重新开始吗？\n所有内容将被删除。',
        alert_backup_success: '数据已备份！\n请妥善保管文件。',
        alert_import_confirm: '要用导入的数据覆盖当前数据吗？',
        alert_import_success: '成功导入数据！',
        alert_import_error: '读取文件时出错。\n请确认是否为正确的备份文件。',
        alert_no_data: '没有要保存的数据。',

        footer_text: '回顾 - 对过去的感恩'
    },

    vi: {
        // 공통
        app_name: 'Nhìn Lại',
        back: 'Quay lại',
        next: 'Tiếp theo',
        save: 'Lưu và quay lại',
        edit: 'Chỉnh sửa',
        reset: 'Bắt đầu lại',

        // 시작 화면
        start_title: 'Nhìn Lại',
        start_subtitle: 'Ghi nhận lòng biết ơn về thời gian đã qua',
        start_intro_1: 'Nếu danh sách ước mơ là về tương lai,',
        start_intro_2: 'Nhìn lại là về lòng biết ơn quá khứ.',
        start_button: 'Bắt đầu ✨',

        // 이름 입력
        name_greeting: 'Xin chào! Tên bạn là gì?',
        name_placeholder: 'Nhập tên',

        // 카테고리
        category_moment: 'Khoảnh khắc ý nghĩa',
        category_memory: 'Kỷ niệm quý giá',
        category_person: 'Người tôi biết ơn',
        category_favorite: 'Điều tôi yêu thích',
        category_future: 'Quyết tâm tương lai',

        progress_label: 'Tiến độ',
        letter_button: '💌 Viết thư cảm ơn',

        // 가이드 질문
        guide_toggle: '💭 Hướng dẫn câu hỏi',

        moment_guide_1: 'Khoảnh khắc tự hào nhất là khi nào?',
        moment_guide_2: 'Có trải nghiệm nào "Tôi đã làm được!"?',
        moment_guide_3: 'Kinh nghiệm khó khăn nhưng không bỏ cuộc là?',
        moment_guide_4: 'Việc thử thách lần đầu tiên là gì?',

        memory_guide_1: 'Điều thú vị nhất với những người cùng làm là?',
        memory_guide_2: 'Có khoảnh khắc đặc biệt nào khó quên không?',
        memory_guide_3: 'Ký ức từ chuyến đi hay dã ngoại?',
        memory_guide_4: 'Có câu chuyện buồn cười nào không?',

        person_guide_1: 'Ai đã giúp đỡ khi tôi khó khăn?',
        person_guide_2: 'Có người cố vấn hoặc đồng nghiệp nào đáng nhớ?',
        person_guide_3: 'Điều biết ơn gia đình luôn ủng hộ tôi?',
        person_guide_4: 'Ai đã tin tưởng tôi?',

        favorite_guide_1: 'Hoạt động hay việc thú vị nhất là?',
        favorite_guide_2: 'Nơi hay không gian thường đến là?',
        favorite_guide_3: 'Buổi họp mặt hay sở thích vui vẻ là?',
        favorite_guide_4: 'Việc thường làm trong thời gian rảnh là?',

        future_guide_1: 'Điều muốn giữ gìn trong tương lai là?',
        future_guide_2: 'Người muốn tiếp tục liên lạc là?',
        future_guide_3: 'Hình ảnh bản thân muốn giữ trong môi trường mới?',
        future_guide_4: 'Muốn nói gì với bản thân tương lai?',

        // 감사 편지
        letter_title: '💌 Thư cảm ơn',
        letter_intro: 'Gửi lời cảm ơn đến người đặc biệt nhất',
        letter_to: 'Gửi',
        letter_from: 'Từ',
        letter_to_placeholder: 'Người nhận',
        letter_content_label: 'Điều biết ơn',
        letter_content_placeholder: 'Điều gì khiến bạn biết ơn?',
        letter_feeling_label: 'Cảm giác lúc đó',
        letter_feeling_placeholder: 'Cảm giác lúc đó như thế nào?',
        letter_promise_label: 'Quyết tâm',
        letter_promise_placeholder: 'Muốn làm gì trong tương lai?',
        letter_complete: 'Hoàn thành thư',

        // 이미지
        images_title: '📸 Ảnh kỷ niệm',
        images_add: '+ Thêm ảnh',
        images_empty: 'Chưa có ảnh. Thêm ảnh kỷ niệm nhé!',

        // 결과
        result_title: ' của tôi',
        result_subtitle: 'Ghi nhận lòng biết ơn',
        save_image: '📷 Lưu dạng ảnh',
        save_pdf: '📄 Lưu dạng PDF',
        backup_data: '💾 Sao lưu dữ liệu',
        import_data: '📂 Nhập dữ liệu',

        // 메시지
        alert_name_required: 'Vui lòng nhập tên!',
        alert_letter_required: 'Vui lòng nhập người nhận và điều biết ơn!',
        alert_max_items: 'Có thể nhập tối đa 10 mục!',
        alert_max_images: 'Có thể tải lên tối đa 5 ảnh!',
        alert_image_size: 'Kích thước ảnh phải dưới 5MB.',
        alert_delete_image: 'Xóa ảnh này?',
        alert_reset_confirm: 'Bạn có chắc muốn bắt đầu lại?\nTất cả nội dung sẽ bị xóa.',
        alert_backup_success: 'Đã sao lưu dữ liệu!\nVui lòng giữ file an toàn.',
        alert_import_confirm: 'Ghi đè dữ liệu hiện tại với dữ liệu nhập?',
        alert_import_success: 'Nhập dữ liệu thành công!',
        alert_import_error: 'Lỗi đọc file.\nVui lòng kiểm tra file sao lưu hợp lệ.',
        alert_no_data: 'Không có dữ liệu để lưu.',

        footer_text: 'Nhìn Lại - Biết ơn quá khứ'
    }
};

// 번역 가져오기
function t(key) {
    return translations[currentLang][key] || translations['ko'][key] || key;
}

// 언어 변경
function changeLanguage(lang) {
    if (!LANGUAGES[lang]) {
        console.error('Unsupported language:', lang);
        return;
    }

    currentLang = lang;
    localStorage.setItem('dorabom-lang', lang);

    // 언어 버튼 활성화 상태 업데이트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    updatePageLanguage();
}

// 페이지 언어 업데이트
function updatePageLanguage() {
    // data-i18n 속성을 가진 모든 요소 업데이트
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });

    // placeholder 업데이트
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });

    // aria-label 업데이트
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        element.setAttribute('aria-label', t(key));
    });

    // categoryInfo 재로드
    if (typeof updateCategoryInfo === 'function') {
        updateCategoryInfo();
    }

    // 현재 화면 다시 렌더링
    if (typeof renderCurrentCategory === 'function' && currentCategory) {
        renderCurrentCategory();
    }
}

// 초기화
function initI18n() {
    const savedLang = localStorage.getItem('dorabom-lang') || 'ko';
    changeLanguage(savedLang);
}
