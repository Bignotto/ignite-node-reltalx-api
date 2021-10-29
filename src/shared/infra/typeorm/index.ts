import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      // host:
      //   process.env.NODE_ENV === "test" || process.env.NODE_ENV === "prod"
      //     ? "localhost"
      //     : "database",
      database:
        process.env.NODE_ENV === "test"
          ? "rentalx_test"
          : defaultOptions.database,
    })
  );
};
