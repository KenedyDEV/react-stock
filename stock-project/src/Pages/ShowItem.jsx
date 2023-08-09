/* eslint-disable no-unused-vars */

import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import LoadingComponent from "../components/LoadingComponent";
import ToDeleteButton from "../components/buttons/toDeleteButton";
import ToUpdateButton from "../components/buttons/toUpdateButton";
import "../styles/show-item.css";
import { StockContext } from "../contexts/StockContext";

async function deleteItem(id) {
  const confirmar = confirm("Tem certeza que deseja excluir o item?");

  if (confirmar) {
    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      alert("Item deletado do banco de dados");

      window.location.href = "/items/";
    } catch (error) {
      alert("Ocorreu um erro na operação de exclusão.");
    }
  } else {
    alert("Operação cancelada");
  }
}

export default function ViewItem() {
  const useData = useContext(StockContext);

  const { itemId } = useParams();

  const item = useData.data.find((el) => el.id == itemId);

  if(useData.loading){
    return <LoadingComponent/>
  }

  return (
    <div>
      <div className="firstLine">
        <h1>{item.name}</h1>

        <Link
          to={`/items/update/${item.id}`}
          onClick={() => sessionStorage.setItem("id", String(item.id))}
        > 
          <ToUpdateButton/>
        </Link>

        <ToDeleteButton onClick={() => deleteItem(item.id)} />
      </div>

      <div className="secondLine">
        <div className="divsSecondLine">Categoria: {item.category}</div>
        <div className="divsSecondLine">Quantidade: {item.inStock}</div>
        <div className="divsSecondLine">Preço: R${item.price}</div>
      </div>

      <div className="divParagraphs">
        <p>{item.description}</p>
        <div className="divParagraphsCreatedUpdated">
          <p>Produto cadastrado em: {item.createdAt}</p>
          {item.updatedAt ? <p>Atualizado em {item.updatedAt}</p> : null}
        </div>
      </div>
    </div>
  );
}
