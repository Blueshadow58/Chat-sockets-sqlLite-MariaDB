const productSocket = io.connect();
const productButton = document.getElementById("buttonProduct");

productButton?.addEventListener("click", () => {
  const product = {
    name: document.getElementById("nameProduct").value,
    price: document.getElementById("priceProduct").value,
    image: document.getElementById("imageProduct").value,
  };

  if (!product.name || !product.price || !product.image) {
    alert("Recuerde ingresar todos los campos para la creacion del producto");
  } else {
    // console.log(message);
    //Guardar en doc
    productSocket.emit("new-product", product);
  }
});

productSocket.on("new-product-table", (products) => {
  const html = products
    .map((product) => {
      let contentProduct = `<tr>
        <td>${product.name}</td>
        <td>${product.price}</td>

        <td>
          <img
          width="50px"
            src="${product.image}"
            title="2016–17 UEFA Champions League"
          ></img></td>
      </tr>`;
      return contentProduct;
    })
    .join("");
  document.getElementById("table-data").innerHTML = html;
});
