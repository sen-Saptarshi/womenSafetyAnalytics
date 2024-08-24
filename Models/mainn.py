import cv2

from ultralytics import YOLO

# Load YOLOv8 model

# Initialize webcam
# cap = cv2.VideoCapture(0)

model = YOLO('yolov8n.pt')  # You can replace with 'yolov8s.pt', 'yolov8m.pt', etc.
# gender_net = cv2.dnn.readNetFromCaffe('deploy_gender.prototxt', 'gender_net.caffemodel')
# GENDER_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
# GENDER_LIST = ['Male', 'Female']

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
    cv2.imshow('YOLOv8 Live Tracking with Counts', frame)
    for class_name, count in counts.items():
        if class_name == 'person':
            pers=count
            break
    
    parameters[0] = pers
    parameters[1] = pers//2
    parameters[2] = pers//2

    return parameters

# print(riskCalc('./sam.jpg', model))
path = r'womenSafetyAnalytics/Models/sam.jpg'

# Reading an image in default mode
image = cv2.imread(path)

# Window name in which image is displayed
window_name = 'image'

# Using cv2.imshow() method
# Displaying the image
cv2.imshow(window_name, image)

# waits for user to press any key
# (this is necessary to avoid Python kernel form crashing)
cv2.waitKey(0)

# closing all open windows
cv2.destroyAllWindows()
