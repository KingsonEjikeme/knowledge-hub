import React, { useState } from 'react';

interface Task {
  id: number;
  task: string;
  responsible: string;
  owner: string;
  deadline: string;
  status: string;
  notes: string;
}

interface Section {
  title: string;
  tasks: Task[];
}

interface ContactRow {
  department: string;
  contactPerson: string;
  email: string;
  phone: string;
  notes: string;
}

/**
 * WorkshopPage contains a detailed checklist and progress tracker for planning
 * and executing a Knowledge Capture and Retention Strategy Workshop. Each
 * section of the checklist is rendered in a table and includes editable fields
 * for the owner, deadline, status and notes. A contact list and risk
 * mitigation section are also provided.
 */
const WorkshopPage: React.FC = () => {
  // Define the full checklist broken down into sections
  const initialSections: Section[] = [
    {
      title: 'Pre-Workshop Planning (3–4 Weeks Before)',
      tasks: [
        {
          id: 1,
          task: 'Confirm workshop date and duration',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 2,
          task: 'Develop workshop agenda and objectives',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 3,
          task: 'Identify and confirm list of KM Focal Persons',
          responsible: 'HCM',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 4,
          task: 'Secure budget approval',
          responsible: 'Finance/Admin',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 5,
          task: 'Brief HCM Leadership Team on workshop plan',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
      ],
    },
    {
      title: 'Logistics & Venue (2–3 Weeks Before)',
      tasks: [
        {
          id: 6,
          task: 'Submit venue request to Corporate Admin Services',
          responsible: 'Corporate Admin Services',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 7,
          task: 'Confirm venue booking and setup requirements',
          responsible: 'Corporate Admin Services',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 8,
          task: 'Arrange seating layout (U-shape/classroom/roundtable)',
          responsible: 'Corporate Admin Services',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 9,
          task: 'Confirm accessibility and parking arrangements',
          responsible: 'Corporate Admin Services',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
      ],
    },
    {
      title: 'Catering & Welfare (2 Weeks Before)',
      tasks: [
        {
          id: 10,
          task: 'Submit catering request to Welfare Department',
          responsible: 'Welfare',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'Include dietary requirements',
        },
        {
          id: 11,
          task: 'Confirm menu and meal times',
          responsible: 'Welfare',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'Tea breaks, lunch',
        },
        {
          id: 12,
          task: 'Arrange refreshments (water, tea/coffee)',
          responsible: 'Welfare',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'Throughout the day',
        },
        {
          id: 13,
          task: 'Confirm final headcount for catering',
          responsible: 'Welfare',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '3 days before event',
        },
      ],
    },
    {
      title: 'Technology & AV Support (2 Weeks Before)',
      tasks: [
        {
          id: 14,
          task: 'Submit AV requirements to ITD',
          responsible: 'ITD',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'Projector, screens, mics, laptop',
        },
        {
          id: 15,
          task: 'Test all AV equipment',
          responsible: 'ITD',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'Day before workshop',
        },
        {
          id: 16,
          task: 'Ensure stable internet connectivity',
          responsible: 'ITD',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'For virtual components',
        },
        {
          id: 17,
          task: 'Arrange tech support during workshop',
          responsible: 'ITD',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'On-call technician',
        },
        {
          id: 18,
          task: 'Prepare backup equipment',
          responsible: 'ITD',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'Spare laptop, adapters',
        },
      ],
    },
    {
      title: 'Materials & Documentation (1–2 Weeks Before)',
      tasks: [
        {
          id: 19,
          task: 'Prepare workshop materials and presentations',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 20,
          task: 'Print participant folders/binders',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 21,
          task: 'Prepare name tags/tent cards',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 22,
          task: 'Print attendance sheets',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 23,
          task: 'Prepare feedback/evaluation forms',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 24,
          task: 'Prepare certificates of participation (if applicable)',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 25,
          task: 'Arrange stationery (pens, notepads, flip charts)',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
      ],
    },
    {
      title: 'Communication & Invitations (2–3 Weeks Before)',
      tasks: [
        {
          id: 26,
          task: 'Send formal invitations to KM Focal Persons',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 27,
          task: 'Send pre-reading materials (if any)',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 28,
          task: 'Send travel/accommodation guidance',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'For out-of-station participants',
        },
        {
          id: 29,
          task: 'Send reminder email (1 week before)',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 30,
          task: 'Send final reminder (1 day before)',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'Include agenda, venue details',
        },
        {
          id: 31,
          task: 'Notify security of expected visitors',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
      ],
    },
    {
      title: 'Final Preparations (1 Week Before)',
      tasks: [
        {
          id: 32,
          task: 'Conduct final walkthrough of venue',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 33,
          task: 'Confirm all vendor arrangements',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 34,
          task: "Prepare facilitator's guide/script",
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 35,
          task: 'Brief facilitators/presenters',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 36,
          task: 'Prepare emergency contact list',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
      ],
    },
    {
      title: 'During Workshop (Workshop Day)',
      tasks: [
        {
          id: 37,
          task: 'Set up registration desk',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '30 mins before start',
        },
        {
          id: 38,
          task: 'Conduct AV equipment check',
          responsible: 'ITD',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '30 mins before start',
        },
        {
          id: 39,
          task: 'Distribute materials to participants',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 40,
          task: 'Take attendance',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 41,
          task: 'Take photos/documentation',
          responsible: 'Communications/PR',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 42,
          task: 'Monitor session timing',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 43,
          task: 'Distribute and collect feedback forms',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'End of workshop',
        },
      ],
    },
    {
      title: 'Post-Workshop Activities (1–2 Weeks After)',
      tasks: [
        {
          id: 44,
          task: 'Compile and analyze feedback forms',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 45,
          task: 'Prepare workshop report',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: 'Include outcomes, action items',
        },
        {
          id: 46,
          task: 'Share workshop photos and highlights',
          responsible: 'Communications',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 47,
          task: 'Distribute workshop materials/presentations',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 48,
          task: 'Send thank you notes to participants',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 49,
          task: 'Present feedback and outcomes to HCM Leadership Team',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 50,
          task: 'Document lessons learned',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 51,
          task: 'Follow up on action items identified',
          responsible: 'Organizing Team',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
        {
          id: 52,
          task: 'Archive all workshop documentation',
          responsible: 'Admin Support',
          owner: '',
          deadline: '',
          status: 'Not Started',
          notes: '',
        },
      ],
    },
  ];

  // Define the contact list rows
  const initialContacts: ContactRow[] = [
    {
      department: 'Corporate Admin Services',
      contactPerson: '',
      email: '',
      phone: '',
      notes: 'Venue',
    },
    {
      department: 'Welfare Department',
      contactPerson: '',
      email: '',
      phone: '',
      notes: 'Catering',
    },
    {
      department: 'ITD',
      contactPerson: '',
      email: '',
      phone: '',
      notes: 'AV Support',
    },
    {
      department: 'HCM Leadership Team',
      contactPerson: '',
      email: '',
      phone: '',
      notes: 'Reporting',
    },
    {
      department: 'Security',
      contactPerson: '',
      email: '',
      phone: '',
      notes: 'Access control',
    },
    {
      department: 'Communications/PR',
      contactPerson: '',
      email: '',
      phone: '',
      notes: 'Documentation',
    },
  ];

  // Component state to hold editable tasks and contacts
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [contacts, setContacts] = useState<ContactRow[]>(initialContacts);

  // Helper function to update a task field
  const updateTask = (
    sectionIndex: number,
    taskIndex: number,
    field: keyof Task,
    value: string,
  ) => {
    setSections((prev) => {
      const updated = [...prev];
      const task = { ...updated[sectionIndex].tasks[taskIndex], [field]: value };
      updated[sectionIndex] = {
        ...updated[sectionIndex],
        tasks: updated[sectionIndex].tasks.map((t, i) => (i === taskIndex ? task : t)),
      };
      return updated;
    });
  };

  // Helper function to update a contact field
  const updateContact = (
    index: number,
    field: keyof ContactRow,
    value: string,
  ) => {
    setContacts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Status options for tasks
  const statusOptions = ['Not Started', 'Started', 'In Progress', 'Completed'];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Knowledge Capture and Retention Strategy Workshop
          </h1>
          <p className="text-sm opacity-80">Checklist &amp; Progress Tracker</p>
        </div>
        <div className="bg-white rounded-md p-2">
          <img src="/nnpc_ltd_logo.png" alt="NNPC logo" className="h-8" />
        </div>
      </header>
      <main className="p-6 space-y-8">
        {/* Location, date, duration and attendees info */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600">Location</label>
            <input
              type="text"
              defaultValue="CHQ, Abuja"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Date</label>
            <input
              type="date"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Duration</label>
            <input
              type="text"
              placeholder="e.g., 2 days"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Attendees</label>
            <input
              type="text"
              defaultValue="KM Focal Persons (Physical)"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
        </section>
        {/* Checklist sections */}
        {sections.map((section, sectionIndex) => (
          <section
            key={section.title}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm overflow-x-auto"
          >
            <h2 className="font-semibold text-gray-700 mb-3">{section.title}</h2>
            <table className="min-w-max text-sm border-collapse w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 w-6">#</th>
                  <th className="border p-2">Task</th>
                  <th className="border p-2">Responsible Unit</th>
                  <th className="border p-2">Owner</th>
                  <th className="border p-2">Deadline</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {section.tasks.map((task, taskIndex) => (
                  <tr key={task.id} className="hover:bg-purple-50">
                    <td className="border p-2 text-center">{task.id}</td>
                    <td className="border p-2 whitespace-normal">{task.task}</td>
                    <td className="border p-2 whitespace-nowrap">{task.responsible}</td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={task.owner}
                        onChange={(e) =>
                          updateTask(sectionIndex, taskIndex, 'owner', e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="date"
                        value={task.deadline}
                        onChange={(e) =>
                          updateTask(sectionIndex, taskIndex, 'deadline', e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateTask(sectionIndex, taskIndex, 'status', e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={task.notes}
                        onChange={(e) =>
                          updateTask(sectionIndex, taskIndex, 'notes', e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
        {/* Contact list */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm overflow-x-auto">
          <h2 className="font-semibold text-gray-700 mb-3">Contact List</h2>
          <table className="min-w-max text-sm border-collapse w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2">Department/Unit</th>
                <th className="border p-2">Contact Person</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((row, idx) => (
                <tr key={row.department} className="hover:bg-purple-50">
                  <td className="border p-2 whitespace-nowrap">{row.department}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.contactPerson}
                      onChange={(e) => updateContact(idx, 'contactPerson', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="email"
                      value={row.email}
                      onChange={(e) => updateContact(idx, 'email', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="tel"
                      value={row.phone}
                      onChange={(e) => updateContact(idx, 'phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-1"
                    />
                  </td>
                  <td className="border p-2 whitespace-nowrap">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Status key and potential risks */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-2">Status Key</h2>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Not Started</span> |{' '}
            <span className="font-medium">Started</span> |{' '}
            <span className="font-medium">In Progress</span> |{' '}
            <span className="font-medium">Completed</span>
          </p>
          <h2 className="font-semibold text-gray-700 mb-2">Potential Risks &amp; Mitigation</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>
              <span className="font-medium">Venue double-booking</span> → Confirm all bookings in writing
            </li>
            <li>
              <span className="font-medium">AV equipment failure</span> → Test equipment day before
            </li>
            <li>
              <span className="font-medium">Low participant turnout</span> → Send multiple reminders
            </li>
            <li>
              <span className="font-medium">Catering delays</span> → Have backup snacks available
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default WorkshopPage;