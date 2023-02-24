/*Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится 
когда данные пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.*/

export default class UserInfo {
  constructor({ nameUser, jobUser }) {
    this._nameUser = document.querySelector(nameUser);
    this._jobUser = document.querySelector(jobUser);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._nameUser.textContent,
      job: this._jobUser.textContent,
    };
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, job) {
    this._nameUser.textContent = name;
    this._jobUser.textContent = job;
  }
}
