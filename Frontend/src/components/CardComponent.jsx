const CardComponent = ({
  img,
  categoria,
  precio,
  currency = null,
  titulo,
  proveedor,
}) => {
  return (
    <div
      className="relative w-full h-64 bg-center bg-cover rounded-lg overflow-hidden"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Degradado del fondo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

      {/* Categoría */}
      <div className="relative text-white z-10 top-4 left-4 float-left bg-black bg-opacity-20 backdrop-blur-sm py-1 px-2 rounded">
        {categoria}
      </div>

      {/* Precio y Moneda */}
      <div className="relative z-10 top-4 right-4 float-right">
        {currency === null ? (
          <div className="text-white flex items-center">
            <span className="ml-1">GRATIS</span>
          </div>
        ) : currency === "$" ? (
          <div className="text-white flex items-center">
            <span className="text-sm shadow-sm">{currency}</span>
            <span className="ml-1 text-xl shadow-md">{precio}</span>
          </div>
        ) : (
          <div className="text-white flex flex-col justify-center items-center">
            <span className="text-xl drop-shadow-sm">{precio}</span>
            <span className="text-sm drop-shadow-sm">{currency}</span>
          </div>
        )}
      </div>

      {/* Proveedor y Título */}
      <div className="absolute z-10 bottom-4 left-4">
        <div className="text-white underline">{proveedor}</div>
        <div className="text-white text-xl mt-2 pr-2">{titulo}</div>
      </div>
    </div>
  );
};

export default CardComponent;
