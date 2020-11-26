import datetime


time = datetime.datetime(2020, 11, 26, 19, 29, 13)
print(time)
print(time.replace(hour=0,minute=0, second=0))
time = datetime.datetime(2020, 11, 26, 0, 0, 0)
print(time)
