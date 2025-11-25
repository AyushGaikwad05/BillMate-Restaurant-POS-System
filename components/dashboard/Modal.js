import { maxGeneratorDuration, motion } from 'framer-motion';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addTable } from '@/https';
import { enqueueSnackbar } from 'notistack';
export default function Modal({ setIsTableModalOpen }) {

    const [tableData, setTableData] = useState({
        tableNo: "",
        seats: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTableData((prev) => ({ ...prev, [name]: value }))
    }

    const handleCloseModal = () => {
        setIsTableModalOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tableData)
        tableMutation.mutate(tableData);
    };

    const tableMutation=useMutation({
        mutationFn:(reqData)=>addTable(reqData),
        onSuccess:(res)=>{
            setIsTableModalOpen(false); 
            enqueueSnackbar(res?.data?.message || "Table added!", { variant: "success" });
        },
        onError:(error)=>{
              const {data}=error.response;
              enqueueSnackbar(data.message,{variant:"error"});
              
        }
    })
    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-[#262626] p-6 rounded-lg shadow-lg w-96 "
            >
                {/**Modal Header */}
                <div className='flex justify-between item-center mb-4'>
                    <h2 className='text-[#f5f5f5] text=xl font-semibold'>Add Table </h2>
                    <button onClick={handleCloseModal} className='text-[#f5f5f5] hover:text-red-500'><IoMdClose size={24} /></button>

                </div>


                <form onSubmit={handleSubmit} className="space-y-6 mt-6">

                    {/* Table Number */}
                    <div>
                        <label className="block text-[#ababab] mb-2 text-sm font-medium">
                            Enter Table No:
                        </label>
                        <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
                            <input
                                type="number"
                                name="tableNo"
                                value={tableData.tableNo}
                                onChange={handleInputChange}
                                min="1"
                                className="bg-transparent flex-1 text-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Seats */}
                    <div>
                        <label className="block text-[#ababab] mb-2 text-sm font-medium">
                            Enter Seats for Table:
                        </label>
                        <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
                            <input
                                type="number"
                                name="seats"
                                value={tableData.seats}
                                onChange={handleInputChange}
                                min="1"
                                className="bg-transparent flex-1 text-white focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button className="w-full py-3 text-lg bg-yellow-400 text-gray-900 font-bold">
                        Add Table
                    </button>

                </form>



            </motion.div>
        </div>
    );
}