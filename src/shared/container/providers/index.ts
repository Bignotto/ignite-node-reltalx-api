import { container } from "tsyringe";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton("DateProvider", DayjsDateProvider);

container.registerInstance("MailProvider", new EtherealMailProvider());

container.registerSingleton(
  "StorageProvider",
  diskStorage[process.env.STORAGE_PROVIDER]
);
