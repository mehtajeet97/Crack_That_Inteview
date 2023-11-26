Group 20 - Crack that Inteview

Group Members:

1. Bhanu Srinivasa Sai Royal Koppolu
2. Dhruv Vaghela
3. Jeet Mehta
4. Siddharth Prabhakaran

Description : A website where users can sign up as an interviewee or interviewer. The interviewee can schedule an interview based on the skills he/she is preparing for the job. Interviewees can access interview questions for preparation, check out multiple interviewer’s profiles and proceed with who he/she is interested in. In addition, interviewees can send a request to connect with the interviewer. Interviewee has an interactive way of learning progress with rewards and penalties.

Steps for Initiation:

Step I. Clone URL (optional)

https://github.com/mehtajeet97/Crack_That_Inteview.git

Step II. Installing dependencies

Install npm dependencies in both the backend and ui sub-directories

npm install

Step III: Setting up environment variables:

Create a .env file in backend subdirectory as shown in the .env.example files

In `backend/.env`:
EXPRESS_PORT=
SMTP_EMAIL=
SMTP_SERVICE=
MAIL_PROTOCOL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_ACCESS_TOKEN=
GOOGLE_APP_PASSWORD=

Step IV. Run Seed File

Run the seed file in the backend sub-directory

npm run seed

Step V: Running the application

Run the application (npm start) first in the backend sub-directory
cd backend
npm start

Run the application next (npm start) in the ui subdirectory

cd ui
npm start

The webpage will now open!
