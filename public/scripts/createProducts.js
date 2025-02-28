// socket del front

const socket = io();

socket.on("products", (data) => {
  const usersTemplate = data
    .map(
      (each) =>
        `<div class="card">
        <div class="card-body">
        ${
          each.photo
            ? `<img src=${each.photo} style="width: 16rem; height: 18rem;object-fit: cover;" />`
            : `<img src="http://cdn-icons-png.flaticon.com/512/9402/9402212.png" alt="" style="width: 16rem; height: 18rem;object-fit: cover;">`
        }
            <h5 class="card-title">${each.title}</h5> 
            <p class="card-text">USD $${each.price}</p>
            <p class="card-text">Stock: ${each.stock}</p>
          </div>
          </div>`
    )
    .join("");
  document.querySelector("#products").innerHTML = usersTemplate;
});

document.querySelector("#register").addEventListener("click", async () => {
  const title = document.querySelector("#title").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const photo = document.querySelector("#photo").value;
  const product = { title, price, stock, photo };
  socket.emit("new product", product);
  document.querySelector("#title").value = ""
  document.querySelector("#price").value = ""
  document.querySelector("#stock").value = ""
  document.querySelector("#photo").value = ""
});
