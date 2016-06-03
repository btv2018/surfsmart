# SurfSmart
## Smart Line Interface for Web

## TODO
 - services
  - news
  - weather we, python docs pydoc
  - translator (https://translate.google.com/#auto/ru/marker)
   + basic with default language arguments
   + with languages arguments as **short arguments**: `tr/en/ru smart` en -> ru, `tr//ru Deutschland` auto -> ru, `tr maison` auto -> local language
   + suggestions for languages
   - add languages supported by Google
  - wikipedia
   + add language argument as a **short argument** `w London` local language, `w/ru google` russian language
   + suggestions for languages
   - suggestions for query
   - set default list of languages
   - stop filtering language if number of suggestions is big enough
 - suggestions
  - add suggestions for search services
   + google
   - google images
   + youtube
   + duckduckgo
   - wikipedia
  - add sugestion for routing
  - suggestions for google maps, routing https://developers.google.com/places/web-service/query#location_biasing
   - it is not easy, because it is not allowed to make non-jsonp external call from the page. So using google sugestions requires to implement a gate.
   - try to use geonames (or something similar) for suggestions
 - handle clients without javascript
  - add warning message
  - add fallback handler on server
  - add query to url
  - update warning message
 - UI
  - show service icon on the left side of the input
  - dynamicially add icon for swaping origin and destination
 + dynamicially generate help overview
 + add autocomplete for service names
 - add autocomplete for service name aliases
 + parsing
  + parse dates more acurate: April 26, 26.04, 26/04
  + handle year
 - insert at the beginning of every suggestion the name of the serivece (return an object rather then string like for flight suggestions)
 - add INSTALL.sh script to run scripts/airport-codes-converter.py and other scripts to make the applicaiton ready to run

## Features
 - **The service as an open search**
  - setup nodejs
  - add go method for redirecting and error heandling
  - add suggest method
  - add open search markup for the input field
  - deploy the service
 
 - **Fast suggestions from external sources**

 - **Suggestions for airport codes**
  + add basic suggestions (undependent from cursor position)
  - make suggestions dependent on cursor position
   - make it more general like: `flight %departure% to %destination% on %departure_date:date%[, %back_date:date%][ direct]`
     getSuggestions(user_input, 'destination', {departure: 'txl', destination: 'muni', departure_date: "May 12"})
  + make a dictionary of airport codes, cities
  - trim user input
  - sort airports by importance (try to get it from dbpedia or something making SPARQL request)
  - remove pseudo airports (i.e. ZMU)

 - **Language support**
  - add language support for parsing dates
  - add language support for services
  - add language support for airport code suggestion

 - **Instant answers**
   for some servises it is possible to give instant answer, for example for translation probably it is possible to use google translator api to show translation immediatly as user type a query

 - **Calendar as a Suggestion**

## Futher Ideas
 - add an option to add `@specific_service_name` at the end of service name, such that the user can specify what service to use to accomplish his request
   for example `flight` request will be served with default service, but `flight@kayak` request will be served with Kayak.com service.

## Known Issues
 - 12/04 date parsed as Dec 04, but it might be parsed as Apr 12 (see FT:Language support)
 - if select service suggestion it appears after user input, not instead it
 - if select suggestion for duckduckgo (or other services) the selection goes to the input field but the page does not redirect. So it requires two type to get an answer

