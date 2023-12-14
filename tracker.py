
tracker_all = {}
tracker_week = {}
tracker_day = {}

def track_time(url, time):
    if url == 'undefined':
        exit()
    # if it's not in all, it's not in any - add to all
    if url not in tracker_all:
        tracker_all[url] = time
        tracker_week[url] = time
        tracker_day[url] = time
    # if it's not in week, it's not in week or day - add to both
    elif url not in tracker_week:
        tracker_week[url] = time
        tracker_day[url] = time
    # if it's not in day, it's only not in day - add to day
    elif url not in tracker_day:
        tracker_day[url] = time
    
    # if it's already in all of them, update time in all 
    else:
        tracker_all[url] += time 
        tracker_week[url] += time 
        tracker_day[url] += time 

def get_all_times():
    display_tracker_all = dict(sorted(tracker_all.items(), key=lambda item: item[1]))
    for url, time in tracker_all.items():
        display_tracker_all[url] = _convert_time(time)
    return display_tracker_all

def get_week_times():
    display_tracker_week = dict(sorted(tracker_week.items(), key=lambda item: item[1]))
    for url, time in tracker_week.items():
        display_tracker_week[url] = _convert_time(time)
    return display_tracker_week

def get_day_times():
    display_tracker_day = dict(sorted(tracker_day.items(), key=lambda item: item[1]))
    for url, time in tracker_day.items():
        display_tracker_day[url] = _convert_time(time)
    return display_tracker_day

def _convert_time(time):
    hours, remainder = divmod(time, 3600)
    minutes, seconds = divmod(remainder, 60)

    if hours > 0:
        return f"{int(hours)}h {int(minutes)}m {int(seconds)}s"
    elif minutes > 0:
        return f"{int(minutes)}m {int(seconds)}s"
    else:
        return f"{int(seconds)}s"
    
def clear_week():
    global tracker_week
    tracker_week.clear()
    return

def clear_day():
    global tracker_day
    tracker_day.clear()
    return