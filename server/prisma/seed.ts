import { PrismaClient, Prisma } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// utils
const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const toPascalCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const toCamelCase = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

// methods
const insertLocationData = async (locations: any[]) => {
  for (const location of locations) {
    const { id, country, city, state, address, postalCode, coordinates } =
      location;
    try {
      await prisma.$executeRaw`
        INSERT INTO "Location" ("id", "country", "city", "state", "address", "postalCode", "coordinates") 
        VALUES (${id}, ${country}, ${city}, ${state}, ${address}, ${postalCode}, ST_GeomFromText(${coordinates}, 4326));
      `;
      console.log(`Inserted location for ${city}`);
    } catch (error: any) {
      console.error(`Error inserting location for ${city}:`, error?.message);
    }
  }
}
const resetSequence = async (modelName: string) => {
  const quotedModelName = `"${toPascalCase(modelName)}"`;

  const maxIdResult = await (
    prisma[modelName as keyof PrismaClient] as any
  ).findMany({
    select: { id: true },
    orderBy: { id: "desc" },
    take: 1,
  });

  if (maxIdResult.length === 0) return;

  const nextId = maxIdResult[0].id + 1;
  await prisma.$executeRaw(
    Prisma.raw(`
    SELECT setval(pg_get_serial_sequence('${quotedModelName}', 'id'), coalesce(max(id)+1, ${nextId}), false) FROM ${quotedModelName};
  `)
  );
  console.log(`Reset sequence for ${modelName} to ${nextId}`);
}
const deleteAllData = async (orderedFileNames: string[]) => {
  const modelNames = orderedFileNames.map((fileName) => {
    return toPascalCase(path.basename(fileName, path.extname(fileName)));
  });

  for (const modelName of modelNames.reverse()) {
    const modelNameCamel = toCamelCase(modelName);
    const model = (prisma as any)[modelNameCamel];
    if (!model) {
      console.error(`Model ${modelName} not found in Prisma client`);
      continue;
    }
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error: any) {
      console.error(`Error clearing data from ${modelName}:`, error?.message);
    }
  }
}

const main = async () => {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "location.json",
    "manager.json",
    "property.json", // Depends on location and manager
    "tenant.json",
    "lease.json", // Depends on property and tenant
    "application.json", // Depends on property and tenant
    "payment.json", // Depends on lease
  ];

  // Delete all existing data
  await deleteAllData(orderedFileNames);

  // Seed data
  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // model names
    const modelName = toPascalCase(
      path.basename(fileName, path.extname(fileName))
    );
    const modelNameCamel = toCamelCase(modelName);

    if (modelName === "Location") {
      await insertLocationData(jsonData);
    } else {
      const model = (prisma as any)[modelNameCamel];
      try {
        for (const item of jsonData) {
          await model.create({
            data: item,
          });
        }
        console.log(`Seeded ${modelName} with data from ${fileName}`);
      } catch (error: any) {
        console.error(`Error seeding data for ${modelName}:`, error?.message);
      }
    }

    // Reset the sequence after seeding each model
    await resetSequence(modelName);

    await sleep(1000);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
