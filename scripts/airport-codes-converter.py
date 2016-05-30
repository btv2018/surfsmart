#!/usr/bin/env python

import csv
import json

def convert(in_file_name, out_file_name):
    with open(in_file_name) as in_file:
        csv_reader = csv.reader(in_file)
        airports = []
        for item in csv_reader:
            code = item[4]
            if code:
                airport = {
                    'name': item[1],
                    'city': item[2],
                    'country': item[3],
                    'code': code,
                }
                airports.append(airport)
        print len(airports), "airports found."
        with open(out_file_name, 'w') as out_file:
            json_dump = json.dumps(airports, separators=(',', ':'))
            out_file.write("AIRPORTS=")
            out_file.write(json_dump)

if __name__ == '__main__':
    convert('external/data/airports.dat', 'airports.js')

