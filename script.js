document.getElementById('item-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const itemLink = document.getElementById('item-link');
  addItemToComparison(itemLink.value);
  itemLink.value = '';
});

async function addItemToComparison(link) {
  const data = await fetchItemData(link);
  if (!data) {
    alert('Failed to fetch item data');
    return;
  }

  const comparisonContainer = document.getElementById('comparison-container');
  const item = createComparisonItem(data);
  comparisonContainer.appendChild(item);
}

function createComparisonItem(data) {
  const item = document.createElement('div');
  item.classList.add('comparison-item');

  const image = document.createElement('img');
  image.src = data.image;
  image.alt = data.name;
  image.classList.add('item-image');

  const name = document.createElement('h2');
  name.textContent = data.name;

  const price = document.createElement('p');
  price.textContent = `$${data.price}`;
  price.classList.add('item-price');

  const marketplace = document.createElement('p');
  marketplace.textContent = `Marketplace: ${data.marketplace}`;

  const description = document.createElement('p');
  description.textContent = data.description;

  item.appendChild(image);
  item.appendChild(name);
  item.appendChild(price);
  item.appendChild(marketplace);
  item.appendChild(description);

  return item;
}

async function fetchItemData(link) {
  // You need to implement the server-side logic to fetch the required data from marketplaces.
  // Replace this URL with your server-side API endpoint.
  const apiUrl = `https://your-api-endpoint.com/fetch-data?url=${encodeURIComponent(link)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch item data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching item data:', error);
    return null;
  }
}
