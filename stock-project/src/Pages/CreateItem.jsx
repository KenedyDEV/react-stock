import { useState } from "react";
import '../styles/create-item.css'
import dayjs from "dayjs";
import ConfirmScreen from "../components/ConfirmScreen";

async function postItem(object) {
  const response = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  await response.json();
}

export default function CreateItem() {
  const [name, setName] = useState("");
  const [inStock, setInStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();

    <ConfirmScreen name={name} category={category} price={price} inStock={inStock} description={description}/>

    const confirmV = confirm(`
      Deseja confirmar a criação do produto?
      Nome: ${name}
      Quantidade: ${inStock}
      Preço: ${price}
      Categoria: ${category}
      Descrição: ${description}
      `);

    if (confirmV) {
      const Post = {
        name,
        inStock,
        price: `R$ ${price}`,
        category,
        description,
        createdAt: dayjs().format("YYYY-MM-DD"),
      };

      postItem(Post).then(() => {
        alert("Produto adicionado no banco de dados.");

        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setDescription("");

        return;
      });

      return;
    }

    return;
  }

  return (
    <form onSubmit={handleSubmit} className="formCreateItem">
      <div className="allInputs">
        <div className="input">
          <label htmlFor="nameInput">Nome</label>
          <input
            required
            type="text"
            name=""
            id="nameInput"
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="inStockInput">Quantidade</label>
          <input
            required
            type="number"
            name=""
            min={1}
            id="inStockInput"
            onChange={(ev) => setInStock(ev.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="priceInput">Preço</label>
          <input
            required
            type="text"
            name=""
            id="priceInput"
            onChange={(ev) => setPrice(ev.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="categoryInput">Categoria</label>
          <select
            required
      
            name=""
            id="categoryInput"
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option selected value=""> Selecione uma categoria</option>
            <option value="Jogos">Jogos</option>
            <option value="Livros">Livros</option>
            <option value="Mangás">Mangás</option>
            <option value="Filmes">Filmes</option>
          </select>
        </div>
      </div>

      <div className="inputText">
        <label htmlFor="descriptionTextArea">Descrição</label>
        <textarea
        style={{padding: "5px"}}
          required
          name=""
          id="descriptionTextArea"
          cols="10"
          rows="10"
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="btnCreateItem" >
        Salvar
      </button>
    </form>
  );
}
