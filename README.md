# Setup Instructions

```bash
bun install
bun run dev
```

# Review

The entire coding session was captured using [asciinema](https://asciinema.org/), a text-based terminal recording tool. The recording is saved here in the git repo as `takehome.cast`. You can play back the recording at a faster speed and skip idle gaps with this command:

```bash
asciinema play -s 4 -i 1 takehome.cast
```

NOTE: a modern terminal emulator such as Alacritty, Kitty, WezTerm is recommended for playback.


# Approach
Before the takehome started I set up a basic react app using Vite, TypeScript, and the ChakraUI component library.

I started the coding portion of the takehome by creating a basic layout with 2 "pages" (just components swapped out based on a `useState` variable). From there, I worked on adding a file upload widget with drag and drop. This was done leveraging components from ChakraUI library.

Next I worked on reading and parsing the file, and creating a TypeScript interface that represented the data in the JSON files to ensure code written for the rest of the session was as type safe as possible.

Once I had the JSON parsed, I moved on to working on the visualization screen. First I added a simple 2 column table to the bottom portion of the page.

After this I installed the `recharts` library and started working on charts. I added a sample chart from the recharts docs.

After struggling for a while, I eventually got a nice timeseries chart set up.

As a final touch I implemented the reset button and automatic transition between the upload and visualization pages.

# Assumptions

There were a number of assumptions made in the code. The major assumption was that the data was well structured and (mostly) hydrated. There are a few basic checks that defend against empty files, invalid JSON, JSON without the expected keys, but ideally we would do a little more inspection and validation of the data before we just pipe it straight into recharts.

Another assumption was that the user only uploads one file at a time. There is a TODO in the code to handle drag and drop of multiple files.

Finally, I assumed the experience was being viewed on a desktop sized screen and did not bother implementing mobile styles.


# Opportunities for Improvement

- Use a router library to render the two pages with unique paths. This also means the browser "Back" button would work as expected, which currently it does not.
- As mentioned above, do more validation of the data.
- Add more than one metric, with the option to switch between multiple charts or select which metric you want to visualize.
- Limit the height of the table to create a proper scrolling container on the bottom half of the page (currently it scrolls the entire page and the chart can go off screen)
- Use more carefully picked colors for the chart
- Add chart legend and hover tooltips
- Add axis labels
- Add greeting message with instructions for the user, e.g. what type of file is expected
- Refactor the Table display to a separate component
- Memoize the responses data to avoid possible expensive re-renders of the chart
- Verify the typescript interface for `LLMResponse` against actual data to figure out which fields are nullable (its likely incorrect right now)
- Delete unused boilerplate components in `src/components/ui/*`
- Handle fatal errors (e.g. `throw new Error(...)`) with an `ErrorBoundary` and a friendly display to the user instead of just crashing the app.
- Use the browser built-in IndexedDB API to store file uploads and present a list of previous uploads with the ability to view any of them on demand.
- Fix any outstanding TODOs not captured above


Beyond the above, I would improve overall code quality throughout the app. I would consider readability, variable naming, organization, etc more carefully, and I would add a lot more comments. All of these aspects suffered greatly due to time constraints.
