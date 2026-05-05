import columns from "./columns";

const initialVisibility: Record<(typeof columns)[number]["field"], boolean> =
  {};
for (const f of columns) {
  initialVisibility[f.field] = ![
    "id",
    "sodium",
    "potass",
    "vitamins",
    "shelf",
    "weight",
    "cups",
  ].includes(f.field);
}

export default initialVisibility;
