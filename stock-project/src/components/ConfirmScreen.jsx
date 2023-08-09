/* eslint-disable react/prop-types */
export default function ConfirmScreen({name, inStock, price, category, description}){
  return(
    <div
      style={{
        backgroundColor: "black",
        height: '300px',
        width: '300px',
        margin: "0 auto"
      }}
    >
      <h1>Crição de produto</h1>
      <h3>Tem certeza que deseja adicionar este {category} no estoque?</h3>

      <p>
      Nome: ${name}
      Quantidade: ${inStock}
      Preço: ${price}
      Categoria: ${category}
      Descrição: ${description}
      </p>

      <button >Sim</button>
      <button>Não</button>
    </div>
  )
}