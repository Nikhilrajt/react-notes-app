export const demoNotes = [
    {
        id: crypto.randomUUID(),
        title: "Redux",
        content: "<p>Started my Redux journey</p>",
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
        content: "<p>Learning React advanced concepts</p>",
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
        content: "<p>Learning server-state management</p>",
        color: "green",
        tags: ["React", "TanStack"],
        stock: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pinned: false,
        archived: false
    }
];