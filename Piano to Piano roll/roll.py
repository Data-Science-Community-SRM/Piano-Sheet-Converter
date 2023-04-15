from unroll import midi2keystrikes
keystrikes = midi2keystrikes('MIDI-Unprocessed_SMF_02_R1_2004_01-05_ORIG_MID--AUDIO_02_R1_2004_05_Track05_wav.midi')
keystrikes.transcribe('score.ly', quarter_durations = [50,100,0.02])