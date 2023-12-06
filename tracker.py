
tracker = {}

def track_time(url, time):
    if url not in tracker:
        print("not in map")
        tracker[url] = time
        print(tracker[url])
    else:
        print("already in map")
        print("old time: " + str(tracker[url]))
        tracker[url] += time 
        print("new time: " + str(tracker[url]))

def get_time(url):
    return tracker[url]

def get_all_times():
    display_tracker = tracker.copy()
    for url, time in tracker.items():
        display_tracker[url] = _convert_time(time)
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