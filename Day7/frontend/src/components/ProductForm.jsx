import "./ProductForm.css"
const ProductForm = () => {
    const handleSubmit =async (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const company = e.target.company.value;
      const discount = e.target.discount.value;
      const quantity = e.target.quantity.value;
      const thumbnail = e.target.thumbnail.value;
      const price = e.target.price.value;
      const product = {title, company, discount, quantity, thumbnail, price};
      console.log(product);
      try {
        // Send request to backend
        const response = await fetch("http://localhost:8000/products", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
  
        const data = await response.json();  // Parse response JSON
  
        if (response.ok) {
          alert("Product added successfully!");
          e.target.reset(); 
        } else {
          alert(`Error: ${data.message || "Failed to add product"}`);
        }
      } catch (error) {
        alert("Server error. Please try again.",error.message);
      } // Display product title in an alert
    };
  
    return (
      <div className="myform">
        <h2>Add New Product</h2>
        {/* Attach handleSubmit to form */}
        <form onSubmit={handleSubmit}>  
          <label>
            Product Title:
            <input type="text" name="title" required />
          </label><br/>
          <label>
            Product Company:
            <input type="text" name="company" required />
          </label><br/>
          <label>
            Product Discount (%):
            <input type="number" name="discount" min="0" max="100" required />
          </label><br/>
          <label>
            Product Price:
            <input type="number" name="price" min="1" required />
          </label><br/>
          <label>
            Product Quantity:
            <input type="number" name="quantity" min="1" required />
          </label><br/>
          <label>
            Product Thumbnail URL:
            <input type="text" name="thumbnail" required />
          </label><br/>
          {/* Use button type="submit" */}
          <button type="submit">Add Product</button>  
        </form>
      </div>
    );
  };
  
  export default ProductForm;
  