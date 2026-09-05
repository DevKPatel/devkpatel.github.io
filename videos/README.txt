PUT YOUR VIDEOS IN THIS FOLDER
==============================

1. Drop .mp4 files here. Name them 01.mp4, 02.mp4, 03.mp4 and so on.
2. They are already listed in content.js. Add more like this:

       { video: "06.mp4", cap: "her, dancing again" },

Important
---------
- MP4 (H.264) only. .mov files from an iPhone will NOT play on Android.
  Convert them:  ffmpeg -i clip.mov -vcodec h264 -acodec aac 01.mp4
- Keep each clip UNDER 8 MB and under about 15 seconds.
  She is on mobile data. A 60 MB video means she stares at a blank square.
- Videos play silently on the page and start on their own when she scrolls
  to them. She taps one to open it full screen with sound.
