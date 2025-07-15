SchoolHub Web is a collection of educational management and learning tools made specifically for the Romanian education system.
Currently, SchoolHub Web contains three tools:

1. QuizCraft

QuizCraft is a flexible quiz generator based on various files provided to it, offering a solution for the self-assessment process. It can generate different types of questions, such as:
	•	Multiple Choice
	•	Single Choice
	•	True or False
	•	Short Answer
	•	Long Answer

A group contains multiple questions of the same type and difficulty level.

After completing a quiz, you’ll receive the correct answers to the questions, along with general feedback on what areas need further improvement and constructive criticism.

Technologies
	•	NextJS
	•	Tailwind CSS
	•	NextUI
	•	FontAwesome
	•	Gemini API 1.5-pro


2. Literaria

Literaria is a website about literature, film, and art—both Romanian and international. It features numerous categories that organize literature by literary periods and authors. The entire site is structured around sections and uses scroll snapping, creating a unique experience for the user.

The Home page contains 3 sections:
	•	Featured – A carousel showcasing the site’s three main areas of focus
	•	Highlight – A spotlight on articles we want to emphasize
	•	Latest Articles – The most recent articles published

Category

The Category page has three sections:
	•	Overview – An introduction to the category
	•	Description – A detailed description of the category
	•	Articles – The list of articles within that category

Article

The Article page represents the actual content of an article.

Technologies Used
	•	Next.js
	•	PostgreSQL
	•	Drizzle ORM
	•	Tailwind CSS
	•	Framer Motion

Database

Each article has a parent (except for the main categories), allowing the articles to be structured downward like in a folder system, with the categories being simple articles without sub-articles.

Images and their metadata are stored in Firebase.

Although the SchoolHub team developed the site entirely, we are grateful to our wonderful classmates and to our Romanian language and literature teacher, Raluca Iancău, for their contributions through writing the articles and creating the illustrations featured on the site.


3. SchoolHub GradeBook

SchoolHub GradeBook is a tool made to better visualize the grades and absences a student has on the NIC (NoteInCatalog) platform. Users can log in with their NIC credentials and see graphs, statistics and many more.

4. SchoolHub Grade Calculator

SchoolHub Grade Calculator is another tool made on top of NIC. It is used to see how future grades would influence your total average, so you know what grades to aim for.
