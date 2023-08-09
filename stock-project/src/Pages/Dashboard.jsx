import "../styles/dashboard.css";
import BoxDashboard from "../components/BoxDashboard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";
import ToSeeButton from "../components/buttons/toSeeButton";
import LoadingComponent from "../components/LoadingComponent";

export default function Dashboard() {
  const useData = useContext(StockContext);

  if(useData.loading){
    return <LoadingComponent/>
  }

  return (
    <section className="containerDashboard">
      <h1 className="mainTitle">Dashboard</h1>
      <section className="elementsContent">
        <BoxDashboard title="Diversidade de itens" number={useData.diversity} />
        <BoxDashboard title="Inventário total" number={useData.inventary} />
        <BoxDashboard
          title="Itens recentes"
          number={useData.recentItems.length}
        />
        <BoxDashboard
          title="Itens acabando"
          number={useData.runningOut.length}
        />
      </section>

      <section className="sectionBottle">
        <div className="sectionBottleDIV">
          <div className="internal">
            <h4>Itens recentes</h4>
            <h4>Adicionado em:</h4>
            <h4>Ações</h4>
          </div>

          <div className="dataSectionBottom">
            {useData.recentItems != 0
              ? useData.recentItems.map((el) => (
                  <div className="mapRunningOut" key={el.id}>
                    <h4>{el.name}</h4>
                    <h3>{el.createdAt}</h3>
                    <Link
                      to={`/items/${el.id}`}
                      onClick={() =>
                        sessionStorage.setItem("id", String(el.id))
                      }
                    >
                      <ToSeeButton/>
                    </Link>
                  </div>
                ))
              : useData.recentItems}
          </div>
        </div>

        <div className="sectionBottleDIV">
          <div className="internal">
            <h4>Itens acabando</h4>
            <h4>Qtd.</h4>
            <h4>Ações</h4>
          </div>

          <div className="dataSectionBottom">
            {useData.runningOut != 0
              ? useData.runningOut.map((el) => (
                  <div className="mapRunningOut" key={el.id}>
                    <h4>{el.name}</h4>
                    <h3>{el.inStock}</h3>
                    <Link to={`/items/${el.id}`}>
                      <ToSeeButton/>
                    </Link>
                  </div>
                ))
              : useData.runningOut}
          </div>
        </div>
      </section>
    </section>
  );
}
