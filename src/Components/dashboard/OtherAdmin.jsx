import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import user from '../../assets/ins2.png';
import { useNavigate } from 'react-router-dom';

const OtherAdmin = (props) => {
 const { info, onDelete } = props;
 const [openModal, setOpenModal] = useState(false);
 const navigate = useNavigate();

 const editAdminInfo = () => {
  navigate('/dash/settings/UpdateAdmin', { state: { adminDetails: info } });
  window.scroll(0, 0)
 }

 const handleDeleteClick = () => {
  onDelete(info.id);
  setOpenModal(false);
  window.scroll(0, 0)
 };

 return (
  <article className="border-2 border-[var(--SubTextBorder)] grid grid-cols-8 p-4 rounded-2xl">
   <section className="col-span-1">
    <img src={user} className="h-20 w-20" alt="Admin Profile" />
   </section>

   <section className="col-span-7 py-2 px-10 grid grid-cols-4">
    <div className="w-full space-y-2 flex-col items-center">
     <h4 className="text-md text-[var(--SubText)]">Name</h4>
     <p className="text-xl">{info.Name}</p>
    </div>
    <div className="w-full space-y-2 flex-col items-center">
     <h4 className="text-md text-[var(--SubText)]">Phone</h4>
     <p className="text-xl">{info.Phone}</p>
    </div>
    <div className="w-full space-y-2 flex-col items-center">
     <h4 className="text-md text-[var(--SubText)]">Previlige</h4>
     <p className="text-xl">{info.Previlige}</p>
    </div>
    <div className="flex space-x-6 w-full">
     <button onClick={editAdminInfo}
      className="px-8 rounded-xl border-2 border-[var(--Yellow)]">
      Edit
     </button>
     <button type="button" onClick={() => setOpenModal(true)} className="px-8 rounded-xl bg-[var(--Yellow)]">
      Delete
     </button>
    </div>
   </section>

   <Modal open={openModal} onClose={() => setOpenModal(false)} center>
    <h2 className="my-12">This action cannot be undone. Are you sure you want to delete?</h2>
    <div className="flex justify-end space-x-8 my-12">
     <button className="px-8 py-2 rounded-xl border-2 border-[var(--Yellow)]" onClick={() => setOpenModal(false)}>
      Cancel
     </button>
     <button className="px-8 py-2 rounded-xl bg-[var(--Yellow)]" onClick={handleDeleteClick}>
      Delete
     </button>
    </div>
   </Modal>
  </article>
 );
};

export default OtherAdmin;
