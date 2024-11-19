import Fluent
import Vapor

func routes(_ app: Application) throws {
    app.get { req async in
        "It works!"
    }

    app.get("hello") { req async -> String in
        "Hello, world!"
    }

    app.webSocket("chat") { req, ws in
        ws.onText { ws, text in
            var responseText = ""
            let messages = [
                "Привет! Как я могу помочь?",
                "Давайте разберемся с вашим вопросом.",
                "Интересный запрос, позвольте немного подумать.",
                "Вот, что я думаю... Подробности: \(text)",
                "Надеюсь, это поможет! Если есть другие вопросы, я тут!"
            ]

            var delay: TimeInterval = 1.0
            for message in messages {
                req.eventLoop.scheduleTask(in: .seconds(Int64(delay))) {
                    ws.send(message)
                }
                delay += 1.5
            }
        }

        ws.onClose.whenComplete { _ in
            print("Client disconnected")
        }
    }

    try app.register(collection: TodoController())
}
