# SurfSmart
## Smart Line Interface for Web

## TODO
 - handle clients without javascript
  - add warning message
  - add fallback handler on server
  - add query to url
  - update warning message
 - UI
  - show service icon on the left side of the input
  - dynamicially add icon for swaping origin and destination
 - suggestions
  - add suggestions for search services
   + google
   - google images
   + youtube
   + duckduckgo
  - add sugestion for routing
  - suggestions for google maps, routing https://developers.google.com/places/web-service/query#location_biasing
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
  + make a dictionary of airport codes, cities
  - trim user input
  - sort airports by importance
  - remove pseudo airports (i.e. ZMU)

 - **Language support**
  - add language support for parsing dates
  - add language support for services

## Futher Ideas
 - add an option to add `@specific_service_name` at the end of service name, such that the user can specify what service to use to accomplish his request
   for example `flight` request will be served with default service, but `flight@kayak` request will be served with Kayak.com service.

## Known Issues
 - 12/04 date parsed as Dec 04, but it might be parsed as Apr 12 (see FT:Language support)

