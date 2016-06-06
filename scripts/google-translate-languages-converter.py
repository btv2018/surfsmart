#!/usr/bin/env python

from lxml import etree
import json

SOURCE_LANG_XPATH = "//select[@id='gt-sl']/option[not(@disabled)]"
TARGET_LANG_XPATH = "//select[@id='gt-tl']/option[not(@disabled)]"

def get_langs(lang_objects):
    return [(obj.attrib['value'], obj.text) for obj in lang_objects]

def convert(in_file_name, out_file_name):
    print "Extracting languages from", in_file_name, "..."
    xml_object = etree.parse(in_file_name, parser=etree.HTMLParser())

    source_lang_objects = xml_object.xpath(SOURCE_LANG_XPATH)
    source_langs = dict(get_langs(source_lang_objects))
    print len(source_langs), "source languages found."

    target_lang_objects = xml_object.xpath(TARGET_LANG_XPATH)
    target_langs = dict(get_langs(target_lang_objects))
    print len(target_langs), "target languages found."

    with open(out_file_name, 'w') as out_file:
        json_dump = json.dumps({'source_langs': source_langs, 'target_langs': target_langs})
        out_file.write("GOOGLE_TRANSLATE_LANGS=")
        out_file.write(json_dump)
        print "Output file written to", out_file_name



if __name__ == '__main__':
    convert('external/data/translate.google.com.htm', 'generated/google-translate-languages.js')

