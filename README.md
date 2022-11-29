# Development

### Link to Deployed Website
[`https://sleepysloth444.github.io/cs1300-development/`](https://sleepysloth444.github.io/cs1300-development/)

### Goal and Value of the Application
The goal of this application is to provide users a quick and easy interface with which to fliter and sort the generation 1 pokemon! Since there are so many pokemon, sometimes it can be hard to remember which pokemon belong to each type or what dual-types there are, so this application simplifies the process of finding all the gen 1 pokemon of a given type. The application also provides basic utilities for drafting a 6-pokemon team and assessing team strength by aggregating base stat totals.

### Usability Principles Considered
In terms of layout and heirarchy, the main content of the page is the Pokemon, which appropriately take up the majority of the center of the page. Since the center has a lot of scrolling content, I put the filtering on the right side and my aggregator (team selector) in sticky boxes (using the `StickyBox` component from the `react-sticky-box` package) so that they remain in view even as the user scrolls through the multitude of pokemon available in generation 1. In addition, as I am pulling my data from a pokemon API (courtesy of the `PokeAPI` package), there is some load time associated with pulling the data (data are cached after first pull, so the first load tends to take a bit longer), so I put a brief loading message to display wihle loading certain elements of the page that depend on the data.

### Organization of Components
My `App` component encodes the basic structure and layout of my page, as well as loading in the data, initializing global state variables, and managing filtering centrally.

On the right side, I have a sidebar consisting of my filters and sorting. `FilterGroup` components contain the filters for each category and record which attribute is being filtered. Each `FilterGroup` contains nested `FilterItem` components, which handle recording that each specific attribute has/has not been filtered for. Similarly, my `SortGroup` component contains the options for sorting and handles sorting centrally (since only one sorting option may be selected at time, unlike multiple concurrent filters wihch may coexist). `SortItem` components make up the individual sorting options for sorting. There is a reset button at the end of this sidebar which resets all filters and sets sorting to the default option (national dex sorting).

In the middle, my `Display` component renders `Pokemon` component cards for each pokemon in the `displayList` (which changes contents/ordering based on the selected filter/sort options). Each `Pokemon` card shows the Pokemon's image, name, types, base stat total, and a quick description. In addition, Legendary pokemon are marked with an `(L)` next to their name, and Mythical pokemon are marked with a `(M)`. Finally, each `Pokemon` card contains an `AddButton` component which allows pokemon to be added to the `team` list. Since a team of pokemon is no more than 6 pokemon, a the `AddButton` renders a popup warning users that no more than 6 pokemon can be added to the team if it is clicked when 6 or more pokemon are in the team.

On the right side, my `Team` component displays the pokemon currently in the `team` list, as well as aggregating the base stat total of the pokemon in the team to give an estimate of the team's strength. Each pokemon has a red `x` button next to it that allows it to be removed from the team.

### How Data are Passed Down Through Components
Data are passed down through components using props. Related fields or fields that are not always used by the immediate children are packed into objects to reduce the number of fields required. Props allow us to pass information between components so that multiple components have access to state without having to be in the same file/functoinal components

### How the User Triggers State Changes
Upon load, the `data` state is updated by the API call without user action. However, various state changes can be triggered by the user interacting with various page elements. For example, clicking on a `FilterItem` changes that `FilterItem`'s `applied` state, as well as the global `filters` state to apply that filter and reflect this change visually. Similarly, the `team` list stat can be changed by the user. Clicking on a `SortItem` changes the currently applied sorting to that sorting method. Clicking an `AddButton` adds the corresponding pokemon to the `team` list with a unique key, and clicking the remove button in the `Team` component removes the respective pokemon from the `team` list. Although this overview of state variables is not exhaustive, it gives a general idea of how state variables can be changed by the user.
