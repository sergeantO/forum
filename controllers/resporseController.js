/****

+200 OK — это ответ на успешные GET, PUT, PATCH или DELETE. Этот код также используется для POST, который не приводит к созданию.
+201 Created — этот код состояния является ответом на POST, который приводит к созданию.
+204 No Content - Это ответ на успешный запрос, который не будет возвращать тело (например, запрос DELETE)
304 Not Modified — используйте этот код состояния, когда заголовки HTTP-кеширования находятся в работе
+400 Bad Request — этот код состояния указывает, что запрос искажен, например, если тело не может быть проанализировано
+401 Unauthorized — Если не указаны или недействительны данные аутентификации. Также полезно активировать всплывающее окно auth, если приложение используется из браузера
403 Forbidden — когда аутентификация прошла успешно, но аутентифицированный пользователь не имеет доступа к ресурсу
+404 Not found — если запрашивается несуществующий ресурс
405 Method Not Allowed — когда запрашивается HTTP-метод, который не разрешен для аутентифицированного пользователя
410 Gone — этот код состояния указывает, что ресурс в этой конечной точке больше не доступен. Полезно в качестве защитного ответа для старых версий API
415 Unsupported Media Type. Если в качестве части запроса был указан неправильный тип содержимого
+422 Unprocessable Entity — используется для проверки ошибок
429 Too Many Requests — когда запрос отклоняется из-за ограничения скорости
+500 Internal Server Error  указывает на то, что сервер столкнулся с неожиданной ошибкой, которая помешала ему выполнить запрос
 
****/

const send = (res) => {
    const _send = (status, payload) => {
      res.status(status).json(payload)
    }

    const Unauthorized = () => {
      _send(401, { message: 'Access denied' })
    }
  
    const ServerError = (msg, err) => {
      _send(500, { message: msg, err })
    }
  
    const BadRequest = (msg, data = null) => {
      _send(400, { message: msg, ...data })
    }
  
    const NotFound = (msg, data = null) => {
      _send(404, { message: msg, ...data })
    }
    
    const OK = (msg, data) => {
      _send(200, { message: msg, ...data })
    }
    
    const Created = (msg, data) => {
      _send(201, { message: msg, ...data })
    }

    const UnprocessableEntity = () => {
      _send(422, { message: msg, ...data })
    }

    const NoContent = () => {
      _send(204, { message: msg, ...data })
    }

    return {
      Unauthorized, 
      ServerError, 
      BadRequest, 
      NoContent, 
      NotFound,
      UnprocessableEntity,
      Created,
      OK,
    }
}

module.exports = send