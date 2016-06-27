import time
import webbrowser

i = 0

while i < 4:
    time.sleep(60 * 60)
    webbrowser.open("https://www.yahoo.com/")
    i = i + 1
