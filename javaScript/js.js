fetch('../src/api/products.json')
  .then(response => response.json())
  .then(products => {
    console.log(products);
    renderNewProducts(products);
    renderTopProducts(products);
    renderPopularGames(products)
  })
  .catch(error => console.error('Error loading products:', error));

function renderNewProducts(products) {
  const container = document.querySelector('.main__body');
  const newProducts = products.filter(product => product.new);

  if (newProducts.length === 0) return;

  const section = document.createElement('article');
  section.classList.add('game__section');
  section.innerHTML = `
    <h2 class="game__section-title">New Games</h2>
    <ul class="game__section-list"></ul>
  `;

  container.appendChild(section);

  const list = section.querySelector('.game__section-list');

  newProducts.forEach(product => {
    const productItem = `
      <li class="game__section-item">
        <div class="product__image" style="background-image: url('${product.img}');"> </div>
        <div class="product__discription">
          <h2 class="product__name">${product.name}</h2>
          <p class="product__rate">${product.rate}</p>
        </div>
      </li>
    `;
    list.innerHTML += productItem;
  });
}

function renderTopProducts(products) {
  const container = document.querySelector('.main__body');
  const topProducts = products.filter(product => product.rate >= 4.7);

  if (topProducts.length === 0) return;

  const section = document.createElement('article');
  section.classList.add('game__section');
  section.innerHTML = `
    <h2 class="game__section-title">Top Games</h2>
    <ul class="game__section-list"></ul>
  `;

  container.appendChild(section);

  const list = section.querySelector('.game__section-list');

  topProducts.forEach(product => {
    const productItem = `
      <li class="game__section-item">
      <div class="product__image" style="background-image: url('${product.img}');"> </div>        
        <div class="product__discription">
          <h2 class="product__name">${product.name}</h2>
          <p class="product__rate">${product.rate}</p>
        </div>
      </li>
    `;
    list.innerHTML += productItem;
  });
}

function renderPopularGames(products) {
  const container = document.querySelector('.main__body');

  if (products.length === 0) return;

  const section = document.createElement('article');
  section.classList.add('game__section');
  section.innerHTML = `
    <h2 class="game__section-title">Popular Games</h2>
    <ul class="game__section-list"></ul>
  `;

  container.appendChild(section);
  const list = section.querySelector('.game__section-list');

  products.slice(0, 10).forEach(product => {
    const productItem = `
      <li class="game__section-item">
      <div class="product__image" style="background-image: url('${product.img}');"> </div>        
        <div class="product__discription">
          <h2 class="product__name">${product.name}</h2>
          <p class="product__rate">${product.rate}</p>
        </div>
      </li>
    `;
    list.innerHTML += productItem;
  });

}

/* header animation menu list*/
document.addEventListener('DOMContentLoaded', () => {
  const toggleElements = [
    { trigger: '.header__menu-title', target: '.menu', openClass: 'menu--open' },
    { trigger: '.header__categories-title', target: '.categories', openClass: 'categories--open' },
    { trigger: '.header__allCategories-title', target: '.allCategories', openClass: 'allCategories--open' }
  ];

  const allNavItems = document.querySelectorAll('nav ul li');

  // Функція для перевірки, чи будь-яке меню відкрите
  const isAnyMenuOpen = () => 
    toggleElements.some(({ target, openClass }) => {
      const targetElement = document.querySelector(target);
      return targetElement && targetElement.classList.contains(openClass);
    });

  // Видалення класу "active" зі всіх <li>
  const removeActiveClassFromAll = () => {
    allNavItems.forEach(navItem => navItem.classList.remove('active'));
  };

  // Додавання обробників подій для відкриття/закриття меню
  toggleElements.forEach(({ trigger, target, openClass }) => {
    const triggerElement = document.querySelector(trigger);
    const targetElement = document.querySelector(target);

    if (triggerElement && targetElement) {
      triggerElement.addEventListener('click', () => {
        targetElement.classList.toggle(openClass);

        // Якщо жодне меню не відкрите, видаляємо клас "active" зі всіх <li>
        if (!isAnyMenuOpen()) {
          removeActiveClassFromAll();
        }
      });
    }
  });

  // Логіка для роботи з класом "active" на елементах <li>
  allNavItems.forEach(item => {
    item.addEventListener('click', () => {
      // Додавати клас "active" тільки якщо меню відкрите
      if (isAnyMenuOpen()) {
        allNavItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });
});


