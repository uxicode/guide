import './styles/base.css';
import './styles/guide.css';

const ACTIVE_CLASS = 'active';
/** 섹션 제목이 뷰포트 상단에서 이 거리(px) 안에 들어오면 해당 메뉴를 활성화한다. */
const SCROLL_SPY_OFFSET = 80;

function openTableLinksInNewTab(): void {
  document.querySelectorAll<HTMLAnchorElement>('table a').forEach((link) => {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

function setupMobileMenu(sideBar: HTMLElement, menuButton: HTMLButtonElement): () => void {
  function setMenuOpen(isOpen: boolean): void {
    sideBar.classList.toggle(ACTIVE_CLASS, isOpen);
    menuButton.classList.toggle(ACTIVE_CLASS, isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  }

  menuButton.addEventListener('click', () => setMenuOpen(!sideBar.classList.contains(ACTIVE_CLASS)));
  return () => setMenuOpen(false);
}

function setupScrollSpy(menuLinks: HTMLAnchorElement[], onNavigate: () => void): void {
  const sections = menuLinks
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter((section): section is HTMLElement => section !== null);
  let activeIndex = -1;
  let isFrameRequested = false;

  function activateMenu(index: number): void {
    if (index === activeIndex) return;
    menuLinks[activeIndex]?.classList.remove(ACTIVE_CLASS);
    menuLinks[index]?.classList.add(ACTIVE_CLASS);
    activeIndex = index;
  }

  function findCurrentSectionIndex(): number {
    const { scrollY, innerHeight } = window;
    const isScrolledToBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 1;
    if (isScrolledToBottom) return sections.length - 1;

    const passedCount = sections.filter((section) => section.getBoundingClientRect().top <= SCROLL_SPY_OFFSET).length;
    return Math.max(passedCount - 1, 0);
  }

  function handleScroll(): void {
    if (isFrameRequested) return;
    isFrameRequested = true;
    requestAnimationFrame(() => {
      activateMenu(findCurrentSectionIndex());
      isFrameRequested = false;
    });
  }

  menuLinks.forEach((link) => link.addEventListener('click', onNavigate));
  window.addEventListener('scroll', handleScroll, { passive: true });
  activateMenu(findCurrentSectionIndex());
}

function init(): void {
  const sideBar = document.querySelector<HTMLElement>('.side-bar');
  const menuButton = document.querySelector<HTMLButtonElement>('.m-bar');
  if (!sideBar || !menuButton) {
    console.error('[guide] 바로가기 메뉴 요소를 찾을 수 없습니다.');
    return;
  }

  openTableLinksInNewTab();
  const closeMobileMenu = setupMobileMenu(sideBar, menuButton);
  setupScrollSpy(Array.from(sideBar.querySelectorAll<HTMLAnchorElement>('.btn-shortcut')), closeMobileMenu);
}

init();
