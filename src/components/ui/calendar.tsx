"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
  "8:00 PM", "9:00 PM",
];

export function Calendar({ onBooking }: { onBooking?: (date: string, time: string) => void }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" });
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const isPastDay = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isSunday = (day: number) => {
    return new Date(currentYear, currentMonth, day).getDay() === 0;
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
    setBooked(false);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
    setBooked(false);
  };

  const handleBook = () => {
    if (selectedDay && selectedTime) {
      const dateStr = `${monthName} ${selectedDay}, ${currentYear}`;
      // Send WhatsApp notification to SENO
      const message = encodeURIComponent(
        `Hi SENO! 👋\n\nI'd like to schedule a strategy call.\n\n📅 Date: ${dateStr}\n⏰ Time: ${selectedTime} IST\n\nLooking forward to discussing my project!`
      );
      window.open(`https://wa.me/917667261838?text=${message}`, '_blank');
      setBooked(true);
      onBooking?.(dateStr, selectedTime);
    }
  };

  // Generate calendar grid with memoization
  const calendarDays = useMemo(() => {
    const cells: React.ReactNode[] = [];
    
    // Day name headers
    dayNames.forEach((name) => {
      cells.push(
        <div key={`h-${name}`} className="flex items-center justify-center h-8 w-full">
          <span className="text-[10px] sm:text-xs font-medium text-gray-500 tracking-wider">{name}</span>
        </div>
      );
    });

    // Empty leading cells
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(<div key={`e-${i}`} className="h-8 sm:h-9 w-full" />);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const past = isPastDay(d);
      const sunday = isSunday(d);
      const disabled = past || sunday;
      const selected = selectedDay === d;
      const isToday = d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

      cells.push(
        <button
          key={`d-${d}`}
          disabled={disabled}
          onClick={() => {
            setSelectedDay(d);
            setSelectedTime(null);
            setBooked(false);
          }}
          className={`
            h-8 sm:h-9 w-full rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 relative
            ${disabled 
              ? "text-gray-700 cursor-not-allowed opacity-40" 
              : selected
                ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : isToday
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
            }
          `}
        >
          {d}
        </button>
      );
    }

    return cells;
  }, [currentMonth, currentYear, selectedDay]);

  if (booked) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h4 className="text-xl font-instrument italic text-white mb-2">Call Scheduled!</h4>
        <p className="text-gray-400 text-sm font-light">
          {monthName} {selectedDay}, {currentYear} at {selectedTime}
        </p>
        <p className="text-gray-500 text-xs mt-4">We'll reach out to confirm your session shortly.</p>
        <button 
          onClick={() => { setBooked(false); setSelectedDay(null); setSelectedTime(null); }}
          className="mt-6 text-emerald-400 text-xs underline underline-offset-4 hover:text-emerald-300 transition-colors"
        >
          Pick another time
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="text-sm text-white font-medium tracking-wide">
          {monthName} {currentYear}
        </p>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>

      {/* Time Slots — shown after selecting a date */}
      {selectedDay && (
        <div className="pt-4 border-t border-white/5 space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Available — {monthName} {selectedDay}
            </p>
            <p className="text-[10px] text-gray-600">10 AM – 10 PM IST</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`
                  py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200 border
                  ${selectedTime === time
                    ? "bg-emerald-500 text-black border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    : "border-white/5 text-gray-400 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-white/5"
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>

          {selectedTime && (
            <button
              onClick={handleBook}
              className="w-full mt-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] text-sm"
            >
              Confirm — {monthName} {selectedDay} at {selectedTime}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
