import cv2

from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO('yolov8n.pt')  # You can replace with 'yolov8s.pt', 'yolov8m.pt', etc.

# Initialize webcam
cap = cv2.VideoCapture(0)  # Use 0 for default webcam, or specify the camera index

while True:
    ret, frame = cap.read()  # Capture frame-by-frame
    if not ret:
        break

    # Perform object detection
    results = model(frame)

    # Extract detected classes
    class_names = model.names  # Get class names from the model
    counts = {}

    for result in results:
        for cls in result.boxes.cls:
            class_name = class_names[int(cls)]
            if class_name in counts:
                counts[class_name] += 1
            else:
                counts[class_name] = 1

    # Annotate detections on the frame
    annotated_frame = results[0].plot()

    # Display counts on the frame
    y_offset = 30
    for class_name, count in counts.items():
        cv2.putText(annotated_frame, f"{class_name}: {count}", (10, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        y_offset += 30

    # Display total objects count
    total_objects = sum(counts.values())
    cv2.putText(annotated_frame, f"Total Objects: {total_objects}", (10, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

    # Display the resulting frame
    cv2.imshow('YOLOv8 Live Tracking with Counts', annotated_frame)

    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close windows
cap.release()
cv2.destroyAllWindows()