import React, {useState, useEffect} from 'react';
import {  getAllCourse, removeCourse } from '../http/courseApi';
import ModalAddVideo from './ModalAddVideo';

const Upload = () => {
    const [courses, setCourses] = useState([])
    const [modalEditDeviceVisible, setModalEditDeviceVisible] = useState(false)

    const removeCourseFunc = async(id)=>{
        await removeCourse(id).then((data)=> window.location.reload())
    }


    useEffect(()=>{
        (async function(){
            await getAllCourse().then((data) => setCourses(data));
        })()
    }, [] )
        const tableAttributes = [
            "id",
            "Ady",
            'beýany',
            "Döredilen wagty",
            "Düwmeler",
          ];

    // useEffect(()=>
    //     (async function ()  {
        
    //   }), []);

    return (
        <div className='w-75 mt-5 d-flex flex-column align-items-center w-75 mx-auto'>
            <h1 className='text-uppercase c-bold text-center'>Admin panela hoş geldiňiz</h1>
            <button  onClick={()=>setModalEditDeviceVisible(true)} className='btn btn-warning ms-auto'><span className='c-bold'>Kurs goşmak</span> </button>
            <ModalAddVideo show={modalEditDeviceVisible} onHide={() => setModalEditDeviceVisible(false)}/>
            <hr/>
            <div className='w-100'>
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
                    {courses.map((i)=>
                        <tr key={i.id}>
                            <td className="p-1">{i.id}</td>
                            <td className="p-1 w-25">{i.name}</td>
                            <td className="p-1 w-25">{i.description}</td>
                            <td className="p-1">{i.createdAt}</td>
                            <td className="p-1 text-center">
                                <button
                                onClick={() => removeCourseFunc(i.id)}
                                className="btn btn-danger"
                                >
                                Pozmak
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                    </table>
                    </div>
            {/* <form > */}

            {/* </form> */}
        </div>
    );
};

export default Upload;