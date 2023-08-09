import PropTypes from "prop-types";

ToDeleteButton.propTypes = {
  onClick: PropTypes.func
};

export default function ToDeleteButton({ onClick}) {

  return (
    <button
    onClick={onClick}
      style={{
        backgroundColor: "red",
        color: "white",
        height: "30px",
        width: "auto",
        borderRadius: "5px",
        padding: "9px 15px",
        border: "none",
        marginLeft: "10px",
        fontWeight: "bold",

      }}
    >
      Excluir
    </button>
  );
}
