let arrayProduct = [];
 let local = "../src/api/products.json ";
fetch('https://gist.githubusercontent.com/ViacheslavDotsenko/92e1688d6c32d84b463de8aed59c89e7/raw/aa460981fd6e08d72d0124043c9bce83e9453f06/products.json')
  .then(response => response.json())
  .then(products => {
    arrayProduct = products;
    console.log(products);
    renderSection('New Games', products.filter(product => product.new));
    renderSection('Top Games', products.filter(product => product.rate >= 4.7));
    renderSection('Popular Games', products.slice(0, 10));
  })
  .catch(error => console.error('Error loading products:', error));

// Універсальна функція для рендерингу
function renderSection(title, products) {
  const container = document.querySelector('.main__body');

  if (!products.length) return;

  const section = document.createElement('article');
  section.classList.add('game__section');
  section.innerHTML = `
    <h2 class="game__section-title">${title}</h2>
    <ul class="game__section-list"></ul>
  `;

  container.appendChild(section);

  const list = section.querySelector('.game__section-list');

  products.forEach(product => {
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
};

function renderSectionAbout () {
  const container = document.querySelector('.main__body');
  container.innerHTML = '';

  const section = document.createElement('article');
  section.classList.add('about__section');
  section.innerHTML = `
    <h4 class="about_section-pretitle"><span>Home</span> /</h4>
    <h2 class="about__section-title">About TopApps</h2>
    <h3 class="about__section-subtitle">At TopApps, you can be assured that all Android games provided here are for free, full versions, legal and safe to download.</h3>
    <ul class="about__section-list">
    <li class="about__section-item">While GameTop is the place for PC games, TopApps is fully dedicated towards Android games. Given the reputation of GameTop, we are able to license many games for free that you may have to pay for via other sources.</li>
    <li class="about__section-item">Do not be surprised to see your favorite games for free here! We are going to have a vast collection of games for all categories be it Puzzle, Hidden Object, Racing or more!</li>
    <li class="about__section-item">So check back often to see the new games that we license every now and then.</li>
    </ul>
  `;

  container.appendChild(section);

};
document.addEventListener('DOMContentLoaded', () => {
  const about = document.querySelector("#about");
  if(about){
    about.addEventListener("click", () => {
      renderSectionAbout();
    })
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.main__body');
  const buttonActions = {
    topApp: {
      title: 'Top App',
      filter: products => {
        return [
          {
            title: 'Top Games',
            data: products.filter(product => product.rate >= 4.7),
          },
          {
            title: 'New Games',
            data: products.filter(product => product.new),
          },
          {
            title: 'Best Games',
            data: products.slice(0, 10),
          },
        ];
      },
    },
    
    top: {
      title: 'Top Games',
      filter: products => products.filter(product => product.rate >= 4.7),
    },
    new: {
      title: 'New Games',
      filter: products => products.filter(product => product.new),
    },
    best: {
      title: 'Best Games',
      filter: products => products.slice(0, 10),
    },
    pazzle: {
      title: 'Pazzle Games',
      filter: products => products.filter(product => product.categories.includes('Puzzle')),
    },
    strategy: {
      title: 'Strategy Games',
      filter: products => products.filter(product => product.categories.includes('Strategy')),
    },
    racing: {
      title: 'Racing Games',
      filter: products => products.filter(product => product.categories.includes('Racing')),
    },
    action: {
      title: 'Action Games',
      filter: products => products.filter(product => product.categories.includes('Action')),
    },
    arcade: {
      title: 'Arcade Games',
      filter: products => products.filter(product => product.categories.includes('Arcade')),
    },
    arcad: {
      title: 'Arcade Games',
      filter: products => products.filter(product => product.categories.includes('Arcade')),
    },
    dd: {
      title: '2D Games',
      filter: products => products.filter(product => product.categories.includes('2d')),
    },
    ddd: {
      title: '3d Games',
      filter: products => products.filter(product => product.categories.includes('3d')),
    },
    actions: {
      title: 'Action Games',
      filter: products => products.filter(product => product.categories.includes('Action')),
    },
    adventure: {
      title: 'Adventure Games',
      filter: products => products.filter(product => product.categories.includes('Adventure Games')),
    },
    animale: {
      title: 'Animale Games',
      filter: products => products.filter(product => product.categories.includes('Animale Games')),
    },
    art: {
      title: 'Art Games',
      filter: products => products.filter(product => product.categories.includes('Art Games')),
    },
    bike: {
      title: 'Bike Games',
      filter: products => products.filter(product => product.categories.includes('Bike Games')),
    },
    car: {
      title: 'Car Games',
      filter: products => products.filter(product => product.categories.includes('Car Games')),
    },
    cards: {
      title: 'Cards Games',
      filter: products => products.filter(product => product.categories.includes('Cards Games')),
    },
    cartoon: {
      title: 'Cartoon Games',
      filter: products => products.filter(product => product.categories.includes('Cartoon Games')),
    },
  };

  if (container) {
    Object.keys(buttonActions).forEach(buttonId => {
      const button = document.querySelector(`#${buttonId}`);

      if (button) {
        button.addEventListener('click', () => {
          const { title, filter } = buttonActions[buttonId];
          container.innerHTML = '';
          renderSection(title, filter(arrayProduct)); 
        });
      }
    });
  }
});




/* header animation menu list*/
document.addEventListener('DOMContentLoaded', () => {
  const toggleElements = [
    { trigger: '.header__menu-title', target: '.menu', openClass: 'menu--open' },
    { trigger: '.header__categories-title', target: '.categories', openClass: 'categories--open' },
    { trigger: '.header__allCategories-title', target: '.allCategories', openClass: 'allCategories--open' }
  ];

  const allNavItems = document.querySelectorAll('nav ul li');
 
  const isAnyMenuOpen = () => 
    toggleElements.some(({ target, openClass }) => {
      const targetElement = document.querySelector(target);
      return targetElement && targetElement.classList.contains(openClass);
    });
 
  const removeActiveClassFromAll = () => {
    allNavItems.forEach(navItem => navItem.classList.remove('active'));
  };

  toggleElements.forEach(({ trigger, target, openClass }) => {
    const triggerElement = document.querySelector(trigger);
    const targetElement = document.querySelector(target);

    if (triggerElement && targetElement) {
      triggerElement.addEventListener('click', () => {
        targetElement.classList.toggle(openClass);

        if (!isAnyMenuOpen()) {
          removeActiveClassFromAll();
        }
      });
    }
  });

  
  allNavItems.forEach(item => {
    item.addEventListener('click', () => {
      
      if (isAnyMenuOpen()) {
        allNavItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });
});


