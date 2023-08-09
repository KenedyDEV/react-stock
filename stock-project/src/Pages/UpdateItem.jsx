import { useContext, useState,useEffect } from "react";
import "../styles/update-item.css";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { StockContext } from "../contexts/StockContext";
import LoadingComponent from "../components/LoadingComponent";

async function postItem(object, itemId) {
  const response = await fetch(`http://localhost:3000/products/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  await response.json();
}

export default function UpdateItem() {

  const useData = useContext(StockContext)
  const { itemId } = useParams()
  const item = useData.data.find((el) => el.id == itemId)

  const [name, setName] = useState("");
  const [inStock, setInStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  
  useEffect(() => {
    if (item) {
      setName(item.name);
      setInStock(item.inStock);
      setCategory(item.category);
      setDescription(item.description);
      setPrice(item.price);
    }
  }, [item]);



  function handleSubmit(ev) {
    ev.preventDefault();

    const confirmV = confirm(`
      Deseja confirmar a alteração do produto?
      De ${item.name} para ${name}
      De ${item.inStock} para ${inStock}
      De ${item.price} para ${price}
      De ${item.category} para ${category}
      De ${item.description} para ${description}
      `);

    if (confirmV) {
      const Post = {
        name,
        inStock,
        price,
        category,
        description,
        createdAt: item.createdAt,
        updatedAt: dayjs().format("YYYY-MM-DD")
      };

      postItem(Post, item.id).then(() => {
        alert("Produto atualizado.");

        location.reload()

        return;
      });

      return;
    }

    return;
  }

  if(useData.loading){
    return <LoadingComponent/>
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
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="inStockInput">Quantidade</label>
          <input
            required
            type="number"
            name=""
            id="inStockInput"
            value={inStock}
            onChange={(ev) => setInStock(ev.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="priceInput">Preço</label>
          <input
            required
            type="number"
            name=""
            id="priceInput"
            step="0.01"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="categoryInput">Categoria</label>
          <select
            required
            name=""
            id="categoryInput"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option selected value=""></option>
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
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          
        ></textarea>
      </div>

      <button type="submit" className="btnCreateItem">
        Salvar
      </button>
    </form>
  );
}
