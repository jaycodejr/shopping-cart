import { useState } from "react";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { confirmation, loading, notify } from "./utils/helper";

import { OrderItemList } from "./utils/sample";

const initialData = [...OrderItemList];

function App() {
  const shippingFeeAmount = 5;
  const discountAmount = 10;
  const discountCode = "JCODE544";

  const [items, setItems] = useState(initialData);
  const [applyDiscountCode, setApplyDiscountCode] = useState(false);

  const subTotal = items.reduce(
    (sum, curVal) => sum + curVal.quantity * curVal.discountPrice,
    0
  );

  //handles
  async function handeleOrderCheckout(finalAmount) {
    if (finalAmount === 0) {
      notify("i", "Please select atleast one item to order");
      return;
    }

    const proceed = await confirmation(
      "Do you want to proceed with transaction?"
    );

    if (proceed.isDismissed) {
      return;
    }

    if (proceed.isConfirmed) {
      loading(true);

      setTimeout(function () {
        notify("s", "Order successfully created");

        setItems((items) =>
          items.map((item) => {
            item.quantity = 0;
            return item;
          })
        );

        setApplyDiscountCode(false);
        loading(false);
      }, 4000);
    }
  }

  function handleDiscountCode(code) {
    if (subTotal === 0) {
      notify("i", "Please select at least one item");
      return;
    }
    if (!code) {
      notify("i", "Please enter discount code");
      return;
    }
    setApplyDiscountCode(code.toUpperCase() === discountCode);
  }

  function handleItemIncrease(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleItemDecrease(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  return (
    <div className="container">
      <h2 className="header">Your Cart</h2>
      <OrderDetails>
        <OrderTitle />
        <OrderList
          items={items}
          onItemIncrease={handleItemIncrease}
          onItemDecrease={handleItemDecrease}
        />
        <OrderDiscount onApplyDiscountCode={handleDiscountCode} />
      </OrderDetails>
      <OrderSummary
        items={items}
        onOrderCheckout={handeleOrderCheckout}
        shippingFeeAmount={shippingFeeAmount}
        applyDiscountCode={applyDiscountCode}
        discountAmount={discountAmount}
      />
      <ToastContainer />
    </div>
  );
}

function OrderDetails({ children }) {
  return <div className="order-details">{children}</div>;
}

function OrderTitle() {
  return (
    <div className="order-title">
      <p>Description</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Subtotal</p>
    </div>
  );
}

function OrderSummary({
  items,
  shippingFeeAmount,
  onOrderCheckout,
  applyDiscountCode,
  discountAmount,
}) {
  const subTotal = items.reduce(
    (prev, curVal) => prev + curVal.discountPrice * curVal.quantity,
    0
  );

  const totalQuantity = items.reduce(
    (prev, curVal) => prev + curVal.quantity,
    0
  );

  const discount = subTotal > 0 ? (applyDiscountCode ? discountAmount : 0) : 0;
  const shipping = subTotal > 0 ? shippingFeeAmount : 0;

  const finalAmount =
    subTotal > 0
      ? subTotal + shippingFeeAmount + (applyDiscountCode ? -discountAmount : 0)
      : 0;

  function handeleOrderCheckout() {
    onOrderCheckout(finalAmount);
  }

  return (
    <div className="order-summary">
      <h3>Cart Totals</h3>
      <div className="sub-total-info">
        <p className="sub-title">Subtotal</p>
        <p className="amount">{`$${subTotal.toFixed(2)}`}</p>
      </div>
      <p>Discount</p>
      <div className="promotion">
        <p className="sub-title">Discount</p>
        <p className="amount">{`$${discount.toFixed(2)}`}</p>
      </div>
      <p>Shipping</p>
      <div className="shipping-details">
        <p className="sub-title">Standard</p>
        <p className="amount">{`$${shipping.toFixed(2)}`}</p>
      </div>

      <div className="total-amount">
        <p>Order Total</p>
        <p className="amount">{`$${finalAmount.toFixed(2)}`}</p>
      </div>
      <Button buttonClass={"btn-checkout"} onClick={handeleOrderCheckout}>
        Go to Checkout ({totalQuantity})
      </Button>
    </div>
  );
}

function OrderDiscount({ onApplyDiscountCode }) {
  const [code, setCode] = useState("");

  function handleApplyDiscount() {
    onApplyDiscountCode(code);
    setCode("");
  }

  return (
    <div className="order-discount">
      <p>Apply discount code:</p>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button buttonClass={"btn-discount"} onClick={handleApplyDiscount}>
        Apply
      </Button>
    </div>
  );
}

function OrderList({ items, onItemIncrease, onItemDecrease }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Item
          item={item}
          onItemDecrease={onItemDecrease}
          onItemIncrease={onItemIncrease}
          key={item.id}
        />
      ))}
    </div>
  );
}

function Item({ item, onItemIncrease, onItemDecrease }) {
  return (
    <div className="item">
      <div className="info">
        <img
          className="item-image"
          src={`images/${item.imgUrl}`}
          alt={`Item product ${item.name}`}
        />
        <p className="item-description">
          <span className="item-name">{item.name}</span>
          <span className="item-size">{item.description}</span>
        </p>
      </div>
      <div className="item-price">
        <p className="discount-price">{`$${item.discountPrice.toFixed(2)}`}</p>
        <p className="original-price">{`$${item.originalPrice.toFixed(2)}`}</p>
      </div>
      <div className="item-quantity">
        <Button
          buttonClass={"item-minus"}
          onClick={() => onItemDecrease(item.id)}
        >
          -
        </Button>
        <span className="item-count">{item.quantity}</span>
        <Button
          buttonClass={"item-minus"}
          onClick={() => onItemIncrease(item.id)}
        >
          +
        </Button>
      </div>
      <p className="item-sub-total">{`$${(
        item.quantity * item.discountPrice
      ).toFixed(2)}`}</p>
    </div>
  );
}

// Button
function Button({ buttonClass, onClick, children }) {
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
