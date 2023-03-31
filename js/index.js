document.addEventListener('DOMContentLoaded', function() {
    // Select the search form element
    const searchForm = document.querySelector('#search-form');
  
    // Add an event listener to the search form element
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
const repoList = document.querySelector('#repo-list');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchQuery = searchInput.value;

  // Make a request to the User Search Endpoint
  const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (response.ok) {
    const data = await response.json();
    displaySearchResults(data.items);
  } else {
    alert('Failed to fetch search results');
  }
});

function displaySearchResults(users) {
    searchResults.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = user.avatar_url;
      img.alt = `${user.login} avatar`;
      const link = document.createElement('a');
      link.href = user.html_url;
      link.textContent = user.login;
      li.append(img, link);
      li.addEventListener('click', async () => {
        const reposResponse = await fetch(user.repos_url, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });
        if (reposResponse.ok) {
          const repos = await reposResponse.json();
          displayRepos(repos);
        } else {
          alert('Failed to fetch repositories');
        }
      });
      searchResults.appendChild(li);
    });
  }

  function displayRepos(repos) {
    repoList.innerHTML = '';
    repos.forEach((repo) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = repo.html_url;
      link.textContent = repo.name;
      li.appendChild(link);
      repoList.appendChild(li);
    });
  }
    });
  });