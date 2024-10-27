// MealPlanner.jsx
import React, { useState } from "react";
import {
  FaEdit,
  FaCalendarAlt,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrashAlt,
  FaRedo,
  FaShoppingBag,
  FaClock,
} from "react-icons/fa";

const MealPlanner = () => {
  const [meals, setMeals] = useState([
    { day: "Monday", breakfast: "", lunch: "", dinner: "" },
    { day: "Tuesday", breakfast: "", lunch: "", dinner: "" },
    { day: "Wednesday", breakfast: "", lunch: "", dinner: "" },
    { day: "Thursday", breakfast: "", lunch: "", dinner: "" },
    { day: "Friday", breakfast: "", lunch: "", dinner: "" },
    { day: "Saturday", breakfast: "", lunch: "", dinner: "" },
    { day: "Sunday", breakfast: "", lunch: "", dinner: "" },
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("mealPlanner"); // "mealPlanner" or "groceryList"
  const [groceryList, setGroceryList] = useState([
    { item: "Eggs", category: "Dairy", quantity: 12 },
    { item: "Milk", category: "Dairy", quantity: 1 },
    { item: "Bread", category: "Bakery", quantity: 2 },
  ]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    item: "",
    category: "",
    quantity: 1,
  });

  const handleMealChange = (dayIndex, mealType, event) => {
    const updatedMeals = [...meals];
    updatedMeals[dayIndex][mealType] = event.target.value;
    setMeals(updatedMeals);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleQuantityChange = (index, change) => {
    const updatedGroceryList = [...groceryList];
    const updatedQuantity = updatedGroceryList[index].quantity + change;
    updatedGroceryList[index].quantity =
      updatedQuantity > 0 ? updatedQuantity : 1; // Prevent quantity from going below 1
    setGroceryList(updatedGroceryList);
  };

  const handleDeleteItem = (index) => {
    const updatedGroceryList = groceryList.filter((_, i) => i !== index);
    setGroceryList(updatedGroceryList);
  };

  const handleAddItemClick = () => {
    setShowAddItemModal(true);
  };

  const handleAddItemSubmit = () => {
    if (newItem.item && newItem.category && newItem.quantity > 0) {
      setGroceryList([...groceryList, newItem]);
      setNewItem({ item: "", category: "", quantity: 1 });
      setShowAddItemModal(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Meal Planning
      </h1>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
        Plan your meals and manage your grocery list efficiently
      </p>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <div
          onClick={() => handleTabClick("mealPlanner")}
          style={{
            flex: "1",
            textAlign: "center",
            padding: "10px",
            cursor: "pointer",
            color: activeTab === "mealPlanner" ? "#333" : "#007bff",
            borderBottom:
              activeTab === "mealPlanner" ? "2px solid blue" : "none",
          }}
        >
          <FaCalendarAlt style={{ marginRight: "8px" }} /> Meal Planner
        </div>
        <div
          onClick={() => handleTabClick("groceryList")}
          style={{
            flex: "1",
            textAlign: "center",
            padding: "10px",
            cursor: "pointer",
            color: activeTab === "groceryList" ? "#333" : "#007bff",
            borderBottom:
              activeTab === "groceryList" ? "2px solid blue" : "none",
          }}
        >
          <FaShoppingCart style={{ marginRight: "8px" }} /> Grocery List
        </div>
      </div>

      {/* Conditional Rendering for Tabs */}
      {activeTab === "mealPlanner" ? (
        <div>
          {/* Meal Planner Content */}
          {isSubmitted ? (
            <div>
              <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                Weekly Meal Plan Summary
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      Day
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      Breakfast
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      Lunch
                    </th>
                    <th
                      style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      Dinner
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meals.map((meal, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                        {meal.day}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                        {meal.breakfast}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                        {meal.lunch}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                        {meal.dinner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleEdit}
                style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "8px 16px",
                  color: "#007bff",
                  backgroundColor: "white",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                }}
              >
                <FaEdit /> Edit Meal Plan
              </button>
            </div>
          ) : (
            <div>
              <h3 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                Weekly Meal Plan
              </h3>
              {meals.map((meal, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <h4
                    style={{
                      fontSize: "18px",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    {meal.day}
                  </h4>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ flex: "1", paddingRight: "10px" }}>
                      <label style={{ fontSize: "14px", color: "#666" }}>
                        Breakfast
                      </label>
                      <input
                        type="text"
                        value={meal.breakfast}
                        onChange={(e) =>
                          handleMealChange(index, "breakfast", e)
                        }
                        placeholder="Enter breakfast"
                        style={{
                          width: "100%",
                          padding: "8px",
                          marginTop: "5px",
                          borderRadius: "5px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                    <div style={{ flex: "1", paddingRight: "10px" }}>
                      <label style={{ fontSize: "14px", color: "#666" }}>
                        Lunch
                      </label>
                      <input
                        type="text"
                        value={meal.lunch}
                        onChange={(e) => handleMealChange(index, "lunch", e)}
                        placeholder="Enter lunch"
                        style={{
                          width: "100%",
                          padding: "8px",
                          marginTop: "5px",
                          borderRadius: "5px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                    <div style={{ flex: "1" }}>
                      <label style={{ fontSize: "14px", color: "#666" }}>
                        Dinner
                      </label>
                      <input
                        type="text"
                        value={meal.dinner}
                        onChange={(e) => handleMealChange(index, "dinner", e)}
                        placeholder="Enter dinner"
                        style={{
                          width: "100%",
                          padding: "8px",
                          marginTop: "5px",
                          borderRadius: "5px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={handleSubmit}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit Meal Plan
              </button>
            </div>
          )}

          {/* Quick Actions for Meal Planner */}
          <h3
            style={{
              fontWeight: "bold",
              marginTop: "30px",
              marginBottom: "10px",
            }}
          >
            Quick Actions
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button
              style={{
                backgroundColor: "#e0f7fa",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                color: "#007bff",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaRedo /> Generate Weekly Meal Plan
            </button>
            <button
              style={{
                backgroundColor: "#f3e5f5",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                color: "#8e24aa",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaClock /> Set Meal Reminders
            </button>
          </div>
        </div>
      ) : (
        // Grocery List Content
        <div>
          <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Grocery List
          </h3>
          <div
            style={{
              background: "#f9f9f9",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {groceryList.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <h4 style={{ margin: "0", fontSize: "16px" }}>{item.item}</h4>
                  <p style={{ margin: "0", color: "#888", fontSize: "14px" }}>
                    {item.category}
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FaMinus
                    onClick={() => handleQuantityChange(index, -1)}
                    style={{ cursor: "pointer", color: "#888" }}
                  />
                  <span style={{ color: "#555" }}>x{item.quantity}</span>
                  <FaPlus
                    onClick={() => handleQuantityChange(index, 1)}
                    style={{ cursor: "pointer", color: "#888" }}
                  />
                  <FaTrashAlt
                    onClick={() => handleDeleteItem(index)}
                    style={{ cursor: "pointer", color: "#888" }}
                  />
                </div>
              </div>
            ))}
            <button
              onClick={handleAddItemClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#007bff",
              }}
            >
              <FaPlus /> Add Item
            </button>
          </div>

          {/* Add Item Modal */}
          {showAddItemModal && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "300px",
                }}
              >
                <h3 style={{ marginBottom: "10px" }}>Add New Item</h3>
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItem.item}
                  onChange={(e) =>
                    setNewItem({ ...newItem, item: e.target.value })
                  }
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
                <button
                  onClick={handleAddItemSubmit}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add Item
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions for Grocery List */}
          <h3
            style={{
              fontWeight: "bold",
              marginTop: "30px",
              marginBottom: "10px",
            }}
          >
            Quick Actions
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button
              style={{
                backgroundColor: "#e8f5e9",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                color: "#388e3c",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaShoppingBag /> Order Groceries
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
