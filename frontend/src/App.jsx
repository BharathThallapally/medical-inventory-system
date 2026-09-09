import { useEffect, useState } from "react";
import {
  getMedicines,
  getDashboardStats,
} from "./api";
import AddMedicine from "./AddMedicine";
import "./App.css";

function App() {
  // =========================
  // STATE
  // =========================

  // Medicine data
  const [medicines, setMedicines] = useState([]);

  // Medicine loading state
  const [loading, setLoading] = useState(true);

  // General error message
  const [error, setError] = useState("");

  // Show / hide Add Medicine form
  const [showAddMedicine, setShowAddMedicine] = useState(false);

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // Dashboard statistics
  const [dashboardStats, setDashboardStats] = useState({
    totalMedicines: 0,
    expired: 0,
    nearExpiry: 0,
    lowStock: 0,
  });

  // Dashboard loading state
  const [dashboardLoading, setDashboardLoading] = useState(true);

  // =========================
  // LOAD DATA WHEN PAGE OPENS
  // =========================

  useEffect(() => {
    loadMedicines();
    loadDashboardStats();
  }, []);

  // =========================
  // LOAD MEDICINES
  // =========================

  const loadMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getMedicines();

      setMedicines(result.data || []);
    } catch (error) {
      console.error("Failed to load medicines:", error);

      setError(
        "Unable to load medicines. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD DASHBOARD STATISTICS
  // =========================

  const loadDashboardStats = async () => {
    try {
      setDashboardLoading(true);

      const result = await getDashboardStats();

      console.log("Dashboard statistics:", result);

      setDashboardStats(
        result.data || {
          totalMedicines: 0,
          expired: 0,
          nearExpiry: 0,
          lowStock: 0,
        }
      );
    } catch (error) {
      console.error(
        "Failed to load dashboard statistics:",
        error
      );

      setDashboardStats({
        totalMedicines: 0,
        expired: 0,
        nearExpiry: 0,
        lowStock: 0,
      });
    } finally {
      setDashboardLoading(false);
    }
  };

  // =========================
  // CALCULATE LOW STOCK
  // =========================

  const lowStockMedicines = medicines.filter(
    (medicine) => Number(medicine.quantity) <= 10
  );

  // =========================
  // CALCULATE EXPIRY STATUS
  // =========================

  const today = new Date();

  const expiredMedicines = medicines.filter((medicine) => {
    const expiryDate = new Date(medicine.expiryDate);

    return expiryDate < today;
  });

  const expiringSoonMedicines = medicines.filter((medicine) => {
    const expiryDate = new Date(medicine.expiryDate);

    const difference =
      expiryDate.getTime() - today.getTime();

    const daysRemaining = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return (
      daysRemaining >= 0 &&
      daysRemaining <= 30
    );
  });

  // =========================
  // FILTER MEDICINES
  // =========================

  const filteredMedicines = medicines.filter(
    (medicine) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

      return (
        medicine.medicineName
          ?.toLowerCase()
          .includes(search) ||

        medicine.manufacturer
          ?.toLowerCase()
          .includes(search) ||

        medicine.batchNumber
          ?.toLowerCase()
          .includes(search) ||

        medicine.category
          ?.toLowerCase()
          .includes(search)
      );
    }
  );

  // =========================
  // REFRESH ALL DATA
  // =========================

  const refreshData = async () => {
    await Promise.all([
      loadMedicines(),
      loadDashboardStats(),
    ]);
  };

  // =========================
  // USER INTERFACE
  // =========================

  return (
    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="header">

        <div>
          <h1>🏥 Medical Inventory</h1>

          <p>
            Smart Medicine Management System
          </p>
        </div>

        <button
          className="add-button"
          onClick={() =>
            setShowAddMedicine(true)
          }
        >
          + Add Medicine
        </button>

      </header>

      {/* ================= MAIN CONTENT ================= */}

      <main className="container">

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="message">
            Loading medicines...
          </div>
        )}

        {/* ================= ERROR ================= */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* ================= DASHBOARD CARDS ================= */}

        <section className="dashboard-cards">

          {/* TOTAL MEDICINES */}

          <div className="card">

            <span className="card-icon">
              💊
            </span>

            <div>
              <p>Total Medicines</p>

              <h2>
                {dashboardLoading
                  ? "..."
                  : dashboardStats.totalMedicines}
              </h2>
            </div>

          </div>

          {/* LOW STOCK */}

          <div className="card">

            <span className="card-icon">
              📦
            </span>

            <div>
              <p>Low Stock</p>

              <h2>
                {dashboardLoading
                  ? "..."
                  : dashboardStats.lowStock}
              </h2>
            </div>

          </div>

          {/* EXPIRING SOON */}

          <div className="card">

            <span className="card-icon">
              ⚠️
            </span>

            <div>
              <p>Expiring Soon</p>

              <h2>
                {dashboardLoading
                  ? "..."
                  : dashboardStats.nearExpiry}
              </h2>
            </div>

          </div>

          {/* EXPIRED */}

          <div className="card">

            <span className="card-icon">
              🚨
            </span>

            <div>
              <p>Expired</p>

              <h2>
                {dashboardLoading
                  ? "..."
                  : dashboardStats.expired}
              </h2>
            </div>

          </div>

        </section>

        {/* ================= MEDICINE INVENTORY ================= */}

        <section className="inventory-section">

          <div className="section-header">

            <div>
              <h2>
                Medicine Inventory
              </h2>

              <p>
                Manage your medicines and stock
                levels
              </p>
            </div>

            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search medicines..."
              className="search-box"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </div>

          {/* ================= TABLE ================= */}

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Medicine</th>
                  <th>Manufacturer</th>
                  <th>Batch</th>
                  <th>Category</th>
                  <th>Expiry</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>

              </thead>

              <tbody>

                {filteredMedicines.length >
                0 ? (

                  filteredMedicines.map(
                    (medicine) => (

                      <tr
                        key={medicine._id}
                      >

                        {/* MEDICINE */}

                        <td>
                          <strong>
                            {
                              medicine.medicineName
                            }
                          </strong>
                        </td>

                        {/* MANUFACTURER */}

                        <td>
                          {
                            medicine.manufacturer
                          }
                        </td>

                        {/* BATCH */}

                        <td>
                          {
                            medicine.batchNumber
                          }
                        </td>

                        {/* CATEGORY */}

                        <td>

                          <span className="category">
                            {
                              medicine.category
                            }
                          </span>

                        </td>

                        {/* EXPIRY */}

                        <td>
                          {new Date(
                            medicine.expiryDate
                          ).toLocaleDateString()}
                        </td>

                        {/* QUANTITY */}

                        <td>

                          <span
                            className={
                              Number(
                                medicine.quantity
                              ) <= 10
                                ? "stock low"
                                : "stock"
                            }
                          >
                            {
                              medicine.quantity
                            }
                          </span>

                        </td>

                        {/* PRICE */}

                        <td>
                          ₹{medicine.price}
                        </td>

                      </tr>

                    )
                  )

                ) : (

                  !loading && (

                    <tr>

                      <td colSpan="7">

                        {searchTerm
                          ? "No medicines match your search."
                          : "No medicines found."}

                      </td>

                    </tr>

                  )

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* ================= INVENTORY ALERTS ================= */}

        <section className="alerts">

          <h2>
            🔔 Inventory Alerts
          </h2>

          {/* LOW STOCK */}

          {lowStockMedicines.map(
            (medicine) => (

              <div
                className="alert warning"
                key={`low-${medicine._id}`}
              >

                <strong>
                  🔴 Low Stock:
                </strong>{" "}

                {medicine.medicineName}
                {" "}has only{" "}

                {medicine.quantity}
                {" "}units remaining.

              </div>

            )
          )}

          {/* EXPIRING SOON */}

          {expiringSoonMedicines.map(
            (medicine) => (

              <div
                className="alert warning"
                key={`expiry-${medicine._id}`}
              >

                <strong>
                  🟠 Expiring Soon:
                </strong>{" "}

                {medicine.medicineName}
                {" "}expires on{" "}

                {new Date(
                  medicine.expiryDate
                ).toLocaleDateString()}.

              </div>

            )
          )}

          {/* EXPIRED */}

          {expiredMedicines.map(
            (medicine) => (

              <div
                className="alert danger"
                key={`expired-${medicine._id}`}
              >

                <strong>
                  ⚠️ Expired:
                </strong>{" "}

                {medicine.medicineName}
                {" "}expired on{" "}

                {new Date(
                  medicine.expiryDate
                ).toLocaleDateString()}.

              </div>

            )
          )}

          {/* NO ALERTS */}

          {!loading &&
            lowStockMedicines.length === 0 &&
            expiringSoonMedicines.length === 0 &&
            expiredMedicines.length === 0 && (

              <div className="alert">
                ✅ No inventory alerts.
              </div>

            )}

        </section>

      </main>

      {/* ================= ADD MEDICINE ================= */}

      {showAddMedicine && (

        <AddMedicine
          onMedicineAdded={refreshData}
          onClose={() =>
            setShowAddMedicine(false)
          }
        />

      )}

      {/* ================= FOOTER ================= */}

      <footer>

        <p>
          Medical Inventory Management System
          © 2026
        </p>

      </footer>

    </div>
  );
}

export default App;