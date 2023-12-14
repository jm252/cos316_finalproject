import sys
import flask
from flask_cors import CORS
import tracker
import json
import time
import schedule
from threading import Thread

# -----------------------------------------------------------------------

app = flask.Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})


@app.route("/updateUsage", methods=["GET"])
def update_usage():
    url = flask.request.args.get("prevUrl")
    elapsedTime = flask.request.args.get("elapsedTime")
    tracker.track_time(url, float(elapsedTime))
    return "success"


@app.route("/getUsageAll", methods=["GET"])
def get_usage_all():
    all_usage = tracker.get_all_times()
    return flask.jsonify(all_usage)


@app.route("/getUsageWeek", methods=["GET"])
def get_usage_week():
    week_usage = tracker.get_week_times()
    return flask.jsonify(week_usage)


@app.route("/getUsageDay", methods=["GET"])
def get_usage_day():
    day_usage = tracker.get_day_times()
    return flask.jsonify(day_usage)


schedule.every().day.at("00:00").do(tracker.clear_day)
schedule.every().sunday.at("00:00").do(tracker.clear_week)
# schedule.every().hour.at(":58").do(tracker.clear_day)
# schedule.every().hour.at(":55").do(tracker.clear_week)


def run_scheduling():
    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == "__main__":
    try:
        thread = Thread(target=run_scheduling)
        thread.start()
        app.run(port=55556, debug=True)

    except Exception as ex:
        print(ex, file=sys.stderr)
        sys.exit(1)
