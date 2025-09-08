import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import API from '../../api';

const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');

const ClassRoom = () => {
  const { id } = useParams();
  const localRef = useRef();
  const remoteRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    API.get(`/tutor/class/${id}`).then((res) => {
      const { roomId } = res.data;
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localRef.current.srcObject = stream;
          socket.emit('join-room', { roomId, userId: id });

          peerRef.current = new Peer({
            initiator: true,
            trickle: false,
            stream,
          });
          peerRef.current.on('signal', (data) =>
            socket.emit('signal', { roomId, data })
          );
          peerRef.current.on(
            'stream',
            (stream) => (remoteRef.current.srcObject = stream)
          );

          socket.on('signal', (data) => peerRef.current.signal(data));
        });
    });
  }, [id]);

  return (
    <div className="flex space-x-4 m-4">
      <video ref={localRef} autoPlay muted className="w-1/2 rounded" />
      <video ref={remoteRef} autoPlay className="w-1/2 rounded" />
    </div>
  );
};

export default ClassRoom;
