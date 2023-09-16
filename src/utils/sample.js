import { v4 as uuid } from "uuid";

export const OrderItemList = [
  {
    id: uuid(),
    name: "Item Product 1",
    description: "This is description for item product 1",
    imgUrl: "item1.jpg",
    originalPrice: 60.75,
    discountPrice: 45.9,
    quantity: 0,
  },
  {
    id: uuid(),
    name: "Item Product 2",
    description: "This is description for item product 2",
    imgUrl: "item2.jpg",
    originalPrice: 100.25,
    discountPrice: 70.5,
    quantity: 0,
  },
  {
    id: uuid(),
    name: "Item Product 3",
    description: "This is description for item product 3",
    imgUrl: "item3.jpg",
    originalPrice: 160.45,
    discountPrice: 120.3,
    quantity: 0,
  },
];
