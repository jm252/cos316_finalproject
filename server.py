import sys
import flask
from flask_cors import CORS

# -----------------------------------------------------------------------

app = flask.Flask(__name__)
CORS(app)

@app.route("/updateUsage", methods=["GET"])
def updateUsage():
    url = flask.request.args.get("prevUrl")
    elapsedTime = flask.request.args.get("elapsedTime")

    print(url)
    print(elapsedTime)
    return "success"

if __name__ == "__main__":
    try:
        app.run(port=55556, debug=True)
    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)
