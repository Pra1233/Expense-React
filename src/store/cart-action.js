import { expenseAction } from "./expense";
import { cartAction } from "./cart";
export const getData = () => {
  return async (dispatch) => {
    const getRequest = async () => {
      const res = await fetch(
        "https://ecommerce-66b74-default-rtdb.firebaseio.com/cart.json"
      );
      if (!res.ok) {
        throw new Error("Sending cart data Failed");
      }
      const data = await res.json();
      return data;
    };
    try {
      const cart = await getRequest();
      dispatch(cartAction.replaceCart(cart));
    } catch (e) {
      console.log(e);
      dispatch(
        expenseAction.showNotification({
          status: "error",
          title: "error",
          message: "Sending Cart Data failed ",
        })
      );
    }
  };
};

export const postData = (cart) => {
  return async (dispatch) => {
    dispatch(
      expenseAction.showNotification({
        status: "pending",
        title: "sending",
        message: "Sending Cart Data",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://ecommerce-66b74-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!res.ok) {
        throw new Error("Sending cart data Failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        expenseAction.showNotification({
          status: "success",
          title: "Sent",
          message: "Sent cart data succssfully ",
        })
      );
    } catch (e) {
      console.log(e);
      dispatch(
        expenseAction.showNotification({
          status: "error",
          title: "error",
          message: "Sending Cart Data failed ",
        })
      );
    }
  };
};
