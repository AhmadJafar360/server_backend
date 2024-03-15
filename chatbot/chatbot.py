from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import re
import nltk
import numpy as np
import tensorflow as tf
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense
from sklearn.preprocessing import LabelEncoder

nltk.download('punkt')

app = Flask(__name__)
CORS(app, methods=['POST'], headers=['Content-Type', 'Accept'])

with open('backend\data\data.json') as json_file:
    data = json.load(json_file)

# Text Processing (Pemrosesan teks)
def preprocess_text(text):
    # Case folding
    text = text.lower()
    # Tokenizing
    tokens = nltk.word_tokenize(text)
    # Stemming
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(word) for word in tokens]
    return ' '.join(tokens)

corpus = []
tags = []

for intent in data["intens"]:
    for pattern in intent["patterns"]:
        # Preprocess text
        preprocessed_text = preprocess_text(pattern)
        corpus.append(preprocessed_text)
        tags.append(intent["tags"])

# Bag of Words
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(corpus).toarray()

# pengkodean label
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(tags)

# Create and train the model
# Check if the model file already exists
model_file = 'backend\chatbot\chatbot_model.h5'
if os.path.exists(model_file):
    # Load the pre-trained model
    model = load_model(model_file)
else:
    model = Sequential()
    model.add(Dense(8, input_shape=(X.shape[1],), activation='relu'))
    model.add(Dense(len(set(y)), activation='softmax'))

# Kompilasi model
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Melatih model
    model.fit(X, y, epochs=100, batch_size=1, verbose=2)

# menyimpan model
    model.save(model_file)

def get_response(user_input):
    # Preprocess input
    preprocessed_input = preprocess_text(user_input)
    # Transform input menggunakan vectorizer
    input_vector = vectorizer.transform([preprocessed_input]).toarray()
    # Predict probabilities using the model
    predicted_probs = model.predict(input_vector)
    # Find the index of the class with the highest probability
    predicted_class = np.argmax(predicted_probs)
    # Decode class menjadi tag
    predicted_tag = label_encoder.inverse_transform([predicted_class])[0]

    # Temukan respons sesuai tag
    for intent in data["intens"]:
        if intent["tags"] == predicted_tag:
            return intent["responses"]

@app.route('/', methods=['OPTIONS'])
def handle_options():
    return jsonify({'status': 'success'}), 200

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data['message']

    bot_response = get_response(user_input)

    return jsonify({'botResponse': bot_response})

if __name__ == '__main__':
    app.run(debug=True)




#==================================================_CHATBOT-TOKENIZER_===================================================#
# menggunakan model
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# import json
# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.models import Sequential, load_model
# from tensorflow.keras.layers import Dense, Embedding, Flatten
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from sklearn.preprocessing import LabelEncoder

# app = Flask(__name__)
# CORS(app, methods=['POST'], headers=['Content-Type', 'Accept'])

# json_path = 'backend\data\data.json'

# with open(json_path, 'r') as file:
#     data = json.load(file)

# patterns = []
# tags = []

# for intent in data["intens"]:
#     for pattern in intent["patterns"]:
#         patterns.append(pattern)
#         tags.append(intent["tags"])

# tokenizer = Tokenizer()
# tokenizer.fit_on_texts(patterns)
# vocab_size = len(tokenizer.word_index) + 1

# X = tokenizer.texts_to_sequences(patterns)
# X_padded = pad_sequences(X)
# label_encoder = LabelEncoder()
# y_encoded = label_encoder.fit_transform(tags)

# # Check if the model file already exists
# model_file = 'backend\chatbot_model.h5'
# if os.path.exists(model_file):
#     # Load the pre-trained model
#     model = load_model(model_file)
# else:
#     # Create and train the model
#     model = Sequential()
#     model.add(Embedding(input_dim=vocab_size, output_dim=50, input_length=X_padded.shape[1]))
#     model.add(Flatten())
#     model.add(Dense(16, activation='relu'))
#     model.add(Dense(len(set(y_encoded)), activation='softmax'))
#     model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
#     model.fit(X_padded, y_encoded, epochs=25, batch_size=1, verbose=2)

#     # Save the trained model
#     model.save(model_file)

# def get_response(user_input):
#     user_input_sequence = tokenizer.texts_to_sequences([user_input])
#     user_input_padded = pad_sequences(user_input_sequence, maxlen=X_padded.shape[1])
#     predicted_probabilities = model.predict(user_input_padded)
#     predicted_class = np.argmax(predicted_probabilities, axis=-1)
#     predicted_tag = label_encoder.inverse_transform(predicted_class)

#     for intent in data["intens"]:
#         if intent["tags"] == predicted_tag:
#             return intent["responses"]

# @app.route('/', methods=['OPTIONS'])
# def handle_options():
#     return jsonify({'status': 'success'}), 200

# @app.route('/chat', methods=['POST'])
# def chat():
#     data = request.json
#     user_input = data['message']

#     bot_response = get_response(user_input)

#     return jsonify({'botResponse': bot_response})

# if __name__ == '__main__':
#     app.run(debug=True)
