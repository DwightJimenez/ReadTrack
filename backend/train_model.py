import pandas as pd
import joblib
from models.analyzer import _extract_features
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

print("Starting ReadTrack Model Training...")

# 1. Load Data
try:
    df = pd.read_csv('dataset/dataset.csv')
except FileNotFoundError:
    # Create a dummy dataset if none exists, so you can test the code immediately
    print("Warning: 'dataset/dataset.csv' not found. Creating dummy data for testing...")
    data = {
        'text': [
            "The cat sat on the mat.", 
            "Photosynthesis is the process by which green plants manufacture food.", 
            "The juxtaposition of the ethereal lights created a surreptitious ambiance."
        ] * 10,
        'label': ["Easy", "Moderate", "Difficult"] * 10
    }
    df = pd.DataFrame(data)
    df.to_csv('dataset/dataset.csv', index=False)
    print("Dummy dataset created.")

# 2. Extract Features
print("Extracting features (Simulated Metrics)...")
# CRITICAL UPDATE: We select [0] because extract_features now returns (dict, list)
df['features'] = df['text'].apply(lambda x: _extract_features(x)[0])

# Remove rows where features extraction failed (empty text)
df = df[df['features'].notna()]

# 3. Prepare for Training
features_df = pd.DataFrame(df['features'].tolist())
X = features_df
le = LabelEncoder()
y = le.fit_transform(df['label'])

# Save encoder for the app
joblib.dump(le, 'readtrack_label_encoder.pkl')

# 4. Train Random Forest (The chosen model for your thesis)
# Note: We removed the comparison loop to keep it simple for now. 
# Random Forest is robust and fits your "ensemble" methodology.
print("Training Random Forest Model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# 5. Save Model
joblib.dump(model, 'readtrack_model.pkl')
joblib.dump(list(X.columns), 'readtrack_model_columns.pkl')

print(f"Success! Model trained on {len(df)} samples.")
print("Files saved: readtrack_model.pkl, readtrack_label_encoder.pkl")