"use client"
import React, { useState } from "react";

interface Chat {
  id: number;
  question: string;
  answer: string;
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, question: "Вопрос 1", answer: "Ответ 1" },
    { id: 2, question: "Вопрос 2", answer: "Ответ 2" },
    { id: 3, question: "Вопрос 3", answer: "Ответ 3" },
  ]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newChat, setNewChat] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const addChat = (): void => {
    const id = chats[chats.length-1].id+1;
    const newChatItem: Chat = { id, question: `Вопрос ${id}`, answer: `Ответ ${id}` };
    setChats([...chats, newChatItem]);
    setSelectedChat(newChatItem); // Устанавливаем новый чат как выбранный
    setIsSidebarOpen(false); // Закрываем сайдбар (для мобильных устройств)
  };

  const deleteChat = (id: number): void => {
    setChats(chats.filter((chat) => chat.id !== id));
    if (selectedChat?.id === id) setSelectedChat(null);
  };

  const handleChatSelect = (chat: Chat): void => {
    setSelectedChat(chat);
    setIsSidebarOpen(false); // Скрываем сайдбар на мобильных
  };

  return (
    <div className="min-h-screen h-screen flex bg-gray-100">
      {/* Кнопка для открытия сайдбара (мобильные устройства) */}
      <button
        className="lg:hidden fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md z-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Закрыть" : "Меню"}
      </button>

      {/* Левая панель */}
      <div
        className={`fixed lg:relative top-0 left-0 h-full w-64 bg-white border-r p-4 flex flex-col transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          onClick={addChat}
        >
          [+] Создать чат
        </button>
        <div className="space-y-2 overflow-y-auto flex-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 rounded-md flex justify-between items-center cursor-pointer ${
                selectedChat?.id === chat.id ? "bg-gray-200" : ""
              }`}
              onClick={() => handleChatSelect(chat)}
            >
              <span className="flex-1">Чат {chat.id}</span>
              <button
                className="text-red-500 font-bold ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
              >
                [x]
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Затемнение фона при открытом сайдбаре */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Правая панель */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4">
          {selectedChat ? (
            <>
              <div className="mb-4">
                <p className="font-semibold">Вопрос:</p>
                <p className="mb-4">{selectedChat.question}</p>
                <p className="font-semibold">Ответ:</p>
                <p>{selectedChat.answer}</p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Выберите чат слева
            </div>
          )}
        </div>

        {/* Поле ввода и кнопка */}
        <div className="p-4 border-t flex space-x-2">
          <input
            type="text"
            className="border rounded-md px-4 py-2 flex-1"
            placeholder="Поле ввода сообщения"
            value={newChat}
            onChange={(e) => setNewChat(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => console.log(newChat)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
