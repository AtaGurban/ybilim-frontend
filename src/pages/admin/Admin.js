import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { ADMIN_BANNER_ROUTE, ADMIN_COURSE_ROUTE, ADMIN_EDUCATION_ROUTE, ADMIN_ROUTE_USERS, ADMIN_TRANSACTION_ROUTE } from '../../utils/pathConsts';
import styles from './admin.module.css'


const Admin = observer(() => {
    return (
        <div>
            <Navbar/>
            <div className='mx-5 mt-3'>
                <div className="row">
                    <div className={`${styles['admin-nav']} flex-column d-flex col-2 p-2`}>
                        <ul>
                            <Link to={ADMIN_ROUTE_USERS}><li className='d-block btn btn-outline-primary mb-3' data-type='type' >Diňleýjiler</li></Link>
                            <Link to={ADMIN_COURSE_ROUTE}><li className='d-block btn btn-outline-primary mb-3' data-type='title-type' >Kurslar</li></Link>
                            <Link to={ADMIN_EDUCATION_ROUTE}><li className='d-block btn btn-outline-primary mb-3' data-type='title-type' >Okuw</li></Link>
                            <Link to={ADMIN_TRANSACTION_ROUTE}><li className='d-block btn btn-outline-primary mb-3' data-type='title-type' >Satyn alnan kurslar</li></Link>
                            <Link to={ADMIN_BANNER_ROUTE}><li className='d-block btn btn-outline-primary mb-3' data-type='title-type' >Banner</li></Link>
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