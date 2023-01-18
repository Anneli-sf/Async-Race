import './components/main-page/main-page';
import './components/api/api';
import './components/main-page/header/header';
import { renderMainPage } from './components/main-page/main-page';

const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
window.addEventListener('load', () => {
    wrapper.append(renderMainPage());
});
