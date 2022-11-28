import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ADMIN_COURSE_ROUTE, ADMIN_EDUCATION_ROUTE, ADMIN_ROUTE_USERS, ADMIN_TRANSACTION_ROUTE } from "../../utils/pathConsts";
import styles from "./admincourse.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import Pagination from 'react-bootstrap/Pagination';
import { deleteTransaction, getAllTransactions } from "../../http/userAPI";


const AdminTransaction = observer(() => {
    const [transactions, setTransactions] = useState([])
    const [active, setActive] = useState(1)
    const [paginationCount, setPaginationCount] = useState(1)
    const { user } = useContext(Context) 
    const [removeBtn, setRemoveBtn] = useState('btn btn-danger col-12 mx-0 my-2')

    const removeTransactionFunc = async(id)=>{
        if (user.user.role === 'SUPERADMIN'){
          await deleteTransaction(id).then((data)=> window.location.reload())
        }
    }
    useEffect(()=>{
        (async function(){
            await getAllTransactions(active).then((data) => {setTransactions(data.rows); setPaginationCount(data.count)});
        })()
        if (user.user.role !== 'SUPERADMIN'){
          setRemoveBtn('d-none')
        }
    }, [active] )
    console.log(transactions);

    let items = [];
    for (let number = 1; number <= Math.ceil(paginationCount / 10); number++) {
    items.push(
        <Pagination.Item onClick={()=>setActive(number)} key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }

  const tableAttributes = [
    "id",
    "Dinleýjiniň ady",
    "Tel. nomeri",
    "Kursuň ady",
    "Döredilen wagty",
    "Düwmeler",
  ];
  return (
    <div>
      <Navbar />
      <div className="mx-5 mt-5">
        <div className="row">
          <div
            className={`${styles["admin-nav"]} flex-column d-flex col-2 p-2`}
          >
            <ul>
              <li
                className="d-block btn btn-outline-primary mb-3"
                data-type="type"
              >
                <Link to={ADMIN_ROUTE_USERS}>Diňleýjiler</Link>
              </li>
              <Link to={ADMIN_COURSE_ROUTE}><li
                className="d-block btn btn-outline-primary mb-3"
                data-type="title-type"
              >
                Kurslar
              </li></Link>
              <Link to={ADMIN_EDUCATION_ROUTE}><li className='d-block btn btn-outline-primary mb-3' data-type='title-type'>Okuw</li></Link>
              <Link to={ADMIN_TRANSACTION_ROUTE}><li className='d-block btn btn-primary mb-3' data-type='title-type'>Satyn alnan kurslar</li></Link>
            </ul>
          </div>
          <div className="admin-inform flex-column d-flex col-10 px-4">
            <div className="w-100">
              <table width="100%" border="2" className="mt-3">
                <thead>
                  <tr>
                    {tableAttributes.map((item, index) => (
                      <th key={index} className="p-1 text-center">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((i) => (
                    (i.course && i.user) ?
                    <tr key={i.id}>
                      <td className="table-node p-1">{i.id}</td>
                      <td className="table-node p-1">{i.user.first_name}</td>
                      <td className="table-node p-1">{i.user.phone}</td>
                      <td className="table-node p-1">{i.course.name}</td>
                      <td className="table-node p-1">{i.createdAt}</td>
                      <td className="table-node p-1 text-center">
                        <div className="d-flex justify-content-center">
                        <button
                          onClick={() => removeTransactionFunc(i.id)}
                          disabled={(user.user.role !== 'SUPERADMIN')}
                          className={removeBtn}
                          title="Pozmak"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                        </div>
                      </td>
                    </tr> : null
                  ))}
                </tbody>
              </table>
              <div className="container mt-5">
              <Pagination className="justify-content-center" size="lg">{items}</Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminTransaction;
