import React from "react";
import { getGenres } from "~/models/genre.server";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import ActionButton from "~/components/shared/ActionButton";
type Props = {};

export const loader = async () => {
  const genres = await getGenres();
  return json({ genres });
};

export default function GenreIndex() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const deleteGenre = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    fetcher.submit(null, { method: "post", action: `/admin/genres/${id}` });
  };
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-700">Genres List</h2>
        <ActionButton
          type="gray"
          label="+ Create new"
          className="text-center"
          to="new"
        />
      </div>
      <hr className="mb-4" />
      <div className="container mx-auto">
        {data.genres.length > 0 ? (
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center">
                    <thead className="border-b bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-medium text-white"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-medium text-white"
                        >
                          Genre name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 text-sm font-medium text-white"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.genres.map((genre, index) => (
                        <tr key={genre.id} className="border-b bg-white">
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                            {genre.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                            <div className="flex items-center justify-center space-x-4">
                              <ActionButton to={`${genre.id}`} label="edit" />
                              <div className="flex items-center space-x-2">
                                <ActionButton
                                  to={`${genre.id}`}
                                  label="delete"
                                  type="danger"
                                  onClick={(e) => deleteGenre(e, genre.id)}
                                />
                                {fetcher.state === "loading" && (
                                  <small className="text-xs italic text-slate-700">
                                    deleting...
                                  </small>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <p className="text-center">No Genre Data Available</p>
            <ActionButton
              type="gray"
              label="+ Create new"
              className="mx-auto text-center"
              to="new"
            />
          </div>
        )}
      </div>
    </>
  );
}
