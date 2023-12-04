import sys
import flask

# -----------------------------------------------------------------------

app = flask.Flask(__name__, template_folder=".")
try:
    app.run(host="0.0.0.0", port=55556, debug=True)
except Exception as ex:
    print(ex, file=sys.stderr)
    sys.exit(1)


@app.route("/updateUsage", methods=["GET"])
def updateUsage():
    url = flask.request.args.get("prevUrl")
    elapsedTime = flask.request.args.get("elapsedTime")

    print(url)
    print(elapsedTime)