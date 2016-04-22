
var SERVICE_MANAGER = {
    services: {
        "duckduckgo": "<i>search query</i>",
        "youtube": "<i>search query</i>",
        "flightsearch": "<i>origin</i> to <i>destination</i> on <i>departure date</i> [<i>back date</i>] [direct]",
        "route": "<i>origin</i> to <i>destination</i>",
        "wikimedia": "[<i>language code</i>] <i>search query</i>",
    },
    init: function () {
//        this.services.append('c');
        console.log(this.services);
    },
    findService: function (namePrefix) {
        console.log(namePrefix);
        namePrefix = namePrefix.split(" ", 1)[0];
        if (namePrefix && namePrefix.length > 0) {
            for (var service in this.services) {
                console.log(service);
                if (service.startsWith(namePrefix)) {
                    return this.services[service];
                }
            }
        }
    }
};


$(document).ready(function() {
    main();
//    $( "#date" ).autocomplete({
//        //source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ]
//        source: "https://www.google.com/complete/search?client=firefox&amp;q=tipa"
//    });

    $( "#date" ).autocomplete({
        source: function(request, response) {
            var firstSpaceIndex = request.term.indexOf(" ");
            if (firstSpaceIndex == -1) {
                return;
            }
            var serviceName = request.term.substring(0, firstSpaceIndex);
            var serviceArgs = request.term.substring(firstSpaceIndex + 1);
            if (serviceArgs.length < 3) {
                return;
            }
            $.ajax({
                url: "https://www.google.com/complete/search?client=firefox",
                dataType: "jsonp",
                data: {
                    q: serviceArgs
                },
                success: function( data ) {
                    console.log(data[1]);
                    response(data[1]);
                }
            });
        },
        minLength: 3,
        focus: function(event, ui) {
            var term = $("#date").val();
            var firstSpaceIndex = term.indexOf(" ");
            if (firstSpaceIndex == -1) {
                return;
            }
            var serviceName = term.substring(0, firstSpaceIndex);
            var serviceArgs = term.substring(firstSpaceIndex + 1);
            $("#date").val(serviceName + " " + ui.item.value);
            return false;
        },
        open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
   });

});

function main() {
    SERVICE_MANAGER.init();

    var queryInput = document.getElementById("queryInput");

    queryInput.onchange = dynamicHelp;
    queryInput.onkeyup = dynamicHelp;
//    setInterval(dynamicHelp, 500);

    queryInput.addEventListener("keypress", function(event) {
        var query = queryInput.value;
        if (event.keyCode == 13) {
            //window.location = processQuery(query);
            var nextUrl = processQuery(query);
            window.open(nextUrl);
        }
    });
}

function dynamicHelp() {
    var serviceHelp = document.getElementById("service-help");
    var query = queryInput.value;

    var service = SERVICE_MANAGER.findService(query);
    if (service) {
        serviceHelp.innerHTML = service;
    } else {
        serviceHelp.innerHTML = "";
    }
}


// List of all languages from https://meta.wikimedia.org/wiki/Table_of_Wikimedia_projects
// grep "<\!\-\-" -v | sed 's/.*2=\([a-z\-]*\)|.*/\1/'
WIKIPEDIA_LANGUAGES = [
'aa', 'ab', 'ace', 'ady', 'af', 'ak', 'als', 'am', 'an', 'ang', 'anp', 'ar', 'arc', 'arz', 'as', 'ast', 'av', 'ay', 'az', 'azb', 'ba', 'bar', 'bat-smg', 'bcl', 'be', 'be-x-old', 'bg', 'bh', 'bi', 'bjn', 'bm', 'bn', 'bo', 'bpy', 'br', 'bs', 'bug', 'bxr', 'ca', 'cbk-zam', 'cdo', 'ce', 'ceb', 'ch', 'cho', 'chr', 'chy', 'ckb', 'co', 'cr', 'crh', 'cs', 'csb', 'cu', 'cv', 'cy', 'da', 'de', 'diq', 'dsb', 'dv', 'dz', 'ee', 'el', 'eml', 'en', 'eo', 'es', 'et', 'eu', 'ext', 'fa', 'ff', 'fi', 'fiu-vro', 'fj', 'fo', 'fr', 'frp', 'frr', 'fur', 'fy', 'ga', 'gag', 'gan', 'gd', 'gl', 'glk', 'gn', 'gom', 'got', 'gu', 'gv', 'ha', 'hak', 'haw', 'he', 'hi', 'hif', 'ho', 'hr', 'hsb', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'ilo', 'io', 'is', 'it', 'iu', 'ja', 'jbo', 'jv', 'ka', 'kaa', 'kab', 'kbd', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'koi', 'kr', 'krc', 'ks', 'ksh', 'ku', 'kv', 'kw', 'ky', 'la', 'lad', 'lb', 'lbe', 'lez', 'lg', 'li', 'lij', 'lmo', 'ln', 'lo', 'lrc', 'lt', 'ltg', 'lv', 'mai', 'map-bms', 'mdf', 'mg', 'mh', 'mhr', 'mi', 'min', 'mk', 'ml', 'mn', 'mo', 'mr', 'mrj', 'ms', 'mt', 'mus', 'mwl', 'my', 'myv', 'mzn', 'na', 'nah', 'nap', 'nds', 'nds-nl', 'ne', 'new', 'ng', 'nl', 'nn', 'no', 'nov', 'nrm', 'nso', 'nv', 'ny', 'oc', 'om', 'or', 'os', 'pa', 'pag', 'pam', 'pap', 'pcd', 'pdc', 'pfl', 'pi', 'pih', 'pl', 'pms', 'pnb', 'pnt', 'ps', 'pt', 'qu', 'rm', 'rmy', 'rn', 'ro', 'roa-rup', 'roa-tara', 'ru', 'rue', 'rw', 'sa', 'sah', 'sc', 'scn', 'sco', 'sd', 'se', 'sg', 'sh', 'si', 'simple', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'srn', 'ss', 'st', 'stq', 'su', 'sv', 'sw', 'szl', 'ta', 'te', 'tet', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tpi', 'tr', 'ts', 'tt', 'tum', 'tw', 'ty', 'tyv', 'udm', 'ug', 'uk', 'ur', 'uz', 've', 'vec', 'vep', 'vi', 'vls', 'vo', 'wa', 'war', 'wo', 'wuu', 'xal', 'xh', 'xmf', 'yi', 'yo', 'za', 'zea', 'zh', 'zh-classical', 'zh-min-nan', 'zh-yue', 'zu'
];


function processQuery(query) {
    var isEmpty = function (obj) {
        return obj.length == 0;
    }
    var isNotEmpty = function (obj) {
        return obj.length != 0;
    }

    query = query.trim();
    var firstSpaceIndex = query.indexOf(" ");
    if (firstSpaceIndex < 1) {
        console.log("Error: bad query");
        return;
    }
    var serviceName = query.substring(0, firstSpaceIndex).toLowerCase();
    var serviceArgs = query.substring(firstSpaceIndex + 1);

    console.log(serviceName + " > " + serviceArgs);

    var serviceUrl = null;


    if ("duckduckgo".startsWith(serviceName)) {
        serviceUrl = "https://duckduckgo.com/?q=" + encodeURIComponent(serviceArgs);

    } else if ("google".startsWith(serviceName)) {
        serviceUrl = "https://www.google.com/#q=" + serviceArgs;

    } else if ("googleimages".startsWith(serviceName) || serviceName == "gi") {
        serviceUrl = "https://www.google.de/search?q=" + encodeURIComponent(serviceArgs) + " &tbm=isch";

    } else if ("youtube".startsWith(serviceName)) {
        serviceUrl = "https://www.youtube.com/results?search_query=" + encodeURIComponent(serviceArgs);

    } else if ("map".startsWith(serviceName)) {
        serviceUrl = "https://www.google.com/maps?q=" + encodeURIComponent(serviceArgs);

    } else if ("route".startsWith(serviceName)) {
        var index = serviceArgs.indexOf(" to ");
        if (index != -1) {
            var origin = serviceArgs.substring(0, index);
            var destination = serviceArgs.substring(index + " to ".length);
            console.log(origin);
            console.log(destination);
            serviceUrl = "https://www.google.com/maps/dir/" + encodeURIComponent(origin) + "/" +
                encodeURIComponent(destination);
        }

    } else if ("flight".startsWith(serviceName)) {
        console.log("momondo: ");
        // [from] _departure_ [to] _destination_
        //     [on] [_month_ _date_] [_month_ _date_]
        //     [direct]
        var parsedArgs = /(.*) to (.*) on (.*)/g.exec(serviceArgs);
        if (parsedArgs == null || parsedArgs.length == 0) {
            console.log("Error: bad args");
            return;
        }
        var origin = parsedArgs[1];
        var destination = parsedArgs[2];
        var queryTail = parsedArgs[3];
        
        var onlyDirect = false;
        var splitByDirect = queryTail.split("direct");
        if (splitByDirect.length > 1) {
            onlyDirect = true;
        }
        var dates = splitByDirect[0].trim();
        var splitDates = dates.split(" ");

        var fromDate = null;
        var backDate = null;
        var splitDatesLength = splitDates.length;
        if (splitDatesLength > 3) {
            // Two dates, do two-way flight.
            fromDate = parseDate(splitDates);
            backDate = parseDate(splitDates.slice(splitDatesLength / 2));
        } else {
            // One-way flight.
            fromDate = parseDate(splitDates);
        }
        console.log("from: " + fromDate.toSource());
        console.log("back: " + (backDate ? backDate.toSource() : ""));

        var directText = onlyDirect ? "direct " : "";
        console.log("You want to have a " + directText + "flight from " + origin + " to " + destination + " on " + dates);

        var args = {origin: origin, destination: destination, fromOn: fromDate, backOn: backDate, direct: onlyDirect};
        serviceUrl = buildMomondoUrl(args);

    } else if ("hotel".startsWith(serviceName)) {
        console.log("booking: ");

    } else if ("wiki".startsWith(serviceName)) {
        console.log("wikipedia: ");
        // https://ru.wikipedia.org/w/index.php?search=

        // Problem with: w id
        // Some language codes can collide with regular words: ab, it, simple, ...

        var languageCode = "en";
        var articleQuery = serviceArgs;

        // Check whether language was specified.
        var firstWord = serviceArgs.split(" ", 1)[0];
        if (WIKIPEDIA_LANGUAGES.indexOf(firstWord) != -1) {
            // Language has been specified.
            languageCode = firstWord;
            articleQuery = serviceArgs.substring(languageCode.length + 1);
        }

        serviceUrl = "https://" + languageCode +
            ".wikipedia.org/w/index.php?search=" +
            encodeURIComponent(articleQuery);

    } else if ("route".startsWith(serviceName)) {
        console.log("google maps routing: ");

    } else if ("cppdoc".startsWith(serviceName)) {
        console.log("cppdoc search: ");

//        var argsArray = serviceArgs.split(" ").filter(isNotEmpty);
//        serviceUrl = "http://www.cplusplus.com/reference/" + argsArray[0] + "/" + argsArray.join("/");
        if (serviceArgs.startsWith("std::")) {
            serviceArgs = serviceArgs.substring("std::".length);
        }

        serviceUrl = "http://www.cplusplus.com/search.do?q=" + encodeURIComponent(serviceArgs);

    } else {
        console.log("Error: unknown service");
    }
    // wiki https://en.wikipedia.org/wiki/
    // youtube

    console.log(serviceUrl);
    return serviceUrl;
}

function parseDate(dateArray) {
    var MONTHS = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11
    };
    if (dateArray.length != 2) {
        console.log("Bad date");
    }
    return {year: 2016, month: MONTHS[dateArray[0]], day: dateArray[1]};
}


function buildMomondoUrl(args) {
    console.log("URL for momondo with args: " + args.toSource());

    var segmentNumbers = 1;
    var tripType = 1;

    var url = "http://www.momondo.ru/flightsearch/?Search=true&SO0=" +
        args.origin + "&SD0=" + args.destination + "&SDP0=" +
        formatDateToBase(args.fromOn) + "&AD=1&TK=ECO&NA=false";

    if (args.backOn) {
        segmentNumbers = 2;
        tripType = 2;
        url += "&SO1=" + args.destination + "&SD1=" + args.origin + "&SDP1=" +
            formatDateToBase(args.backOn)
    }

    url += "&SegNo=" + segmentNumbers + "&TripType=" + tripType + "&DO=" +  args.direct;

    return url;
}

function formatDateToBase(date) {
    return date.day + "-" + (date.month + 1)+ "-" + date.year;
}


