/** W3C VALIDATION **/
Both HTML pages (vanillaJS and jQuery) validates with no errors. 
The CSS (dom.css) validates with no errors and 24 warnings. The errors can be ignored because they are vendor-specific prefixes that are not part of W3C but are useful in getting specific browser to support a property.


/** COMPARING PERFORMANCE ON ANDROID **/
Testing was done with an android phone, Alcatel_4060A,  and results were collected through Chrome's DevTool.

VanillaJS (7KB) < jQuery (3 files = 97KB)
Same CSS file was used for both pages (9KB). HTML for each page are roughly around the same size of 3KB.

RESULTS (Note that Finish time only loads audio partially)
Vanilla JS on Good 2G: 
  1st run - JS Time: 334ms, Finish: 59.34s, DOMContentLoaded: 878ms, Load: 1.41s
  2nd run - JS Time: 251ms, Finish: 56.76s, DOMContentLoaded: 915ms, Load: 1.41s
  3rd run - JS Time: 211ms, Finish: 90.00s, DOMContentLoaded: 914ms, Load: 1.44s
  average - JS Time: 265.33ms, Finish: 68.70s, DOMContentLoaded: 902.33ms, Load: 1.42s
Vanilla JS on Good 3G: 
  1st run - JS Time: 103ms, Finish: 26.87s, DOMContentLoaded: 477ms, Load: 680ms
  2nd run - JS Time: 107ms, Finish: 29.18s, DOMContentLoaded: 454ms, Load: 636ms
  3rd run - JS Time: 73ms, Finish: 26.95s, DOMContentLoaded: 427ms, Load: 612ms
  average - JS Time: 94.33ms, Finish: 27.67s, DOMContentLoaded: 452.67ms, Load: 642.67ms
jQuery on Good 2G: 
  1st run - JS Time: 1.709s, Finish: 1.2min, DOMContentLoaded: 1.58s, Load: 23.62s
  2nd run - JS Time: 1.645s, Finish: 1.5min, DOMContentLoaded: 1.57s, Load: 22.93s
  3rd run - JS Time: 1.598s, Finish: 56.76s, DOMContentLoaded: 1.60s, Load: 24.61s
  avg - JS Time: 1.651s, Finish: 1.21min, DOMContentLoaded: 1.58s, Load: 23.72s
jQuery on Good 3G: 
  1st run - JS Time: 537ms, Finish: 30.83s, DOMContentLoaded: 995ms, Load: 1.18s
  2nd run - JS Time: 567ms, Finish: 29.66s, DOMContentLoaded: 781ms, Load: 7.15s
  3rd run - JS Time: 575s, Finish: 29.13s, DOMContentLoaded: 823ms, Load: 985ms
  avg - JS Time: 559.67ms, Finish: 29.87s, DOMContentLoaded: 866.33ms, Load: 3.10s
  
On average, VanillaJS runs much faster than jQuery. The jQuery code written is much smaller and easier to write than VanillaJS. The script was first written in VanillaJS, then translated to jQuery. All accesses to elements were replaced with $('element') and event listeners with $('element').on('action'). However, when importing the libraries for jQuery, the total size of jQuery is  much larger than VanilaJS. Also, it takes longer to run than the methods of jQuery than native JS. Unlike CSS, we are able to see that the times greatly differs when loading scripts and the whole page between using jQuery and VanillaJS.

  

/** TRACKERJS RESULTS (Screenshots on ./trackjs_hw3.html) **/
In order to install the trackJS tracker library, after creating an account we were given a snippet of javascript code unique to the account, and simply pasted it into the head of the html file, making sure it is the first javascript instruction in the file. One thing we realized we had to do was make sure to turn off the adblocker because it was blocking the service. Other than that, every error generated sends the message to the trackJS account with the information of the specific error, the browser used, time/date, operating system, and IP address. 

Some of the errors we first witnessed dealt with getting familiar with JavaScript and jQuery. Lack of knowledge of the DOM tree resulted in accesses node or elements off of tree (ex. Cannot read property of ... undefined).

Errors like "unexpected token", "not a function", "not defined" are caused by syntax errors or typos. These errors are quickly fixed.

The error, "play() can only be initiated by a user gesture", was found only on mobile phones. This was caused by playing all audios when the page loads to get audio to be mostly loaded before displaying the play button to users. This would lessen the time a user waits between pressing the play button and when the audio actually loads. This time is caused because the audio was not fully loaded before the user plays the audio. However, this "fix" did not work because we discover on mobile devices that forcing the audio to play caused this error. Therefore, this "fix" was removed and replaced with a function that shows the play button after the page is downloading the audio (checked with progress event).


/** OTHER **/
Testing on IE11, <template> does not work. Therefore, we informed users on IE11 that the site would not be supported. 

Script was written to follow "use strict" guidelines. 