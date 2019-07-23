# PodRadio

## Notice - July 2019

_This code no longer works as written_

_Yahoo has sunset YQL and as a result, this code no long works. Podradio was relying on it as a proxy. If I have time, I'll attempt to find a work-around, but as of now, you won't be able to execute this code without running YQL on your own (which defeats the intended purpose)._

## Intro

A cross-domain capable RSS and PodCast reader and player
By Brian Rollins (brianrollins.com)

*Requires jQuery 1.8 or higher.*

A simple utility to grab a podcast's RSS feed and then load the audio onto your page. 
It uses the YQL engine to act as a proxy and get you around cross-domain issues.

You can load multiple different podcasts onto one page, if you want. The limiting
factor will be the users client system (memory and resources). So don't get crazy.

There are several extra items added to the object that are not yet used, but 
feel free to fork or suggest changes.
