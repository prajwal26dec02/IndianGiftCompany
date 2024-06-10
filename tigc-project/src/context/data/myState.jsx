import React from 'react'
import MyContext from './myContext';
import { useState,useEffect } from 'react';
import { fireDb } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, deleteDoc, onSnapshot, orderBy, query, setDoc, doc ,getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';

const MyState=(props)=> {

    const[mode, setMode] = useState("Light");

    const closeModal=()=> {
      setIsOpen(false)
  }

  const openModal=()=> {
      setIsOpen(true)
  }
    

    const toggleMode=()=>{
    if(mode==="Light"){
        setMode( "Dark" );
        document.body.style.backgroundColor="rgb(17, 24, 39)";
    }
    else{
        setMode( "Light" );
        document.body.style.backgroundColor='white';
    }
}

    const[loading,setLoading]=useState(false);

    const [products, setProducts] = useState({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
    
      })

    const addProduct=async()=>{
        if (products.title === "" || products.price === "" || products.imageUrl === "" || products.category === "" || products.description === "") {
        return toast.error('Please fill all fields')
    }

    const productRef = collection(fireDb, "products")
    setLoading(true);
    try {
      await addDoc(productRef, products)
      toast.success("Product Added Successfully")
      setTimeout(()=>{window.location.href="/dashboard"},2000)
      getProductData()
      closeModal()
      setLoading(false)
    } catch (error) {
      console.log(error)
      // toast.error(`Error in  adding Product`);
      setLoading(false)
    }
    setProducts('');
  }

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDb, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  const editHandle=(item)=>{
    setProducts(item);
  }

  const updateProduct=()=>{
    setLoading(true);
    try {
      setDoc(doc(fireDb,"products",products.id),products);
      toast.success("Product Updated Sucessfully")
      setTimeout(()=>{window.location.href="/dashboard"},1500);
      getProductData();
    } catch (error) {
      console.log("Error updating the Product");
      setLoading(false);
    }
  }

  const deleteProduct=async (item)=>{
    setLoading(true);
    try {
      await deleteDoc(doc(fireDb,'products',item.id));
      toast.success( "Product Deleted Successfully!");
      setLoading(false);
      getProductData();
    } catch (error) {
      setLoading(false)
      console.log("error");
    }
  }

  const[order,setOrder]=useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDb, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      // console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDb, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  

  return (
    <MyContext.Provider value={{mode ,toggleMode ,loading ,setLoading ,products , setProducts ,addProduct ,product ,editHandle ,updateProduct, deleteProduct, order, user, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice }} >
        {props.children}
    </MyContext.Provider>
  )
}

export default MyState;