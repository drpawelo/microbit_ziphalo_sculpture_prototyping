# microbit_ziphalo_sculpture_prototyping
code for microbit zip halo. Needs to work in https://makecode.microbit.org/#editor hence some code weirdness here and there.

this code uses [zip halo hd](https://www.kitronik.co.uk/5672-kitronik-zip-halo-hd-for-microbit.html) and shows what it can do

# What does it do
This code will control HaloHD led display with microbits. You can control it from the microbit connected to HaloHD.

But sometimes you want to rig yoru haloHD to a lamp/project/sculpture and it is impractival to reach for it's buttons. That;s why you can put this code also on another microbit nearby running, and it will become a 'remote control' so you can use that to change HaloHD via build in blurtooth connectors.

# To put this code on yoru microbit
1. download a file with most recent version from [release folder](./release/), and drag-n-drop that file into your computer-connected microbit

# To edit code:
1. log in and create a new project on https://makecode.microbit.org/
2. add plugin for the zip_halo: In code editor Go Advanced > Extensions and search for 'halo', click the only result. This will give you javascript libraries to control leds (and a new HaloHD tab in your scratch code editor)
3. switch to editing code (at the top of the screen toggle from Blocks to JavaScript)
4. here paste the code from this repository's file [code.js](./code.js)

[current manual is here](https://docs.google.com/presentation/d/1UgW4WmlRzD7S2L61QOMr-idsZHK6E32wnhnJt4vuXN8/edit?usp=sharing)

![Manual image](./manual.png "Manual")
