export const notFound = (): never => {
  throw new Response("Not found", { status: 404 });
};
