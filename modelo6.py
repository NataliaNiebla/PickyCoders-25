from pymongo import MongoClient
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, precision_recall_curve, auc
from sklearn.metrics import average_precision_score
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import average_precision_score, classification_report



# ✨ Conexión a MongoDB Atlas
client = MongoClient("mongodb+srv://a01571724:050126@clusternat.8yvbcci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["coolersDB"]

# 🔍 Traer documentos
coolers = pd.DataFrame(list(db.coolers.find()))
warnings = pd.DataFrame(list(db.warnings.find()))
calendar = pd.DataFrame(list(db.calendar.find()))
sales = pd.DataFrame(list(db.sales.find()))

# ✅ Verificar datos cargados
dfs = {"coolers": coolers, "warnings": warnings, "calendar": calendar, "sales": sales}
for name, df in dfs.items():
    if df.empty or df.columns.empty:
        print(f"\u274c La colección '{name}' está vacía o sin columnas.")
    else:
        print(f"\u2705 '{name}' cargada: {df.shape}")

# Crear columna 'warning'
warning_ids = set(warnings['cooler_id'].unique())
coolers['warning'] = coolers['cooler_id'].apply(lambda cid: int(cid in warning_ids))

coolers = coolers.dropna()

# Convertir fechas
coolers['calday'] = pd.to_datetime(coolers['calday'], format='%Y%m%d')
calendar['calday'] = pd.to_datetime(calendar['calday'], format='%Y%m%d')

# Merge con calendario
coolers = coolers.merge(calendar[['calday', 'day']], on='calday', how='left')
calendar['is_weekend'] = calendar['day'].isin(['Sabado', 'Domingo']).astype(int)
calendar['month'] = calendar['calday'].dt.month
coolers = coolers.merge(calendar[['calday', 'is_weekend', 'month']], on='calday', how='left')

# Variables derivadas
coolers['voltage_range'] = coolers['max_voltage'] - coolers['min_voltage']
coolers['pressor_on_ratio'] = coolers['compressor'] / (coolers['on_time'] + 1)
coolers['usage_per_open'] = coolers['power'] / (coolers['door_opens'] + 1)
coolers['temp_above_8'] = (coolers['temperature'] > 8).astype(int)
coolers['low_voltage_flag'] = (coolers['min_voltage'] < 90).astype(int)

# Ventas promedio
avg_sales = sales.groupby('cooler_id')['amount'].mean().reset_index().rename(columns={'amount': 'avg_monthly_sales'})
coolers = coolers.merge(avg_sales, on='cooler_id', how='left')
coolers['avg_monthly_sales'] = coolers['avg_monthly_sales'].fillna(0)
coolers['has_sales'] = (coolers['avg_monthly_sales'] > 0).astype(int)

# Interacciones útiles
coolers['compressor_efficiency'] = coolers['compressor'] / (coolers['power'] + 1)
coolers['voltage_stability'] = (coolers['max_voltage'] - coolers['min_voltage']) / (coolers['min_voltage'] + 1)
coolers['power_per_hour'] = coolers['power'] / (coolers['on_time'] + 1)
coolers['doors_per_hour'] = coolers['door_opens'] / (coolers['on_time'] + 1)


coolers.to_csv('coolers_datos.csv', index=False)

# X y y
X = coolers.drop(columns=['_id', 'cooler_id', 'calday', 'warning', 'day']) if 'day' in coolers.columns else coolers.drop(columns=['_id', 'cooler_id', 'calday', 'warning'])
y = coolers['warning']

# Selección de features
selector = SelectKBest(score_func=f_classif, k=10)
X_selected_array = selector.fit_transform(X, y)
selected_features = X.columns[selector.get_support()]
X = X[selected_features]


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, stratify=y, random_state=42)
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

model = XGBClassifier(
    max_depth=4,
    learning_rate=0.05,
    n_estimators=200,
    subsample=0.8,
    colsample_bytree=0.8,
    use_label_encoder=False,
    eval_metric='logloss',
    scale_pos_weight=1,
    random_state=42
)
model.fit(X_train_resampled, y_train_resampled)

# Evaluación
y_pred = model.predict(X_test)
y_scores = model.predict_proba(X_test)[:, 1]
print(classification_report(y_test, y_pred))

coolers_target = np.array([0, 0, 1, 0, 0, 1, 0])
probabilities = np.array([0.1093, 0.4231, 0.8992, 0.5121, 0.9016, 0.3521, 0.2775])

pr_auc = average_precision_score(coolers_target, probabilities)
pr_auc_avg = average_precision_score(y_test, y_scores)

precision, recall, _ = precision_recall_curve(y_test, y_scores)

print(f'PR AUC manual: {round(pr_auc, 4)}')
print(f'PR AUC promedio: {round(pr_auc_avg, 4)}')


plt.figure(figsize=(8, 6))
plt.plot(recall, precision, marker='.', label=f'XGBoost (PR AUC = {pr_auc:.4f})')
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.legend()
plt.grid()
plt.show()



# 1. Columnas numéricas seleccionadas
columnas_modelo = X.columns.tolist()

# 2. Función de predicción
def predecir_fallas_numerico(modelo, df, columnas):
    for col in columnas:
        if col not in df.columns:
            raise ValueError(f"Falta la columna requerida: {col}")

    datos = df[columnas].copy()
    predicciones = modelo.predict(datos)
    probabilidades = modelo.predict_proba(datos)

    resultados = df.copy()
    resultados['Prediccion'] = predicciones
    resultados['Probabilidad_Falla'] = probabilidades[:, 1]
    resultados['Probabilidad_No_Falla'] = probabilidades[:, 0]
    resultados['Resultado'] = np.where(predicciones == 1, 'Falla', 'Sin Falla')

    return resultados

# 3. Ejecutar predicción
resultados = predecir_fallas_numerico(modelo=model, df=coolers, columnas=columnas_modelo)

# 4. Mostrar primeros resultados
print(resultados[['cooler_id', 'Resultado', 'Probabilidad_Falla']].head())

# Crear dataframe reducido solo con cooler_id, probabilidad y valor real
resumen = resultados[['cooler_id', 'Probabilidad_Falla', 'warning']]

# Guardar en CSV
resumen.to_csv('output.csv', index=False, float_format='%.4f')
print("✅ Resumen guardado en 'predicciones_resumidas.csv'")




# Contar las predicciones de falla vs sin falla
conteo_resultados = resultados['Resultado'].value_counts()

# Graficar
plt.figure(figsize=(6, 5))
conteo_resultados.plot(kind='bar', color=['crimson', 'seagreen'])
plt.title('Cantidad de Coolers: Falla vs Sin Falla')
plt.xlabel('Resultado')
plt.ylabel('Cantidad')
plt.xticks(rotation=0)
plt.grid(axis='y', linestyle='--', alpha=0.7)

# Mostrar los valores encima de cada barra
for i, valor in enumerate(conteo_resultados):
    plt.text(i, valor + 1, str(valor), ha='center', va='bottom', fontweight='bold')

plt.tight_layout()
plt.show()
