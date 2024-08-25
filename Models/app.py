import cv2
from flask import Flask, jsonify
import test1
from ultralytics import YOLO
# import hello
app = Flask(__name__)


model = YOLO('yolov8n.pt')
cap = cv2.VideoCapture(0)
@app.route("/data", methods=['GET'])
def get_data():
    parameters = test1.frameCap(model, cap)
    data = {"total":parameters[0], "male":parameters[1], "female":parameters[2], "is_night":parameters[3], "risk": parameters[4]}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
