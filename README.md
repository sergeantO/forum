# FORUM (рабочее название)
> Публичная экспертиза идей

## Система кросс-рецензирования идей и высказываний
В качестве принципов заложены следующие идеи: 
1. Все имеют право на свое мнение и свободу слова
2. Несмотря на п.1, голоса людей не равнозначны. Оценка специалиста в определенной области зачастую важнее
3. Нельзя быть "абстрактно умным", у всех людей есть "зона экспертности" в которой человек разбирается
4. Никакие регалии (образование, специальность и т.д.) не гарантирует правильного понимания проблемы
5. Люди склонны к когнитивным ошибкам
- Они могут ориентироваться на уже сформированый рейтинг и пойти за толпой
- Они могут поддерживать любимого автора. Но всецело поддерживать человека нельзя: это рождает тиранов. Поддерживать можно только взгляды и идеи
6. Модерация контента должна быть, но должна быть не авторитарная (опирающаяся на всемогущего админа), а демократичная (опираться на решение сообщества)
7. Сегодня человечество страдает от информационных пузырей, человеку трудно расширить свой кругозор

Так и родилась идея подобной платформы, где человек пожет найти подборку статей по определенной теме и выработать свое мнение. Ничего не влияет на твою оценку: ни имя автора, ни чужие оценки, ни реклама, ни коментарии. Только ты и текст! Все остальное будет потом - когда ты примешь решение. 

## Стек

### Сервер
- NodeJS
- Express
- [MongoDB](https://mongoosejs.com/)
- [ ] Swagger

### Клиент
- VueJS
- VueX
- TypeScript ([vue-property-decorator](https://github.com/kaorun343/vue-property-decorator),[vuex-class](https://github.com/ktsn/vuex-class))
- [EditorJS](https://editorjs.io/)

## RoadMap
- [x] Регистрация и инвайты
- [x] WYSIWYG для автора статьи 
- [x] Чтение статей
- [x] Выделение заметок и использование их, как комментариев
- [x] Закладки для статей
- [x] Оценивание статей с учетом навыков оценщика
- [ ] Оценка "спорно" (ни лайк, ни дизлайк)
- [ ] Черные и белые теги для выдачи
- [ ] Переиздание статей
- [ ] Объединение статей в цикл "книга"
- [ ] Публичная модерация
- [ ] Интернализация UI
----------
- [ ] Сбор авторов в команды для коллективных работ
- [ ] Чаты коллективов
- [ ] Дискусии (формат отличается от классических комментариев)
- [ ] Донат для автора статьи
- [ ] PayWall для "книг"

