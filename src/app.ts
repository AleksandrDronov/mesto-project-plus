import express, { Response, NextFunction } from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { IRequestWhithUser } from "./utils/types";
import { PORT, URL_BD } from "./config";
import { login, createUser } from "./controllers/users";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);
mongoose.connect(URL_BD);

app.use((req: IRequestWhithUser, res: Response, next: NextFunction) => {
  req.user = {
    _id: "63f251385dd05c3d13a1608f", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.post("/signin", login);
app.post("/signup", createUser);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
