import { useEffect, useMemo, useState } from 'react';
import socketIOClient from 'socket.io-client';

const useSocketIo = () => {
    const host = process.env.REACT_APP_API_HOST_CHAT as string;
    const socketio = useMemo(() => socketIOClient(host), [host]);
    const [listMess, setListMess] = useState<any[]>([]);
    const [isLoadingRoom, setIsLoadingRoom] = useState(false);
    useEffect(() => {
        const handleSocketMessage = (response: any) => {
            setIsLoadingRoom(true);
            if (response.length > 0) {
                setListMess(response);
                setIsLoadingRoom(false);
            } else {
                setListMess([]);
                setIsLoadingRoom(false);
            }
        };
        socketio.on('message', handleSocketMessage);
        socketio.on('room', handleSocketMessage);
        return () => {
            socketio.off('message', handleSocketMessage);
            socketio.off('room', handleSocketMessage);
        };
    }, [socketio]);

    return { listMess, socketio, isLoadingRoom };
};

export default useSocketIo;