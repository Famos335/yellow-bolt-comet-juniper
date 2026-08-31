import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BookOpen,
  Building2,
  CalendarDays,
  Clock,
  MapPin,
  Printer,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DAYS,
  META,
  PAIR_TIMES,
  WEEK,
  WEEK_LABEL,
  academicWeek,
  dayKeyFromWeekday,
  getMoscowNow,
  isSemesterStarted,
  pairStatus,
  resolveFilter,
  teachers,
  visibleLessons,
  weekHalfFromNumber,
  type DayKey,
  type Lesson,
  type MoscowNow,
  type PairStatus,
  type WeekFilter,
  type WeekHalf,
} from "@/lib/schedule";

const FILTERS: { id: WeekFilter; label: string }[] = [
  { id: "auto", label: "Авто" },
  { id: "odd", label: "Числитель" },
  { id: "even", label: "Знаменатель" },
  { id: "all", label: "Все" },
];

function useMoscowClock() {
  const [now, setNow] = useState<MoscowNow | null>(null);
  useEffect(() => {
    const tick = () => setNow(getMoscowNow());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function useWeekFilter() {
  const [filter, setFilter] = useState<WeekFilter>("auto");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vv26-week-filter");
      if (
        saved === "auto" ||
        saved === "odd" ||
        saved === "even" ||
        saved === "all"
      ) {
        setFilter(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);
  const update = (next: WeekFilter) => {
    setFilter(next);
    try {
      localStorage.setItem("vv26-week-filter", next);
    } catch {
      /* ignore */
    }
  };
  return [filter, update] as const;
}

export function ScheduleApp() {
  const now = useMoscowClock();
  const [filter, setFilter] = useWeekFilter();
  const [view, setView] = useState<"grid" | "teachers">("grid");
  const half = resolveFilter(filter, now);
  const todayKey = now ? dayKeyFromWeekday(now.weekday) : null;
  const [activeDay, setActiveDay] = useState<DayKey>("mon");

  useEffect(() => {
    if (todayKey) setActiveDay(todayKey);
  }, [todayKey]);

  const weekNum = now ? academicWeek(now) : 1;
  const autoHalf = weekNum < 1 ? "odd" : weekHalfFromNumber(Math.max(1, weekNum));
  const started = now ? isSemesterStarted(now) : false;

  return (
    <div className="min-h-dvh">
      <Header now={now} weekNum={weekNum} autoHalf={autoHalf} started={started} />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        {!started && (
          <p className="mb-5 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
            Семестр начинается 1 сентября 2026. Ниже — утверждённое расписание
            группы на первую учебную неделю.
          </p>
        )}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="no-print flex rounded-xl bg-secondary p-1"
            role="tablist"
            aria-label="Раздел"
          >
            <TabChip
              active={view === "grid"}
              onClick={() => setView("grid")}
              icon={<CalendarDays />}
            >
              Расписание
            </TabChip>
            <TabChip
              active={view === "teachers"}
              onClick={() => setView("teachers")}
              icon={<Users />}
            >
              Преподаватели
            </TabChip>
          </div>

          {view === "grid" && (
            <div
              className="no-print flex flex-wrap gap-1.5"
              role="group"
              aria-label="Неделя"
            >
              {FILTERS.map((f) => (
                <Button
                  key={f.id}
                  size="sm"
                  variant={filter === f.id ? "default" : "outline"}
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {view === "grid" ? (
          <>
            <p className="mb-4 text-sm text-muted">
              Показано:{" "}
              <span className="font-medium text-fg">{WEEK_LABEL[half]}</span>
              {filter === "auto" && weekNum >= 1 && (
                <> · учебная неделя {weekNum}</>
              )}
              . Косая черта в исходном файле — числитель / знаменатель.
            </p>

            <DayStrip
              active={activeDay}
              todayKey={todayKey}
              onChange={setActiveDay}
              now={now}
            />

            <div className="mt-4 lg:hidden">
              <DayList
                day={activeDay}
                half={half}
                now={now}
                isToday={activeDay === todayKey}
              />
            </div>

            <div className="mt-4 hidden lg:block">
              <WeekGrid half={half} now={now} todayKey={todayKey} />
            </div>
          </>
        ) : (
          <TeachersPanel />
        )}
      </main>
    </div>
  );
}

function Header({
  now,
  weekNum,
  autoHalf,
  started,
}: {
  now: MoscowNow | null;
  weekNum: number;
  autoHalf: WeekHalf;
  started: boolean;
}) {
  return (
    <header className="bg-primary text-primary-fg">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary-fg/70">
            {META.college}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {META.group}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-primary-fg/80 sm:text-base">
            {META.specialty}
            <span className="mx-2 text-primary-fg/40" aria-hidden="true">
              ·
            </span>
            {META.semester}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <MetaChip icon={<Users />} label={META.course} />
          <MetaChip icon={<Clock />} label={META.shift} />
          <MetaChip icon={<MapPin />} label={META.room} />
          <MetaChip
            icon={<CalendarDays />}
            label={
              started && weekNum >= 1
                ? `Нед. ${weekNum} · ${WEEK_LABEL[autoHalf]}`
                : "С 01.09.2026"
            }
          />
          <Button
            variant="inverse"
            size="sm"
            className="no-print ml-auto sm:ml-2"
            onClick={() => window.print()}
          >
            <Printer />
            Печать
          </Button>
        </div>
      </div>
      {now && <NowBar now={now} />}
    </header>
  );
}

function MetaChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-primary-fg/15 bg-primary-fg/8 px-3 text-primary-fg/90">
      <span className="opacity-70 [&_svg]:size-3.5">{icon}</span>
      {label}
    </span>
  );
}

function NowBar({ now }: { now: MoscowNow }) {
  const todayKey = dayKeyFromWeekday(now.weekday);
  const status = todayKey
    ? pairStatus(now, DAYS.find((d) => d.key === todayKey)?.id ?? 0)
    : { kind: "off" as const };
  const hh = String(now.hour).padStart(2, "0");
  const mm = String(now.minute).padStart(2, "0");

  let text = "Воскресенье — занятий нет";
  if (todayKey) {
    const day = DAYS.find((d) => d.key === todayKey)!;
    if (status.kind === "now") {
      const lessons = visibleLessons(
        WEEK[todayKey][status.pair - 1] ?? [],
        weekHalfFromNumber(Math.max(1, academicWeek(now))),
      );
      text = lessons.length
        ? `Сейчас ${status.pair} пара · ${lessons.map((l) => l.subject).join(" / ")}`
        : `Сейчас ${status.pair} пара · окно`;
    } else if (status.kind === "next") {
      text = `${day.name} · следующая ${status.pair} пара`;
    } else if (status.kind === "done") {
      text = `${day.name} · пары на сегодня закончились`;
    } else {
      text = day.name;
    }
  }

  return (
    <div className="border-t border-primary-fg/10 bg-primary/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-xs sm:px-6 sm:text-sm">
        <span className="min-w-0 truncate">{text}</span>
        <span className="shrink-0 font-medium tabular-nums">
          {hh}:{mm} МСК
        </span>
      </div>
    </div>
  );
}

function TabChip({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors duration-[var(--motion-quick)] sm:flex-none",
        active ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg",
      )}
    >
      <span className="[&_svg]:size-4">{icon}</span>
      {children}
    </button>
  );
}

function DayStrip({
  active,
  todayKey,
  onChange,
  now,
}: {
  active: DayKey;
  todayKey: DayKey | null;
  onChange: (d: DayKey) => void;
  now: MoscowNow | null;
}) {
  return (
    <div
      className="no-print -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden"
      role="tablist"
      aria-label="День недели"
    >
      {DAYS.map((d) => {
        const isToday = d.key === todayKey;
        const isActive = d.key === active;
        return (
          <button
            key={d.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(d.key)}
            className={cn(
              "flex min-h-11 min-w-16 shrink-0 flex-col items-center justify-center rounded-xl border px-3 py-2 transition-colors duration-[var(--motion-quick)]",
              isActive
                ? "border-primary bg-primary text-primary-fg"
                : "border-border bg-surface text-fg hover:bg-secondary",
            )}
          >
            <span className="text-sm font-semibold">{d.short}</span>
            {isToday && (
              <span className="text-xs font-medium tracking-wide opacity-70">
                сегодня
              </span>
            )}
          </button>
        );
      })}
      {now && now.weekday === 0 && (
        <span className="flex min-h-11 min-w-16 shrink-0 items-center rounded-xl border border-border bg-surface px-3 py-2 text-xs text-muted">
          Вс — выходной
        </span>
      )}
    </div>
  );
}

function DayList({
  day,
  half,
  now,
  isToday,
}: {
  day: DayKey;
  half: WeekHalf | "all";
  now: MoscowNow | null;
  isToday: boolean;
}) {
  const meta = DAYS.find((d) => d.key === day)!;
  const status = isToday ? pairStatus(now, meta.id) : { kind: "off" as const };

  return (
    <section aria-label={meta.name} className="flex flex-col gap-3">
      <h2 className="font-display text-xl font-medium">{meta.name}</h2>
      {PAIR_TIMES.map((p, i) => {
        const lessons = visibleLessons(WEEK[day][i] ?? [], half);
        const mark = pairMark(status, p.n);
        return (
          <article
            key={p.n}
            className={cn(
              "rounded-xl border bg-surface p-4",
              mark === "now"
                ? "border-primary ring-2 ring-primary/20"
                : "border-border",
            )}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary font-display text-sm font-medium text-primary-fg tabular-nums">
                  {p.n}
                </span>
                <div>
                  <p className="text-sm font-medium tabular-nums">
                    {p.start}–{p.end}
                  </p>
                  {mark === "now" && (
                    <p className="text-xs font-medium text-primary">Идёт сейчас</p>
                  )}
                  {mark === "next" && (
                    <p className="text-xs text-muted">Следующая</p>
                  )}
                </div>
              </div>
            </div>
            {lessons.length === 0 ? (
              <p className="text-sm text-muted">Окно</p>
            ) : (
              <div className="flex flex-col gap-3">
                {lessons.map((l, idx) => (
                  <LessonBlock key={idx} lesson={l} showWeek={half === "all"} />
                ))}
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}

function WeekGrid({
  half,
  now,
  todayKey,
}: {
  half: WeekHalf | "all";
  now: MoscowNow | null;
  todayKey: DayKey | null;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
      <table className="w-full min-w-[920px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="w-28 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted">
              Пара
            </th>
            {DAYS.map((d) => {
              const isToday = d.key === todayKey;
              return (
                <th
                  key={d.key}
                  className={cn(
                    "px-3 py-3 text-sm font-semibold",
                    isToday ? "bg-secondary text-fg" : "text-fg",
                  )}
                >
                  <span className="block">{d.name}</span>
                  {isToday && (
                    <span className="text-xs font-medium text-primary">
                      Сегодня
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {PAIR_TIMES.map((p, i) => (
            <tr key={p.n} className="border-b border-border last:border-0">
              <th className="align-top px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-md bg-primary font-display text-xs font-medium text-primary-fg tabular-nums">
                    {p.n}
                  </span>
                  <span className="text-xs tabular-nums text-muted">
                    {p.start}
                    <br />
                    {p.end}
                  </span>
                </div>
              </th>
              {DAYS.map((d) => {
                const lessons = visibleLessons(WEEK[d.key][i] ?? [], half);
                const status =
                  d.key === todayKey
                    ? pairStatus(now, d.id)
                    : ({ kind: "off" } as PairStatus);
                const mark = pairMark(status, p.n);
                return (
                  <td
                    key={d.key}
                    className={cn(
                      "align-top px-2 py-2",
                      d.key === todayKey && "bg-secondary/50",
                      mark === "now" && "bg-primary/8",
                    )}
                  >
                    {lessons.length === 0 ? (
                      <p className="px-2 py-3 text-xs text-muted">—</p>
                    ) : (
                      <div className="flex flex-col gap-1.5">
                        {lessons.map((l, idx) => (
                          <LessonBlock
                            key={idx}
                            lesson={l}
                            showWeek={half === "all"}
                            compact
                            live={mark === "now"}
                          />
                        ))}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function pairMark(status: PairStatus, n: number): "now" | "next" | null {
  if (status.kind === "now" && status.pair === n) return "now";
  if (status.kind === "next" && status.pair === n) return "next";
  return null;
}

function LessonBlock({
  lesson,
  showWeek,
  compact,
  live,
}: {
  lesson: Lesson;
  showWeek: boolean;
  compact?: boolean;
  live?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg",
        compact ? "px-2 py-2" : "",
        live && compact && "ring-1 ring-primary/30",
      )}
    >
      {showWeek && lesson.week !== "all" && (
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium tracking-wide text-muted">
          {lesson.week === "odd" ? "числ." : "знам."}
        </span>
      )}
      <p
        className={cn(
          "font-semibold leading-snug",
          compact ? "text-sm" : "text-base",
          showWeek && lesson.week !== "all" ? "mt-1" : "",
        )}
      >
        {lesson.subject}
      </p>
      <p className={cn("mt-0.5 text-muted", compact ? "text-xs" : "text-sm")}>
        {lesson.teacher}
      </p>
      <p
        className={cn(
          "mt-1 flex items-center gap-1 text-muted",
          compact ? "text-xs" : "text-sm",
        )}
      >
        <MapPin className="size-3.5 shrink-0" />
        {lesson.room}
      </p>
    </div>
  );
}

function TeachersPanel() {
  const rows = useMemo(() => teachers(), []);
  return (
    <section>
      <h2 className="font-display text-xl font-medium">Преподаватели группы</h2>
      <p className="mt-1 mb-5 text-sm text-muted">
        Собрано из расписания ВВ-26 на 1 семестр.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <li
            key={row.teacher}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <p className="flex items-center gap-2 font-semibold">
              <BookOpen className="size-4 text-primary" />
              {row.teacher}
            </p>
            <p className="mt-2 text-sm text-muted">{row.subjects.join(" · ")}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 flex items-start gap-2 text-xs text-muted">
        <Building2 className="mt-0.5 size-3.5 shrink-0" />
        Утверждено {META.approved}, директор {META.director} Закреплённая
        аудитория группы — {META.room}, кроме вынесенных занятий (спортзал,
        ауд. 7, ауд. 3).
      </p>
    </section>
  );
}
