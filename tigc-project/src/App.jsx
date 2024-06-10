import {BrowserRouter as Router,Route,Routes, Navigate} from "react-router-dom";

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from "./context/data/myState";
import AllProducts from "./pages/allproduct/AllProducts";
import Login from "./pages/registeration/Login";
import SignUp from "./pages/registeration/SignUp";
import ProductInfo from "./pages/productinfo/ProductInfo";
import AddProduct from "./pages/admin/dashboard/pages/AddProduct";
import UpdateProduct from "./pages/admin/dashboard/pages/UpdateProduct";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Children } from "react";

const App=()=>{
  return(
    <>
    <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/order" element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
        } />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={
          <ProtectedRouteForAdmin>
            <Dashboard/>
          </ProtectedRouteForAdmin>
        } />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/*" element={<NoPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productinfo/:id" element={<ProductInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addproduct" element={
          <ProtectedRouteForAdmin>
            <AddProduct />
          </ProtectedRouteForAdmin>
        } />
        <Route path="/updateproduct" element={
          <ProtectedRouteForAdmin>
            <UpdateProduct />
          </ProtectedRouteForAdmin>
        } />
      </Routes>
      <ToastContainer/>
    </Router>
    </MyState>
      
    </>
  )
}

export default  App;

//user

const ProtectedRoute=({children})=>{
  const user=localStorage.getItem("user");
  if(user){
    return children;
  }
  else{
    return <Navigate to = {'/login'}/>
  }
}

const ProtectedRouteForAdmin=({children})=>{
  const admin=JSON.parse(localStorage.getItem("user"));
  if(admin.user.email==="rushilsharma101@gmail.com"){
    return children;
  }
  else{
    return <Navigate to = {'/login'}/>
  }
}