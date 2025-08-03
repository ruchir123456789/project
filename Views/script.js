alert("hello");
alert("he");
// let data = [
//   { id: 1, name: "Product A", price: 10.99 },
//   { id: 2, name: "Product B", price: 25.5 },
// ];

// data.forEach((item) => {
//   // Create elements for each item
//   // ...

//   // Inside the forEach loop
//   const container = document.getElementById("container"); // Get the parent element

//   const newDiv = document.createElement("div");
//   newDiv.classList.add("item"); // Add a class for styling

//   const titleParagraph = document.createElement("p");
//   titleParagraph.textContent = item.title; // Assuming 'title' is a property in your JSON

//   const imageElement = document.createElement("img");
//   imageElement.src = item.imageUrl; // Assuming 'imageUrl' is a property
//   imageElement.alt = item.title;

//   newDiv.appendChild(titleParagraph);
//   newDiv.appendChild(imageElement);
//   container.appendChild(newDiv);
// });

const jsonDataString =
  '{"items": [{"name": "Item 1", "description": "Description 1"}, {"name": "Item 2", "description": "Description 2"}]}';
const data = JSON.parse(jsonDataString);

data.items.forEach((item) => {
  const div = document.createElement("div");
  div.classList.add("item-card"); // Add a class for styling

  const nameHeading = document.createElement("h3");
  nameHeading.textContent = item.name;

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = item.description;

  div.appendChild(nameHeading);
  div.appendChild(descriptionParagraph);

  container.appendChild(div);
});
