// async function getCountry() {
//   const URL = 'https://restcountries.com/v3.1/name/';
//   const resp = await fetch(`${URL}Ukraine`);
//   if (!resp.ok) {
//     throw new Error(resp.statusText);
//   }
//   return resp.json();
// }

// getCountry()
//   .then(data => console.log(data))
//   .catch(e => console.log(e));

// async function getCapital() {
//   //   try {
//   const URL = 'https://restcountries.com/v3.1/name/';
//   const arr = ['Ukraine', 'Germany', 'France', 'hhhhh'];

//   const resps = arr.map(async ctry => {
//     const resp = await fetch(`${URL}${ctry}`);
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }

//     return resp.json();
//   });

//   const prom = await Promise.allSettled(resps);
//   console.log(prom);
//   return prom;
//   //   } catch (e) {
//   //     console.log(e);
//   //   }
// }

// getCapital()
//   .then(data => {
//     const res = data
//       .filter(({ status }) => status === 'fulfilled')
//       .map(({ value }) => value[0]);
//     const rej = data.filter(({ status }) => status === 'rejected');
//     console.log(res);
//     console.log(rej);
//   })
//   .catch(e => console.log(e));

const searchForm = document.querySelector('.js-search');
const addCountry = document.querySelector('.js-add');
const list = document.querySelector('.js-list');
const formContainer = document.querySelector('.js-form-container');
const markup = ' <input type="text" name="country" />';

addCountry.addEventListener('click', handleAddInput);

function handleAddInput() {
  const markup = ' <input type="text" name="country" />';
  formContainer.insertAdjacentHTML('beforeend', markup);
}

searchForm.addEventListener('submit', handleForm);

function handleForm(e) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const arr = data
    .getAll('country')
    .filter(item => item)
    .map(item => item.trim());

  getCountries(arr)
    .then(async resp => {
      const capitals = resp.map(({ capital }) => capital[0]);
      const weatherService = await getWeather(capitals);
      list.innerHTML = createMarkup(weatherService);
    })
    .catch(e => console.log(e))
    .finally(() => {
      searchForm.reset();
      formContainer.innerHTML = markup;
    });
}

async function getCountries(arr) {
  const resps = arr.map(async item => {
    const resp = await fetch(`https://restcountries.com/v3.1/name/${item}`);

    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });

  const data = await Promise.allSettled(resps);
  const countryObj = data
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value[0]);

  return countryObj;
}

async function getWeather(arr) {
  const BASE_URL = 'http://api.weatherapi.com/v1';
  const API_KEY = 'a513b9e402f74148a7430930241802';

  const resps = arr.map(async city => {
    const params = new URLSearchParams({
      key: API_KEY,
      q: city,
    });

    const resp = await fetch(`${BASE_URL}/current.json?${params}`);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });

  const data = await Promise.allSettled(resps);
  const obj = data
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value);

  return obj;
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        current: {
          temp_c,
          condition: { icon, text },
        },
        location: { country, name },
      }) =>
        `      <div>
        <h2>${country}</h2>
        <h3>${name}</h3>
        <img src="${icon}" alt="${text}" />
        <p>${text}</p>
        <p>${temp_c}</p>
      </div>`
    )
    .join('');
}
