# Claude Web Interface

Современный веб-интерфейс для работы с Claude Code CLI с расширенными возможностями настройки.

## 🚀 Возможности

- ✨ Современный, отзывчивый UI
- 🌓 Темная и светлая темы
- ⚙️ Гибкие настройки (температура, модель, токены)
- 💾 Экспорт истории чатов
- 📱 Адаптивный дизайн
- 🎨 Красивая анимация и переходы

## 🛠 Технологии

- React 18
- Vite
- Emotion (CSS-in-JS)
- Lucide React (иконки)

## 📦 Установка

```bash
npm install
```

## 🔧 Разработка

Запуск dev сервера:

```bash
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173) в браузере.

## 🏗 Сборка

```bash
npm run build
```

Готовые файлы будут в папке `dist/`.

## 🌐 Деплой на GitHub Pages

1. Создайте репозиторий на GitHub
2. Загрузите код:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/claude-web-ui.git
git push -u origin main
```

3. Включите GitHub Pages в настройках репозитория:
   - Settings → Pages
   - Source: GitHub Actions

4. При каждом push в main ветку сайт будет автоматически обновляться
5. Ваш сайт будет доступен по адресу: `https://ВАШ_USERNAME.github.io/claude-web-ui/`

## 🔌 Интеграция с Claude Code CLI

Для полной интеграции с Claude Code CLI необходимо:

1. Установить Claude Code CLI
2. Настроить API ключ
3. Запустить backend сервер (инструкции в разработке)

## 📝 Лицензия

MIT

## 🤝 Вклад

Приветствуются любые улучшения! Создавайте issues и pull requests.
