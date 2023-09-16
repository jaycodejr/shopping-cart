import { useState } from "react";
import "./App.css";
import { OrderItemList } from "./utils/sample";

const initialData = [...OrderItemList];

function App() {
  const [items, setItems] = useState(initialData);

  return (
    <div className="container">
      <h2 className="header">Your Cart</h2>
      <OrderDetails>
        <OrderTitle />
        <OrderList items={items} />
        <OrderDiscount />
      </OrderDetails>
      <OrderSummary />
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

function OrderSummary() {
  return (
    <div className="order-summary">
      <h3>Cart Totals</h3>
      <div className="sub-total-info">
        <p className="sub-title">Subtotal</p>
        <p className="amount">$268.95</p>
      </div>
      <p>Shipping</p>
      <div className="shipping-details">
        <p className="sub-title">Next Day</p>
        <p className="amount">$11.00</p>
        <p className="sub-title">Shipping to United States</p>
        <p className="amount">-</p>
      </div>
      <div className="total-amount">
        <p>Order Total</p>
        <p className="amount">$279.95</p>
      </div>
      <button className="btn-checkout">Go to Checkout</button>
    </div>
  );
}

function OrderDiscount() {
  return (
    <div className="order-discount">
      <p>Apply discount code:</p>
      <input type="text" />
      <button className="btn-discount">Apply</button>
    </div>
  );
}

function OrderList({ items }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}

function Item({ item }) {
  return (
    <div className="item">
      <div className="info">
        <img
          className="item-image"
          src="images/item2.jpg"
          alt="Item product 2"
        />
        <p className="item-description">
          <span className="item-name">{item.name}</span>
          <span className="item-size">{item.description}</span>
        </p>
      </div>
      <div className="item-price">
        <p className="discount-price">{`$${item.discountPrice}`}</p>
        <p className="original-price">{`$${item.originalPrice}`}</p>
      </div>
      <div className="item-quantity">
        <div className="item-minus">-</div>
        <span className="item-count">1</span>
        <div className="item-plus">+</div>
      </div>
      <p className="item-sub-total">$89.65</p>
    </div>
  );
}

export default App;
