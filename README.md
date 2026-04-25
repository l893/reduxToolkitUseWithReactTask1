# Contacts — React + FSD + Classic Redux (Thunk + Persist) + Vite

Учебное приложение “Contacts” для практики:

- **React Router** (SPA навигация)
- архитектуры **Feature-Sliced Design (FSD)**
- **classic Redux** (без RTK): `createStore`, `combineReducers`, `applyMiddleware`
- **redux-thunk**, **redux-persist**
- middleware + Redux DevTools

---

## Возможности

- Просмотр списка контактов
- Фильтрация контактов:
  - по имени (частичное совпадение)
  - по группе
  - Reset (сброс фильтров)
- Группы:
  - список групп
  - страница группы со списком контактов внутри
- Избранное:
  - список избранных контактов
  - добавление/удаление из избранного через ⭐/☆ на карточке контакта
  - **persist** избранного в `localStorage` (через `redux-persist`)

---

## Использовано

- React `18`
- TypeScript
- React Router DOM `6` (с `future`-флагами)
- Redux `5` + React Redux
- redux-thunk
- redux-persist
- Vite
- Bootstrap + React Bootstrap
- Formik
- ESLint + Prettier
- Vitest + Testing Library

---

## Роуты

- `/` — Contacts list
- `/contact/:contactId` — Contact page
- `/groups` — Groups list
- `/groups/:groupId` — Group page
- `/favorit` — Favorites list

---

## Скрипты

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm test
```

---

## Данные

Данные моковые и лежат в:

- `src/shared/mock/data/contacts.json`
- `src/shared/mock/data/group-contacts.json`

Инициализация store выполняется thunk-ом:

- `src/app/store/initialize-mock-data.ts`

---

## Архитектура (FSD)

- `src/app/` — инициализация приложения (App, store, Provider)
- `src/pages/` — страницы приложения
- `src/widgets/` — крупные UI-блоки (Layout, Menu, Breadcrumbs)
- `src/features/` — функциональные фичи (filters)
- `src/entities/` — доменные сущности (contact, group, favorites)
- `src/shared/` — общие утилиты/конфиги/ui/mock

### Aliases

- `@app/*`
- `@pages/*`
- `@features/*`
- `@widgets/*`
- `@entities/*`
- `@shared/*`

---

## Quick QA

1. Открой `/` → фильтр по имени работает
2. Выбери группу → фильтр по группе работает
3. Перейди в `/groups` → список групп
4. Открой группу `/groups/:groupId` → видны контакты группы
5. Открой `/favorit` → список избранных
6. Обнови страницу на `/favorit` → избранное должно остаться (persist)

## Установка зависимостей

```bash
npm i
```

## Запуск приложения

```bash
npm run dev
```
