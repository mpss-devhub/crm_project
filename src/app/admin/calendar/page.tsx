'use client';

import Layout from "@/components/Layout";
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type MeetingNote = {
  id: string;
  content: string;
  timestamp: string;
  author: string;
  issueTicket?: string;
};

export default function Calendar() {
  const [isAdmin] = useState(true); // Replace with actual admin check from your auth system
  const initialProjects = [
    { id: '1', title: 'MTI' },
    { id: '2', title: 'MTI' },
    { id: '3', title: 'IT Star' },
    { id: '4', title: 'A bank' },
  ];

  const initialEvents: EventInput[] = [
    {
      id: '1',
      resourceId: '1',
      title: 'Project Kickoff',
      start: new Date().toISOString().split('T')[0] + 'T10:00:00',
      end: new Date().toISOString().split('T')[0] + 'T12:00:00',
      color: '#3788d8',
      participants: ['user1@example.com', 'admin@example.com'],
      meetingNotes: [
        {
          id: '1',
          content: 'Initial project requirements discussed',
          timestamp: new Date().toISOString(),
          author: 'admin@example.com',
          issueTicket: 'PROJ-001'
        }
      ],
      meetLink: 'https://meet.google.com/abc-xyz-123'
    },
  ];

  const [events, setEvents] = useState<EventInput[]>(initialEvents);
  const [projects] = useState(initialProjects);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [newNote, setNewNote] = useState('');
  const [newTicket, setNewTicket] = useState('');
  const [newMeetLink, setNewMeetLink] = useState('');

  const sendNotification = (type: 'meeting' | 'note' | 'join', data: any) => {
    let message = '';
    let recipients: string[] = [];

    switch (type) {
      case 'meeting':
        message = `New meeting scheduled: ${data.title} on ${new Date(data.start).toLocaleString()}`;
        recipients = data.participants;
        break;
      case 'note':
        message = `New note added to "${data.eventTitle}": ${data.noteContent.substring(0, 30)}...`;
        recipients = data.participants;
        break;
      case 'join':
        message = `${data.userEmail} has joined the meeting: ${data.eventTitle}`;
        recipients = data.participants.filter((email: string) => email !== data.userEmail);
        break;
    }

    console.log(`Sending ${type} notification:`, { message, recipients });
    toast.info(message, { position: "bottom-right" });
  };

  const handleDateClick = (arg: any) => {
    if (!isAdmin) {
      toast.error('Only admins can create meetings');
      return;
    }

    const title = prompt('Enter meeting title:');
    if (title) {
      const participants = prompt('Enter participant emails (comma separated):')?.split(',').map(e => e.trim()) || [];
      const ticketId = prompt('Enter associated ticket ID (optional):') || '';
      const meetLink = prompt('Enter Google Meet link (optional):') || '';

      const newEvent: any = {
        id: `event-${Date.now()}`,
        title,
        start: arg.dateStr,
        resourceId: arg.resource?.id || projects[0].id,
        color: '#3a87ad',
        participants: [...participants, 'admin@example.com'],
        meetLink: meetLink || undefined,
        meetingNotes: ticketId ? [{
          id: `note-${Date.now()}`,
          content: `Meeting created for ticket ${ticketId}`,
          timestamp: new Date().toISOString(),
          author: 'system',
          issueTicket: ticketId
        }] : []
      };

      setEvents([...events, newEvent]);
      sendNotification('meeting', {
        title,
        start: arg.dateStr,
        participants: newEvent.participants,
        meetLink: newEvent.meetLink
      });
    }
  };

  const handleJoinMeeting = () => {
    if (!activeEvent) return;

    if (!activeEvent.extendedProps?.meetLink) {
      toast.error('No meeting link available for this event');
      return;
    }

    const userEmail = 'current_user@example.com';
    sendNotification('join', {
      eventTitle: activeEvent.title,
      userEmail,
      participants: activeEvent.extendedProps?.participants || []
    });

    window.open(activeEvent.extendedProps.meetLink, '_blank');
    toast.success(`Joining meeting: ${activeEvent.title}`);
  };

  const handleEventClick = (clickInfo: any) => {
    setActiveEvent(clickInfo.event);
    setNewMeetLink(clickInfo.event.extendedProps?.meetLink || '');
  };

  const addMeetingNote = () => {
    if (!activeEvent || !newNote) return;

    const updatedEvents = events.map(event => {
      if (event.id === activeEvent.id) {
        const notes = [
          ...(event.extendedProps?.meetingNotes || []),
          {
            id: `note-${Date.now()}`,
            content: newNote,
            timestamp: new Date().toISOString(),
            author: 'current_user@example.com',
            issueTicket: newTicket || undefined
          }
        ];

        sendNotification('note', {
          eventTitle: event.title,
          noteContent: newNote,
          participants: event.extendedProps?.participants || []
        });

        return {
          ...event,
          extendedProps: {
            ...event.extendedProps,
            meetingNotes: notes,
            meetLink: newMeetLink || event.extendedProps?.meetLink
          }
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    setNewNote('');
    setNewTicket('');
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Project Meeting Calendar</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
            <FullCalendar
              schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
              plugins={[resourceTimelinePlugin, interactionPlugin]}
              initialView="resourceTimelineDay"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
              }}
              editable={isAdmin}
              selectable={isAdmin}
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
              eventContent={(eventInfo) => (
                <div className="p-1">
                  <div className="font-bold">{eventInfo.event.title}</div>
                  {eventInfo.event.extendedProps.issueTicket && (
                    <div className="text-xs bg-blue-100 rounded px-1">
                      Ticket: {eventInfo.event.extendedProps.issueTicket}
                    </div>
                  )}
                  {eventInfo.event.extendedProps.meetLink && (
                    <div className="text-xs bg-green-100 rounded px-1 mt-1">
                      Google Meet Available
                    </div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            {activeEvent ? (
              isAdmin ? (
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-2">{activeEvent.title}</h2>
                    {activeEvent.extendedProps?.meetLink && (
                      <button
                        onClick={handleJoinMeeting}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
                        </svg>
                        Join Meeting
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      {new Date(activeEvent.start).toLocaleString()} - 
                      {activeEvent.end && new Date(activeEvent.end).toLocaleString()}
                    </p>
                    <p className="text-sm mt-1">
                      Project: {projects.find(p => p.id === activeEvent.resourceId)?.title}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Meeting Link</h3>
                    <input
                      type="text"
                      className="w-full p-2 border rounded mb-2"
                      value={newMeetLink}
                      onChange={(e) => setNewMeetLink(e.target.value)}
                      placeholder="Enter Google Meet link"
                    />
                    {activeEvent.extendedProps?.meetLink && (
                      <div className="text-sm text-blue-500 break-all">
                        <a href={activeEvent.extendedProps.meetLink} target="_blank" rel="noopener noreferrer">
                          {activeEvent.extendedProps.meetLink}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Participants</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeEvent.extendedProps?.participants?.map((email: string) => (
                        <span key={email} className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {email}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Meeting Notes</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {activeEvent.extendedProps?.meetingNotes?.map((note: MeetingNote) => (
                        <div key={note.id} className="p-2 border rounded">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{new Date(note.timestamp).toLocaleString()}</span>
                            <span>{note.author}</span>
                          </div>
                          <p className="mt-1">{note.content}</p>
                          {note.issueTicket && (
                            <div className="mt-1 text-xs bg-yellow-100 inline-block px-1 rounded">
                              Ticket: {note.issueTicket}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Add Note</h3>
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      rows={3}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Enter meeting notes..."
                    />
                    <input
                      type="text"
                      className="w-full p-2 border rounded mb-2"
                      value={newTicket}
                      onChange={(e) => setNewTicket(e.target.value)}
                      placeholder="Associated ticket ID (optional)"
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={addMeetingNote}
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold mb-2">{activeEvent.title}</h2>
                  <p className="text-sm text-gray-600">
                    {new Date(activeEvent.start).toLocaleString()} - 
                    {activeEvent.end && new Date(activeEvent.end).toLocaleString()}
                  </p>
                  <p className="text-sm mt-1">
                    Project: {projects.find(p => p.id === activeEvent.resourceId)?.title}
                  </p>
                  
                  {activeEvent.extendedProps?.meetLink && (
                    <button
                      onClick={handleJoinMeeting}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Join Meeting
                    </button>
                  )}
                </div>
              )
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a meeting to view details
              </div>
            )}
          </div>
        </div>

        <ToastContainer position="bottom-right" />
      </div>
    </Layout>
  );
}