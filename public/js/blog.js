// Blog filter buttons (category toggle)
document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.blog-filter__btn');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('blog-filter__btn--active');
      });
      btn.classList.add('blog-filter__btn--active');
    });
  });
});
