/**
 * Impacteers LMS — Legal Management System
 * Senior UI/UX Designer Grade Centered Calendar
 * Symmetrical 7-Column Grid, Pixel-Perfect Centering, Real Date Math (Day 1 to 31)
 */

import { requestService } from '../services/requestService.js';
import { REQUEST_STATUSES } from '../constants.js';

let calendarMonthOffset = 0;

export function renderCalendarPage(monthOffset = 0) {
  calendarMonthOffset = monthOffset;
  const requests = requestService.getRequests();

  // Filter requests with target completion due dates
  const dueRequests = requests.filter(r => r.currentDueDate);

  // Month navigation calculation (Base: August 2026)
  const baseDate = new Date(2026, 7, 1); // 2026-08-01 (August)
  baseDate.setMonth(baseDate.getMonth() + monthOffset);

  const year = baseDate.getFullYear();
  const month = baseDate.getMonth(); // 0-indexed (7 = August)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[month];

  // Calendar Math:
  // First day of month: 0 = Sun, 1 = Mon, ..., 6 = Sat
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Total days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Days in previous month
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Current system date for "Today" badge
  const todayStr = '2026-08-28';

  // Map events by date 'YYYY-MM-DD'
  const eventsByDate = {};
  dueRequests.forEach(r => {
    const d = r.currentDueDate;
    if (!eventsByDate[d]) eventsByDate[d] = [];
    eventsByDate[d].push(r);
  });

  return `
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center; padding: 10px 0 40px 0;">
      
      <!-- Perfectly Centered Container (Max-Width 1020px) -->
      <div style="width: 100%; max-width: 1020px; margin: 0 auto;">
        
        <!-- Header: Centered Title & Navigation Toolbar -->
        <div style="
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px 24px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        ">
          
          <!-- Month & Year Title -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 40px; 
              height: 40px; 
              border-radius: 10px; 
              background: linear-gradient(135deg, #EFF6FF, #DBEAFE); 
              color: #2563EB; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              font-size: 20px;
              box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.1);
            ">
              🗓️
            </div>
            <div>
              <h1 style="font-size: 20px; font-weight: 800; color: #0F172A; margin: 0; letter-spacing: -0.02em;">
                ${currentMonthName} ${year}
              </h1>
              <div style="font-size: 12px; color: #64748B; margin-top: 1px; font-weight: 500;">
                ${daysInMonth} Days • ${dueRequests.length} Scheduled Contract Deadlines
              </div>
            </div>
          </div>

          <!-- Navigation Pills -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <button 
              class="btn btn-secondary btn-sm" 
              style="font-size: 12px; font-weight: 600; padding: 5px 12px; height: 34px; border-radius: 8px;"
              onclick="window.navigateCalendar(${monthOffset - 1})"
              title="Previous Month"
            >
              ‹ Prev
            </button>

            <button 
              class="btn btn-secondary btn-sm" 
              style="font-size: 12px; font-weight: 600; padding: 5px 14px; height: 34px; border-radius: 8px; background: #EFF6FF; color: #2563EB; border-color: #BFDBFE;"
              onclick="window.navigateCalendar(0)"
              title="Jump to Current Date"
            >
              Today
            </button>

            <button 
              class="btn btn-secondary btn-sm" 
              style="font-size: 12px; font-weight: 600; padding: 5px 12px; height: 34px; border-radius: 8px;"
              onclick="window.navigateCalendar(${monthOffset + 1})"
              title="Next Month"
            >
              Next ›
            </button>
          </div>

        </div>

        <!-- Main Centered Calendar Card with Responsive Horizontal Scroll Container -->
        <div class="calendar-scroll-wrapper">
          <div class="calendar-grid-inner">
            <!-- 7-Column Weekday Header Bar -->
            <div style="
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              background: #F8FAFC;
              border-bottom: 1px solid #E2E8F0;
              text-align: center;
            ">
              ${['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => `
                <div style="
                  padding: 12px 0;
                  font-size: 11.5px;
                  font-weight: 700;
                  color: ${day === 'SUN' || day === 'SAT' ? '#94A3B8' : '#475569'};
                  letter-spacing: 0.06em;
                  border-right: 1px solid #F1F5F9;
                ">
                  ${day}
                </div>
              `).join('')}
            </div>

            <!-- Symmetrical 7-Column Date Grid (1px border separation) -->
            <div style="
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              background: #E2E8F0;
              gap: 1px;
            ">
              ${renderCenteredCalendarCells(year, month, firstDayIndex, daysInMonth, prevMonthDays, eventsByDate, todayStr)}
            </div>
          </div>
        </div>

        <!-- Bottom Legend & Helper Note -->
        <div style="
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #64748B;
          padding: 0 4px;
        ">
          <div style="display: flex; gap: 18px; align-items: center;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #2563EB; display: inline-block;"></span>
              <span style="font-weight: 500;">Today's Date</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 3px; background: #EFF6FF; border: 1px solid #93C5FD; display: inline-block;"></span>
              <span style="font-weight: 500;">Active Task / Review Due</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 10px; height: 10px; border-radius: 3px; background: #ECFDF5; border: 1px solid #A7F3D0; display: inline-block;"></span>
              <span style="font-weight: 500;">Completed Contract</span>
            </div>
          </div>
          <div>
            <span style="color: #64748B; font-weight: 500;">💡 Click any agreement tag to jump straight into the task review.</span>
          </div>
        </div>

      </div>

    </div>
  `;
}

function renderCenteredCalendarCells(year, month, firstDayIndex, daysInMonth, prevMonthDays, eventsByDate, todayStr) {
  let cellsHtml = '';

  // 1. Previous Month Days Padding (Equal height 100px, subtle gray)
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const prevDayNum = prevMonthDays - i;
    cellsHtml += `
      <div style="
        height: 100px;
        background: #F8FAFC;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
      ">
        <span style="font-size: 12px; font-weight: 500; color: #CBD5E1;">${prevDayNum}</span>
      </div>
    `;
  }

  // 2. Current Month Days (Day 1 through Day 31)
  for (let day = 1; day <= daysInMonth; day++) {
    const dayPadded = String(day).padStart(2, '0');
    const monthPadded = String(month + 1).padStart(2, '0');
    const dateKey = `${year}-${monthPadded}-${dayPadded}`;
    const isToday = dateKey === todayStr;
    const events = eventsByDate[dateKey] || [];

    cellsHtml += `
      <div style="
        height: 100px;
        background: ${isToday ? '#F0F7FF' : '#FFFFFF'};
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        transition: background 0.12s ease;
        position: relative;
        overflow: hidden;
      " onmouseover="this.style.background='${isToday ? '#E0EFFF' : '#F8FAFC'}'" onmouseout="this.style.background='${isToday ? '#F0F7FF' : '#FFFFFF'}'">
        
        <!-- Day Number Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          ${
            isToday
              ? `
            <div style="
              width: 24px; 
              height: 24px; 
              border-radius: 50%; 
              background: #2563EB; 
              color: #FFFFFF; 
              font-size: 12px; 
              font-weight: 800; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
            ">
              ${day}
            </div>
            <span style="font-size: 9.5px; font-weight: 800; color: #2563EB; background: #DBEAFE; padding: 1px 5px; border-radius: 4px;">TODAY</span>
          `
              : `
            <span style="font-size: 12.5px; font-weight: 700; color: #1E293B;">
              ${day === 1 ? 'Aug 1' : day}
            </span>
          `
          }
        </div>

        <!-- Agreement / Task Tags Container -->
        <div style="display: flex; flex-direction: column; gap: 3px; overflow-y: auto; flex: 1;">
          ${events.map(ev => {
            const isCompleted = ev.status === 'COMPLETED';
            return `
            <a 
              href="#/requests/${ev.id}" 
              title="${ev.requestId}: ${ev.title} (${ev.departmentName}) - Click to review task"
              style="
                text-decoration: none;
                background: ${isCompleted ? '#ECFDF5' : '#EFF6FF'};
                color: ${isCompleted ? '#065F46' : '#1D4ED8'};
                border-left: 3px solid ${isCompleted ? '#10B981' : '#2563EB'};
                border-radius: 4px;
                padding: 3px 6px;
                display: block;
                font-size: 11px;
                font-weight: 600;
                line-height: 1.25;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                transition: all 0.1s ease;
              "
              onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.06)';"
              onmouseout="this.style.transform='none'; this.style.boxShadow='none';"
            >
              📄 ${ev.title}
            </a>
          `;
          }).join('')}
        </div>

      </div>
    `;
  }

  // 3. Next Month Days Padding to complete the grid (Equal 100px height)
  const totalCells = firstDayIndex + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let j = 1; j <= remainingCells; j++) {
    cellsHtml += `
      <div style="
        height: 100px;
        background: #F8FAFC;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
      ">
        <span style="font-size: 12px; font-weight: 500; color: #CBD5E1;">${j}</span>
      </div>
    `;
  }

  return cellsHtml;
}

window.navigateCalendar = function(offset) {
  calendarMonthOffset = offset;
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    mainContent.innerHTML = renderCalendarPage(calendarMonthOffset);
  }
};
