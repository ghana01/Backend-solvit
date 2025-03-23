import React, { useRef, useState } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);

  const startScanning = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
          constraints: {
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader'],
        },
      },
      (err) => {
        if (err) {
          console.error('Error starting barcode scanner:', err);
          return;
        }
        Quagga.start();
        setScanning(true);
      }
    );

    Quagga.onDetected((result) => {
      if (result.codeResult.code) {
        onScan(result.codeResult.code);
        stopScanning();
      }
    });
  };

  const stopScanning = () => {
    Quagga.stop();
    setScanning(false);
  };

  return (
    <div className="relative">
      <div ref={videoRef} className="w-full max-w-md mx-auto" />
      <button
        onClick={scanning ? stopScanning : startScanning}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        {scanning ? 'Stop Scanning' : 'Start Scanning'}
      </button>
    </div>
  );
};

export default BarcodeScanner;
