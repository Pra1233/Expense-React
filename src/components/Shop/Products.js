import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const products = [
  {
    id: 1,
    title: "Book",
    price: 100,
    description: "The book Wrote",
  },
  {
    id: 2,
    title: "Food",
    price: 100,
    description: "The food eat",
  },
  {
    id: 3,
    title: "dog",
    price: 100,
    description: "The dog Wrote",
  },
  {
    id: 4,
    title: "Car",
    price: 100,
    description: "The book Wrote",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
