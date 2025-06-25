'use client';

import Layout from "@/components/Layout";
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Calendar() {
  // Sample projects data
  const initialProjects = [
    { id: '1', title: 'MTI' },
    { id: '2', title: 'MTI' },
    { id: '3', title: 'IT Star' },
    { id: '4', title: 'A bank' },
  ];

  // Sample events data
  const initialEvents: EventInput[] = [
    { 
      id: '1', 
      resourceId: '1', 
      title: 'Meeting', 
      start: new Date().toISOString().split('T')[0] + 'T10:00:00',
      end: new Date().toISOString().split('T')[0] + 'T12:00:00',
      color: '#3788d8',
      participants: ['user1@example.com', 'admin@example.com']
    },
  ];

  const [events, setEvents] = useState<EventInput[]>(initialEvents);
  const [projects, setProjects] = useState(initialProjects);

  const sendNotification = (title: string, participants: string[]) => {
    // In a real app, you would send this to your backend
    console.log(`Notification sent for "${title}" to:`, participants);
    
    // Show toast notification
    toast.success(`Meeting "${title}" notification sent to participants`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleDateClick = (arg: any) => {
    const title = prompt('Enter event title:');
    if (title) {
      const participants = prompt('Enter participant emails (comma separated):')?.split(',') || [];
      
      const newEvent: EventInput = {
        id: String(events.length + 1),
        title,
        start: arg.dateStr,
        resourceId: arg.resource?.id || projects[0].id,
        color: '#3a87ad',
        participants: [...participants, 'admin@example.com'] // Always include admin
      };
      
      setEvents([...events, newEvent]);
      sendNotification(title, newEvent.participants as string[]);
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (confirm(`Are you sure you want to delete event '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
      sendNotification(`Cancelled: ${clickInfo.event.title}`, 
        clickInfo.event.extendedProps.participants || []);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Calendar</h1>
        <div className="bg-white rounded-lg shadow p-4">
          <FullCalendar
            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
            plugins={[resourceTimelinePlugin, interactionPlugin]}
            initialView="resourceTimelineDay"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            resources={projects}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            views={{
              resourceTimelineDay: {
                buttonText: 'Day',
                slotDuration: '01:00:00'
              },
              resourceTimelineWeek: {
                buttonText: 'Week',
                slotDuration: '24:00:00'
              },
              resourceTimelineMonth: {
                buttonText: 'Month',
                slotDuration: '24:00:00'
              }
            }}
            nowIndicator={true}
            height="auto"
            eventContent={(eventInfo) => (
              <div>
                <b>{eventInfo.event.title}</b>
                {eventInfo.event.extendedProps.participants && (
                  <div className="text-xs">
                    Participants: {eventInfo.event.extendedProps.participants.length}
                  </div>
                )}
              </div>
            )}
          />
          <ToastContainer />
        </div>
      </div>
    </Layout>
  );
}