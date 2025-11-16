
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { CameraIcon, XCircleIcon } from './Icons';

interface CameraViewProps {
  onCapture: (imageDataUrl: string) => void;
  onClose: () => void;
  onError: (errorMessage: string) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const cleanupCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            setIsCameraReady(true);
          }
        } else {
          throw new Error('Camera not supported by this browser.');
        }
      } catch (err) {
        let message = 'An unknown error occurred.';
        if (err instanceof Error) {
            if (err.name === 'NotAllowedError') {
                message = 'Camera permission was denied. Please allow camera access in your browser settings.';
            } else if (err.name === 'NotFoundError') {
                message = 'No camera was found on your device.';
            } else {
                message = `Failed to start camera: ${err.message}`;
            }
        }
        onError(message);
        onClose();
      }
    };

    startCamera();

    return () => {
      cleanupCamera();
    };
  }, [onClose, onError, cleanupCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        cleanupCamera();
        onCapture(imageDataUrl);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-black p-4 relative">
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 border-2 border-gray-700">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        {!isCameraReady && (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <span className="ml-3">Initializing camera...</span>
            </div>
        )}
         <div className="absolute inset-0 border-4 border-dashed border-blue-500/50 rounded-lg animate-pulse"></div>
      </div>
      
      <canvas ref={canvasRef} className="hidden"></canvas>
      
      <div className="mt-4 flex items-center justify-around w-full">
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-gray-700 hover:bg-red-600 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
          aria-label="Cancel verification"
        >
          <XCircleIcon className="w-6 h-6" />
        </button>
        <button
          onClick={handleCapture}
          disabled={!isCameraReady}
          className="p-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-800 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
          aria-label="Capture photo"
        >
          <CameraIcon className="w-8 h-8" />
        </button>
        <div className="w-12 h-12"></div>
      </div>
    </div>
  );
};

export default CameraView;
