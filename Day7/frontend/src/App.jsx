import {BrowserRouter,Routes,Route} from "react-router";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductForm from "./components/ProductForm";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} >
        <Route path="/viewproducts" element={<ProductsPage />} />
        <Route path="/addproducts" element={<ProductForm/>} />
        
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
