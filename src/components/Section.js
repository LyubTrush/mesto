//отвечает за отрисовку элементов на странице
// items — это массив данных, которые нужно добавить на страницу при инициализации класса
// renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.

export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }
  //Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией
  rendererItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  //принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._selector.prepend(element);
  }

  addItemServer(element) {
    this._selector.append(element);
  }
}
