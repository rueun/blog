'use strict';

(function () {
  const input = document.querySelector('#book-search-input');
  const results = document.querySelector('#book-search-results');

  if (!input) {
    return
  }

  input.addEventListener('focus', init);
  input.addEventListener('keyup', search);
  input.addEventListener('keydown', handleEscape);
  input.addEventListener('blur', clearResults);
  document.addEventListener('keypress', focusSearchFieldOnKeyPress);

  function focusSearchFieldOnKeyPress(event) {
    if (event.target.value !== undefined) {
      return;
    }

    if (input === document.activeElement) {
      return;
    }

    const characterPressed = String.fromCharCode(event.charCode);
    if (!isHotkey(characterPressed)) {
      return;
    }

    input.focus();
    event.preventDefault();
  }

  function isHotkey(character) {
    const dataHotkeys = input.getAttribute('data-hotkeys') || '';
    return dataHotkeys.indexOf(character) >= 0;
  }

  function handleEscape(event) {
    if (event.key === 'Escape') {
      clearResults();
      input.blur();
    }
  }

  function clearResults() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }
  }

  function init() {
    input.removeEventListener('focus', init);
    input.required = true;

    window.bookSearch.initIndex()
      .then(() => input.required = false)
      .then(search);
  }

  function search() {
    clearResults();

    if (!input.value) {
      return;
    }

    const searchHits = window.bookSearchIndex.search(input.value);
    const searchPreview = searchHits.slice(0, 3);

    searchPreview.forEach(function (page) {
      const li = element('<li><a href></a></li>');
      const a = li.querySelector('a')

      a.href = page.item.href;
      a.textContent = page.item.title;

      results.appendChild(li);
    });

    if (searchHits.length > 3) {
      const moreLink = element('<li class="book-search-more"><a href></a></li>');
      const a = moreLink.querySelector('a');
      a.href = '/search/?q=' + encodeURIComponent(input.value);
      a.textContent = '더보기 (총 ' + searchHits.length + '개)';
      results.appendChild(moreLink);
    }
  }

  function element(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
  }
})();
