# PREPROCESSING:

To extract information about frequency, time and amplitude from a given audio files, we have converted them to spectrograms by employing the use of:
  1. Constant Q Transform - For a span of 7 octaves with 36 frequency bins each, the total number of frequency bins taken was 252. We chose a sample rate of 16000 and a 'hop length' of 512 (Powers of 2 are generally used)
  2. Short-Time Fourier Transform - For maximum frequency resolution with STFT, window size should be taken as the entire span of the file. However, this is accompanied by very low time resolution (uncertainty principle for the Fourier Transform). Therefore, to ensure reasonable resolution for both frequency as well as time, our project uses 2048 as window size (and 512 as hop length).
  3. Mel-Frequency Cepstrum - The human ear perceives frequencies logarithmically. Although time-frequency relation and a relevant representation of amplitude are taken care of in using STFT and CQT, MFCCs provide perceptually-relevant frequency representation as well. Even though higher order coefficients in MFCCs represent increasing levels of spectral details, depending on the sampling rate and estimation method, 12 to 20 cepstral coefficients are optimal for typical models. We have used 13 coefficients.

Mel Spectrograms are especially useful when it comes to extracting information regarding different instruments or timbre. Since our models deal only with piano music, all the aforementioned methods work well. 

For the RNN models, input was required in the form of a 3D array. The .wav files with n rows (in array form) such that n = (100 * p) + q, are converted to 3D-arrays of dimensions (p, 100, 252) and concatenated. The .mid files are converted to piano roll form with similar arrays and padded to ensure uniformity in shape of output from model and available piano roll. The difference between these two will provide the error/loss for the model.

# MODEL:

In the first model we implemented a `Recurrent Neural Network` (RNN) using `Long Short Term Memory` (LSTM) architecture to capture temporal dependancies of audio data.<br/>
We used `three` LSTM layers and one `Dense` layer. The input shape of the model is `[batch, time frames, features]` Batch size was set to `100`. `tanh` activation was used in the LSTM Layers and `sigmoid` was used in the outer layer. After each LSTM layer, a dropout of `20%` was used to minimise overfitting. Each LSTM layer gave `256` dimensional output for each time frame and the outer layer gave `88` dimensional output which corresponds to the 88 keys on a piano. We used a learning rate of `0.01` and trained the model over `50` epochs. Loss was calculated using `binary_crossentropy` and `adam` optimizer was used. Since sigmoid function gives a real value between 0 and 1, we used a threshold of `0.5` to predict whether the note is played or not. Therefore, the final output is a boolean matrix with zeros and ones.
<br/>
<br/>
The results of training are in the following table : 
|        Preprocessing        |No. of features|Accuracy|Precision|  Recall  |F-Score|  Loss  |
|  ---                        |     ---       |  ---   | ---     |   ---    |   --- |  ---   | 
| CQT-Transform               |      252      |   .41  |   .73   |    .48   |  .58  |  .0944 |



# POST PROCESSING:<br/>
1. Converted 2D Boolean matrix outputed by the RNN Model into a 2D binary piano roll.<br/>
2. Used the MIDIUtil library to create a MIDI file from the piano roll.<br/>
3. Generated a dataframe from the MIDI file using pretty_MIDI library.<br/>
4. Created a piano roll representation from the dataframe using Matplotlib.<br/>