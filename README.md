# physicalpainter.nk — портфолио

Статический сайт (HTML + CSS + JS), без сборки и зависимостей. Работает на GitHub Pages «как есть».

## Структура

```
index.html      — разметка и тексты (обо мне, услуги, контакты)
style.css       — стили и цвета (блок :root в начале файла)
script.js       — список работ WORKS (видео), клиенты, бегущая строка
assets/         — логотип и иконки вкладки
videos/         — ваши видео (.mp4)
covers/         — обложки к видео (.jpg / .png / .webp)
.nojekyll       — говорит GitHub Pages не обрабатывать файлы Jekyll'ом
```

## Запуск локально (VS Code)

1. Откройте папку в VS Code.
2. Установите расширение **Live Server** (Ritwick Dey).
3. Правый клик по `index.html` → **Open with Live Server**.

Можно и просто открыть `index.html` двойным кликом — сайт заработает, но видео надёжнее проверять через Live Server.

## Как вставить видео

Откройте `script.js`, найдите блок с пометкой **«ЗДЕСЬ ВСТАВЛЯЮТСЯ ВАШИ ВИДЕО»**.

1. Положите файл в папку `videos/`, обложку — в `covers/`.
2. Впишите пути в нужную работу:

```js
{
  t:'Музыкальный клип', k:'3D, VFX, монтаж', n:'壱', c:7, r:3, art:'sun',
  video:'videos/klip-1.mp4',            // полное видео (по клику)
  preview:'videos/klip-1-preview.mp4',  // короткий зацикленный фрагмент для плитки
  poster:'covers/klip-1.jpg',           // обложка
  embed:''                              // или ссылка YouTube/Vimeo вместо video
}
```

**Формат:** `.mp4`, видео H.264, звук AAC, 1280×720 или 1920×1080.
**Имена файлов:** латиницей, без пробелов. Регистр важен: `Klip.mp4` и `klip.mp4` — разные файлы на GitHub.

**YouTube / Vimeo вместо файла:**
- YouTube: `embed:'https://www.youtube-nocookie.com/embed/ВАШ_ID'` (ID — часть ссылки после `v=`)
- Vimeo: `embed:'https://player.vimeo.com/video/ВАШ_ID'`

### Подготовка видео (ffmpeg)

Полное видео, лёгкое для сайта:
```
ffmpeg -i input.mov -c:v libx264 -crf 24 -preset slow -vf scale=-2:1080 -c:a aac -b:a 128k -movflags +faststart klip-1.mp4
```

Короткое превью для плитки (6 сек, без звука, 720p):
```
ffmpeg -i input.mov -t 6 -an -c:v libx264 -crf 27 -vf scale=-2:720 -movflags +faststart klip-1-preview.mp4
```

Обложка (кадр на 2-й секунде):
```
ffmpeg -i input.mov -ss 2 -frames:v 1 -q:v 3 klip-1.jpg
```

## Публикация на GitHub Pages

1. Создайте репозиторий на github.com (например, `portfolio`), тип **Public**.
2. Загрузите **содержимое** этой папки в корень репозитория (чтобы `index.html` лежал в корне).
   - Через сайт: **Add file → Upload files**, перетащите все файлы и папки, включая скрытые `.nojekyll` и `.gitignore` (или через git: `git add . && git commit -m "site" && git push`).
3. **Settings → Pages → Build and deployment**: Source — **Deploy from a branch**, Branch — **main**, папка — **/(root)** → Save.
4. Через 1–2 минуты сайт откроется по адресу `https://ВАШ_НИК.github.io/portfolio/`.

Если назвать репозиторий `ВАШ_НИК.github.io`, сайт будет доступен сразу по `https://ВАШ_НИК.github.io/`.

### Ограничения GitHub

- Загрузка через браузер: файл до **25 МБ**. Файлы крупнее — через git или сожмите (команды выше).
- Один файл в репозитории — не более **100 МБ**, репозиторий желательно держать до 1 ГБ.
- Тяжёлые ролики удобнее выложить на YouTube/Vimeo и подключить через `embed`.

## Что подгружается из интернета

Только шрифты Google Fonts (Dela Gothic One, Zen Kaku Gothic New). Остальное — локальные файлы. Без интернета сайт откроется, но с системными шрифтами.

## Свой домен (по желанию)

Settings → Pages → Custom domain. GitHub сам создаст файл `CNAME`.
