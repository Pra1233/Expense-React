import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiAction.toggle());
  };

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
