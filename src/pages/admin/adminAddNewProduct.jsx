import { useState } from "react"
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminAddNewProduct() {
  const [productID, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltnames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [labelledPrice, setLabelledPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  async function addproduct(){
    const token = localStorage.getItem("token");

    if(token == null){
        navigate("/login");
        return;
    }

    const promises = [];

    for(let i = 0; i < images.length; i++){

        promises[i] = mediaUpload(images[i]);

    }

    try{

        const urls = await Promise.all(promises);
        const alternativeNamesArray = altNames.split(",");

        const product = {
            productID: productID,
            name: name,
            altNames: alternativeNamesArray,
            description: description,
            images: urls,
            price: price,
            labelledPrice: labelledPrice,
            category: category,
            stock: stock
        }

        console.log(product);

        axios.post(import.meta.env.VITE_API_URL+"/api/products", product, {
            headers: {
                Authorization: "Bearer "+token
            }
        })

        toast.success("Product added successfully");
        navigate("/admin/products");


    }catch{
        toast.error("An Error occured...")
    }
  }


  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-primary p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-accent">
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          Add New Product
        </h2>
        <div className="space-y-5">
          <input
            value={productID}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Product ID"
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <input
            value={altNames}
            onChange={(e) => setAltnames(e.target.value)}
            placeholder="Alternative Names"
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none resize-none"
          />
          <input
            type="file"
            onChange={(e) => setImages(e.target.files)}
            multiple
            className="w-full border rounded-lg border-gray-300 p-2 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent file:text-white hover:file:bg-secondary"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none"
            />
            <input
              type="number"
              value={labelledPrice}
              onChange={(e) => setLabelledPrice(e.target.value)}
              placeholder="Labelled Price"
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none bg-white"
          >
            <option value="">Select Category</option>
            <option value="cream">Cream</option>
            <option value="lotion">Lotion</option>
            <option value="serum">Serum</option>
          </select>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock Quantity"
            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <button
            className="w-full mt-4 bg-red-400 ed- text-white font-semibold py-3 rounded-lg shadow-md hover:bg-secondary transition-all duration-300"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
          <button
            className="w-full mt-4 bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-secondary transition-all duration-300"
            onClick={addproduct}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
