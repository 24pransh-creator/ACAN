import { useEffect, useRef, useState } from "react";

function PhoneCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraOn(true);
    } catch (err) {
      console.error(err);
      setError(
        "Camera access failed. Please allow camera permission in your browser."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          color: "#22c55e",
          marginBottom: "8px",
        }}
      >
        📱 ACAN Phone Camera
      </h1>

      <p style={{ color: "#94a3b8" }}>
        Railway Camera Monitoring
      </p>

      <div
        style={{
          marginTop: "20px",
          background: "#1e293b",
          border: "1px solid #22c55e",
          borderRadius: "12px",
          padding: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2>Camera Feed</h2>

          <span
            style={{
              background: cameraOn ? "#15803d" : "#991b1b",
              padding: "8px 14px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            ● {cameraOn ? "LIVE" : "OFF"}
          </span>
        </div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            maxHeight: "70vh",
            objectFit: "cover",
            background: "#020617",
            borderRadius: "10px",
            display: "block",
          }}
        />

        {error && (
          <div
            style={{
              marginTop: "15px",
              padding: "12px",
              background: "#7f1d1d",
              borderRadius: "8px",
              color: "#fecaca",
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          {!cameraOn ? (
            <button
              onClick={startCamera}
              style={{
                flex: 1,
                padding: "14px",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              📷 Start Camera
            </button>
          ) : (
            <button
              onClick={stopCamera}
              style={{
                flex: 1,
                padding: "14px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              ⏹ Stop Camera
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhoneCamera;