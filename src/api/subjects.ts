'use server';

import { isLogged } from '@/api/auth';
import api from '@/api/api';
import { parseSubjects } from '@/lib/nic-parser';
import { db } from '@/db/db';
import { eq } from 'drizzle-orm';
import { subjects } from '@/db/schema/subjects';
import { getSubjectID } from '@/lib/subject-id';
import { defaultGrades } from '@/data/default-grades';

export async function getSubjects() {
  const account = await isLogged();

  if (!account) {
    return false;
  }

  if (defaultGrades) {
    return defaultGrades;
  }

  const data = await api.get('https://www.noteincatalog.ro/moisilbv/elev.php');

  const fetchedSubjects = parseSubjects(data.data).map((el) => ({
    ...el,
    id: getSubjectID(el.name)
  }));

  const dbSubjects = await db
    .select()
    .from(subjects)
    .where(eq(subjects.userID, account.id));

  const newSubjects = fetchedSubjects.filter(
    (subject) => !dbSubjects.find((dbSubject) => dbSubject.nicID === subject.id)
  );

  if (newSubjects.length) {
    await db.insert(subjects).values(
      newSubjects.map((subject) => ({
        title: subject.name,
        icon: 'leaf',
        displayName: subject.name,
        nicID: getSubjectID(subject.name),
        userID: account.id
      }))
    );
  }

  return fetchedSubjects.map((subject) => {
    const dbSubject = dbSubjects.find(
      (dbSubject) => dbSubject.nicID === subject.id
    );

    return {
      absences: subject.absences,
      grades: subject.grades,
      name: dbSubject?.displayName ?? subject.name,
      id: subject.id,
      icon: dbSubject?.icon ?? 'leaf'
    };
  });
}
