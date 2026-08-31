import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Clock, c as BookOpen, i as MapPin, o as CalendarDays, r as Printer, s as Building2, t as Users } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Czp_QQtb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90",
			secondary: "bg-secondary text-secondary-fg hover:bg-border",
			outline: "border border-border bg-surface text-fg hover:bg-secondary",
			ghost: "text-fg hover:bg-secondary",
			inverse: "bg-primary-fg text-primary hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var PAIR_TIMES = [
	{
		n: 1,
		start: "08:30",
		end: "10:00"
	},
	{
		n: 2,
		start: "10:10",
		end: "11:40"
	},
	{
		n: 3,
		start: "12:00",
		end: "13:30"
	},
	{
		n: 4,
		start: "13:45",
		end: "15:15"
	}
];
var DAYS = [
	{
		id: 1,
		key: "mon",
		name: "Понедельник",
		short: "Пн"
	},
	{
		id: 2,
		key: "tue",
		name: "Вторник",
		short: "Вт"
	},
	{
		id: 3,
		key: "wed",
		name: "Среда",
		short: "Ср"
	},
	{
		id: 4,
		key: "thu",
		name: "Четверг",
		short: "Чт"
	},
	{
		id: 5,
		key: "fri",
		name: "Пятница",
		short: "Пт"
	},
	{
		id: 6,
		key: "sat",
		name: "Суббота",
		short: "Сб"
	}
];
var META = {
	college: "ГБПОУ МО «Одинцовский техникум»",
	group: "ВВ-26",
	specialty: "Водоснабжение и водоотведение",
	course: "1 курс",
	shift: "1 смена",
	room: "ауд. 1",
	semester: "1 семестр 2026–2027",
	approved: "01.09.2026",
	director: "Кострикова С.А."
};
var A1 = "ауд. 1";
var HALL = "спортзал";
function L(subject, teacher, opts) {
	return {
		subject,
		teacher,
		room: opts?.room ?? A1,
		week: opts?.week ?? "all",
		kind: opts?.kind ?? "gen"
	};
}
/** Пары 1–4 по дням. Пустой массив — окно. */
var WEEK = {
	mon: [
		[L("Математика", "Тамоян А.И.")],
		[L("География", "Пономарева Н.В.", { week: "odd" }), L("Русский язык", "Рязанцева Е.В.", { week: "even" })],
		[L("Биология", "Мельникова Н.Ф.")],
		[]
	],
	tue: [
		[L("Математика", "Тамоян А.И.")],
		[L("ОБЗР", "Иньков О.А.")],
		[L("Биология", "Мельникова Н.Ф.")],
		[]
	],
	wed: [
		[L("Физика", "Тимофеева Я.В.")],
		[L("Физкультура", "Рысин М.В.", {
			room: HALL,
			kind: "pe"
		})],
		[L("МДК 04.01", "Руденко Г.С.", { kind: "prof" })],
		[]
	],
	thu: [
		[L("Математика", "Тамоян А.И.", { week: "odd" }), L("Физика", "Тимофеева Я.С.", { week: "even" })],
		[L("Химия", "Ракуто Н.С.")],
		[L("История", "Мансурова Л.А.")],
		[]
	],
	fri: [
		[L("Физика", "Тимофеева Я.С.")],
		[L("Иностранный язык", "Каменева Ю.Ю.")],
		[L("Обществознание", "Кузнецова И.В.")],
		[]
	],
	sat: [
		[],
		[L("Информатика", "Токарев А.Н., Королева В.В.", { room: "ауд. 7" })],
		[L("Литература", "Ибадулаева Н.В.")],
		[L("История", "Мансурова Л.А.", { room: "ауд. 3" })]
	]
};
function getMoscowNow(date = /* @__PURE__ */ new Date()) {
	const fmt = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Europe/Moscow",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
		hourCycle: "h23"
	});
	const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
	return {
		year: Number(parts.year),
		month: Number(parts.month),
		day: Number(parts.day),
		hour: Number(parts.hour),
		minute: Number(parts.minute),
		weekday: {
			Mon: 1,
			Tue: 2,
			Wed: 3,
			Thu: 4,
			Fri: 5,
			Sat: 6,
			Sun: 0
		}[parts.weekday ?? ""] ?? 0
	};
}
/** Понедельник недели, в которую входит 1 сентября 2026 — учебная неделя 1. */
function academicWeek(now) {
	const utc = Date.UTC(now.year, now.month - 1, now.day);
	const sept1 = Date.UTC(2026, 8, 1);
	const week1Monday = sept1 - (new Date(sept1).getUTCDay() + 6) % 7 * 864e5;
	const diffDays = Math.floor((utc - week1Monday) / 864e5);
	return Math.floor(diffDays / 7) + 1;
}
function isSemesterStarted(now) {
	return Date.UTC(now.year, now.month - 1, now.day) >= Date.UTC(2026, 8, 1);
}
function weekHalfFromNumber(week) {
	return week % 2 === 1 ? "odd" : "even";
}
function resolveFilter(filter, now) {
	if (filter === "odd" || filter === "even" || filter === "all") return filter;
	if (!now) return "odd";
	const w = academicWeek(now);
	if (w < 1) return "odd";
	return weekHalfFromNumber(w);
}
function visibleLessons(cell, half) {
	if (half === "all") return cell;
	return cell.filter((l) => l.week === "all" || l.week === half);
}
function dayKeyFromWeekday(weekday) {
	return DAYS.find((d) => d.id === weekday)?.key ?? null;
}
function toMinutes(hhmm) {
	const [h, m] = hhmm.split(":").map(Number);
	return (h ?? 0) * 60 + (m ?? 0);
}
function pairStatus(now, weekday) {
	if (!now) return { kind: "off" };
	if (now.weekday !== weekday || weekday === 0) return { kind: "off" };
	const t = now.hour * 60 + now.minute;
	for (const p of PAIR_TIMES) {
		const a = toMinutes(p.start);
		const b = toMinutes(p.end);
		if (t >= a && t < b) return {
			kind: "now",
			pair: p.n
		};
	}
	for (const p of PAIR_TIMES) if (t < toMinutes(p.start)) return {
		kind: "next",
		pair: p.n
	};
	return { kind: "done" };
}
function teachers() {
	const map = /* @__PURE__ */ new Map();
	for (const day of Object.values(WEEK)) for (const cell of day) for (const lesson of cell) {
		const names = lesson.teacher.split(",").map((s) => s.trim());
		for (const name of names) {
			if (!map.has(name)) map.set(name, /* @__PURE__ */ new Set());
			map.get(name).add(lesson.subject);
		}
	}
	return [...map.entries()].map(([teacher, subjects]) => ({
		teacher,
		subjects: [...subjects]
	})).sort((a, b) => a.teacher.localeCompare(b.teacher, "ru"));
}
var WEEK_LABEL = {
	odd: "Числитель",
	even: "Знаменатель",
	all: "Обе недели"
};
var FILTERS = [
	{
		id: "auto",
		label: "Авто"
	},
	{
		id: "odd",
		label: "Числитель"
	},
	{
		id: "even",
		label: "Знаменатель"
	},
	{
		id: "all",
		label: "Все"
	}
];
function useMoscowClock() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setNow(getMoscowNow());
		tick();
		const id = window.setInterval(tick, 3e4);
		return () => window.clearInterval(id);
	}, []);
	return now;
}
function useWeekFilter() {
	const [filter, setFilter] = (0, import_react.useState)("auto");
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem("vv26-week-filter");
			if (saved === "auto" || saved === "odd" || saved === "even" || saved === "all") setFilter(saved);
		} catch {}
	}, []);
	const update = (next) => {
		setFilter(next);
		try {
			localStorage.setItem("vv26-week-filter", next);
		} catch {}
	};
	return [filter, update];
}
function ScheduleApp() {
	const now = useMoscowClock();
	const [filter, setFilter] = useWeekFilter();
	const [view, setView] = (0, import_react.useState)("grid");
	const half = resolveFilter(filter, now);
	const todayKey = now ? dayKeyFromWeekday(now.weekday) : null;
	const [activeDay, setActiveDay] = (0, import_react.useState)("mon");
	(0, import_react.useEffect)(() => {
		if (todayKey) setActiveDay(todayKey);
	}, [todayKey]);
	const weekNum = now ? academicWeek(now) : 1;
	const autoHalf = weekNum < 1 ? "odd" : weekHalfFromNumber(Math.max(1, weekNum));
	const started = now ? isSemesterStarted(now) : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			now,
			weekNum,
			autoHalf,
			started
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6",
			children: [
				!started && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-5 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted",
					children: "Семестр начинается 1 сентября 2026. Ниже — утверждённое расписание группы на первую учебную неделю."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "no-print flex rounded-xl bg-secondary p-1",
						role: "tablist",
						"aria-label": "Раздел",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabChip, {
							active: view === "grid",
							onClick: () => setView("grid"),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
							children: "Расписание"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabChip, {
							active: view === "teachers",
							onClick: () => setView("teachers"),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
							children: "Преподаватели"
						})]
					}), view === "grid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-print flex flex-wrap gap-1.5",
						role: "group",
						"aria-label": "Неделя",
						children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: filter === f.id ? "default" : "outline",
							onClick: () => setFilter(f.id),
							"aria-pressed": filter === f.id,
							children: f.label
						}, f.id))
					})]
				}),
				view === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-4 text-sm text-muted",
						children: [
							"Показано:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: WEEK_LABEL[half]
							}),
							filter === "auto" && weekNum >= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · учебная неделя ", weekNum] }),
							". Косая черта в исходном файле — числитель / знаменатель."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayStrip, {
						active: activeDay,
						todayKey,
						onChange: setActiveDay,
						now
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayList, {
							day: activeDay,
							half,
							now,
							isToday: activeDay === todayKey
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekGrid, {
							half,
							now,
							todayKey
						})
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeachersPanel, {})
			]
		})]
	});
}
function Header({ now, weekNum, autoHalf, started }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "bg-primary text-primary-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-end lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-primary-fg/70",
						children: META.college
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl",
						children: META.group
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-xl text-sm text-primary-fg/80 sm:text-base",
						children: [
							META.specialty,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2 text-primary-fg/40",
								"aria-hidden": "true",
								children: "·"
							}),
							META.semester
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaChip, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: META.course
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaChip, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}),
						label: META.shift
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaChip, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}),
						label: META.room
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaChip, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
						label: started && weekNum >= 1 ? `Нед. ${weekNum} · ${WEEK_LABEL[autoHalf]}` : "С 01.09.2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "inverse",
						size: "sm",
						className: "no-print ml-auto sm:ml-2",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), "Печать"]
					})
				]
			})]
		}), now && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowBar, { now })]
	});
}
function MetaChip({ icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex h-9 items-center gap-1.5 rounded-full border border-primary-fg/15 bg-primary-fg/8 px-3 text-primary-fg/90",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "opacity-70 [&_svg]:size-3.5",
			children: icon
		}), label]
	});
}
function NowBar({ now }) {
	const todayKey = dayKeyFromWeekday(now.weekday);
	const status = todayKey ? pairStatus(now, DAYS.find((d) => d.key === todayKey)?.id ?? 0) : { kind: "off" };
	const hh = String(now.hour).padStart(2, "0");
	const mm = String(now.minute).padStart(2, "0");
	let text = "Воскресенье — занятий нет";
	if (todayKey) {
		const day = DAYS.find((d) => d.key === todayKey);
		if (status.kind === "now") {
			const lessons = visibleLessons(WEEK[todayKey][status.pair - 1] ?? [], weekHalfFromNumber(Math.max(1, academicWeek(now))));
			text = lessons.length ? `Сейчас ${status.pair} пара · ${lessons.map((l) => l.subject).join(" / ")}` : `Сейчас ${status.pair} пара · окно`;
		} else if (status.kind === "next") text = `${day.name} · следующая ${status.pair} пара`;
		else if (status.kind === "done") text = `${day.name} · пары на сегодня закончились`;
		else text = day.name;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-t border-primary-fg/10 bg-primary/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-xs sm:px-6 sm:text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate",
				children: text
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "shrink-0 font-medium tabular-nums",
				children: [
					hh,
					":",
					mm,
					" МСК"
				]
			})]
		})
	});
}
function TabChip({ active, onClick, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		role: "tab",
		"aria-selected": active,
		onClick,
		className: cn("inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors duration-[var(--motion-quick)] sm:flex-none", active ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "[&_svg]:size-4",
			children: icon
		}), children]
	});
}
function DayStrip({ active, todayKey, onChange, now }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-print -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden",
		role: "tablist",
		"aria-label": "День недели",
		children: [DAYS.map((d) => {
			const isToday = d.key === todayKey;
			const isActive = d.key === active;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "tab",
				"aria-selected": isActive,
				onClick: () => onChange(d.key),
				className: cn("flex min-h-11 min-w-16 shrink-0 flex-col items-center justify-center rounded-xl border px-3 py-2 transition-colors duration-[var(--motion-quick)]", isActive ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface text-fg hover:bg-secondary"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold",
					children: d.short
				}), isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium tracking-wide opacity-70",
					children: "сегодня"
				})]
			}, d.key);
		}), now && now.weekday === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex min-h-11 min-w-16 shrink-0 items-center rounded-xl border border-border bg-surface px-3 py-2 text-xs text-muted",
			children: "Вс — выходной"
		})]
	});
}
function DayList({ day, half, now, isToday }) {
	const meta = DAYS.find((d) => d.key === day);
	const status = isToday ? pairStatus(now, meta.id) : { kind: "off" };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": meta.name,
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-medium",
			children: meta.name
		}), PAIR_TIMES.map((p, i) => {
			const lessons = visibleLessons(WEEK[day][i] ?? [], half);
			const mark = pairMark(status, p.n);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: cn("rounded-xl border bg-surface p-4", mark === "now" ? "border-primary ring-2 ring-primary/20" : "border-border"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex items-center justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-lg bg-primary font-display text-sm font-medium text-primary-fg tabular-nums",
							children: p.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium tabular-nums",
								children: [
									p.start,
									"–",
									p.end
								]
							}),
							mark === "now" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-primary",
								children: "Идёт сейчас"
							}),
							mark === "next" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "Следующая"
							})
						] })]
					})
				}), lessons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Окно"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: lessons.map((l, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonBlock, {
						lesson: l,
						showWeek: half === "all"
					}, idx))
				})]
			}, p.n);
		})]
	});
}
function WeekGrid({ half, now, todayKey }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-2xl border border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[920px] border-collapse text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "w-28 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted",
					children: "Пара"
				}), DAYS.map((d) => {
					const isToday = d.key === todayKey;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
						className: cn("px-3 py-3 text-sm font-semibold", isToday ? "bg-secondary text-fg" : "text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block",
							children: d.name
						}), isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium text-primary",
							children: "Сегодня"
						})]
					}, d.key);
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: PAIR_TIMES.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "align-top px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 items-center justify-center rounded-md bg-primary font-display text-xs font-medium text-primary-fg tabular-nums",
							children: p.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs tabular-nums text-muted",
							children: [
								p.start,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								p.end
							]
						})]
					})
				}), DAYS.map((d) => {
					const lessons = visibleLessons(WEEK[d.key][i] ?? [], half);
					const mark = pairMark(d.key === todayKey ? pairStatus(now, d.id) : { kind: "off" }, p.n);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn("align-top px-2 py-2", d.key === todayKey && "bg-secondary/50", mark === "now" && "bg-primary/8"),
						children: lessons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 py-3 text-xs text-muted",
							children: "—"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-1.5",
							children: lessons.map((l, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonBlock, {
								lesson: l,
								showWeek: half === "all",
								compact: true,
								live: mark === "now"
							}, idx))
						})
					}, d.key);
				})]
			}, p.n)) })]
		})
	});
}
function pairMark(status, n) {
	if (status.kind === "now" && status.pair === n) return "now";
	if (status.kind === "next" && status.pair === n) return "next";
	return null;
}
function LessonBlock({ lesson, showWeek, compact, live }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-lg", compact ? "px-2 py-2" : "", live && compact && "ring-1 ring-primary/30"),
		children: [
			showWeek && lesson.week !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-secondary px-2 py-0.5 text-xs font-medium tracking-wide text-muted",
				children: lesson.week === "odd" ? "числ." : "знам."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-semibold leading-snug", compact ? "text-sm" : "text-base", showWeek && lesson.week !== "all" ? "mt-1" : ""),
				children: lesson.subject
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-0.5 text-muted", compact ? "text-xs" : "text-sm"),
				children: lesson.teacher
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("mt-1 flex items-center gap-1 text-muted", compact ? "text-xs" : "text-sm"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 shrink-0" }), lesson.room]
			})
		]
	});
}
function TeachersPanel() {
	const rows = (0, import_react.useMemo)(() => teachers(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-medium",
			children: "Преподаватели группы"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 mb-5 text-sm text-muted",
			children: "Собрано из расписания ВВ-26 на 1 семестр."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-primary" }), row.teacher]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: row.subjects.join(" · ")
				})]
			}, row.teacher))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 flex items-start gap-2 text-xs text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "mt-0.5 size-3.5 shrink-0" }),
				"Утверждено ",
				META.approved,
				", директор ",
				META.director,
				" Закреплённая аудитория группы — ",
				META.room,
				", кроме вынесенных занятий (спортзал, ауд. 7, ауд. 3)."
			]
		})
	] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleApp, {});
}
//#endregion
export { Home as component };
