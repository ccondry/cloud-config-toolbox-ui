# cloud-config-toolbox-ui Change Log

Version numbers are semver-compatible dates in YYYY.MM.DD-X format,
where X is the revision number


# 2026.11.18-1

* **Build:** Fix `npm run build` failing on type-check errors, which made the
server install retry the build forever.
* **Dependencies:** Replace `@ntohq/buefy-next` with the official `buefy` 3 and
upgrade `bulma` from 0.9.4 to 1, using the published Buefy CSS instead of
compiling the Buefy and Bulma Sass source.
* **Site:** Move the theme's Bulma Sass variable overrides to Bulma 1 CSS
variables.


# 2026.11.18

* **Site:** Apply the dCloud Collaboration Toolbox glass theme: dark palette,
ambient background, glass panels and Inter font.
* **Header:** Show "dCloud Collaboration Toolbox" beside the Cisco logo, with
Home, Demo Configurations (current page, with a spinning gradient border) and
Admin (admins only) buttons.
* **Header:** Add the dCloud Applications dial pad menu and the user avatar
account menu with Log out.
* **Footer:** Show copyright and UI and API versions in the page footer.
* **Login:** Forget expired, invalid or rejected JWTs and show the dev JWT login
prompt.


# 2025.4.18

* **Site:** Upgrade project to use Vue 3, Vite, Typescript.
* **Agent Answers:** Updated upload card to support AI Agent and Dialogflow CX
as well.


# 2022.1.27

* **Agent Answers:** Remove the display of current agent answers file.


# 2021.9.17-2

### Fixes
* **Agent Answers:** Set the questions column to be 30% of the table width, so
it doesn't get crushed when answers are long.


# 2021.9.17-1

### Fixes
* **Agent Answers:** Fix missing error message when upload file fails (again).


# 2021.9.17

### Fixes
* **Agent Answers:** Add missing error message when upload file fails. Update
the color of the success message from gray to green.


# 2021.2.25

### Features
* **Agent Answers:** Rename Cisco Answers to Agent Answers.


# 2021.2.24-1

### Bug Fixes
* **Cisco Answers:** Refresh KB data after uploading.


# 2021.2.24

### Features
* **Cisco Answers:** Add display of user's existing Cisco Answers KB, and
improve feedback when user uploads a replacement KB.


# 2021.2.23

### Features
* **Cisco Answers:** Add alert stating please wait 24-48 hours for the CSV file
to be demo-ready.


# 2021.2.22

### Features
* **Cisco Answers:** Implement real file upload for Cisco Answers KB CSV.


# 2021.2.18-1

### Features
* **Cisco Answers:** Add a mocked up Cisco Answers upload knowledge base file
form.


# 2021.2.18

### Features
* **Created:** Forked from webex-v4-toolbox-ui version 2021.2.18
