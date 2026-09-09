import { useState } from "react";
import { addMedicine } from "./api";

function AddMedicine({ onMedicineAdded, onClose }) {
  const [formData, setFormData] = useState({
    medicineName: "",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    dosage: "",
    price: "",
    quantity: "",
    category: "General",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Submit medicine
  const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");
  setSuccess("");

  // Basic validation
  if (
    !formData.medicineName.trim() ||
    !formData.manufacturer.trim() ||
    !formData.batchNumber.trim() ||
    !formData.expiryDate ||
    !formData.dosage.trim() ||
    formData.price === "" ||
    formData.quantity === ""
  ) {
    setError("Please fill in all required fields.");
    return;
  }

  if (Number(formData.price) < 0) {
    setError("Price cannot be negative.");
    return;
  }

  if (Number(formData.quantity) < 0) {
    setError("Quantity cannot be negative.");
    return;
  }

  try {
    setLoading(true);

    const medicineData = {
      medicineName: formData.medicineName.trim(),
      manufacturer: formData.manufacturer.trim(),
      batchNumber: formData.batchNumber.trim(),
      expiryDate: formData.expiryDate,
      dosage: formData.dosage.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      category: formData.category.trim() || "General",
    };

    const result = await addMedicine(medicineData);

    console.log("Medicine added:", result);

    setSuccess("Medicine added successfully!");

    // Refresh inventory
    if (onMedicineAdded) {
      await onMedicineAdded();
    }

    // Clear form
    setFormData({
      medicineName: "",
      manufacturer: "",
      batchNumber: "",
      expiryDate: "",
      dosage: "",
      price: "",
      quantity: "",
      category: "General",
    });

    // Close form after successful submission
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 1000);

  } catch (error) {
    console.error("Failed to add medicine:", error);

    const message =
      error.response?.data?.message ||
      "Failed to add medicine. Please try again.";

    setError(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="form-overlay">

      <div className="medicine-form">

        {/* Form Header */}

        <div className="form-header">

          <div>
            <h2>💊 Add Medicine</h2>
            <p>Add a new medicine to your inventory</p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* Error */}

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {/* Success */}

        {success && (
          <div className="form-success">
            {success}
          </div>
        )}

        {/* Form */}

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* Medicine Name */}

            <div className="form-group">

              <label>
                Medicine Name *
              </label>

              <input
                type="text"
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                placeholder="Example: Paracetamol"
                required
              />

            </div>

            {/* Manufacturer */}

            <div className="form-group">

              <label>
                Manufacturer *
              </label>

              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                placeholder="Example: Cipla"
                required
              />

            </div>

            {/* Batch Number */}

            <div className="form-group">

              <label>
                Batch Number *
              </label>

              <input
                type="text"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
                placeholder="Example: BATCH001"
                required
              />

            </div>

            {/* Category */}

            <div className="form-group">

              <label>
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Example: Tablet"
              />

            </div>

            {/* Dosage */}

            <div className="form-group">

              <label>
                Dosage *
              </label>

              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="Example: 500mg"
                required
              />

            </div>

            {/* Expiry Date */}

            <div className="form-group">

              <label>
                Expiry Date *
              </label>

              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />

            </div>

            {/* Quantity */}

            <div className="form-group">

              <label>
                Quantity *
              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Example: 100"
                min="0"
                required
              />

            </div>

            {/* Price */}

            <div className="form-group">

              <label>
                Price (₹) *
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Example: 25"
                min="0"
                step="0.01"
                required
              />

            </div>

          </div>

          {/* Buttons */}

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Medicine"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddMedicine;