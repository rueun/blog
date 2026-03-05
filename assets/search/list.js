document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || '';
  const currentPage = parseInt(urlParams.get('page')) || 1;
  const itemsPerPage = 10;

  window.bookSearch.initIndex()
    .then(() => {
      initSearch();
      performSearch();
    });

  function initSearch() {
    const displayElement = document.getElementById('search-query-display');
    if (query) {
      displayElement.innerHTML = '"' + query + '" 검색 결과 <em class="list-count" id="search-count">0</em>';
    } else {
      displayElement.textContent = '검색어를 입력해주세요.';
    }
  }

  function performSearch() {
    const sourceContainer = document.querySelector('.search-base');
    const resultsContainer = document.querySelector('.search-results');
    const allPostItems = Array.from(sourceContainer.querySelectorAll('.post-item'));

    if (!query) {
      document.getElementById('search-no-results').classList.remove('hidden');
      document.getElementById('search-pagination').style.display = 'none';
      return;
    }

    const searchHits = window.bookSearchIndex.search(query);

    if (searchHits.length === 0) {
      document.getElementById('search-no-results').classList.remove('hidden');
      document.getElementById('search-count').textContent = '0';
      document.getElementById('search-pagination').style.display = 'none';
      return;
    }

    const matchedItems = [];
    searchHits.forEach((result) => {
      const href = result.item.href;
      const matchedItem = allPostItems.find(item => {
        const link = item.querySelector('.post-title a');
        return link && link.getAttribute('href') === href;
      });
      if (matchedItem) {
        matchedItems.push(matchedItem.cloneNode(true));
      }
    });

    const totalPages = Math.ceil(matchedItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, matchedItems.length);

    const fragment = document.createDocumentFragment();
    for (let i = startIndex; i < endIndex; i++) {
      fragment.appendChild(matchedItems[i]);
    }
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(fragment);

    document.getElementById('search-count').textContent = matchedItems.length;

    buildPagination(currentPage, totalPages, query);
  }

  function buildPagination(currentPage, totalPages, query) {
    const paginationContainer = document.getElementById('search-pagination');

    if (totalPages <= 1) {
      paginationContainer.style.display = 'none';
      return;
    }

    paginationContainer.style.display = 'block';

    const createPageUrl = (page) => {
      return '/search/?q=' + encodeURIComponent(query) + (page > 1 ? '&page=' + page : '') + '#pagination-anchor';
    };

    const groupNumber = Math.floor((currentPage - 1) / 10);
    const groupStart = groupNumber * 10 + 1;
    let groupEnd = groupStart + 9;
    if (groupEnd > totalPages) {
      groupEnd = totalPages;
    }

    const prevGroupPage = groupStart - 10;
    const nextGroupPage = groupEnd + 1;

    const prevButtonHTML = groupStart > 1
      ? '<a href="' + createPageUrl(prevGroupPage > 1 ? prevGroupPage : 1) + '" class="pagination-nav pagination-link"><i class="fa-solid fa-backward"></i> 이전</a>'
      : '<span class="pagination-nav disabled"><i class="fa-solid fa-backward"></i> 이전</span>';

    let pagesHTML = '';
    for (let i = groupStart; i <= groupEnd; i++) {
      if (i === currentPage) {
        pagesHTML += '<span class="pagination-page current" id="current-page">' + i + '</span>';
      } else {
        pagesHTML += '<a href="' + createPageUrl(i) + '" class="pagination-page pagination-link">' + i + '</a>';
      }
    }

    const nextButtonHTML = nextGroupPage <= totalPages
      ? '<a href="' + createPageUrl(nextGroupPage) + '" class="pagination-nav pagination-link">다음 <i class="fa-solid fa-forward"></i></a>'
      : '<span class="pagination-nav disabled">다음 <i class="fa-solid fa-forward"></i></span>';

    paginationContainer.innerHTML = '<div id="pagination-anchor"></div><nav class="pagination">' + prevButtonHTML + '<div class="pagination-pages">' + pagesHTML + '</div>' + nextButtonHTML + '</nav>';
  }
});
