import '../styles/loading-component.css'

export default function LoadingComponent(){
  return(
    <div
    style={{
      height: "70vh",
      display: 'flex',
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center"
    }}>
          <div className="spinner"></div>
    </div>
  )
}