const refs = {
  form: document.querySelector('.header__form'),
  content: document.querySelector('.content'),
  loader: document.querySelector('.loader__lds'),
};

const fetchRepos = async user => {
  try {
    loading(true);
    return await fetch(`https://api.github.com/users/${user}/repos`).then(response => {
      if (!response) throw new Error(response.status);
      return response.json();
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    loading(false);
  }
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  refs.content.innerHTML = '';
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
  refs.content.append(ul);
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

function loading(on) {
  if (on) refs.loader.style.display = 'inline-block';
  else refs.loader.style.display = 'none';
}
