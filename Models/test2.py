import cv2
import numpy as np
from tensorflow.keras.applications import VGG16
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.preprocessing.image import img_to_array

from ultralytics import YOLO
# Load and fine-tune VGG16
base_model = VGG16(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
# x = base_model.output
# x = GlobalAveragePooling2D()(x)
# x = Dense(256, activation='relu')(x)
predictions = Dense(2, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)
# model.load_weights('path_to_fine_tuned_vgg_model.h5')  # Load your fine-tuned weights


# Load the YOLOv8 model (assuming YOLOv8 is in the path)
yolo_model = YOLO('yolov8n.pt')  # Using YOLOv8 nano model for speed


cap = cv2.VideoCapture(0)  # Start webcam capture

while True:
    ret, frame = cap.read()
    if not ret:
        break
    # Perform YOLO detection
    results = yolo_model(frame)
    detections = results[0].boxes  # YOLOv8 output format

    for det in detections:
        x1, y1, x2, y2 = map(int, det.xyxy[0])  # Bounding box coordinates

        # Crop the detected person
        cropped_person = frame[y1:y2, x1:x2]

        # Preprocess the image for VGG model
        cropped_person = cv2.resize(cropped_person, (224, 224))
        cropped_person = img_to_array(cropped_person)
        cropped_person = np.expand_dims(cropped_person, axis=0)

        # Perform gender classification
        gender_pred = model.predict(cropped_person)
        gender = 'Male' if np.argmax(gender_pred) == 0 else 'Female'

        # Draw bounding box and label
        label = f'{gender}: {det.conf:.2f}'
        cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
        cv2.putText(frame, label, (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

    # Display the result
    cv2.imshow('Gender Classification', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()