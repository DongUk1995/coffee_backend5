import { PrismaClient } from "@prisma/client";

const client = new PrismaClient(); //@prisma/cient에서 imort되는 거야 근데 이건 아까 생성된 client -->> client를 초기화하고, export 시킴

export default client;
