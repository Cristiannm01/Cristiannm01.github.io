
// var url =
//   "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD";
var url =
  "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
var dominio = "https://www.cryptocompare.com/";

traerDatosApi();

async function traerDatosApi() {
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  const data = resultado.Data;

  const ul = document.getElementById("listado");

  for (var i = 0; i < data.length; i++) {
    const elementoActual = data[i];

    const li = document.createElement("li");
    li.className = "cripto-contenedor";

    const img = document.createElement("img");
    img.src = dominio + elementoActual.CoinInfo.ImageUrl;
    img.alt = "Imagen de una criptomoneda";
    li.appendChild(img);

    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = i + 1;
    p.className = "numeracion";
    div.appendChild(p);
    const h3 = document.createElement("h3");
    h3.textContent = "Nombre Completo: " + elementoActual.CoinInfo.FullName;
    div.appendChild(h3);
    const p1 = document.createElement("p");
    p1.textContent = "Abreviatura: " + elementoActual.CoinInfo.Name;
    div.appendChild(p1);
    const p2 = document.createElement("p");
    p2.textContent =
      "Fecha de lanzamiento: " + elementoActual.CoinInfo.AssetLaunchDate;
    div.appendChild(p2);
    const p3 = document.createElement("p");
    p3.textContent = "Precio: " + elementoActual.DISPLAY.USD.PRICE;
    div.appendChild(p3);
    li.appendChild(div);
    ul.appendChild(li);

    console.log(elementoActual);
  }
}
