export const demoNotes = [
    {
        id: crypto.randomUUID(),
        title: "Redux",
        content: "<p>Started my Redux journey. Learning stores, actions, reducers, and predictable state updates while building React applications.</p>",
        color: "pink",
        tags: ["Redux", "React", "JS"],
        stock: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pinned: true,
        archived: false
    },
    {
        id: crypto.randomUUID(),
        title: "React",
        content: "<p>Learning React advanced concepts including Context API, custom hooks, reducers, routing, and performance optimization.</p>",
        color: "blue",
        tags: ["React", "Frontend"],
        stock: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pinned: false,
        archived: false
    },
    {
        id: crypto.randomUUID(),
        title: "TanStack Query",
       content: "<p>Learning server-state management with queries, mutations, caching, loading states, and synchronization.</p>",
        color: "green",
        tags: ["React", "TanStack"],
        stock: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pinned: false,
        archived: false
    }
];