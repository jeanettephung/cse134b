/** W3C VALIDATION **/
HTML page validates with no errors. 
The CSS (dom.css) validates with no errors and 24 warnings. The errors can be ignored because they are vendor-specific prefixes that are not part of W3C but are useful in getting specific browser to support a property.

/** COMPARING PERFORMANCE ON ANDROID **/
Testing was done with an android phone, Alcatel_4060A,  and results were collected through Chrome's DevTool.

Comparing performance of soundboard with and without service workers.

No Service Worker on Regular 3G (First Load): 
  1st run - JS Time: 103ms, Finish: 26.87s, DOMContentLoaded: 477ms, Load: 680ms
No Service Worker on Regular 3G (Second Load): 
  1st run - JS Time: 103ms, Finish: 26.87s, DOMContentLoaded: 477ms, Load: 680ms
No Service Worker on Regular 3G (Offline): 
  1st run - JS Time: 103ms, Finish: 26.87s, DOMContentLoaded: 477ms, Load: 680ms

With Service Worker on Regular 3G (First Load): 
  1st run - JS Time: 103ms, Finish: 26.87s, DOMContentLoaded: 477ms, Load: 680ms
With Service Worker on Regular 3G (Second Load): 
  1st run - JS Time: 103ms, Finish: 26.87s, DOMContentLoaded: 477ms, Load: 680ms
With Service Worker on Regular 3G (Offline): 
  1st run - JS Time: 103ms, Finish: 26.87s, DOMContentLoaded: 477ms, Load: 680ms

/** LightHouse Evaluation (link to result on /index) **/
First time running LightHouse, many points were docked due to image size. In order to improve performance, a simple solution was to reduce image quality.