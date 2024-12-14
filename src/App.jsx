
import axios from 'axios'
import './App.css'
import Header from './Header'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const [cat, setCat] = useState([])
  const [loading, setLoading] = useState(false)
  const [product,setProduct]=useState([])


  let displayCat = () => {
    axios.get('https://dummyjson.com/products/categories')
      .then((resCat) => {
        setCat(resCat.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  let displayProduct=(MyUrl)=>{

    console.log(MyUrl)

    axios.get('https://dummyjson.com/products?limit=200')
    .then((resP)=>{
      setProduct(resP.data.products)
    })
    .catch()
  }

  

  useEffect(() => {
    displayCat()
    displayProduct()
  }, [])

  return (
    <>
    
      <div className='max-w-[1200px] grid grid-cols-[25%_auto] gap-[10px] p-[10px] '>
        <div className=''>
          <h2 className='text-[25px] text-center font-bold py-[10px] ' > All Category </h2>
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"  >

            {cat.length > 0 ?
              cat.map((v,i) => {
                return (
                  <>
                    <MyLi key={i} DCat={v} displayProduct={displayProduct}  />

                  </>
                )
              })
              :
              "Please Wait......."
            }




          </ul>
        </div>

        <div className=''>
          <h2 className='text-[25px] text-center font-bold py-[10px]'> All Product </h2>
          <div className='grid grid-cols-4 gap-5 '>

          {product.length > 0 ?
            product.map((v,i) => {
                return (
                  <>
                    <Card key={i} PData={v} />

                  </>
                )
              })
              :
              "Please Wait......."
            }
            

          </div>
        </div>
      </div>
    </>
  )
}

export default App



let MyLi = ({DCat,displayProduct}) => {
  let filterCat=()=>{
      displayProduct(DCat.url)
  }
  return (
    <li onClick={filterCat} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        {DCat.name}
    </li>
  )
}

let Card = ({PData}) => {

  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={PData.thumbnail} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {PData.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {PData.brand} </p>
        <Link to={`/detail-page/${PData.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Click {PData.id}
        </Link>
      </div>
    </div>
  )
}