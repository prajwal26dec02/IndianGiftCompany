import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'
import MyContext from '../../context/data/myContext'

const Order=()=> {
  const userid = (JSON.parse(localStorage.getItem('user'))).user.uid;
  // console.log(userid);
  const context = useContext(MyContext);
  const { mode, loading, order } = context;
  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ?
        (<>
          <div className=" h-full pt-10">
            {
              order.filter(obj => obj.userid == userid).map((order) => {
                // order.cartItems.map()
                return (
                  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {
                      order.cartItems.map((item,index) => {
                        const{ title, description , imageUrl,price } =item;
                        return (
                          <div key={index} className="rounded-lg md:w-2/3">
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'Dark' ? '#282c34' : '', color: mode === 'Dark' ? 'white' : '', }}>
                              <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'Dark' ? 'white' : '' }}>{title}</h2>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'Dark' ? 'white' : '' }}>{description}</p>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'Dark' ? 'white' : '' }}>{price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </>)
        :
        (
          <h2 className=' text-center tex-2xl text-white'>No Orders Yet</h2>
        )

      }
    </Layout>
    
  )
}

export default Order;