import React, { useState, useEffect } from "react";

export default function BookingPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        notes: ""
    });
    const [errors, setErrors] = useState({});

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Pre-selected dates in format "YYYY-M-D"
    const preSelectedDates = [
        "2025-4-1",
        "2025-4-2",
        "2025-4-3",
        "2025-4-11",
        "2025-4-19",
        "2025-4-16"
    ];

    // Get days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Fixed time slots in proper order
    const timeSlots = [
        "8:00 am", "8:30 am", "9:00 am", "9:30 am",
        "10:00 am", "10:30 am", "11:00 am", "11:30 am",
        "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm",
        "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm",
        "4:00 pm", "4:30 pm"
    ];

    // Check if a date is in the pre-selected dates
    const isPreSelectedDate = (date) => {
        const dateStr = `${currentYear}-${currentMonth + 1}-${date}`;
        return preSelectedDates.includes(dateStr);
    };

    useEffect(() => {
        // Set the first pre-selected date as default selection if it exists in current month
        for (let i = 1; i <= daysInMonth; i++) {
            if (isPreSelectedDate(i)) {
                setSelectedDate(i);
                break;
            }
        }
    }, [daysInMonth]);

    const handleDateClick = (date, preSelected) => {
        // console.log(preSelected)
        if(preSelected == false){
            setSelectedDate(date);
            setSelectedTime(null);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!selectedDate) newErrors.date = "Please select a date";
        if (!selectedTime) newErrors.time = "Please select a time";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        console.log("Booking details:", { date: selectedDate, time: selectedTime, ...formData });
        alert("Booking confirmed!");
    };

    const isWeekend = (date) => {
        const dayOfWeek = new Date(currentYear, currentMonth, date).getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
          

            {/* Main Content */}
            <div style={{ display: "flex", marginTop: "1rem", gap: "2rem", flexWrap: "wrap" }}>
                {/* Left: Calendar & Time Slots */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                    <h2>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {selectedDate || ""}</h2>

                    {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem", maxWidth: "350px" }}>
                        {[...Array(daysInMonth)].map((_, i) => {
                            const date = i + 1;
                            const dateObj = new Date(currentYear, currentMonth, date);
                            const weekend = isWeekend(date);
                            const preSelected = isPreSelectedDate(date);

                            return (
                                <div
                                    key={date}
                                    onClick={() => handleDateClick(date, preSelected)}
                                    style={{
                                        padding: "0.8rem",
                                        textAlign: "center",
                                        borderRadius: "0.5rem",
                                        cursor: preSelected ? "no-drop" : "pointer",
                                        backgroundColor: selectedDate === date ? "mediumseagreen" :
                                            preSelected ? "#ff9999" :
                                                weekend ? "#e0e0e0" : "#f0f0f0",
                                        color: selectedDate === date ? "white" :
                                            preSelected ? "#cc0000" :
                                                weekend ? "#666" : "black",
                                        opacity: dateObj < today ? 0.5 : 1,
                                        pointerEvents: dateObj < today ? "none" : "auto",
                                        border: selectedDate === date ? "2px solid mediumseagreen" :
                                            preSelected ? "1px dashed #cc0000" : "none",
                                        fontWeight: preSelected ? "bold" : "normal"
                                    }}
                                >
                                    {date}
                                </div>
                            );
                        })}
                    </div>

                    <h3 style={{ marginTop: "1rem" }}>Select a Time</h3>
                    {errors.time && <p style={{ color: "red" }}>{errors.time}</p>}

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                style={{
                                    padding: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.5rem",
                                    cursor: "pointer",
                                    backgroundColor: selectedTime === time ? "#4CAF50" : "white",
                                    color: selectedTime === time ? "white" : "black"
                                }}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                    
                </div>

                {/* Right: Form */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                    <h2>Add your details</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="First and last name *"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
                            />
                            {errors.name && <p style={{ color: "red", marginTop: "-0.5rem", marginBottom: "0.5rem", fontSize: "0.8rem" }}>{errors.name}</p>}
                        </div>

                        <input type="email" name="email" placeholder="Email (optional)" value={formData.email} onChange={handleInputChange} style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }} />
                        <input type="text" name="address" placeholder="Address (optional)" value={formData.address} onChange={handleInputChange} style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }} />
                        <input type="tel" name="phone" placeholder="Phone number (optional)" value={formData.phone} onChange={handleInputChange} style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }} />
                        <textarea name="notes" placeholder="Notes (optional)" value={formData.notes} onChange={handleInputChange} style={{ width: "100%", padding: "0.5rem", height: "80px", marginBottom: "1rem" }}></textarea>

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "1rem",
                                backgroundColor: "#2C3E50",
                                color: "white",
                                border: "none",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                                fontSize: "1rem"
                            }}
                        >
                            Book Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}