PUT HER PHOTOS IN THIS FOLDER
=============================

1. Drop your .jpg or .png files here.
2. Open content.js and add one line to whichever chapter you want it in:

       { photo: "beach.jpg", cap: "that afternoon" },

   The filename must match EXACTLY, capital letters included.

Tips
----
- Square photos look best. They get cropped to a square in the polaroid frame.
- Keep each one under about 400 KB or the page gets slow on mobile data.
  Run  node tools/optimize-media.mjs  and it will tell you which ones are too big.
- A missing photo never breaks anything. It just shows a soft "photo" placeholder.
