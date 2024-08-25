import cv2

from ultralytics import YOLO

# Load YOLOv8 model
# model = YOLO('yolov8n.pt')  # You can replace with 'yolov8s.pt', 'yolov8m.pt', etc.

# Initialize webcam
# cap = cv2.VideoCapture(0)  # Use 0 for default webcam, or specify the camera index
# counter = 0
def frameCap(model, cap):
    # counter+=1
    ret, frame = cap.read()  # Capture frame-by-frame
    if not ret:
        return [0, 0, 0, 0, 0]

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
    # annotated_frame = results[0].plot()

    pers = 0
    for class_name, count in counts.items():
        if class_name == 'person':
            pers=count
    
    parameters = [0, 0, 0, 0, 0.4]
    parameters[0] = pers
    parameters[1] = pers//2
    parameters[2] = pers//2
    return parameters
    

# Release the capture and close windows
# cap.release()