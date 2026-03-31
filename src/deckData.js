import students from './data/students.json'

export const NOTE_KEY = 'daily-activities-choice-board-student-notes'
export const BOARD_SLIDE_ID = 3
export const REVIEW_SLIDE_ID = 10

const STUDENT_SLIDE_START_ID = REVIEW_SLIDE_ID + 1

const activityThemes = [
  { accent: '#8fc63f', soft: '#eef8db', icon: '\u{1F33F}' },
  { accent: '#f21878', soft: '#ffe0ef', icon: '\u{1F3A8}' },
  { accent: '#f5a400', soft: '#fff0cc', icon: '\u{1F9E9}' },
  { accent: '#8b5cf6', soft: '#efe6ff', icon: '\u{1F4DA}' },
  { accent: '#22c55e', soft: '#dbfce7', icon: '\u270D\uFE0F' },
  { accent: '#5b97dd', soft: '#ddecff', icon: '\u{1F4A1}' },
]

const activityTemplates = [
  {
    slug: 'reading-warm-up',
    title: 'Reading Warm-Up',
    shortLabel: 'Read',
    headline: 'Morning Message and Quick Response',
    summary:
      'Students read a short classroom message, identify the main idea, and respond with one complete sentence.',
    focus: 'Reading comprehension',
    goal: 'Identify the message and support it with one detail',
    reminder: 'Underline the clue that helped you answer',
    reflectionTitle: 'Reading Reflection',
    prompt: 'Which part of the reading was easiest to understand, and which detail helped you most?',
    placeholder:
      'Today I read about...\n\nThe main idea was...\n\nA detail that helped me was...\n\nNext time I will...',
    playMode: 'single-player',
    modeLabel: 'Single Player',
    modeDescription: 'Best for quiet seatwork where one student reads, thinks, and answers on their own.',
    miniTutorial: [
      'Open the activity and read the short message from top to bottom one time.',
      'Highlight or underline one clue that supports the main idea.',
      'Write one complete sentence before moving back to the board.',
    ],
    content: [
      'Read the morning message or short passage quietly from beginning to end.',
      'Find the main idea and underline one detail that supports it.',
      'Write one complete sentence explaining what the message was mostly about.',
    ],
  },
  {
    slug: 'creative-sketch',
    title: 'Creative Sketch',
    shortLabel: 'Art',
    headline: 'Draw What You Learned',
    summary:
      'Students create a quick visual response that shows the topic, character, or idea they understood best.',
    focus: 'Visual expression',
    goal: 'Turn one idea into a clear drawing with labels',
    reminder: 'Use color or labels to make meaning visible',
    reflectionTitle: 'Art Reflection',
    prompt: 'How did your drawing help you show what you understood today?',
    placeholder:
      'My drawing showed...\n\nI chose these details because...\n\nThe part I liked most was...\n\nNext time I want to...',
    playMode: 'single-player',
    modeLabel: 'Single Player',
    modeDescription: 'Ideal for independent creativity where each student turns learning into a personal sketch.',
    miniTutorial: [
      'Pick one idea from the lesson before you start drawing.',
      'Sketch the big details first, then add labels or short captions.',
      'Compare the drawing to the lesson and add one final detail that makes it clearer.',
    ],
    content: [
      'Think about the idea or topic you want to show before you start drawing.',
      'Sketch the most important details first, then add labels or short captions.',
      'Check if your drawing clearly matches what you learned in class today.',
    ],
  },
  {
    slug: 'math-challenge',
    title: 'Math Challenge',
    shortLabel: 'Math',
    headline: 'Solve a Pattern or Problem-Solving Task',
    summary:
      'Students work through a short math task, explain their thinking, and check if their answer makes sense.',
    focus: 'Problem solving',
    goal: 'Show both the answer and the thinking behind it',
    reminder: 'Write or say how you solved the problem',
    reflectionTitle: 'Math Reflection',
    prompt: "What strategy worked best for you while solving today's math task?",
    placeholder:
      'The problem asked me to...\n\nMy strategy was...\n\nI knew my answer made sense because...\n\nNext time I will...',
    playMode: 'multiplayer',
    modeLabel: 'Multiplayer',
    modeDescription: 'Works well with partners so students can compare strategies and check each others thinking.',
    miniTutorial: [
      'Read the problem together and agree on what the question is asking.',
      'Let each player share one possible strategy before solving.',
      'Compare answers, then explain why the final answer makes sense.',
    ],
    content: [
      'Read the math task carefully and circle the numbers or clues you need.',
      'Solve it step by step and show your strategy using words, numbers, or a model.',
      'Check your final answer and explain why it makes sense.',
    ],
  },
  {
    slug: 'word-work',
    title: 'Word Work',
    shortLabel: 'Words',
    headline: 'Practice Vocabulary in Context',
    summary:
      'Students explore key words, match them to meaning, and use them in a sentence connected to class learning.',
    focus: 'Vocabulary building',
    goal: 'Use new words correctly in context',
    reminder: 'Say the word, learn the meaning, then use it',
    reflectionTitle: 'Vocabulary Reflection',
    prompt: 'Which new word do you feel most confident using, and how would you use it again?',
    placeholder:
      'A new word I learned was...\n\nIt means...\n\nI used it in a sentence: ...\n\nI want to remember this word because...',
    playMode: 'multiplayer',
    modeLabel: 'Multiplayer',
    modeDescription: 'Great for pairs or small groups that can quiz each other and build sentences together.',
    miniTutorial: [
      'Read each word aloud with your partner or group.',
      'Match the word to the correct meaning before writing a sentence.',
      'Take turns checking if the sentence uses the word correctly.',
    ],
    content: [
      'Read each vocabulary word and match it to the correct meaning or example.',
      "Choose one word and use it in a sentence about today's lesson.",
      'Review your sentence to make sure the word fits the meaning correctly.',
    ],
  },
  {
    slug: 'writing-time',
    title: 'Writing Time',
    shortLabel: 'Write',
    headline: 'Write a Short Response With Details',
    summary:
      'Students organize a short written response with a clear beginning, supporting detail, and complete sentences.',
    focus: 'Written expression',
    goal: 'Write clearly with one main idea and supporting details',
    reminder: 'Read your work aloud before finishing',
    reflectionTitle: 'Writing Reflection',
    prompt: 'What helped you write a clearer response today?',
    placeholder:
      'Today I wrote about...\n\nMy main idea was...\n\nA detail I added was...\n\nI improved my work by...',
    playMode: 'single-player',
    modeLabel: 'Single Player',
    modeDescription: 'Designed for focused writing time where students plan, draft, and revise independently.',
    miniTutorial: [
      'Read the prompt and decide on one clear main idea.',
      'Write two or three sentences that stay focused on that idea.',
      'Reread the draft and fix any missing punctuation or unclear wording.',
    ],
    content: [
      'Read the prompt and decide on the main idea you want to share.',
      'Write two or three complete sentences that stay focused on that idea.',
      'Reread your response and fix any missing words, punctuation, or unclear parts.',
    ],
  },
  {
    slug: 'exit-ticket',
    title: 'Exit Ticket',
    shortLabel: 'Reflect',
    headline: 'Finish With One Strong Takeaway',
    summary:
      'Students wrap up the lesson by sharing one thing they learned, one challenge, and one goal for next time.',
    focus: 'Reflection and closure',
    goal: 'Summarize the day with honesty and clarity',
    reminder: 'Keep your answer short, specific, and thoughtful',
    reflectionTitle: 'Daily Wrap-Up',
    prompt: 'What is one important thing you learned today, and what would you like to practice again?',
    placeholder:
      'One thing I learned today was...\n\nA part that challenged me was...\n\nI am proud that I...\n\nNext time I want to practice...',
    playMode: 'single-player',
    modeLabel: 'Single Player',
    modeDescription: 'Best as a personal end-of-class check-in so every student can reflect at their own pace.',
    miniTutorial: [
      'Think of one thing you learned before you start typing.',
      'Add one challenge and one next step in short, specific sentences.',
      'Review your answer and save it before leaving the board.',
    ],
    content: [
      'Think about the lesson and choose one idea, skill, or fact that stayed with you.',
      'Write a short answer about what went well and what still feels challenging.',
      'Set one small goal for the next class or activity period.',
    ],
  },
]

export const activitySlides = activityTemplates.map((activity, index) => ({
  id: index + 4,
  kind: 'activity',
  number: index + 1,
  ...activity,
  ...activityThemes[index],
}))

const activityBySlug = Object.fromEntries(activitySlides.map((slide) => [slide.slug, slide]))

export const mockStudents = students.map((student, index) => {
  const assignedActivity = activityBySlug[student.activitySlug] ?? activitySlides[index % activitySlides.length]

  return {
    ...student,
    slideId: STUDENT_SLIDE_START_ID + index,
    accent: assignedActivity.accent,
    assignedActivityId: assignedActivity.id,
    assignedActivityTitle: assignedActivity.title,
    assignedHeadline: assignedActivity.headline,
    playMode: assignedActivity.playMode,
    modeLabel: assignedActivity.modeLabel,
    modeDescription: assignedActivity.modeDescription,
    prompt: assignedActivity.prompt,
    placeholder:
      `${student.reflectionStarter}\n\nThe part I found easiest was...\n\nI still need help with...\n\nMy next step is...`,
  }
})

const studentCountsByActivity = mockStudents.reduce((counts, student) => {
  counts[student.activitySlug] = (counts[student.activitySlug] ?? 0) + 1
  return counts
}, {})

export const studentSlides = mockStudents.map((student, index) => ({
  id: student.slideId,
  kind: 'student',
  title: student.name,
  shortLabel: `S${index + 1}`,
  accent: student.accent,
  preview: student.assignedHeadline,
  prompt: student.prompt,
  placeholder: student.placeholder,
  studentId: student.id,
  section: student.section,
  status: student.status,
  goal: student.goal,
  assignedActivityTitle: student.assignedActivityTitle,
  modeLabel: student.modeLabel,
  playMode: student.playMode,
  modeDescription: student.modeDescription,
}))

export const slides = [
  {
    id: 1,
    kind: 'intro',
    title: "Today's Learning Flow",
    shortLabel: 'Today',
    subtitle: 'Welcome to our classroom choice board',
    description:
      'Move through warm-ups, creative tasks, and quick reflections at a steady pace.',
    tags: ['Warm-up', 'Independent work', 'Creative tasks', 'Reflection'],
  },
  {
    id: 2,
    kind: 'intro',
    title: 'Pick Your Next Task',
    shortLabel: 'Choice',
    subtitle: 'Choose a station and get started',
    description:
      'Each card now shows whether the activity is single-player or multiplayer, how many students are assigned, and a quick mini tutorial.',
    tags: ['Clear steps', 'Single or multi', 'Student list', 'Ready for class'],
  },
  {
    id: BOARD_SLIDE_ID,
    kind: 'board',
    title: 'Activity Board',
    shortLabel: 'Board',
    description:
      'Open any card to see the directions, player mode, mini tutorial, and assigned student count.',
    items: activitySlides.map((slide) => ({
      id: slide.id,
      number: slide.number,
      label: slide.title,
      headline: slide.headline,
      accent: slide.accent,
      soft: slide.soft,
      icon: slide.icon,
      playMode: slide.playMode,
      modeLabel: slide.modeLabel,
      modeDescription: slide.modeDescription,
      assignedCount: studentCountsByActivity[slide.slug] ?? 0,
    })),
  },
  ...activitySlides,
  {
    id: REVIEW_SLIDE_ID,
    kind: 'review',
    title: 'Reflection Board',
    shortLabel: 'Review',
    description:
      'Choose a student card to review the assigned activity, mode, and reflection journal.',
    count: studentSlides.length,
    students: studentSlides.map((slide) => ({
      id: slide.id,
      label: slide.title,
      accent: slide.accent,
      preview: slide.preview,
      section: slide.section,
      status: slide.status,
      assignedActivityTitle: slide.assignedActivityTitle,
      modeLabel: slide.modeLabel,
      playMode: slide.playMode,
    })),
  },
  ...studentSlides,
]

export const slideSections = [
  { title: 'Start', ids: [1, 2, BOARD_SLIDE_ID] },
  { title: 'Activities', ids: activitySlides.map((slide) => slide.id) },
  { title: 'Reflection', ids: [REVIEW_SLIDE_ID, ...studentSlides.map((slide) => slide.id)] },
]

export const quickLinks = [
  { label: 'Welcome', id: 1 },
  { label: 'Activities', id: BOARD_SLIDE_ID },
  { label: 'Reflection', id: REVIEW_SLIDE_ID },
]

export const defaultNotes = Object.fromEntries(studentSlides.map((slide) => [slide.id, '']))
