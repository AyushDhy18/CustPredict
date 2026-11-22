
from pathlib import Path
import pandas as pd

# Project root directory
BASE_DIR = Path(__file__).resolve().parents[3]

DATA_DIR = BASE_DIR / "data" / "processed" / "member1"

CUSTOMER_FILE = DATA_DIR / "customer_segmentation_results.csv"
CLUSTER_FILE = DATA_DIR / "cluster_analysis.csv"


def get_customer_data():
    return pd.read_csv(CUSTOMER_FILE)


def get_cluster_data():
    return pd.read_csv(CLUSTER_FILE)


def get_customer_records():
    df = get_customer_data()

    df = df.fillna(0)

    return df.to_dict(orient="records")


def get_cluster_summary():
    df = get_cluster_data()

    return df.to_dict(orient="records")
