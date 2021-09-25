import { container } from "tsyringe";

import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.registerSingleton("DateProvider", DayjsDateProvider);
