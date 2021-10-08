import { container } from "tsyringe";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton("DateProvider", DayjsDateProvider);

container.registerInstance("MailProvider", new EtherealMailProvider());
