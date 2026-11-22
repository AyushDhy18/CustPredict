
from fastapi import APIRouter
from app.services import mock_data, ml_data

router = APIRouter(prefix="/api")


@router.get("/dashboard/summary")
def get_dashboard_summary():
    summary = mock_data.dashboard_summary.copy()
    summary["total_customers"] = len(ml_data.get_customer_data())
    return summary


@router.get("/analytics/customer-trends")
def get_customer_trends():
    return mock_data.customer_trends


@router.get("/analytics/revenue")
def get_revenue_analytics():
    return mock_data.revenue_analytics


@router.get("/analytics/segments")
def get_customer_segments():
    clusters = ml_data.get_cluster_summary()

    return {
        "segments": [
            {
                "name": f"Cluster {int(row['Cluster'])}",
                "value": int(row["Customer_Count"])
            }
            for row in clusters
        ],
        "cluster_details": clusters
    }


@router.get("/customers")
def get_customers():
    customers = ml_data.get_customer_records()

    return {
        "total": len(customers),
        "customers": customers
    }


@router.get("/predictions")
def get_predictions():
    clusters = ml_data.get_cluster_summary()

    return {
        "total_clusters": len(clusters),
        "clusters": clusters,
        "message": "K-Means customer segmentation results"
    }
