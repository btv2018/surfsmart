
function go(url) {
    return {go: url};
}

function error(message) {
    return {error: message};
}

// List of all languages from https://meta.wikimedia.org/wiki/Table_of_Wikimedia_projects
// grep "<\!\-\-" -v | sed 's/.*2=\([a-z\-]*\)|.*/\1/'
WIKIPEDIA_LANGUAGES = [
'aa', 'ab', 'ace', 'ady', 'af', 'ak', 'als', 'am', 'an', 'ang', 'anp', 'ar', 'arc', 'arz', 'as', 'ast', 'av', 'ay', 'az', 'azb', 'ba', 'bar', 'bat-smg', 'bcl', 'be', 'be-x-old', 'bg', 'bh', 'bi', 'bjn', 'bm', 'bn', 'bo', 'bpy', 'br', 'bs', 'bug', 'bxr', 'ca', 'cbk-zam', 'cdo', 'ce', 'ceb', 'ch', 'cho', 'chr', 'chy', 'ckb', 'co', 'cr', 'crh', 'cs', 'csb', 'cu', 'cv', 'cy', 'da', 'de', 'diq', 'dsb', 'dv', 'dz', 'ee', 'el', 'eml', 'en', 'eo', 'es', 'et', 'eu', 'ext', 'fa', 'ff', 'fi', 'fiu-vro', 'fj', 'fo', 'fr', 'frp', 'frr', 'fur', 'fy', 'ga', 'gag', 'gan', 'gd', 'gl', 'glk', 'gn', 'gom', 'got', 'gu', 'gv', 'ha', 'hak', 'haw', 'he', 'hi', 'hif', 'ho', 'hr', 'hsb', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'ilo', 'io', 'is', 'it', 'iu', 'ja', 'jbo', 'jv', 'ka', 'kaa', 'kab', 'kbd', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'koi', 'kr', 'krc', 'ks', 'ksh', 'ku', 'kv', 'kw', 'ky', 'la', 'lad', 'lb', 'lbe', 'lez', 'lg', 'li', 'lij', 'lmo', 'ln', 'lo', 'lrc', 'lt', 'ltg', 'lv', 'mai', 'map-bms', 'mdf', 'mg', 'mh', 'mhr', 'mi', 'min', 'mk', 'ml', 'mn', 'mo', 'mr', 'mrj', 'ms', 'mt', 'mus', 'mwl', 'my', 'myv', 'mzn', 'na', 'nah', 'nap', 'nds', 'nds-nl', 'ne', 'new', 'ng', 'nl', 'nn', 'no', 'nov', 'nrm', 'nso', 'nv', 'ny', 'oc', 'om', 'or', 'os', 'pa', 'pag', 'pam', 'pap', 'pcd', 'pdc', 'pfl', 'pi', 'pih', 'pl', 'pms', 'pnb', 'pnt', 'ps', 'pt', 'qu', 'rm', 'rmy', 'rn', 'ro', 'roa-rup', 'roa-tara', 'ru', 'rue', 'rw', 'sa', 'sah', 'sc', 'scn', 'sco', 'sd', 'se', 'sg', 'sh', 'si', 'simple', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'srn', 'ss', 'st', 'stq', 'su', 'sv', 'sw', 'szl', 'ta', 'te', 'tet', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tpi', 'tr', 'ts', 'tt', 'tum', 'tw', 'ty', 'tyv', 'udm', 'ug', 'uk', 'ur', 'uz', 've', 'vec', 'vep', 'vi', 'vls', 'vo', 'wa', 'war', 'wo', 'wuu', 'xal', 'xh', 'xmf', 'yi', 'yo', 'za', 'zea', 'zh', 'zh-classical', 'zh-min-nan', 'zh-yue', 'zu'
];

var collinsLangShortArgument = {
  defaultValue: 'en',
  values: ['en', 'de'],
};
var collinsDictionaryService = {
    name: "collinsdictionary",
    aliases: ["cd"],
    description: "Collins dictionary",
    helpMessage: "[/language=en] <span class='help-message-input'>search query</span>",
    shortArgs: [collinsLangShortArgument],
    serve: function(serviceArgs, shortArgs) {
        if (shortArgs[0] == 'de')
            return go("https://www.collinsdictionary.com/dictionary/german-english/" + encodeURIComponent(serviceArgs));
        else
            return go("https://www.collinsdictionary.com/dictionary/english/" + encodeURIComponent(serviceArgs));
    },
//    getSuggestions: function(serviceArgs, response) {
//        $.ajax({
//            url: "https://www.collinsdictionary.com/autocomplete/?dictCode=english",
//            dataType: "json",
//            crossdomain: true,
//            data: {
//                q: serviceArgs
//            },
//            success: function(data) {
//                console.log("Collins suggestions: " + data);
//                console.log(data);
//                response(suggestions);
//            },
//        });
//    },
    goFromSuggestion: true,
}

var verbformenService = {
    name: "verbformen",
    aliases: ["vf"],
    description: "Verb Formen",
    helpMessage: "<span class='help-message-input'>search query</span>",
    serve: function(serviceArgs) {
        return go("https://www.verbformen.de/?w=" + encodeURIComponent(serviceArgs));
    },
    goFromSuggestion: true,
}

var duckduckgoService = {
    name: "duckduckgo",
    aliases: ["d"],
    description: "DuckDuckGo Web search",
    helpMessage: "<span class='help-message-input'>search query</span>",
    favicon: {url: "https://duckduckgo.com/favicon.ico", base64: "url to favicon"},
    serve: function(serviceArgs) {
        return go("https://duckduckgo.com/?q=" + encodeURIComponent(serviceArgs));
    },
    getSuggestions: function(serviceArgs, response) {
//        return response(["tesla model s", "tesla SUV"]);
        $.ajax({
            url: "https://ac.duckduckgo.com/ac",
            dataType: "jsonp",
            data: {
                q: serviceArgs
            },
            success: function(data) {
                console.log("DuckDuckGo suggestions: " + data);
                console.log(data);
                var suggestions = [];
                for (var index in data) {
                    suggestions.push(data[index]["phrase"]);
                }
                console.log("DuckDuckGo suggestions: " + suggestions);
                response(suggestions);
            }
        });
    },
    goFromSuggestion: true,
};

var googleService = {
    name: "google",
    aliases: ["g"],
    description: "Google Web search",
    helpMessage: "<span class='help-message-input'>search query</span>",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs) {
        return go("https://www.google.com/search?q=" + encodeURIComponent(serviceArgs));
    },
    getSuggestions: function(serviceArgs, response) {
//        return response(["elon musk", "elon musk spacex"]);
        $.ajax({
            url: "https://www.google.com/complete/search?client=firefox",
            dataType: "jsonp",
            data: {
                q: serviceArgs
            },
            success: function(data) {
                console.log("Google suggestions: " + data[1]);
                response(data[1]);
            }
        });
    },
    goFromSuggestion: true,
};

var googleImagesService = {
    name: "googleimages",
    aliases: ["gi"],
    description: "Google Images search",
    helpMessage: "<span class='help-message-input'>search query</span>",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs) {
        return go("https://www.google.de/search?q=" + encodeURIComponent(serviceArgs) + " &tbm=isch");
    },
    getSuggestions: function(serviceArgs, response) {
        return response(["flowers", "flower field"]);
    },
    goFromSuggestion: true,
};

var youtubeService = {
    name: "youtube",
    aliases: ["y"],
    description: "YouTube search",
    helpMessage: "<span class='help-message-input'>search query</span>",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs) {
        return go("https://www.youtube.com/results?search_query=" + encodeURIComponent(serviceArgs));
    },
    getSuggestions: function(serviceArgs, response) {
//        return response(["manowar", "manowar the sons of odin"]);
        $.ajax({
            url: "https://clients1.google.com/complete/search?client=youtube&hl=en&ds=yt",
            dataType: "jsonp",
            data: {
                q: serviceArgs
            },
            success: function(data) {
                console.log("YouTube suggestions: " + data);
                console.log(data);
                data = data[1];
                var suggestions = [];
                for (var index in data) {
                    suggestions.push(data[index][0]);
                }
                console.log("YouTube suggestions: " + suggestions);
                response(suggestions);
            }
        });
    },
    goFromSuggestion: true,
};

var mapSearchService = {
    name: "map",
    aliases: ["m"],
    description: "Google Maps search",
    helpMessage: "<span class='help-message-input'>search query</span>",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs) {
        return go("https://www.google.com/maps?q=" + encodeURIComponent(serviceArgs));
    },
    goFromSuggestion: true,
};

var routingService = {
    name: "route",
    aliases: ["r"],
    description: "Google Maps routing",
    helpMessage: "<span class='help-message-input'>origin</span> to <span class='help-message-input'>destination</span>",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs) {
        var index = serviceArgs.indexOf(" to ");
        if (index != -1) {
            var origin = serviceArgs.substring(0, index);
            var destination = serviceArgs.substring(index + " to ".length);
            console.log(origin);
            console.log(destination);
            return go("https://www.google.com/maps/dir/" + encodeURIComponent(origin) + "/" +
                encodeURIComponent(destination));
        }
        return error("no to");
    }
};

var flightSearchService = {
    name: "flight",
    aliases: ["f"],
    description: "Flight search on Momondo.ru",
    helpMessage: "<span class='help-message-input'>origin</span> to <span class='help-message-input'>destination</span> on <span class='help-message-input'>departure date</span> [, <span class='help-message-input'>back date</span>] [direct]",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs) {
        // [from] _departure_ [to] _destination_
        //     [on] [_month_ _date_] [_month_ _date_]
        //     [direct]
        var parsedArgs = /(.*) to (.*) on (.*)/g.exec(serviceArgs);
        if (parsedArgs == null || parsedArgs.length == 0) {
            return error("bad args");
        }
        var origin = parsedArgs[1];
        var destination = parsedArgs[2];
        var queryTail = parsedArgs[3];

        var onlyDirect = false;
        var splitByDirect = queryTail.split("direct");
        if (splitByDirect.length > 1) {
            onlyDirect = true;
        }

        // Parse dates.
        var fromDate = null;
        var backDate = null;

        var dates = splitByDirect[0].trim();
        var splitByComma = dates.split(",");
        if (splitByComma.length == 1) {
            // One-way flight.
            fromDate = parseDate(splitByComma[0].trim());
        } else {
            // Two dates, do two-way flight.
            fromDate = parseDate(splitByComma[0].trim());
            backDate = parseDate(splitByComma[1].trim());
        }
        console.log("from: " + fromDate.toString());
        console.log("back: " + (backDate ? backDate.toString() : ""));

        var directText = onlyDirect ? "direct " : "";
        console.log("You want to have a " + directText + "flight from " + origin + " to " + destination + " on " + dates);

        var args = {origin: origin, destination: destination, fromOn: fromDate, backOn: backDate, direct: onlyDirect};
        return go(buildMomondoUrl(args));
    },
    getSuggestions: function(serviceArgs, response) {
        var AIRPORT_CODES = AIRPORTS;

        var buildSuggestionString = function(airport) {
            return airport.code + " — " + airport.name + ", " + airport.city + ", " + airport.country;
        }

        var findAirportSuggestions = function(userInput) {
            if (!userInput) {
                // TODO: Return default list.
                return [buildSuggestionString(AIRPORTS[0]), buildSuggestionString(AIRPORTS[1])];
            }

            userInput = userInput.toLowerCase();
            // TODO: Remove diacritic from user input.
            // TODO: Sort suggestions by importance.
            // TODO: Return no more than 10 results (for efficiency).
            var suggestions = [];
            for (var index in AIRPORT_CODES) {
                var airport = AIRPORT_CODES[index];
                if (airport.code.toLowerCase().startsWith(userInput)) {
                    suggestions.push(buildSuggestionString(airport));
                } else if (airport.city.toLowerCase().startsWith(userInput)) {
                    suggestions.push(buildSuggestionString(airport));
                } else if (airport.name.toLowerCase().startsWith(userInput)) {
                    suggestions.push(buildSuggestionString(airport));
                }
            }
            return suggestions;
        }

        var regexpToOn = /(.*) to (.*) on (.*)/g;
        var regexpTo = /(.*) to (.*)/g;

        parsedArgsForToOn = regexpToOn.exec(serviceArgs);
        parsedArgsForTo   = regexpTo.exec(serviceArgs);

        var suggestions = [];
        if (parsedArgsForToOn) {
            // Complete request: xxx to xxx on xxx
            console.log("Complete request");
        } else if (parsedArgsForTo) {
            // Two code request: xxx to xxx
            console.log("The second code");
            var userInput = parsedArgsForTo[2];
            var codeSuggestions = findAirportSuggestions(userInput);
            for (var i in codeSuggestions) {
                var code = codeSuggestions[i];
                suggestions.push({label: code, value: parsedArgsForTo[1] + " to " + code.substring(0, 3)});
            }
        } else {
            // The first code: xxx
            console.log("The first code");
            var userInput = serviceArgs;
            var codeSuggestions = findAirportSuggestions(userInput);
            for (var i in codeSuggestions) {
                var code = codeSuggestions[i];
                suggestions.push({label: code, value: code.substring(0, 3)});
            }
        }
        // TODO: Return default airports.
        return response(suggestions);
    }
};


var wikipediaLangShortArgument = {
  defaultValue: 'en',
  values: WIKIPEDIA_LANGUAGES,
};
var wikipediaService = {
    name: "wikipedia",
    aliases: ["w"],
    shortArgs: [wikipediaLangShortArgument],
    description: "Wikipedia search",
    helpMessage: "[/language=en] <span class='help-message-input'>search query</span>",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs, shortArgs) {
        return go("https://" + shortArgs[0] + ".wikipedia.org/w/index.php?search=" +
            encodeURIComponent(serviceArgs));
    },
    goFromSuggestion: true,
};

var fromLangShortArgument = {
  name: "from_language",
  defaultValue: 'auto',
  values: GOOGLE_TRANSLATE_LANGS.source_langs,
};
var toLangShortArgument = {
  name: "to_language",
  defaultValue: 'ru',
  values: GOOGLE_TRANSLATE_LANGS.target_langs,
};

var translateService = {
    name: "translate",
    aliases: ["t"],
    shortArgs: [fromLangShortArgument, toLangShortArgument],
    description: "Translate on Google Translator",
    helpMessage: "[/from_language=auto[/to_language=ru]] <span class='help-message-input'>query</span>",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs, shortArgs) {
        return go("https://translate.google.com/#view=home&op=translate&sl=" + shortArgs[0] +
                  "&tl=" + shortArgs[1] + "&text=" + encodeURIComponent(serviceArgs));
    },
    goFromSuggestion: true,
};

var cppdocService = {
    name: "cppdoc",
    aliases: ["c"],
    description: "STL documentation search on cplusplus.com",
    helpMessage: "<span class='help-message-input'>search query</span>",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs) {
        var stdPrefix = "std::";
        if (serviceArgs.startsWith(stdPrefix)) {
            serviceArgs = serviceArgs.substring(stdPrefix.length);
        }
        return go("http://www.cplusplus.com/search.do?q=" + encodeURIComponent(serviceArgs));
    },
    goFromSuggestion: true,
};

var pyVersionShortArg = {
  defaultValue: '2',
  values: ['2', '3'],
};
var pydocService = {
    name: "pydoc",
    aliases: ["py"],
    shortArgs: [pyVersionShortArg],
    description: "Python documentation search on docs.python.org",
    helpMessage: "[/version=2] <span class='help-message-input'>search query</span>",
    favicon: {url: "url", base64: "url to favicon"},
    serve: function(serviceArgs, shortArgs) {
        return go("https://docs.python.org/" + shortArgs[0] + "/search.html?q=" +
            encodeURIComponent(serviceArgs));
    },
    goFromSuggestion: true,
};


var SERV_C = [
    {description: "Web Search", services: [duckduckgoService, googleService, googleImagesService, youtubeService]},
    {description: "Maps and Travel", services: [mapSearchService, routingService, flightSearchService]},
    {description: "Wiki", services: [wikipediaService]},
    {description: "Documentation Search", services: [cppdocService, pydocService]},
    {description: "Translators and Dictionaries",
     services: [translateService, collinsDictionaryService, verbformenService]},
];

// TODO: Generate this list from SERV_C.
var SERVICES = [
    duckduckgoService,
    googleService, googleImagesService, youtubeService,
    mapSearchService, routingService,
    flightSearchService,
    wikipediaService,
    translateService,
    cppdocService,
    pydocService,
    collinsDictionaryService,
    verbformenService,
];


// ============================================================================

var L = {
    startsWith: function(prefix) {
        return function(string) {
            return string.startsWith(prefix);
        };
    },
};

function findService(name) {
    if (name) {
        for (var i in SERVICES) {
            var service = SERVICES[i];
            if (service.name.startsWith(name) || service.aliases.indexOf(name) >= 0) {
                return service;
            }
        }
    }
}

function parseQuery(query) {
    query = query.trimLeft();
    var firstSpaceIndex = query.indexOf(" ");

    var serviceName = query;
    var shortArgs = undefined;
    var serviceArgs = undefined;
    if (firstSpaceIndex > 0) {
        serviceName = query.substring(0, firstSpaceIndex);
        serviceArgs = query.substring(firstSpaceIndex + 1).trimLeft();
    }

    var firstSlashIndex = serviceName.indexOf("/");
    if (firstSlashIndex > 0) {
        // There are some short arguments.
        shortArgs = serviceName.split("/");
        serviceName = shortArgs[0];
        if (shortArgs.length > 1) {
            shortArgs = shortArgs.slice(1);
        }
    }
    return {serviceName: serviceName, shortArgs: shortArgs, serviceArgs: serviceArgs};
}

function autocomplete(query, response) {
    var parsedQuery = parseQuery(query);
    var serviceName = parsedQuery.serviceName;
    var shortArgs = parsedQuery.shortArgs;
    var serviceArgs = parsedQuery.serviceArgs;

    if (serviceArgs === undefined && shortArgs === undefined) {
        // Show service name suggestions.
        var serviceNameSuggestions = [];
        for (var i in SERVICES) {
            var service = SERVICES[i];
            if (service.name.startsWith(serviceName) || service.aliases.indexOf(serviceName) >= 0) {
                serviceNameSuggestions.push(service.name);
            }
        }
        response(serviceNameSuggestions);
        return;

    } else if (serviceArgs === undefined && shortArgs && shortArgs.length != 0) {
        // Show suggestions for short argument.
        var service = findService(serviceName);
        if (service) {
            console.log("Service " + service.name + " found");
            console.log("Provided short arguments: " + shortArgs);
            var shortArgsNumber = shortArgs.length;
            var providedShortArg = shortArgs[shortArgsNumber - 1];
            console.log("Searching seggestions for short arg number " + (shortArgsNumber - 1));

            // var shortArg = service.shortArguments[shortArgs.length - 1];

            var valuePrefix = serviceName + '/' + shortArgs.slice(0, shortArgsNumber - 1).join('/');
            if (shortArgsNumber > 1) {
                valuePrefix += '/';
            }
            var valueSufix = shortArgs.slice(shortArgsNumber, service.shortArgs.length).join('/');

            if (shortArgsNumber > service.shortArgs.length) {
                // No possible suggestions. Empty array is returned to close previous list.
                response([]);
                return;
            }

            var suggestions = [];
            var shortArgSuggestions = service.shortArgs[shortArgsNumber - 1].values;

            if (Array.isArray(shortArgSuggestions)) {
                // Array of strings expected.
                for (var index in shortArgSuggestions) {
                    var shortArg = shortArgSuggestions[index];
                    if (shortArg.startsWith(providedShortArg)) {
                        var value = valuePrefix + shortArg + valueSufix;
                        if (serviceArgs) {
                            value += ' ' + serviceArgs;
                        }
                        suggestions.push({label: shortArg, value: value});
                    }
                }
            } else {
                // Object of suggestions expected.
                for (var value in shortArgSuggestions) {
                    var label = shortArgSuggestions[value];
                    if (value.toLowerCase().startsWith(providedShortArg) || label.toLowerCase().startsWith(providedShortArg)) {
                        var label = value + " — " + label;
                        value = valuePrefix + value + valueSufix;
                        if (serviceArgs) {
                            value += ' ' + serviceArgs;
                        }
                        suggestions.push({label: label, value: value});
                    }
                }
            }

            response(suggestions);
            return;
        }

    } else if (serviceArgs !== undefined) {
        var service = findService(serviceName);
        if (service) {
            console.log("Service " + service.name + " found");
            if (service.getSuggestions) {
                console.log("Requesting suggestions for '" + serviceArgs + "'");

                var responseWrapper = function(response) {
                    return function(suggestions) {
                        if (suggestions.length > 0 && suggestions[0].hasOwnProperty("label")) {
                            // Suggestions are objects with labels and values.
                            for (var index in suggestions) {
                                suggestions[index].value = serviceName + " " + suggestions[index].value;
                            }
                        } else {
                            // Suggestions are raw objects.
                            for (var index in suggestions) {
                                var label = suggestions[index];
                                var value = serviceName + " " + label;
                                suggestions[index] = {label: label, value: value};
                            }
                        }
                        response(suggestions);
                        return;
                    };
                };
                service.getSuggestions(serviceArgs, responseWrapper(response));
                return;
            }
        }
    }

    // No possible suggestions. Empty array is returned to close previous list.
    response([]);
}

// TODO: How to make enum?
var inputSource = {
    suggestion: {suggestion: true},
    enter: {enter: true},
};

function processInput(query, inputSource) {
    var go = false;
    if (inputSource.enter) {
        go = true;
    } else {
        var parsedQuery = parseQuery(query);
        var serviceName = parsedQuery.serviceName;
        var service = findService(serviceName);
        console.log(service);
        if (service) {
            if (service.goFromSuggestion) {
                go = true;
            }
        }
    }
    if (go) {
        var result = processQuery(query);
        if (result.go) {
            queryInput.select();
            window.open(result.go);
        } else {
            console.log("Error: " + result.error);
        }
    }
    return true;
}

$(document).ready(function() {
    main();
    $("#versionSpan").text("version: " + VERSION);
    var queryInput = $("#queryInput");

    queryInput.autocomplete({
        source: function(request, response) {
            autocomplete(request.term, response);
        },
        minLength: 0,
        select: function(event, ui) {
            return processInput(ui.item.value, inputSource.suggestion);
        },
        open: function() {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function() {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
   });

});

function main() {
    var helpTable = $("#help-table");
    for (var i in SERV_C) {
        var serviceCategory = SERV_C[i];
        var tr = $.parseHTML(
            "<tr class='service-category'>" +
                "<th colspan='3'>" + serviceCategory.description+ "</th>" +
            "</tr>");
        helpTable.append(tr);

        var services = serviceCategory.services;
        for (var i in services) {
            var service = services[i];
            var tr = $.parseHTML(
                "<tr>" +
    //                "<td><img src='" + service.favicon.url + "'/></td>" +
                    "<td class='service-name'>" + service.name + "</td>" +
                    "<td>" + service.aliases.join(", ") + "</td>" +
                    "<td>" + service.description + "</td>" +
                "</tr>");
            helpTable.append(tr);
        }
    }
    $("#help-table-fallback").hide();

    var queryInput = document.getElementById("queryInput");

    queryInput.onchange = dynamicHelp;
    queryInput.onkeyup = dynamicHelp;
//    setInterval(dynamicHelp, 500);

    queryInput.addEventListener("keypress", function(event) {
        var query = queryInput.value;
        if (event.keyCode == 13) {
            processInput(query, inputSource.enter);
        }
    });
}

function dynamicHelp() {
    var serviceHelp = document.getElementById("service-help");
    var query = queryInput.value;

    var parsedQuery = parseQuery(query);

    var service = findService(parsedQuery.serviceName);
    if (service && parsedQuery.serviceArgs != undefined) {
        serviceHelp.innerHTML = service.helpMessage;
    } else {
        serviceHelp.innerHTML = "";
    }
}



function processQuery(query) {
    var parsedQuery = parseQuery(query);
    var serviceName = parsedQuery.serviceName;
    var shortArgs = parsedQuery.shortArgs;
    var serviceArgs = parsedQuery.serviceArgs;

    if (!serviceArgs) {
        return error("No service arguments");
    }

    var service = findService(serviceName);
    if (service) {
        // Set default values for short arguments, if they are not provided.
        shortArgs = shortArgs || [];
        for (var index in service.shortArgs) {
            if (index >= shortArgs.length) {
                shortArgs.push(service.shortArgs[index].defaultValue);
            } else if (!shortArgs[index]) {
                shortArgs[index] = service.shortArgs[index].defaultValue;
            }
        }

        console.log(serviceName + " / " + shortArgs + " > " + serviceArgs);
        return service.serve(serviceArgs, shortArgs);
    }
    return error("No such service");
}

function parseDate(dateString) {
    return Date.parse(dateString);
}


function buildMomondoUrl(args) {
    console.log("URL for momondo with args: " + JSON.stringify(args));

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
    return date.toString("dd-MM-yyyy");
}
