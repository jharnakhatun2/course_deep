import { useDispatch } from "react-redux"
import { decrementQuantity, incrementQuantity, removeFromCart } from "../features/product/actions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id))
  }
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id))
  }

  const handleDelete = (id) => {
    dispatch(removeFromCart(id))
  }
  return (
    <div className="cartCard">
      <div className="flex items-center col-span-6 space-x-6">
        {/* <!-- cart image --> */}
        <img className="lws-cartImage" src={item.image} alt="product" />
        {/* <!-- cart item info --> */}
        <div className="space-y-2">
          <h4 className="lws-cartName">{item.title}</h4>
          <p className="lws-cartCategory">{item.category}</p>
          <p>BDT <span className="lws-cartPrice">{item.price}</span></p>
        </div>
      </div>
      <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
        {/* <!-- amount buttons --> */}
        <div className="flex items-center space-x-4">
          <button className="lws-incrementQuantity" onClick={() => handleIncrement(item.id)}>
            <i className="text-lg fa-solid fa-plus"></i>
          </button>
          <span className="lws-cartQuantity">{item.quantity}</span>
          <button className="lws-decrementQuantity" onClick={() => handleDecrement(item.id)}>
            <i className="text-lg fa-solid fa-minus"></i>
          </button>
        </div>
        {/* <!-- price --> */}
        <p className="text-lg font-bold">BDT <span className="lws-calculatedPrice">{item.price * item.quantity}</span></p>
      </div>
      {/* <!-- delete button --> */}
      <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
        <button className="lws-removeFromCart" onClick={() => handleDelete(item.id)}>
          <i className="text-lg text-red-400 fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  )
}

export default CartItem