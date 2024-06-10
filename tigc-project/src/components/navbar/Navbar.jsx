import { useContext,useState,Fragment } from "react";
import MyContext from "../../context/data/myContext";
import { Link } from "react-router-dom";
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from "react-redux";





const Navbar=()=>{

    const [open, setOpen] = useState(false);


    const context = useContext(MyContext);
    const{mode,toggleMode}=context;

    const user =  JSON.parse(localStorage.getItem("user"));

   const logout=()=>{
    localStorage.clear();
    window.location.href="/login";
   };
    
   const cartItems = useSelector((state) => state.cart)

   
    return(
        
        <div className="bg-white sticky top-0 z-50  ">
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'Dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'Dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  
                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'Dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                  <div className="flow-root">
                    {user ? <Link to={'/order'} style={{ color: mode === 'Dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      Order
                    </Link>: ""}
                  </div>

                  <div className="flow-root">
                    {user?.user?.email==="rushilsharma101@gmail.com" ?
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'Dark' ? 'white' : '', }}>
                    admin
                  </Link> : ""
                    };
                  </div>

                  <div className="flow-root">
                    {user ? <a className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'Dark' ? 'white' : '', }} onClick={logout}>
                      Logout
                    </a> : "" }
                  </div>
                  <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="data:image/png;base64,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"                      
                        alt="Dan_Abromov" />                                        </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900" style={{ color: mode === 'Dark' ? 'white' : '', }}>INDIA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
            <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-green-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8" style={{ backgroundColor: mode === 'Dark' ? 'rgb(62 64 66)' : '', color: mode === '#32DC32' ? '' : '', }}>
          Get free delivery on orders over ₹300
        </p>

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'Dark' ? '#282c34' : '', color: mode === 'Dark' ? 'white' : '', }}>
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'Dark' ? 'rgb(80 82 87)' : '', color: mode === 'Dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'Dark' ? '#32DC32' : '', }}>THE INDIAN GIFT COMPANY</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'Dark' ? '#32DC32' : '', }}>
                    All Products
                  </Link>
                  {user ? <Link to={'/order'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'Dark' ? '#32DC32' : '', }}>
                    Order
                  </Link> : "" }
                  {user?.user?.email==="rushilsharma101@gmail.com" ? <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'Dark' ? '#32DC32' : '', }}>
                    Admin
                  </Link> : ""}
                  

                  {user ? <a className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'Dark' ? '#32DC32' : '', }} onClick={logout}>
                    Logout
                  </a> : ""}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'Dark' ? '#32DC32' : '', }}>INDIA</span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src="data:image/png;base64,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"
                      alt="Dan_Abromov" />
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'Dark' ? 'white' : '' }} /> */}
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'Dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'Dark' ? '#32DC32' : '', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'Dark' ? '#32DC32' : '', }}>{cartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
        </div>
    )
}

export default Navbar;