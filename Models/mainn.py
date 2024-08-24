import cv2

from ultralytics import YOLO

# Load YOLOv8 model

# Initialize webcam
# cap = cv2.VideoCapture(0)

model = YOLO('yolov8n.pt')  # You can replace with 'yolov8s.pt', 'yolov8m.pt', etc.

def riskCalc(frame_path, model):
    parameters = [0, 0, 0, 0, 0.4] # total people, male, female, is_night, location index
    # if not ret:
    #     break
    frame = cv2.imread(frame_path)

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

    pers = 0
    for class_name, count in counts.items():
        if class_name == 'person':
            pers+=count
    
    parameters[0] = pers
    parameters[1] = pers//2
    parameters[2] = pers//2

    return parameters

print(riskCalc('framee.png', model))
