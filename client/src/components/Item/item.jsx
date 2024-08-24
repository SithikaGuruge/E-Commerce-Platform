import { useNavigate } from "react-router-dom";
export default function Item(props) {
  const navigate = useNavigate();

  const clickOnProduct = async () => {
    console.log("click on product", props);
    navigate(`/product/${props.productId}`);
  };

  return (
    <div className="flex" onClick={clickOnProduct}>
      <div className="flex flex-col gap-x-5 cursor-pointer shadow-lg hover:translate-y-1 hover:scale-105 hover:shadow-xl transition-transform duration-300">
        <img
          src={props.image}
          alt={props.name}
          className="w-48 h-48 lg:size-64"
        />
        <p className="m-[6px] w-48">{props.name}</p>

        <p className="text-md font-semibold text-[#374151]">
          {props.new_price}
        </p>
        <p className="text-md font-thin line-through text-[#8c8c8c]">
          {props.old_price}
        </p>
      </div>
    </div>
  );
}
