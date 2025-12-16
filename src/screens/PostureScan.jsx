// src/screens/PostureScan.jsx
import React, { useState, useRef, useEffect } from 'react';
import Screen from '../components/Screen';
import { PrimaryButton, SecondaryButton, HamburgerButton } from '../components/Button';

const PostureScan = ({ activeScreen, goToScreen, dailyInput, setDailyInput, onCalculateResults }) => {
    const [scanStatus, setScanStatus] = useState('idle'); // idle, scanning, captured, denied
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    // Clean up camera stream on unmount or screen change
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [activeScreen]);

    const startPostureScan = async () => {
        if (scanStatus === 'scanning' || scanStatus === 'captured') return;

        setScanStatus('scanning');
        const video = videoRef.current;
        const canvas = canvasRef.current;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 640, height: 480 }
            });
            streamRef.current = stream;
            video.srcObject = stream;
            video.style.display = 'block';
            canvas.style.display = 'block';

            // Mock posture detection process
            setTimeout(() => {
                // Mock result: Random score between 75 and 95
                const newScore = Math.floor(Math.random() * 20) + 75; 
                setDailyInput(prev => ({ ...prev, postureScore: newScore }));

                setScanStatus('captured');

                setTimeout(() => {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }, 1500);
            }, 3000);

        } catch (err) {
            console.error(err);
            alert('Camera access denied! Click "Skip Camera" to continue with default posture score.');
            setScanStatus('denied');
        }
    };

    const skipCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setDailyInput(prev => ({ ...prev, postureScore: 82 }));
        setScanStatus('skipped');
        alert('✓ Using default posture score of 82!');
    };

    const getScanButtonText = () => {
        if (scanStatus === 'scanning') return { text: '🔍 Analyzing posture...', style: { background: 'rgba(255,255,255,0.9)', color: '#2463eb' } };
        if (scanStatus === 'captured' || scanStatus === 'skipped') return { text: '✓ Posture Captured', style: { background: '#10b981', color: 'white' } };
        if (scanStatus === 'denied') return { text: '❌ Camera Access Denied', style: { background: '#ef4444', color: 'white' } };
        return { text: 'Start Posture Scan', style: { background: 'white', color: '#2463eb' } };
    };

    const buttonProps = getScanButtonText();

    return (
        <Screen screenId={3} activeScreen={activeScreen}>
            <HamburgerButton onClick={() => goToScreen(1)} />
            <h1>Posture Detection</h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>Position yourself in frame</p>

            <div className="posture-preview">
                <div className="posture-image" id="postureArea">
                    <video ref={videoRef} autoPlay playsInline style={{ display: scanStatus === 'scanning' ? 'block' : 'none' }}></video>
                    <canvas ref={canvasRef} style={{ display: scanStatus === 'scanning' ? 'block' : 'none' }}></canvas>
                    {(scanStatus !== 'scanning') && (
                        <span id="placeholderIcon" style={{ color: scanStatus === 'captured' || scanStatus === 'skipped' ? '#10b981' : '' }}>
                            {scanStatus === 'captured' || scanStatus === 'skipped' ? '✓' : '🧍'}
                        </span>
                    )}
                </div>
                <button
                    className="scan-btn"
                    onClick={startPostureScan}
                    style={buttonProps.style}
                    disabled={scanStatus === 'scanning'}
                >
                    {buttonProps.text}
                </button>
                <button
                    className="scan-btn"
                    onClick={skipCamera}
                    style={{ background: '#f0f4f8', color: '#666', marginBlockStart: '8px' }}
                >
                    Skip Camera (Use Default)
                </button>
            </div>

            <PrimaryButton onClick={onCalculateResults}>Generate Results</PrimaryButton>
        </Screen>
    );
};

export default PostureScan;