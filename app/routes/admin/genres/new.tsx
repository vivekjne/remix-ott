import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import React from "react";
import { createGenre } from "~/models/genre.server";

type Props = {};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Title is required" } }, { status: 400 });
  }

  const genre = await createGenre({ name });

  return redirect("./..");
}

export default function GenresNew({}: Props) {
  const actionData = useActionData<typeof action>();
  return (
    <section id="add-genre">
      <div className="container">
        <h2 className="text-2xl font-semibold text-slate-700">Create Genre</h2>
        <div className="mx-auto mt-2 max-w-xl shadow-lg">
          <div className=" bg-slate-900 py-2 px-4 font-semibold tracking-wide text-white">
            Genre
          </div>
          <div className="bg-white px-4 py-6">
            <Form method="post">
              <div>
                <label className="text-sm text-gray-500" htmlFor="genre-name">
                  Genre name eg. "action,comedy"
                </label>
                <input
                  type="text"
                  className="mt-1 block h-8 w-full rounded-sm border-slate-300 focus:border-slate-500 focus:ring-slate-500 "
                  id="genre-name"
                  name="name"
                />
                {actionData?.errors.name && (
                  <small className="text-xs italic text-red-500">
                    *{actionData.errors.name}
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 rounded-full bg-emerald-500 px-6 py-2 text-sm font-bold text-white shadow-md hover:bg-emerald-700"
              >
                Add
              </button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
