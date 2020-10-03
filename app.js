const cafe_list = document.querySelector("#cafe-list");
const cafe_form = document.querySelector("#add-cafe-form");

// create element and render cafe
function renderCafe(element) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", element.id);
  name.textContent = element.data().name;
  city.textContent = element.data().city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafe_list.appendChild(li);

  // delets the cafe
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    database.collection("cafes").doc(id).delete();
  });
}

// saves the data
cafe_form.addEventListener("submit", (e) => {
  e.preventDefault();
  database.collection("cafes").add({
    name: cafe_form.name.value,
    city: cafe_form.city.value,
  });

  cafe_form.name.value = "";
  cafe_form.city.value = "";
});

// real time data with listener
database
  .collection("cafes")
  .orderBy("name")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderCafe(change.doc);
      } else if (change.type == "removed") {
        let li = cafe_list.querySelector("[data-id=" + change.doc.id + "]");
        cafe_list.removeChild(li);
      }
    });
  });

// example of updating data
database
  .collection("cafes")
  .doc("PvIEysz7PrymZmkNVJ2w")
  .update({ name: "Camilla's Coffe" });
