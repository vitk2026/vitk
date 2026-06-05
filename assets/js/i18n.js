/**
 * ВИТК — Система двуязычности (казахский / русский)
 * По умолчанию: казахский
 */

const TRANSLATIONS = {
  kk: {
    /* Шапка */
    college_name_top: "Жоғары инженерлік-технологиялық колледжі",
    college_type:     "Мемлекеттік емес білім беру мекемесі",
    college_name_sub: "МЕББМ «ЖИТК»",

    /* Навигация */
    nav_home:              "Басты бет",
    nav_about:             "Біз туралы",
    nav_about_general:     "Жалпы ақпарат",
    nav_about_structure:   "Колледж құрылымы",
    nav_administrations:    "Әкімшілік",
    nav_abiturient:          "Абитуриентке",
    nav_specs:              "Мамандықтар",
    nav_docs:               "Құжаттарды тапсыру ережелері",
    nav_time:               "Мерзімдер",
    nav_kvota:              "Квота",
    nav_plan:               "Қабылдау жоспары",
    nav_achievements:       "3 жылдағы жетістіктер",
    nav_practices:          "Практика",
    nav_partners:           "Серіктестер",
    nav_prac_base:          "Практикалық база",
    nav_dual:               "Дуальды оқыту",
    nav_mat_base:           "Материалдық база",
    nav_admissions:        "Қабылдау комиссиясы",
    nav_news:              "Жаңалықтар",
    nav_contacts:          "Байланыс",

    /* Главная — карусель */
    slide1_title: "Қош келдіңіздер!",
    slide1_desc:  "Жоғары инженерлік-технологиялық колледжіне қош келдіңіздер",
    slide2_title: "Сапалы білім",
    slide2_desc:  "Болашаққа қадам жасаңыз",
    slide3_title: "Заманауи технологиялар",
    slide3_desc:  "Кәсіби мамандар дайындаймыз",

    /* Главная — блоки */
    about_block_title:      "Біз туралы",
    about_block_text:       "Жоғары инженерлік-технологиялық колледжі — жоғары білікті мамандар дайындайтын заманауи оқу орны.",
    learn_more:             "Толығырақ",
    admissions_block_title: "Қабылдау комиссиясы",
    admissions_block_text:  "Колледжге қабылдау туралы барлық ақпаратты осы бөлімнен табасыз.",
    map_block_title:        "Картада",
    map_address_label:      "Мекенжай",
    map_phone_label:        "Телефон",
    map_email_label:        "Электрондық пошта",

    /* О нас */
    about_hero_title:          "Біз туралы",
    about_hero_sub:            "Жоғары инженерлік-технологиялық колледжі",
    about_structure_hero_title:"Колледж құрылымы",
    about_structure_hero_sub:  "Басшылық және бөлімдер",
    
    /* Администрация */ 
    administrations_hero_title: "Әкімшілік",
    administrations_hero_sub:   "Біздің колледж ақпараты",

    /* Приёмная комиссия */
    admissions_hero_title: "Қабылдау комиссиясы",
    admissions_hero_sub:   "Біздің колледжге қабылдау туралы ақпарат",
    spec_code:             "Мамандық коды",
    spec_name:             "Мамандық атауы",
    spec_duration:         "Оқу мерзімі",
    spec_form:             "Оқу формасы",
    spec_cost:             "Оқу ақысы",

    /* Новости */
    news_hero_title:    "Жаңалықтар",
    news_hero_sub:      "Колледж өмірінен соңғы жаңалықтар",
    news_all:           "Барлығы",
    news_read_more:     "Толығырақ оқу",
    news_empty:         "Жаңалықтар жоқ",
    news_empty_sub:     "Жақын арада жаңалықтар қосылады",
    news_back:          "← Артқа",
    news_published:     "Жарияланды:",

    /* Контакты */
    contacts_hero_title:  "Байланыс",
    contacts_hero_sub:    "Бізбен хабарласыңыз",
    form_name:            "Аты-жөніңіз",
    form_email:           "Электрондық пошта",
    form_subject:         "Тақырып",
    form_message:         "Хабарлама",
    form_send:            "Жіберу",
    form_success:         "Хабарламаңыз жіберілді! Жақын арада хабарласамыз.",
    contacts_info_title:  "Байланыс ақпараты",
    contacts_map_title:   "Мекенжай",

    /* Футер */
    footer_nav_title:      "Бөлімдер",
    footer_contacts_title: "Байланыс",
    footer_copy:           "© Жоғары инженерлік-технологиялық колледжі",
  },

  ru: {
    /* Шапка */
    college_name_top: "Высший инженерно-технологический колледж",
    college_type:     "Негосударственное образовательное учреждение",
    college_name_sub: "НОУ «ВИТК»",

    /* Навигация */
    nav_home:              "Главная",
    nav_about:             "О нас",
    nav_about_general:     "Общая информация",
    nav_about_structure:   "Структура колледжа",
    nav_administrations:    "Администрация",
    nav_abiturient:         "Абитуриенту",
    nav_specs:              "Специальности",
    nav_docs:               "Правила подачи документов",
    nav_time:               "Сроки",
    nav_kvota:              "Квота",
    nav_plan:               "План приёма",
    nav_achievements:       "Достижения за 3 года",
    nav_practices:          "Практика",
    nav_partners:           "Партнёры",
    nav_prac_base:          "База практики",
    nav_dual:               "Дуальное обучение",
    nav_mat_base:           "Материальная база",
    nav_admissions:        "Приёмная комиссия",
    nav_news:              "Новости",
    nav_contacts:          "Контакты",

    /* Главная — карусель */
    slide1_title: "Добро пожаловать!",
    slide1_desc:  "Добро пожаловать в Высший инженерно-технологический колледж",
    slide2_title: "Качественное образование",
    slide2_desc:  "Сделайте шаг в своё будущее",
    slide3_title: "Современные технологии",
    slide3_desc:  "Готовим профессионалов своего дела",

    /* Главная — блоки */
    about_block_title:      "О нас",
    about_block_text:       "Высший инженерно-технологический колледж — современное учебное заведение, готовящее высококвалифицированных специалистов.",
    learn_more:             "Подробнее",
    admissions_block_title: "Приёмная комиссия",
    admissions_block_text:  "Вся информация о поступлении в колледж — в этом разделе.",
    map_block_title:        "Мы на карте",
    map_address_label:      "Адрес",
    map_phone_label:        "Телефон",
    map_email_label:        "Электронная почта",

    /* О нас */
    about_hero_title:          "О нас",
    about_hero_sub:            "Высший инженерно-технологический колледж",
    about_structure_hero_title:"Структура колледжа",
    about_structure_hero_sub:  "Руководство и подразделения",

    /* Администрация */ 
    administrations_hero_title: "Администрация",
    administrations_hero_sub:   "Администрация нашего колледжа",

    /* Приёмная комиссия */
    admissions_hero_title: "Приёмная комиссия",
    admissions_hero_sub:   "Информация о поступлении в наш колледж",
    spec_code:             "Код специальности",
    spec_name:             "Наименование специальности",
    spec_duration:         "Срок обучения",
    spec_form:             "Форма обучения",
    spec_cost:             "Стоимость обучения",

    /* Новости */
    news_hero_title:    "Новости",
    news_hero_sub:      "Последние новости из жизни колледжа",
    news_all:           "Все",
    news_read_more:     "Читать далее",
    news_empty:         "Новостей пока нет",
    news_empty_sub:     "Скоро здесь появятся новости",
    news_back:          "← Вернуться",
    news_published:     "Опубликовано:",

    /* Контакты */
    contacts_hero_title:  "Контакты",
    contacts_hero_sub:    "Свяжитесь с нами",
    form_name:            "Ваше имя",
    form_email:           "Электронная почта",
    form_subject:         "Тема",
    form_message:         "Сообщение",
    form_send:            "Отправить",
    form_success:         "Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.",
    contacts_info_title:  "Контактная информация",
    contacts_map_title:   "Адрес на карте",

    /* Футер */
    footer_nav_title:      "Разделы",
    footer_contacts_title: "Контакты",
    footer_copy:           "© Высший инженерно-технологический колледж",
  }
};

let currentLang = localStorage.getItem('vitk_lang') || 'kk';

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('vitk_lang', lang);
  applyTranslations();
  updateLangButtons();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    // Не затираем innerHTML если внутри есть дочерние элементы (стрелка dropdown)
    const arrow = el.querySelector('.nav-arrow');
    el.textContent = t(key);
    if (arrow) el.appendChild(arrow);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.documentElement.lang = currentLang === 'kk' ? 'kk' : 'ru';
  if (window.loadMarkdownContent) window.loadMarkdownContent(currentLang);
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangButtons();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
