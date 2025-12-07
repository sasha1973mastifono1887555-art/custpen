document.addEventListener('DOMContentLoaded', () => {
    const menuData = {
        html: ['Теги','Атрибуты','Формы','Семантика','Таблицы','Медиа','Метаданные','Списки','Ссылки','Текст','Контейнеры','Встроенные','Скрипты','Устаревшие'],
        css: ['Селекторы','Свойства','Значения','Единицы','Блочная модель','Position','Display','Flexbox','Grid','Анимация','Transition','Transform','Media','Псевдоклассы','Переменные'],
        js: ['Переменные','Функции','Объекты','Массивы','Циклы','Условия','DOM','События','ES6+','Промисы','Async/Await','Классы','Модули','API','Отладка'],
        tools: ['Git','NPM','Webpack','VS Code','Chrome DevTools','Figma','Терминал','Препроцессоры','Линтеры','Тестирование','Деплой','Производительность','Безопасность','SEO']
    };

    const contentData = {
        'Теги': 'HTML теги: &lt;div&gt;, &lt;p&gt;, &lt;span&gt;, &lt;a&gt; и т.д.',
        'Атрибуты': 'Атрибуты: class, id, style, data-*',
        'Селекторы': '.class, #id, element, [attr]',
        'Переменные': 'let, const, var - объявление переменных',
        'Git': 'git init, commit, push, pull, branch'
    };

    const codeExamples = {
        'Теги': '&lt;div class="container"&gt;\n  &lt;h1&gt;Заголовок&lt;/h1&gt;\n&lt;/div&gt;',
        'Селекторы': '.class {\n  color: blue;\n}',
        'Переменные': 'let x = 10;\nconst y = 20;',
        'Git': 'git add .\ngit commit -m "message"'
    };

    const el = {
        s: document.getElementById('sidebarPanel'),
        sc: document.querySelector('.sidebar-content'),
        ct: document.getElementById('contentTitle'),
        cd: document.getElementById('contentDisplay'),
        mc: document.querySelector('.container')
    };

    function createMenu() {
        if (!el.sc) return;
        
        const title = el.sc.querySelector('.sidebar-title');
        el.sc.innerHTML = title ? title.outerHTML : '';
        
        for (const [cat, items] of Object.entries(menuData)) {
            const div = document.createElement('div');
            div.className = 'category';
            
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.innerHTML = `<span>${cat}</span><span>▶</span>`;
            
            const sub = document.createElement('div');
            sub.className = 'sublist';
            
            items.forEach(it => {
                const b = document.createElement('button');
                b.className = 'item-btn';
                b.textContent = it;
                b.onclick = () => showContent(it);
                sub.appendChild(b);
            });
            
            btn.onclick = () => {
                const a = btn.classList.toggle('active');
                sub.classList.toggle('active', a);
                btn.querySelector('span:last-child').textContent = a ? '▼' : '▶';
            };
            
            div.append(btn, sub);
            el.sc.appendChild(div);
        }
        
        setTimeout(() => el.sc.querySelector('.category-btn')?.click(), 100);
    }

    function showContent(item) {
        if (!el.ct || !el.cd) return;
        
        el.ct.textContent = item;
        el.cd.innerHTML = `
            <div class="content-card">
                <h3>${item}</h3>
                <p>${contentData[item] || 'Описание для этого раздела'}</p>
                <div class="code-example">
                    <h4>Пример кода:</h4>
                    <pre><code>${codeExamples[item] || '// Пример кода'}</code></pre>
                </div>
                <div class="actions">
                    <button onclick="alert('Сохранено: ${item}')">💾 Сохранить</button>
                    <button onclick="navigator.clipboard.writeText('${item}\\n${contentData[item] || ''}').then(()=>alert('Скопировано!'))">📋 Копировать</button>
                </div>
            </div>
        `;
        
        document.querySelectorAll('.item-btn').forEach(b => {
            b.classList.toggle('active', b.textContent === item);
        });
    }

    createMenu();
    if (el.s) el.s.classList.add('open');
    if (el.mc) el.mc.classList.add('sidebar-open');
    
    window.addEventListener('resize', () => {
        const m = window.innerWidth <= 768;
        if (el.s) el.s.classList.toggle('open', !m);
        if (el.mc) el.mc.classList.toggle('sidebar-open', !m);
    });
});