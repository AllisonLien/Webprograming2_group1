export type Post = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
};
export type Comment = {
  id: number;
  postId: number;
  name: string;
  text: string;
  date: string;
};
export const posts: Post[] = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "2026-01-20",
    excerpt:
      "Learn the basics of React and how components help you build reusable UI.",
    content: `
React is a JavaScript library for building user interfaces.

It is based on components — small, reusable building blocks that manage their own UI.

In this post, you learned:
• What components are
• How JSX works
• Why React uses a virtual DOM
• How props help pass data between components
`,
    category: "React",
    imageUrl: "/images/post1.jpg"
  },
  {
    id: 2,
    title: "Why TypeScript Makes React Safer",
    date: "2026-01-22",
    excerpt:
      "TypeScript helps catch bugs early and makes your code easier to understand.",
    content: `
TypeScript adds types to JavaScript.

With TypeScript in React, you can:
• Define props clearly
• Prevent runtime errors
• Improve IDE autocompletion
• Make large projects easier to maintain

This is why most modern React projects use TypeScript.
`,
    category: "TypeScript",
    imageUrl: "/images/post2.jpg"
  },
  {
    id: 3,
    title: "Understanding Props and State",
    date: "2026-01-24",
    excerpt:
      "Props and state are the heart of how data flows in React apps.",
    content: `
Props are used to pass data from a parent component to a child.

State is used to store data that can change over time.

Together, they allow React apps to:
• Respond to user input
• Update the UI automatically
• Keep components independent and reusable
`,
    category: "React",
    imageUrl: "/images/post3.jpg"
  },
  {
    id: 4,
    title: "Building Forms with Validation",
    date: "2026-01-26",
    excerpt:
      "Learn how to handle user input using forms, events, and validation.",
    content: `
Forms are how users interact with your app.

In React you can:
• Use useState to control inputs
• Validate before submit
• Show error messages
• Update the UI instantly

Libraries like React Hook Form help simplify this process.
`,
    category: "Forms",
    imageUrl: "/images/post4.jpg"
  }
];

