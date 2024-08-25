from flask import Flask, jsonify
import test1
import hello
app = Flask(__name__)




riskPercent = 50

@app.route("/data", methods=['GET'])
def get_data():
    data = {"message": "All Good", "risk": riskPercent}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
