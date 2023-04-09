from music21 import *
import partitura as pt

# Load MIDI file
midi_path = "furelise.mid"
midi_stream = converter.parse(midi_path)

# Create MusicXML file
xml_path = "example.xml"
midi_stream.write('musicxml', xml_path)

my_xml_file = pt.EXAMPLE_MUSICXML
score = pt.load_score(my_xml_file)

# print(score.parts)
for i in score.parts:
    print(i.pretty())
    pt.render(i)