document.addEventListener('DOMContentLoaded', function () {
  var headings = Array.from(document.querySelectorAll('h2[id], h3[id]'));
  if (!headings.length) return;

  var lockedId = null;
  var lockTimer = null;

  function getAllTocs() {
    var tocs = [];
    var bookToc = document.querySelector('.book-toc #TableOfContents');
    if (bookToc) tocs.push(bookToc);
    var mobileToc = document.querySelector('.mobile-toc-box #TableOfContents');
    if (mobileToc) tocs.push(mobileToc);
    return tocs;
  }

  function setActive(id) {
    getAllTocs().forEach(function (toc) {
      toc.querySelectorAll('a').forEach(function (link) {
        link.classList.remove('active');
      });
      if (id) {
        var target = toc.querySelector('a[href="#' + CSS.escape(id) + '"]');
        if (target) target.classList.add('active');
      }
    });
  }

  function onScroll() {
    // TOC 링크 클릭 후 잠시 고정
    if (lockedId) {
      setActive(lockedId);
      return;
    }

    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var offset = 80;

    // 페이지 맨 아래 도달 시 마지막 heading 활성화
    if ((window.innerHeight + scrollTop) >= (document.body.scrollHeight - 50)) {
      setActive(headings[headings.length - 1].id);
      return;
    }

    // 스크롤 위치에서 가장 가까운 heading 찾기
    var current = null;
    for (var i = 0; i < headings.length; i++) {
      var rect = headings[i].getBoundingClientRect();
      if (rect.top <= offset) {
        current = headings[i];
      } else {
        break;
      }
    }

    setActive(current ? current.id : null);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // TOC 링크 클릭 시 해당 heading 고정
  getAllTocs().forEach(function (toc) {
    toc.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        var href = link.getAttribute('href');
        if (!href || href.charAt(0) !== '#') return;
        var id = decodeURIComponent(href.substring(1));
        lockedId = id;
        setActive(id);
        clearTimeout(lockTimer);
        lockTimer = setTimeout(function () {
          lockedId = null;
        }, 1000);
      });
    });
  });

  // 초기 실행
  onScroll();
});
