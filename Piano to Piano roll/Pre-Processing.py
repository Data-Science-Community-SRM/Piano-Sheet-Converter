
import re, os
import os.path as osp
import glob
import numpy as np
import librosa as lb
import pretty_midi
import sys
from multiprocessing import Pool
from functools import partial

eps = sys.float_info.epsilon
pretty_midi.pretty_midi.MAX_TICK = 1e10
## Parameter setting ##
RangeMIDInotes = [21, 108]
sr = 16000
bins_per_octave = 36
n_octave = 7
maps_path = 'MAPS'
test_list = ['ENSTDkAm2', 'ENSTDkCl']  # real piano
val_rate = 1.0 / 7
n_workers = 10
path = "/mnt/d/MAPS/train/MUS/"
path1 = "/mnt/d/MAPS/train1/"
files = os.listdir(path)

n_bins = n_octave * bins_per_octave
j = np.zeros((3, 100, 88), dtype=bool)
totallabel3 = j


def midi2mat(midi_path_train, length, CQT_len, sr, RangeMIDInotes=RangeMIDInotes):
    midi_data = pretty_midi.PrettyMIDI(midi_path_train)
    pianoRoll = midi_data.instruments[0].get_piano_roll(fs=CQT_len * sr / length)
    Ground_truth_mat = (pianoRoll[RangeMIDInotes[0]:RangeMIDInotes[1] + 1, :CQT_len] > 0)
    return Ground_truth_mat


totalCQT4 = None

for filename in glob.glob(osp.join(path, '*.wav')):
    x, t = lb.load(osp.join(path, filename), sr=sr)
    CQT_spectrum = lb.core.cqt(x, sr=sr, fmin=(lb.note_to_hz('A0')), n_bins=n_bins, bins_per_octave=bins_per_octave, scale=False)
    CQT = np.transpose(np.abs(CQT_spectrum))
    a = os.path.splitext(filename)[0]
    b = a
    a = a + '.mid'
    midi_path_train = osp.join(path, a)
    Ground_truth_mat = midi2mat(midi_path_train, len(x), CQT.shape[0], sr, RangeMIDInotes=RangeMIDInotes)
    midi_train = np.transpose(Ground_truth_mat)
    if midi_train.shape[0] < CQT.shape[0]:
        # midi length < CQT length, cut CQT
        CQT = CQT[:midi_train.shape[0], :]
    max_shape = (midi_train.shape[0] // 100) * 100
    midi_train = np.reshape(midi_train[0:max_shape, :], (midi_train.shape[0] // 100, 100, 88))
    totallabel3 = np.concatenate((totallabel3, midi_train, j))
    if totalCQT4 is None:
        totalCQT4 = CQT
    else:
        totalCQT4 = np.concatenate((totalCQT4, CQT))

np.save("/mnt/d/MAPS/test1/totalCQT4", totalCQT4)
np.save("/mnt/d/MAPS/train1/totallabel3", totallabel3)
