import { Link } from "react-router-dom";
import  "../styles/all-Items.css";
import ToUpdateButton from "../components/buttons/toUpdateButton";
import ToSeeButton from "../components/buttons/toSeeButton";
import ToDeleteButton from "../components/buttons/toDeleteButton";
import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";
import LoadingComponent from "../components/LoadingComponent";

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

export default function AllItems() {
  const { data, loading } = useContext(StockContext);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="thead">
          <tr>
            <th style={{ width: "15%" }}>ID</th>
            <th style={{ width: "20%" }}>Nome</th>
            <th style={{ width: "25%" }}>Em estoque</th>
            <th style={{ width: "20%" }}>Categoria</th>
            <th style={{ width: "20%" }}>Ações</th>
          </tr>
        </thead>

        <tbody className="tbody">
          {data != undefined ? (
            data.map((el) => (
              <tr className="renderTr" key={el.id}>
                <td className="firstTd">{el.id}</td>
                <td>{el.name}</td>
                <td>{el.inStock < 10 ? "0" + el.inStock : el.inStock}</td>
                <td>{el.category}</td>
                <td className="lastTd">

                  <Link
                    to={`/items/${el.id}`}
                    onClick={() => sessionStorage.setItem("id", String(el.id))}
                  >  <ToSeeButton/>  </Link>
                  


                  <Link
                    to={`/items/update/${el.id}`}
                    onClick={() => sessionStorage.setItem("id", String(el.id))}
                  > <ToUpdateButton />  </Link>


                  <ToDeleteButton
                    onClick={() => deleteItem(el.id)}
                  />

                </td>
              </tr>
            ))
          ) : (
            <h2>Não há itens no banco de dados.</h2>
          )}
        </tbody>
      </table>
    </div>
  );
}
