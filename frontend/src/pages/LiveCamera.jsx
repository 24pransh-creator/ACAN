import { useEffect, useRef, useState } from "react";
import axios from "axios";

function LiveCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const alarmRef = useRef(null);

  const [cameras, setCameras] = useState([]);
  const [cameraStatus, setCameraStatus] = useState("OFF");
  const [detections, setDetections] = useState([]);

  const [alertAnimal, setAlertAnimal] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alarmStatus, setAlarmStatus] = useState("OFF");

  // Create alarm audio
  useEffect(() => {
    alarmRef.current = new Audio("/alarm.mp3");
    alarmRef.current.loop = true;
    alarmRef.current.preload = "auto";

    loadCameras();

    return () => {
      stopCamera();

      if (alarmRef.current) {
        alarmRef.current.pause();
        alarmRef.current.currentTime = 0;
      }
    };
  }, []);

  // -----------------------------
  // LOAD CAMERAS
  // -----------------------------

  const loadCameras = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/camera"
      );

      setCameras(res.data.cameras || []);
    } catch (err) {
      console.log("Camera API Error:", err);
    }
  };

  // -----------------------------
  // START CAMERA
  // -----------------------------

  const startCamera = async () => {
    if (videoRef.current?.srcObject) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      videoRef.current.srcObject = stream;

      setCameraStatus("LIVE");

      // Start AI detection every 2 seconds
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        detectAnimals();
      }, 2000);

    } catch (err) {
      console.log("Camera Error:", err);
      setCameraStatus("PERMISSION DENIED");
    }
  };

  // -----------------------------
  // STOP CAMERA
  // -----------------------------

  const stopCamera = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());

      videoRef.current.srcObject = null;
    }

    stopAlarm();

    setCameraStatus("OFF");
    setDetections([]);
    setShowAlert(false);
    setAlertAnimal("");
  };

  // -----------------------------
  // START ALARM
  // -----------------------------

  const startAlarm = () => {
    if (!alarmRef.current) return;

    alarmRef.current.currentTime = 0;

    alarmRef.current
      .play()
      .then(() => {
        setAlarmStatus("ON");
      })
      .catch((err) => {
        console.log("Alarm blocked:", err);
        setAlarmStatus("CLICK TEST ALARM");
      });
  };

  // -----------------------------
  // STOP ALARM
  // -----------------------------

  const stopAlarm = () => {
    if (!alarmRef.current) return;

    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;

    setAlarmStatus("OFF");
  };

  // -----------------------------
  // TEST ALARM
  // -----------------------------

  const testAlarm = () => {
    if (!alarmRef.current) {
      alarmRef.current = new Audio("/alarm.mp3");
      alarmRef.current.loop = true;
    }

    alarmRef.current.currentTime = 0;

    alarmRef.current
      .play()
      .then(() => {
        setAlarmStatus("ON");
      })
      .catch((err) => {
        console.log("Test alarm error:", err);
      });
  };

  // -----------------------------
  // AI DETECTION
  // -----------------------------

  const detectAnimals = async () => {
    if (!videoRef.current) return;
    if (!videoRef.current.srcObject) return;
    if (!canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;

        const formData = new FormData();

        formData.append(
          "image",
          blob,
          "frame.jpg"
        );

        try {
          const res = await axios.post(
            "http://localhost:5001/detect",
            formData
          );

          const results = res.data.detections || [];

          setDetections(results);

          // --------------------------------
          // DANGEROUS ANIMALS
          // --------------------------------

          const dangerAnimals = [
            "lion",
            "leopard",
            "tiger",
            "elephant",
            "bear",
            "zebra",
            "horse",
            "cow",
            "dog",
            "cat",
          ];

          const foundAnimal = results.find((item) =>
            dangerAnimals.includes(
              String(item.animal).toLowerCase()
            )
          );

          // --------------------------------
          // ANIMAL FOUND
          // --------------------------------

          if (foundAnimal) {
            setAlertAnimal(foundAnimal.animal);
            setShowAlert(true);

            startAlarm();
          } else {
            setShowAlert(false);
            setAlertAnimal("");

            stopAlarm();
          }

        } catch (err) {
          console.log("AI ERROR:", err);
        }
      },
      "image/jpeg",
      0.8
    );
  };

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div
      style={{
        color: "white",
        paddingBottom: "40px",
      }}
    >

      {/* ALERT */}
      {showAlert && (
        <div
          style={{
            background: "#7f1d1d",
            border: "3px solid #ef4444",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            textAlign: "center",
            boxShadow: "0 0 25px rgba(239,68,68,0.5)",
          }}
        >
          <h1
            style={{
              color: "#fca5a5",
              margin: 0,
            }}
          >
            🚨 {alertAnimal.toUpperCase()} DETECTED
          </h1>

          <h2
            style={{
              color: "white",
              marginTop: "10px",
            }}
          >
            ⚠️ STOP TRAIN IMMEDIATELY
          </h2>

          <p
            style={{
              color: "#fecaca",
              fontWeight: "bold",
            }}
          >
            AI Emergency Alert Active
          </p>
        </div>
      )}

      {/* TITLE */}

      <h1
        style={{
          color: "#22c55e",
          marginBottom: "20px",
        }}
      >
        📷 Live AI Camera
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >

        {/* ========================= */}
        {/* LEFT CAMERA */}
        {/* ========================= */}

        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
          }}
        >

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "100%",
              borderRadius: "10px",
              background: "#000",
              minHeight: "300px",
              objectFit: "cover",
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              display: "none",
            }}
          />

          {/* CAMERA BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >

            <button
              onClick={startCamera}
              style={{
                flex: 1,
                padding: "13px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              ▶ Camera ON
            </button>

            <button
              onClick={stopCamera}
              style={{
                flex: 1,
                padding: "13px",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              ⏹ Camera OFF
            </button>

          </div>

          {/* ALARM BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >

            <button
              onClick={testAlarm}
              style={{
                flex: 1,
                padding: "12px",
                background: "#f59e0b",
                color: "#111827",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🔊 TEST ALARM
            </button>

            <button
              onClick={stopAlarm}
              style={{
                flex: 1,
                padding: "12px",
                background: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🔇 STOP ALARM
            </button>

          </div>

          {/* STATUS */}

          <h3
            style={{
              marginTop: "15px",
              color:
                cameraStatus === "LIVE"
                  ? "#22c55e"
                  : "#ef4444",
            }}
          >
            Camera Status : {cameraStatus}
          </h3>

          <h3
            style={{
              color:
                alarmStatus === "ON"
                  ? "#ef4444"
                  : "#9ca3af",
            }}
          >
            Alarm Status : {alarmStatus}
          </h3>

        </div>

        {/* ========================= */}
        {/* RIGHT PANEL */}
        {/* ========================= */}

        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
          }}
        >

          <h2>
            📡 Connected Cameras
          </h2>

          {cameras.length === 0 ? (
            <p
              style={{
                color: "#9ca3af",
              }}
            >
              No cameras connected
            </p>
          ) : (
            cameras.map((camera) => (
              <div
                key={camera.id}
                style={{
                  marginTop: "15px",
                  borderBottom: "1px solid #374151",
                  paddingBottom: "12px",
                }}
              >

                <h3>
                  {camera.name}
                </h3>

                <p>
                  {camera.location}
                </p>

                <p
                  style={{
                    color:
                      camera.status === "Online"
                        ? "#22c55e"
                        : "#ef4444",
                    fontWeight: "bold",
                  }}
                >
                  ● {camera.status}
                </p>

              </div>
            ))
          )}

          <hr
            style={{
              margin: "20px 0",
              borderColor: "#374151",
            }}
          />

          {/* AI */}

          <h2>
            🦁 AI Detection
          </h2>

          {detections.length === 0 ? (
            <p
              style={{
                color: "#9ca3af",
              }}
            >
              No Animals Detected
            </p>
          ) : (
            detections.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#374151",
                  padding: "12px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              >

                <h3
                  style={{
                    color: "#22c55e",
                    margin: 0,
                  }}
                >
                  {item.animal}
                </h3>

                <p
                  style={{
                    marginBottom: 0,
                  }}
                >
                  Confidence : {item.confidence}%
                </p>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default LiveCamera;