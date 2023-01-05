import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteGenre, getGenre } from "~/models/genre.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.genreId, "genreId not found");

  const genre = await getGenre({ id: params.genreId });
  if (!genre) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ genre });
}

export async function action({ request, params }: ActionArgs) {
  //   const userId = await requireUserId(request);
  invariant(params.genreId, "genreId not found");

  await deleteGenre({ id: params.genreId });

  return redirect("./..");
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.genre.name}</h3>
      <p className="py-6">{data.genre.description}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Genre not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
