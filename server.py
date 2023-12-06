import sys
import flask
from flask_cors import CORS
import tracker 
import json
# -----------------------------------------------------------------------

app = flask.Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})


@app.route("/updateUsage", methods=["GET"])
def update_usage():
    url = flask.request.args.get("prevUrl")
    elapsedTime = flask.request.args.get("elapsedTime")
    tracker.track_time(url, float(elapsedTime))
    return "success"

@app.route("/getUsage", methods=["GET"])
def get_usage():
    usage = tracker.get_all_times()
    print(usage.to_string())
    return flask.jsonify(usage) 

if __name__ == "__main__":
    try:
        app.run(port=55556, debug=True)
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)


