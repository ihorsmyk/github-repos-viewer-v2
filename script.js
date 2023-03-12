const refs = {
  form: document.querySelector('.header__form'),
  main: document.querySelector('.main__content'),
};

const fetchRepos = user => {
  // loader on
  return fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => {
      if (!response) throw new Error(response.status);
      return response.json();
    })
    .catch(error => error);
  //    .finally()  loader off
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  refs.main.innerHTML = '';
  const username = e.target.elements[1].value.trim();
  fetchRepos(username).then(data => filterProperties(data));
  e.target.reset();
});

function filterProperties(arrayRepos) {
  const resultRepos =
    Array.isArray &&
    arrayRepos.map(({ name, language, description }) => {
      return { name, language, description };
    });
  createRepoList(resultRepos);
}

function createRepoList(repoList) {
  let ul = document.createElement('ul');
  repoList.forEach(el => ul.append(createRepoItem(el)));
  refs.main.append(ul);
}

function createRepoItem(repo) {
  let li = document.createElement('li');
  li.classList.add('item');
  li.insertAdjacentHTML('beforeend', `<h2 class="item__name">${repo.name}</h2>`);
  li.insertAdjacentHTML(
    'beforeend',
    ` <p class='item__namesOfFields'>
        languge: <span class="item__language">${repo.language || 'not known'}</span>
      </p>`
  );
  li.insertAdjacentHTML(
    'beforeend',
    ` <p class='item__namesOfFields'>
        description: <span class="item__description">${repo.description || 'there is no'}</span>
      </p>`
  );
  return li;
}
