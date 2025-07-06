export function convertToDate(dateString: string): Date | undefined {
  const [day, month] = dateString.split('.').map(Number);
  if (isNaN(day) || isNaN(month)) return undefined;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const yearToUse =
    month >= 9 && currentMonth < 9 ? currentYear - 1 : currentYear;

  return new Date(yearToUse, month - 1, day);
}

export function parseSubjects(document: string): {
  name: string;
  grades: {
    timestamp: string;
    value: number;
  }[];
  absences: {
    timestamp: string;
    excused: boolean;
  }[];
}[] {
  const result: any = [];

  // First regex to get subjects names
  const regex1 =
    /<th name=['"]n\d+['"] id=['"]n\d+['"].*align=['"]center['"][^>]*>([^<]*)/g;
  const matches1 = Array.from(document.matchAll(regex1));

  matches1.forEach((match) => {
    const name = match[1];
    result.push({
      name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      displayName: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(), // Add default value as per interface
      hidden: false, // Add default value as per interface
      materialIconName: 'book', // Add default value as per interface
      grades: [],
      absences: [],
      timeSlots: []
    });
  });

  // Parse absences
  const regex2 =
    /<table class=['"]tbNoteAbs['"] border=['"]0['"] cellpadding=['"]0['"] cellspacing=['"]0['"]>([\s\S]*?)<\/table>/g;
  const matches2 = Array.from(document.matchAll(regex2));

  matches2.forEach((match, index) => {
    const regex3 =
      /<\s*td\s*class="ctdNoteddDate.*?"\s*align="left"\s*>.*?<\/td>/g;
    const matches3 = Array.from(match[1].matchAll(regex3));

    const currentAbsences: any = [];

    matches3.forEach((match3) => {
      let date: Date | undefined;
      let excused: boolean | undefined;

      const regex4 = /[\d.]+/;
      const match4 = match3[0].match(regex4);
      if (match4) {
        date = convertToDate(match4[0]);
      }

      const regex5 = /cAbsMot/;
      excused = regex5.test(match3[0]);

      if (date) {
        currentAbsences.push({
          timestamp: date,
          excused: excused
        });
      }
    });

    if (result[index]) {
      result[index].absences = currentAbsences;
    }
  });

  // Parse grades
  const regex6 =
    /<table class=['"]tbNoteNote['"] border=['"]0['"] cellpadding=['"]0['"] cellspacing=['"]0['"]>([\s\S]*?)<\/table>|Scutit/g;
  const matches6 = Array.from(document.matchAll(regex6));

  matches6.forEach((match, index) => {
    const regex7 =
      /<tr class=['"]cNoteNonEdit['"]>(?:(?!<td class=['"]ctdNoteAddNote['"]>&nbsp;<\/td>)[\s\S])*?<\/tr>/g;

    const matches7 = Array.from((match?.[1] ?? '').matchAll(regex7));

    const currentGrades: any = [];

    matches7.forEach((match7) => {
      let date: Date | undefined;
      let grade: number | undefined;

      const regex8 =
        /<td class=['"]ctdNoteddDate['"] align=['"]left['"]>\s*(.*?)\s*<\/td>/;
      const match8 = match7[0].match(regex8);
      if (match8) {
        date = convertToDate(match8[1]);
      }

      const regex9 = /<td class=['"]ctdNoteAddNote['"]>\s*(.*?)\s*<\/td>/;
      const match9 = match7[0].match(regex9);
      if (match9) {
        grade = parseInt(match9[1]) || 0;
      }

      if (date && typeof grade !== 'undefined') {
        currentGrades.push({
          timestamp: date,
          value: grade
        });
      }
    });

    if (result[index]) {
      result[index].grades = currentGrades;
    }
  });

  return result;
}
