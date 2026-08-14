from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import os
import uuid

app = Flask(__name__)

# Enable CORS
CORS(app)

UPLOAD_FOLDER = "uploads"
DETECTION_FOLDER = "detections"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DETECTION_FOLDER, exist_ok=True)

print("Loading YOLOv8 Model...")
model = YOLO("yolov8n.pt")
print("YOLOv8 Loaded Successfully!")


@app.route("/")
def home():
    return jsonify({
        "app": "ACAN AI Server",
        "status": "Running"
    })


@app.route("/detect", methods=["POST"])
def detect():

    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded"
        }), 400

    image = request.files["image"]

    filename = str(uuid.uuid4()) + ".jpg"
    image_path = os.path.join(UPLOAD_FOLDER, filename)

    image.save(image_path)

    results = model(image_path)

    frame = cv2.imread(image_path)

    detections = []

    for result in results:

        for box in result.boxes:

            cls = int(box.cls[0])
            confidence = float(box.conf[0])
            label = model.names[cls]

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            cv2.rectangle(
                frame,
                (x1, y1),
                (x2, y2),
                (0, 255, 0),
                2
            )

            cv2.putText(
                frame,
                f"{label} {confidence:.2f}",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 255, 0),
                2
            )

            detections.append({
                "animal": label,
                "confidence": round(confidence * 100, 2)
            })

    output_path = os.path.join(DETECTION_FOLDER, filename)

    cv2.imwrite(output_path, frame)

    return jsonify({
        "success": True,
        "totalDetections": len(detections),
        "detections": detections,
        "outputImage": output_path
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )