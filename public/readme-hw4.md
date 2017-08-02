/** W3C VALIDATION **/
HTML page validates with no errors. 
The CSS (dom.css) validates with 1 errors and 19 warnings. The errors/warnings can be ignored because they are vendor-specific prefixes that are not part of W3C but are useful in getting specific browser(s) to support a property.

/** COMPARING PERFORMANCE ON ANDROID **/
Testing was done with an android phone, Alcatel_4060A,  and results were collected through Chrome's DevTool.

Comparing performance of soundboard with and without service workers.

No Service Worker on Regular 3G: 
  FIRST ACCESS => Finish: 48.17s, DOMContentLoaded: 734ms, Load: 1.08s
  SECOND ACCESS => Finish: 47.95s, DOMContentLoaded: 742ms, Load: 1.04s
  OFFLINE ACCESS => page does not load

With Service Worker on Regular 3G: 
  FIRST ACCESS => Finish: 1.1min, DOMContentLoaded: 497ms, Load: 833ms
  SECOND ACCESS => Finish: 3.44s, DOMContentLoaded: 461ms, Load: 857ms
  OFFLINE ACCESS => Finish: 2.42s, DOMContentLoaded: 277ms, Load: 484ms
  
  With Service Worker, on the first load the page runs faster than the page without Service Worker, but takes longer to finish. It takes longer to finish, because there are more files to load (javascript for the Service Worker and a Manifest which also loads icons). On the second load, we see a significant increase in Finish, DOMContentLoaded, and Load time because the Service Worker cached all assets from the first load and retrieved on the second load. Another benefit is that all items cached can be retrieved offline, therefore the page with Service Workers will load the page even if the user if offline.

/** LightHouse Evaluation (link to result on /index) **/
First time running LightHouse, many points were docked due to image size. In order to improve performance, a simple solution was to reduce image quality.

NOTE: The page was saved in HTML form and is clickable to expand subsections.