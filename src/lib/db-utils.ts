import { AnyColumn, SQL, sql, SQLChunk } from 'drizzle-orm';
import { alias, PgColumn } from 'drizzle-orm/pg-core';


export function random() {
  return sql`RANDOM()`;
}

export function increment(column: AnyColumn, value: number = 1) {
  // @ts-ignore
  return sql`${column} + ${value}`;
}

export function decrement(column: AnyColumn, value: number = 1) {
  return sql`${column} - ${value}`;
}

export async function firstRow<T>(
  promise: Promise<T[]>
): Promise<T | undefined> {
  return (await promise)[0];
}

export function jsonBuildObject<T extends Record<string, SQL<any> | PgColumn<any> | SQL.Aliased<any>>>(
  obj: T
): SQL<{
  [K in keyof T]: T[K] extends SQL<infer U>
    ? U
    : T[K] extends PgColumn<infer U>
      ? U["data"]
      : never;
}> {
  const sqlChunks: SQL[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    const sqlValue = value instanceof SQL ? value : sql`${value}`;
    sqlChunks.push(sql`${key}::TEXT, TO_JSONB(${sqlValue})`);
  });

  return sql`JSONB_BUILD_OBJECT(${sql.join(sqlChunks, sql.raw(', '))})` as SQL<{
    [K in keyof T]: T[K] extends SQL<infer U>
      ? U
      : T[K] extends PgColumn<infer U>
        ? U["data"]
        : never;
  }>;
}

export function jsonAgg<T extends SQL<any> | PgColumn<any>>(
  sqlChunk: T,
  nullKey: SQL | PgColumn<any>
): SQL<
  T extends SQL<infer U>
    ? U[]
    : T extends PgColumn<infer U>
      ? U["data"][]
      : never[]
> {
  return sql`COALESCE(JSONB_AGG(${sqlChunk}) FILTER (WHERE ${nullKey} IS NOT NULL), '[]'::jsonb)` as SQL<
    T extends SQL<infer U>
      ? U[]
      : T extends PgColumn<infer U>
        ? U["data"][]
        : never[]
  >;
}

export function jsonAggDistinct<T extends SQL<any> | PgColumn<any>>(
  sqlChunk: T,
  nullKey: SQL | PgColumn<any>
): SQL<
  T extends SQL<infer U>
    ? U[]
    : T extends PgColumn<infer U>
      ? U["data"][]
      : never[]
> {
  return sql`COALESCE(JSONB_AGG(DISTINCT ${sqlChunk}) FILTER (WHERE ${nullKey} IS NOT NULL), '[]'::jsonb)` as SQL<
    T extends SQL<infer U>
      ? U[]
      : T extends PgColumn<infer U>
        ? U["data"][]
        : never[]
  >;
}

export function tsMatches(tsVector: SQLChunk, tsQuery: SQLChunk) {
  return sql`${tsVector} @@ TO_TSQUERY('english', ${tsQuery})`;
}

export function cardinality(array: SQLChunk) {
  return sql`CARDINALITY(${array})`;
}

export function coalesce(...props: SQLChunk[]) {
  return sql`COALESCE(${props[0]}, ${props[1]})`;
}