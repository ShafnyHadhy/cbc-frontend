import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { TfiTrash } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";


function ProductDeleteConfirmation(props){
    const productID = props.productID;
    const close = props.close;
    const refresh = props.refresh;

    function deleteProduct(){
        const token = localStorage.getItem("token");
        axios.delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, 
           {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(
            (response) => {
                console.log(response.data)
                close();
                toast.success("Product Deleted Successfully!")
                refresh();
            }
        ).catch(
            (error) => {
                toast.error("Failed to delete the product!",error)
            }
        )
    }
    

    return <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
        <div className="w-[500px] h-[200px] bg-primary rounded-2xl relative flex flex-col justify-center items-center gap-[40px] p-[30px]">
            <button onClick={close} className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600">
                x
            </button>
            <p className="text-xl font-semibold">Are you sure you want to delete the Product with Product ID : {productID}?</p>

            <div className="flex gap-[40px]">
                <button onClick={close} className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-black rounded-[5px]">
                    No
                </button>
                <button onClick={deleteProduct} className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-black rounded-[5px]">
                    Yes
                </button>
            </div> 
        </div>
    </div>
}

export default function AdminProductPage(){

    const [products, setProducts] = useState([]);
    const [isdeleteConfirmVisible, setIsdeleteconfirmVisible] = useState(false);
    const [productToBeDeleted,  setProductToBeDeleted] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect( ()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
            (response)=>{
                console.log(response.data)
                setProducts(response.data)
                setIsLoading(false);
            })
        }
        
    }, [isLoading])

    return(
        <div className="h-full w-full p-6 bg-primary">
            {
                isdeleteConfirmVisible && <ProductDeleteConfirmation refresh={()=>{setIsLoading(true)}} productID={productToBeDeleted} close={()=>{setIsdeleteconfirmVisible(false)}}/>
            }
            
            {/* Floating Add Button */}
            <Link 
              to="/admin/add-product"
              className="fixed right-[30px] bottom-[30px] text-6xl text-green-500 drop-shadow-lg hover:scale-110 transition-transform"
            >
                <CiCirclePlus />
            </Link>

            {/* Table Container */}
            <div className="w-full min h-full">
                {isLoading?<Loader/>:
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-secondary text-white text-end">
                        <tr>
                            <th className="py-3 px-4 text-left rounded-tl-2xl">Image</th>
                            <th className="py-3 px-4 text-left">Product ID</th>
                            <th className="py-3 px-4 text-left">Product Name</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Labelled Price</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">In Stock</th>
                            <th className="py-3 px-4 text-center rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index)=>(
                                <tr 
                                  key={item.productID} 
                                  className={`border-b last:border-none hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}
                                >
                                    <td className="py-3 px-4">
                                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow-sm"/>
                                    </td>
                                    <td className="py-3 px-4">{item.productID}</td>
                                    <td className="py-3 px-4 font-medium">{item.name}</td>
                                    <td className="py-3 px-4 text-green-600 font-semibold">Rs. {item.price}</td>
                                    <td className="py-3 px-4 line-through text-gray-400">Rs. {item.labelledPrice}</td>
                                    <td className="py-3 px-4">{item.category}</td>
                                    <td className="py-3 px-4">{item.stock}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex flex-row gap-4 justify-center items-center text-lg">

                                            <TfiTrash className="cursor-pointer hover:text-red-600 transition-colors"
                                            onClick={()=>{
                                                setProductToBeDeleted(item.productID)
                                                setIsdeleteconfirmVisible(true)
                                            }}/>

                                            <FaRegEdit className="cursor-pointer hover:text-green-600 transition-colors"
                                            onClick={()=>{
                                                navigate("/admin/update-product", {
                                                state: item
                                            })
                                            }}/>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>}
            </div>
        </div>
    )
}
