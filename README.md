# Запуск тестов

## Подготовка

Нужны Node.js и npm. В корне проекта выполните:

```bash
npm install
npx playwright install
```

## Запуск

Запустить все тесты во всех настроенных браузерах:

```bash
npm test
```

Запустить конкретный файл:

```bash
npx playwright test tests/search-page.spec.ts
```

Полезные режимы:

```bash
npm run test:ui       # интерактивный режим
npm run test:headed   # показать окно браузера
npm run test:debug    # пошаговая отладка
npm run test:report   # открыть HTML-отчёт
npm run lint          # проверить код ESLint
```
