let valorUsuario = document.querySelector("#valor");
let moedaUsuario = document.querySelector("#moedas");
let btn = document.querySelector("#btn");

function pegarMoeda() {
    const moeda = moedaUsuario.value;

    if (moeda === "default") {
        alert("Por favor, selecione uma moeda.");
        return;
    }

    fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}`)
        .then((res) => res.json())
        .then((data) => {
            displayResultado(data, moeda);
        })
        .catch((error) => {
            console.error("Erro ao buscar a cotação:", error);
            alert("Erro ao buscar a cotação. Tente novamente.");
        });
}

function displayResultado(data, moeda) {
    const chave = moeda.replace("-", ""); 
    const valorAtual = parseFloat(data[chave].bid); 
    const valorConvertido = valorAtual * parseFloat(valorUsuario.value);

    const cotacao = valorConvertido.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const divRes = document.querySelector(".display-res");
    const divContainer = document.querySelector(".container");

    divContainer.classList.add("style-container");

    divRes.innerHTML = `<div class="resultado">
        <p>${moeda.split("-")[0]} $${valorUsuario.value} = ${cotacao}</p>
        <p>${cotacao}</p>
    </div>`;
}

btn.addEventListener("click", pegarMoeda);
