import Layout from "../../components/layout/Layout";
import MyContext from "../../context/data/myContext";
import { useContext } from "react";

const NoPage=()=>{
    const context = useContext(MyContext)
    const { mode } = context;

    return(
        <>
        <Layout>
            <h1 style={{
                    color: mode === 'Dark' ? 'white' : '',}} className="text-center mb-10 pb-10 pt-10 mt-10 text-4xl underline  ">
                    Error 404 :- Page does not exist :-(
            </h1>
        </Layout>
        </>
    )
}

export default NoPage;
