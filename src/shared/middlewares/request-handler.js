import { dbConnect } from "@/core/utils/db";
export function handleRequest({ GET, POST, DELETE, PATCH, PUT }) {
  const unknownHandler = (_, res) => res.status(404).send("method not found");
  return async (req, res) => {
    await dbConnect();
    let handler = unknownHandler;
    switch (req.method) {
      case "GET":
        handler = GET;
        break;
      case "POST":
        handler = POST;
        break;
      case "DELETE":
        handler = DELETE;
        break;
      case "PATCH":
        handler = PATCH;
        break;
      case "PUT":
        handler = PUT;
        break;
      default:
        handler = unknownHandler;
    }
    return handler(req, res);
  };
}
