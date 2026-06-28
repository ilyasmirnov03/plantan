import {
  pgTable,
  pgSchema,
  serial,
  integer,
  text,
  date,
  real,
  uuid,
} from "drizzle-orm/pg-core";

const neonAuth = pgSchema("neon_auth");
const neonAuthUser = neonAuth.table("user", {
  id: uuid("id").primaryKey(),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});

export const vacation = pgTable("vacation", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => neonAuthUser.id),
});

export const variant = pgTable("variant", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  start_date: date("start_date"),
  end_date: date("end_date"),
  vacation_id: integer("vacation_id")
    .notNull()
    .references(() => vacation.id),
});

export const variant_step = pgTable("variant_step", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  spending: real("spending"),
  category_id: integer("category_id")
    .notNull()
    .references(() => category.id),
  variant_id: integer("variant_id")
    .notNull()
    .references(() => variant.id),
});
