'use client'
import Loader from '../../components/Loader/Loader';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSession } from 'next-auth/react';
import { io } from 'socket.io-client'
const Chat = () => {
    const session = useSession();
    const socket = useMemo(() => io('http://localhost:9000'), [])
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true);
    const [id, setID] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('')


    useEffect(() => {
        const email = session?.data?.user?.email
        socket.on('connect', () => {
            setLoading(false);
            socket.emit('join_socket', email)
            setID(socket.id);
        })

        socket.on('disconnect', () => {
            setLoading(true);
        })
        socket.on('active_users', (users) => {
            console.log("XX", users)
        })
    }, [])

    const sendMessasge = async () => {
        if (!message) return alert("Plese Write some message");
        socket.emit('send-message', { message, room });
        setMessage('')
    }



    useEffect(() => {
        socket.on('send-message', message => {
            console.log({ message })
        })
        socket.on('receive-message', message => {
            console.log({ message })
        })
    }, [])


    if (loading) {
        return <Loader />
    }


    return (
        <div>
            <div>
                {id && id}
            </div>
            <div className='mt-2'>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='message' />
            </div>
            <div className='mt-2'>
                <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder='roomid' />
            </div>
            <div>
                <button onClick={sendMessasge}>Submit</button>
            </div>
        </div>
    )
}

export default Chat