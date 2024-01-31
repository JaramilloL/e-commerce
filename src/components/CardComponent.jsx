//este componente se mostraran las formas de pago del producto
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { bd } from "../firebase/firebaseConfig";
import { useState } from "react";

const CardComponent = () => {
  const [dataDoc, setDataDoc] = useState([])
  //?usaremos collection y getDocgs para la consulta de datos de firestore

  useEffect(() => {
    onSnapshot(collection(bd, 'e-commerce'), ()=> {
      const getList = async()=>{
        const snapshop = await getDocs(collection(bd, 'e-commerce'))
        const dataQuerySnapshot = snapshop.docs.map((item)=> ({
          id: item.id,
          ...item.data(),
        }))
        //cramos un estado para almacenar la lectura de datos
        setDataDoc(dataQuerySnapshot);
      }
      getList()
    })
  }, []);

  return (
    <div>
    {
      dataDoc ? dataDoc.map( listDoc => (
        <div className="card w-25" key={listDoc.id}>
      <img src={listDoc.image} className="card-img-top" alt={listDoc.name} />
      <div className="card-body">
        <h5 className="card-title">{listDoc.name}</h5>
        <p className="card-text">
          {listDoc.description}
        </p>
        <p className="card-text">
          {listDoc.price}
        </p>
        <p className="card-text">
          {listDoc.available}
        </p>
        <div className="d-flex justify-content-center align-content-center align-items-center">
        <a href="#" className="btn btn-primary">
          Add
        </a>
        </div>
      </div>
    </div>
      )): <p>Aun no hay datos</p>
    }
    </div>
    
  );
};

export default CardComponent;
