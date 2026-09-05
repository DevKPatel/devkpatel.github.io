PUT YOUR SONG IN THIS FOLDER
============================

1. Drop one .mp3 here.
2. Name it  song.mp3  (or rename it in content.js under music.file).

The song starts the moment she pulls the string, because that tap is what
lets a browser play audio at all. There is a mute button in the corner.

Keep it under about 4 MB. Trim it to the part that matters:

    ffmpeg -i full.mp3 -ss 00:00:45 -t 90 -b:a 128k song.mp3

To turn music off completely, set  file: ""  in content.js.
