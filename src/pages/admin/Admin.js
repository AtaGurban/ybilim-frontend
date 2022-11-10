import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { ADMIN_COURSE_ROUTE, ADMIN_ROUTE_USERS } from '../../utils/pathConsts';
import styles from './admin.module.css'


const Admin = observer(() => {
    return (
        <div>
            <Navbar/>
            <div className='mx-5 mt-3'>
                <div className="row">
                    <div className={`${styles['admin-nav']} flex-column d-flex col-2 p-2`}>
                        <ul>
                            <li className='d-block btn btn-outline-primary mb-3' data-type='type' ><Link to={ADMIN_ROUTE_USERS}>Diňleýjiler</Link></li>
                            <li className='d-block btn btn-outline-primary mb-3' data-type='title-type' ><Link to={ADMIN_COURSE_ROUTE}>Kurslar</Link></li>
                        </ul>
                    </div>
                    <div className="admin-inform flex-column d-flex col-10 px-4">
                        <h1 className='mt-3 text-center'>Admin panele hoş geldiňiz</h1>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Admin;