
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
    return tracker