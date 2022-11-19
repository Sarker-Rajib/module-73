import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../Shared/Loading/Loading';
import ConfirmationModal from '../Shared/Modal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const closeModal = () => {
        setDeletingDoctor(null)
    }

    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/doctors',{
                headers:{
                    authorization: `bearer ${localStorage.getItem('doctor_access_token')}`
                }
            })
            const data = await res.json();

            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleDeleteDoctor = doctor => {
        // console.log(doctor._id);
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('doctor_access_token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Doctor ${doctor.name} deleted successfully`)
                    setDeletingDoctor(null)
                }
            })
    }

    // console.log(doctors);

    return (
        <div>
            <h1 className="text-3xl">Doctors</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.length &&
                            doctors?.map((doctor, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={doctor.image} alt='avatar' />
                                        </div>
                                    </div>
                                </th>
                                <th>{doctor.name}</th>
                                <th>{doctor.email}</th>
                                <th>{doctor.speaciality}</th>
                                <th><label htmlFor="deleteDoctor" onClick={() => setDeletingDoctor(doctor)} className='btn btn-ghost'>Delete</label></th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete`}
                    message={`This will remove doctor ${deletingDoctor.name} from list`}
                    handleDeleteDoctor={handleDeleteDoctor}
                    deletingDoctor={deletingDoctor}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }

        </div>
    );
};

export default ManageDoctors;