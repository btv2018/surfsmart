# SurfSmart
## Smart Line Interface for Web

Try it [http://btv2018.github.io/surfsmart]

## TODO
 - tech dept
  - use some library to filter, map, limit arrays
 - services
  - news
  - weather we, python docs pydoc
  - translator (https://translate.google.com/#auto/ru/marker)
   - [+] basic with default language arguments
   - [+] with languages arguments as **short arguments**: `tr/en/ru smart` en -> ru, `tr//ru Deutschland` auto -> ru, `tr maison` auto -> local language
   - [+] suggestions for languages
   - [+] add languages supported by Google
   - [-] let open the google transate page without query
  - wikipedia
   + add language argument as a **short argument** `w London` local language, `w/ru google` russian language
   + suggestions for languages
   - suggestions for query
   - set default list of languages
   - stop filtering language if number of suggestions is big enough
   - make laguages sugestions with language code and name
 - suggestions
  - add suggestions for search services
   - google images
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
 + add autocomplete for service name aliases
 + parsing
  + parse dates more acurate: April 26, 26.04, 26/04
  + handle year
 - add oxforddictionaries
  - https://en.oxforddictionaries.com/search?utf8=%E2%9C%93&filter=dictionary&query=promote
  - https://en.oxforddictionaries.com/search?callback=jQuery1111038667220081717835_1476703956582&query=su&filter=dictionary&_=1476703956583
	- http://www.wordreference.com/
 - add https://www.collinsdictionary.com/dictionary/english/
 - add amazon de com


## Features
 - **Service as an Open Search**
  - setup nodejs
  - add go method for redirecting and error heandling
  - add suggest method
  - add open search markup for the input field
  - deploy the service
 
 - **Fast Suggestions from External Sources**

 - **Suggestions for Airport Codes**
  + add basic suggestions (undependent from cursor position)
  - make suggestions dependent on cursor position
   - make it more general like: `flight %departure% to %destination% on %departure_date:date%[, %back_date:date%][ direct]`
     getSuggestions(user_input, 'destination', {departure: 'txl', destination: 'muni', departure_date: "May 12"})
  + make a dictionary of airport codes, cities
  - trim user input
  - sort airports by importance (try to get it from dbpedia or something making SPARQL request)
  - remove pseudo airports (i.e. ZMU)

 - **Language Support**
  - add language support for parsing dates
  - add language support for services
  - add language support for airport code suggestion

 - **Instant Answers**
  - for some servises it is possible to give instant answer, for example for translation probably it is possible to use google translator api to show translation immediatly as user type a query

 - **Calendar as a Suggestion**

 - **Service as a Browser Plugin**
  - add a special input field
  - show suggestions
  - instantly open target page
  - update search terms on opened page as user modifies it
  - merge the field to the address bar
  - add an option to reuse tabs

## Futher Ideas
 - add an option to add `@specific_service_name` at the end of service name, such that the user can specify what service to use to accomplish his request
   for example `flight` request will be served with default service, but `flight@kayak` request will be served with Kayak.com service.
 - gmail search, compose emails

## Known Issues
 - 12/04 date parsed as Dec 04, but it might be parsed as Apr 12 (see FT:Language Support)
 + if select suggestion for duckduckgo (or other services) the selection goes to the input field but the page does not redirect. So it requires two type to get an answer
 + if click on a suggestion, it does not go to the input field

