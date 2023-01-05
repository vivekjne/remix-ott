import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { ZodError } from "zod/lib";

import { createDirector } from "~/models/director.server";

type Props = {};

export async function action({ request }: ActionArgs) {
  const formData = Object.fromEntries(await request.formData());
  console.log(formData);
  const directorSchema = z.object({
    name: z.string().min(1, "Director name is required"),
    description: z.string().min(1, "Director description is required"),
    photo: z.string().url("Director photo is required"),
  });

  try {
    const newDirector = directorSchema.parse(formData);
    const { name, description, photo } = newDirector;
    await createDirector({ name, description, photo });
    return redirect("./..");
  } catch (error) {
    console.error(`form not submitted ${error}`);

    return json({ error });
  }
}

export default function DirectorsNews({}: Props) {
  const actionData = useActionData<typeof action>();
  const error: any = actionData?.error;
  return (
    <section id="add-genre">
      <div className="container">
        <h2 className="text-2xl font-semibold text-slate-700">Add Director</h2>
        <div className="mx-auto mt-2 max-w-xl shadow-lg">
          <div className=" bg-slate-900 py-2 px-4 font-semibold tracking-wide text-white">
            Director
          </div>
          <div className="bg-white px-4 py-6">
            <Form method="post">
              <div className="mb-4">
                <label
                  className="text-sm text-gray-500"
                  htmlFor="director-name"
                >
                  Director name
                </label>
                <input
                  type="text"
                  className="mt-1 block h-8 w-full rounded-sm border-slate-300 focus:border-slate-500 focus:ring-slate-500 "
                  id="director-name"
                  name="name"
                  placeholder="enter director name..."
                />

                {error && (
                  <small className="text-xs italic text-red-500">
                    *{error?.issues?.[0]?.message}
                  </small>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="text-sm text-gray-500"
                  htmlFor="director-description"
                >
                  Director description
                </label>
                <textarea
                  rows={5}
                  className="mt-1 block  w-full rounded-sm border-slate-300 focus:border-slate-500 focus:ring-slate-500 "
                  id="director-description"
                  name="description"
                  placeholder="Say something about the director..."
                />
                {error && (
                  <small className="text-xs italic text-red-500">
                    *{error?.issues?.[1]?.message}
                  </small>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="text-sm text-gray-500"
                  htmlFor="director-name"
                >
                  Director photo
                </label>
                <input
                  type="text"
                  className="mt-1 block h-8 w-full rounded-sm border-slate-300 focus:border-slate-500 focus:ring-slate-500 "
                  id="director-photo"
                  name="photo"
                  placeholder="paste director photo url..."
                />
                {error && (
                  <small className="text-xs italic text-red-500">
                    *{error?.issues?.[2]?.message}
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
