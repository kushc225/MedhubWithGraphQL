'use client'
import { request } from '../../lib/graphql';
import { GET_MY_HISTORY } from '../../lib/query';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Loader from '../../components/Loader/Loader';

const MyHistoryComponent = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [sortWithNewestFirst, setSortWithNewestFirst] = useState(true)
    const session = useSession();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const input = {
                    input: {
                        email: session?.data?.user?.email,
                        donateOrNeed: "donate",
                        pageSize,
                        page,
                        sortWithNewestFirst
                    }

                }
                const { myHistory: { MedType, len } } = await request(GET_MY_HISTORY, input)
                setData(MedType)
                if (len < pageSize) setTotalPages(1)
                else {
                    const ans = len / pageSize;
                    if (ans === Math.ceil(ans)) {
                        setTotalPages(ans);
                    } else setTotalPages(Math.ceil(ans))
                }
            } catch (error) {
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        if (session?.status === 'authenticated') fetchData();
    }, [page, session?.status, sortWithNewestFirst])

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (loading) return <Loader />
    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
            <ul className="divide-y divide-gray-200  ">
                <h1 className='text-center text-2xl underline font-bold'>Your Donated History of Medcine</h1>
                {
                    data.length === 0 && <div className="mt-4 flex bg-red-100 p-4 
                    
                    items-center  border-red-300 rounded-lg text-red-700">
                        <p className='mr-3 -mt-2'>😥</p>
                        <h1 className="text-xl font-bold mb-2 text-black">Sorry, No History Found</h1>
                    </div>

                }


                {data.length > 0 && (
                    <div className='mt-6 '>
                        <button onClick={() => setSortWithNewestFirst(true)} className=' rounded-xl py-3 px-5 bg-blue-500'>Newest First</button>
                        <button onClick={() => setSortWithNewestFirst(false)} className=' rounded-xl py-3 px-5 bg-blue-500 ml-2 '>Oldest Frist</button>
                    </div>
                )
                }

                {data.length > 0 && <div className='flex border-2 justify-around mt-5'>
                    <p className='px-2 font-bodl text-xl flex-1'>SNO</p>
                    <p className='px-2 font-bodl text-xl flex-1'>Name</p>
                    <p className='px-2 font-bodl text-xl flex-1'>Expire Date</p>
                    <p className='px-2 font-bodl text-xl flex-1'>MFD</p>
                </div>}
                {data?.map((item, idx) => (
                    <div className='flex border-2 justify-around' key={idx + 2002}>
                        <li className="flex-1 py-4 px-2">
                            <p className="text-lg font-semibold">{(pageSize * (page - 1)) + idx + 1}</p>
                        </li>
                        <li className="flex-1 py-4 px-2">
                            <p className="text-lg font-semibold">{item.name}</p>
                        </li>
                        <li className="flex-1 py-4 px-2">
                            <p className="text-lg font-semibold">{item.mfd}</p>
                        </li>
                        <li className="flex-1 py-4 px-2">
                            <p className="text-lg font-semibold">{item.expire}</p>
                        </li>
                    </div>
                ))}
            </ul>

            {data.length > 0 && <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                >
                    Previous
                </button>
                <span className="text-gray-700">Page {page} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                >
                    Next
                </button>
            </div>}
        </div>
    );
};

export default MyHistoryComponent;





