#!/bin/sh

#icon
webkit2png -F ./resources/icon.html -o ./resources/icon
mogrify -crop 1024x1024+0+0 ./resources/icon-full.png
convert -transparent white ./resources/icon-full.png ./jokeApp/resources/icon.png
rm -f ./resources/icon-full.png
sips -Z 512 ./jokeApp/resources/icon.png --out ./jokeApp/resources/icon512.png
sips -Z 16 ./jokeApp/resources/icon512.png --out ./jokeApp/resources/icon16.png
sips -Z 28 ./jokeApp/resources/icon512.png --out ./jokeApp/resources/icon28.png
sips -Z 108 ./jokeApp/resources/icon512.png --out ./jokeApp/resources/icon108.png
sips -Z 144 ./jokeApp/resources/icon512.png --out ./jokeApp/resources/icon144.png

#icon2
webkit2png -F ./resources/icon.html -o ./resources/icon
mogrify -crop 1024x1024+0+0 ./resources/icon-full.png
mv -f ./resources/icon-full.png ./jokeApp/resources/icon2.png

#splash
webkit2png -F ./resources/splash.html -o ./resources/splash
mogrify -crop 2208x2208+0+0 ./resources/splash-full.png
mv -f ./resources/splash-full.png ./jokeApp/resources/splash.png

cd ./jokeApp/
ionic resources
sudo ionic build android
sudo ionic build ios
