# How fetch logic work in file ImageGallery

Логика фетча такова, что фетч по разным запросам идет тогда когда соответственно
запросы разные. Но загрузка дополнительных изображений возможна только тогда,
когда страницы предыдущий и на момента запроса разные, но при этом и сам запрос
не меняется.

```jsx
prevProps.page !== this.props.page && prevProps.query === this.props.query;
```

Так как если убрать с логики дополнительную проверку на равеноство запросов, то
поломается фетч и картинки будут рендерится по 2 разатак как оба условия
выполняются, а при таком условии рендерпо новому запросу будет происходить с 1
страницы бекенда, а не с той на которой мы остановились при дополнительной
загрузке изображений кликом на LoadMore.

# How to create modalWindow without Z-index using Portal

1. Создаем в папке public в файле index.html div с id="name".
2. В компоненте Модалки импортируем createPortal(); Например

`import { createPortal } from 'react-dom';`

1. Получаем наш див через querySelector or getElementById (да так можно, это
   такой паттерн) `const modalRoot = document.getElementById('modal-root');`
2. В возрате инициализиурем вызов метода createPortal в который первым
   аргументом передаем модалку, а вторым где она будет рендерится то есть наш
   modalRoot.

```jsx
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';
const modalRoot = document.getElementById('modal-root');
export class Modal extends Component {
  render() {
    return createPortal(
      <Overlay>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
```

При этом разметка находится в div, через портал, но в Компонентах куда мы ее
передали, она так и стоит
