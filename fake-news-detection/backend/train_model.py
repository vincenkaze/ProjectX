import sys
import os
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from collections import Counter

# Ensure Python recognizes backend module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.utils import clean_text  # Import text cleaning function

# Load datasets
df_fake = pd.read_csv("dataset/fake.csv")
df_real = pd.read_csv("dataset/true.csv")

# Balance dataset
min_size = min(len(df_fake), len(df_real))
df_fake = df_fake.sample(n=min_size, random_state=42)
df_real = df_real.sample(n=min_size, random_state=42)

# Add labels (Fake = 1, Real = 0)
df_fake['label'] = 1
df_real['label'] = 0

# Combine & shuffle
df = pd.concat([df_fake, df_real], ignore_index=True).drop_duplicates()
df = df.dropna(subset=['text']).sample(frac=1, random_state=42).reset_index(drop=True)

# Preprocess text
df["text"] = df["text"].apply(clean_text)

# 🔹 Check word frequency distribution (Debugging Bias)
fake_words = Counter(" ".join(df[df['label'] == 1]['text']).split())
real_words = Counter(" ".join(df[df['label'] == 0]['text']).split())
print(f" Most common FAKE news words: {fake_words.most_common(10)}")
print(f" Most common REAL news words: {real_words.most_common(10)}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.2, random_state=42)

# 🔹 Improved TF-IDF Settings
vectorizer = TfidfVectorizer(
    stop_words="english", 
    max_features=10000,  # More features for better learning
    ngram_range=(1, 2),  # Bi-grams help with context
    analyzer="char_wb"  # Detects patterns inside words
)

classifier = LogisticRegression(
    C=0.5,  # Reduced regularization
    max_iter=1000,  # Allow better convergence
    solver="liblinear"  # More stable for text data
)

# Train model
model = make_pipeline(vectorizer, classifier)
model.fit(X_train, y_train)

# Evaluate accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f" Model Accuracy: {accuracy:.4f}")

# Save model
joblib.dump(model, "backend/fake_news_model.pkl")
print(" Model trained & saved as 'backend/fake_news_model.pkl'")