import pandas as pd
import joblib
from models.analyzer import _extract_features  # We re-use the *exact* feature extractor from our app
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

print("Starting ReadTrack Model Training Experiment...")

# --- STEP 1: LOAD DATA ---
# Load the "Ground Truth" dataset created by you and your teachers
try:
    df = pd.read_csv('dataset/dataset.csv')
except FileNotFoundError:
    print("Error: 'dataset/dataset.csv' not found.")
    print("Please create this file with 'text' and 'label' columns.")
    exit()

if df.empty or 'text' not in df.columns or 'label' not in df.columns:
    print("Error: Dataset is empty or missing 'text'/'label' columns.")
    exit()

print(f"Loaded {len(df)} labeled text samples.")


# --- STEP 2: FEATURE EXTRACTION (The "Simulated Metrics") ---
# This part is crucial. We apply our NLP feature extractor to every text.
# This might take a few minutes if the dataset is large.
print("Extracting features from text (this may take a moment)...")
df['features'] = df['text'].apply(_extract_features)


# --- STEP 3: PREPARE DATA FOR SKLEARN ---
# Convert the 'features' (a column of dicts) into a features DataFrame (X)
print("Preparing data for training...")
features_df = pd.DataFrame(df['features'].tolist())
X = features_df.copy()  # Our "simulated metrics" are the inputs

# Convert the 'label' (a column of text) into a numbers (y)
# "Easy" -> 0, "Moderate" -> 1, "Difficult" -> 2
le = LabelEncoder()
y = le.fit_transform(df['label'])

# Save the label encoder so our app can reverse the numbers back to text
joblib.dump(le, 'readtrack_label_encoder.pkl')
print(f"Labels encoded: {list(le.classes_)}")

# --- STEP 4: SPLIT DATA ---
# Split into 80% for training, 20% for testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"Data split: {len(X_train)} train samples, {len(X_test)} test samples.")


# --- STEP 5: RUN THE EXPERIMENT (Train & Compare Models) ---
# As your thesis states, we will compare Decision Tree and Random Forest

models_to_test = {
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Random Forest": RandomForestClassifier(random_state=42)
    # You could add other models here, e.g., SVM
}

best_model = None
best_f1_score = 0.0

print("\n--- MODELING EXPERIMENT RESULTS ---")

for name, model in models_to_test.items():
    print(f"\nTraining Model: {name}")
    
    # 1. Train the model
    model.fit(X_train, y_train)
    
    # 2. Test the model
    y_pred = model.predict(X_test)
    
    # 3. Evaluate the model (This is your F1-Score!)
    # These are the results you MUST put in your thesis paper (Chapter 4/5)
    print(f"--- Evaluation Report for {name} ---")
    report_str = classification_report(y_test, y_pred, target_names=le.classes_)
    print(report_str)
    
    # Parse the report to find the weighted F1-score
    report_dict = classification_report(y_test, y_pred, target_names=le.classes_, output_dict=True)
    current_f1_score = report_dict['weighted avg']['f1-score']

    if current_f1_score > best_f1_score:
        best_f1_score = current_f1_score
        best_model = model
        print(f"*** New best model found: {name} with F1-Score: {best_f1_score:.4f} ***")

print("\n--- EXPERIMENT COMPLETE ---")


# --- STEP 6: SAVE THE BEST MODEL ---
# After comparing, we save the "winner" (the one with the highest F1)
if best_model:
    # We will re-train the best model on ALL data (train + test)
    # This makes the final model as smart as possible
    print(f"Re-training best model ({type(best_model).__name__}) on all {len(X)} samples...")
    best_model.fit(X, y) 
    
    # Save the final, trained model to a file
    model_filename = 'readtrack_model.pkl'
    joblib.dump(best_model, model_filename)
    print(f"Final model saved to: {model_filename}")

    # Also save the feature columns, in order, for the app to use
    feature_columns = list(X.columns)
    joblib.dump(feature_columns, 'readtrack_model_columns.pkl')
    print(f"Model feature columns saved to: readtrack_model_columns.pkl")
else:
    print("Error: No model was successfully trained.")