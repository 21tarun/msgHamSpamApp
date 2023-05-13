import pandas as pd
import pickle
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from nltk.tokenize import word_tokenize
import sys

nltk.download('stopwords')
nltk.download('punkt')
stemmer = PorterStemmer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    text = re.sub('[^a-zA-Z]', ' ', text)
    text = text.lower()
    words = word_tokenize(text)
    words = [word for word in words if word not in stop_words]
    words = [stemmer.stem(word) for word in words]
    return ' '.join(words)

with open('../model2.pkl', 'rb') as file:
    # Load the pickled object using the pickle.load() function
    model2 = pickle.load(file)
    
preProcessedData = pd.read_csv('../preProcessedData.csv')
preProcessedData = preProcessedData.fillna('')

from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features = 3000)
X = cv.fit_transform(preProcessedData['v2']).toarray()


text = sys.argv[1]
new_messages = [text]
new_messages = [preprocess_text(msg) for msg in new_messages]

new_messages = cv.transform(new_messages)
predictions = model2.predict(new_messages)
print(predictions[0])
    