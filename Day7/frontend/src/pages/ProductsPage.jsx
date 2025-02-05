import { useEffect, useState } from "react";
import './ProductPage.css';
const ProductsPage = () => {
  const [products,setProducts]=useState([]);
  const getData = async () =>{
    const resp=await fetch("http://localhost:8000/api/products");
    const data=await resp.json();
    console.log(data);
   setProducts(data);
  }
  useEffect(()=>{
    getData();
  },[]);
// getData();
console.log(products);
  return (
    <div>
      
      <h1>Products Page</h1>
      {/* {
        JSON.stringify(products)
      } */}
      <div className="card-container">
      {
        
        products.map((product)=>(
          <div key={product._id} className="card">
            <h2>Price : ${product.price}</h2>
            <h3>Discount : {product.discount}</h3>
            <p>Company : {product.company}</p>
            <p>Title : {product.title}</p>
            <p>Quantity : {product.quantity}</p>
            <img src={product.thumbnail} alt={product.title} />
            <hr />
          </div>
          
        ))
      }
      </div>
    </div>
  )
}

export default ProductsPage
