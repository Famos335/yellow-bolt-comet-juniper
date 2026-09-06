export type WeekHalf = "odd" | "even";
export type WeekFilter = "auto" | "odd" | "even" | "all";
export type LessonKind = "gen" | "prof" | "pe";

export type Lesson = {
  subject: string;
  teacher: string;
  room: string;
  week: "all" | WeekHalf;
  kind: LessonKind;
};

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export const PAIR_TIMES = [
  { n: 1, start: "08:30", end: "10:00" },
  { n: 2, start: "10:10", end: "11:40" },
  { n: 3, start: "12:00", end: "13:30" },
  { n: 4, start: "13:45", end: "15:15" },
] as const;

export const DAYS: readonly {
  id: number;
  key: DayKey;
  name: string;
  short: string;
}[] = [
  { id: 1, key: "mon", name: "Понедельник", short: "Пн" },
  { id: 2, key: "tue", name: "Вторник", short: "Вт" },
  { id: 3, key: "wed", name: "Среда", short: "Ср" },
  { id: 4, key: "thu", name: "Четверг", short: "Чт" },
  { id: 5, key: "fri", name: "Пятница", short: "Пт" },
  { id: 6, key: "sat", name: "Суббота", short: "Сб" },
] as const;

export const META = {
  college: "ГБПОУ МО «Одинцовский техникум»",
  group: "ВВ-26",
  specialty: "Водоснабжение и водоотведение",
  course: "1 курс",
  shift: "1 смена",
  room: "ауд. 1",
  semester: "1 семестр 2026–2027",
  approved: "01.09.2026",
  director: "Кострикова С.А.",
} as const;

const A1 = "ауд. 1";
const HALL = "спортзал";

function L(
  subject: string,
  teacher: string,
  opts?: Partial<Pick<Lesson, "room" | "week" | "kind">>,
): Lesson {
  return {
    subject,
    teacher,
    room: opts?.room ?? A1,
    week: opts?.week ?? "all",
    kind: opts?.kind ?? "gen",
  };
}

/** Пары 1–4 по дням. Пустой массив — окно. */
export const WEEK: Record<DayKey, Lesson[][]> = {
  mon: [
    [L("Математика", "Тамоян А.И.")],
    [
      L("География", "Пономарева Н.В.", { week: "odd" }),
      L("Русский язык", "Рязанцева Е.В.", { week: "even" }),
    ],
    [
      L("Литература", "Ибадулаева Н.В.", { week: "odd" }),
      L("МДК 04.01", "Руденко Г.С.", { week: "even", kind: "prof" }),
    ],
    [],
  ],
  tue: [
    [L("Математика", "Тамоян А.И.")],
    [L("ОБЗР", "Иньков О.А.")],
    [L("Биология", "Мельникова Н.Ф.")],
    [],
  ],
  wed: [
    [L("Физика", "Тимофеева Ю.В.")],
    [L("Физкультура", "Рысин М.В.", { room: HALL, kind: "pe" })],
    [L("МДК 04.01", "Руденко Г.С.", { kind: "prof" })],
    [],
  ],
  thu: [
    [
      L("Математика", "Тамоян А.И.", { week: "odd" }),
      L("Физика", "Тимофеева Ю.С.", { week: "even" }),
    ],
    [L("Химия", "Ракуто Н.С.")],
    [L("История", "Мансурова Л.А.")],
    [],
  ],
  fri: [
    [L("Физика", "Тимофеева Ю.С.")],
    [L("Иностранный язык", "Каменева Ю.Ю.")],
    [L("Обществознание", "Кузнецова И.В.")],
    [],
  ],
  sat: [
    [],
    [
      L("Информатика", "Токарев А.Н., Королева В.В.", {
        room: "ауд. 7",
      }),
    ],
    [L("Литература", "Ибадулаева Н.В.")],
    [L("История", "Мансурова Л.А.", { room: "ауд. 3" })],
  ],
};

export type MoscowNow = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: number;
};

export function getMoscowNow(date = new Date()): MoscowNow {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  );
  const weekdayMap: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0,
  };
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    weekday: weekdayMap[parts.weekday ?? ""] ?? 0,
  };
}

/** Понедельник недели, в которую входит 1 сентября 2026 — учебная неделя 1. */
export function academicWeek(now: MoscowNow): number {
  const utc = Date.UTC(now.year, now.month - 1, now.day);
  const sept1 = Date.UTC(2026, 8, 1);
  const sept1Weekday = new Date(sept1).getUTCDay(); // 2 = Tue
  const mondayOffset = (sept1Weekday + 6) % 7;
  const week1Monday = sept1 - mondayOffset * 86400000;
  const diffDays = Math.floor((utc - week1Monday) / 86400000);
  return Math.floor(diffDays / 7) + 1;
}

export function isSemesterStarted(now: MoscowNow): boolean {
  return Date.UTC(now.year, now.month - 1, now.day) >= Date.UTC(2026, 8, 1);
}

export function weekHalfFromNumber(week: number): WeekHalf {
  return week % 2 === 1 ? "odd" : "even";
}

export function resolveFilter(
  filter: WeekFilter,
  now: MoscowNow | null,
): WeekHalf | "all" {
  if (filter === "odd" || filter === "even" || filter === "all") return filter;
  if (!now) return "odd";
  const w = academicWeek(now);
  if (w < 1) return "odd";
  return weekHalfFromNumber(w);
}

export function visibleLessons(
  cell: Lesson[],
  half: WeekHalf | "all",
): Lesson[] {
  if (half === "all") return cell;
  return cell.filter((l) => l.week === "all" || l.week === half);
}

export function dayKeyFromWeekday(weekday: number): DayKey | null {
  const found = DAYS.find((d) => d.id === weekday);
  return found?.key ?? null;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export type PairStatus =
  | { kind: "now"; pair: number }
  | { kind: "next"; pair: number }
  | { kind: "done" }
  | { kind: "off" };

export function pairStatus(
  now: MoscowNow | null,
  weekday: number,
): PairStatus {
  if (!now) return { kind: "off" };
  if (now.weekday !== weekday || weekday === 0) return { kind: "off" };
  const t = now.hour * 60 + now.minute;
  for (const p of PAIR_TIMES) {
    const a = toMinutes(p.start);
    const b = toMinutes(p.end);
    if (t >= a && t < b) return { kind: "now", pair: p.n };
  }
  for (const p of PAIR_TIMES) {
    if (t < toMinutes(p.start)) return { kind: "next", pair: p.n };
  }
  return { kind: "done" };
}

export type TeacherRow = {
  teacher: string;
  subjects: string[];
};

export function teachers(): TeacherRow[] {
  const map = new Map<string, Set<string>>();
  for (const day of Object.values(WEEK)) {
    for (const cell of day) {
      for (const lesson of cell) {
        const names = lesson.teacher.split(",").map((s) => s.trim());
        for (const name of names) {
          if (!map.has(name)) map.set(name, new Set());
          map.get(name)!.add(lesson.subject);
        }
      }
    }
  }
  return [...map.entries()]
    .map(([teacher, subjects]) => ({
      teacher,
      subjects: [...subjects],
    }))
    .sort((a, b) => a.teacher.localeCompare(b.teacher, "ru"));
}

export const WEEK_LABEL: Record<WeekHalf | "all", string> = {
  odd: "Числитель",
  even: "Знаменатель",
  all: "Обе недели",
};
