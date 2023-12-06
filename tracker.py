from datetime import datetime
import json 
from json import JSONEncoder

class DateTime: 
    def __init__(self, time):
        self.time = float(time)
        self.date = datetime.now() # parse to get date
    
    def __str__(self):
        return f"Time: {self.time}, Date: {self.date}"

    def update(self, time):
        self.date = datetime.now() # parse to get date
        self.time += float(time)

tracker = {}

def track_time(url, time):
    if url == 'undefined':
        exit()
    if url not in tracker:
        print("not in map")
        tracker[url] = DateTime(time)
        print(tracker[url].time)
    else:
        print("already in map")
        print("old time: " + str(tracker[url].time))
        tracker[url].update(time)
        print("new time: " + str(tracker[url].time))

def get_time(url):
    return tracker[url].time

def get_all_times():
    display_tracker = tracker.copy()
    for url, date_time in tracker.items():
        display_tracker[url].time = _convert_time(date_time.time)
    return display_tracker

def _convert_time(time):

    hours, remainder = divmod(time, 3600)
    minutes, seconds = divmod(remainder, 60)

    if hours > 0:
        return f"{int(hours)}h {int(minutes)}m {int(seconds)}s"
    elif minutes > 0:
        return f"{int(minutes)}m {int(seconds)}s"
    else:
        return f"{int(seconds)}s"

def to_string():
    string = ""
    for k, v in tracker.items():
        string += f"{k}: {v.__str__()}\n"
    return string