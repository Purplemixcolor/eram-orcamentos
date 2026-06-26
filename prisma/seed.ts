import { PrismaClient, RoleName } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categories, serviceRecords, shipowners, users, vessels } from "../src/lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  const roles = await Promise.all(
    Object.values(RoleName).map((name) =>
      prisma.role.upsert({
        where: { name },
        update: {},
        create: { name }
      })
    )
  );

  const roleByName = new Map(roles.map((role) => [role.name, role.id]));
  const passwordHash = await bcrypt.hash("eram123", 12);

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        passwordHash,
        active: user.active,
        roleId: roleByName.get(user.role)!
      }
    });
  }

  for (const owner of shipowners) {
    await prisma.shipowner.upsert({
      where: { id: owner.id },
      update: {},
      create: {
        id: owner.id,
        legalName: owner.legalName,
        tradeName: owner.tradeName,
        cnpj: owner.cnpj,
        contacts: owner.contacts,
        internalStatus: owner.internalStatus,
        observations: owner.observations
      }
    });
  }

  for (const vessel of vessels) {
    const owner = shipowners.find((item) => item.tradeName === vessel.currentShipowner);
    await prisma.vessel.upsert({
      where: { id: vessel.id },
      update: {},
      create: {
        id: vessel.id,
        name: vessel.name,
        previousName: vessel.previousName,
        type: vessel.type,
        currentShipownerId: owner?.id,
        registration: vessel.registration,
        imo: vessel.imo,
        dimensions: vessel.dimensions,
        builtYear: vessel.builtYear,
        observations: vessel.observations
      }
    });
  }

  for (const [index, name] of categories.entries()) {
    await prisma.serviceCategory.upsert({
      where: { name },
      update: {},
      create: { name, sortOrder: index }
    });
  }

  for (const record of serviceRecords) {
    const vessel = vessels.find((item) => item.name === record.vessel);
    const owner = shipowners.find((item) => item.tradeName === record.shipowner);
    const category = await prisma.serviceCategory.findUnique({ where: { name: record.category } });
    const subcategory = category
      ? await prisma.serviceSubcategory.upsert({
          where: { name_categoryId: { name: record.subcategory, categoryId: category.id } },
          update: {},
          create: { name: record.subcategory, categoryId: category.id }
        })
      : null;

    await prisma.serviceRecord.upsert({
      where: { internalCode: record.internalCode },
      update: {},
      create: {
        internalCode: record.internalCode,
        title: record.title,
        description: record.description,
        keywords: record.keywords,
        vesselId: vessel?.id,
        shipownerId: owner?.id,
        categoryId: category?.id,
        subcategoryId: subcategory?.id,
        year: record.year,
        executionDate: new Date(record.executionDate),
        quoteDate: new Date(record.quoteDate),
        quoteNumber: record.quoteNumber,
        workOrderNumber: record.workOrderNumber,
        quantity: record.quantity,
        unit: record.unit,
        originalUnitValue: record.originalUnitValue,
        originalTotalValue: record.originalTotalValue,
        materialsIncluded: record.materialsIncluded,
        laborIncluded: record.laborIncluded,
        estimatedHours: record.estimatedHours,
        actualHours: record.actualHours,
        sector: record.sector,
        estimator: record.estimator,
        observations: record.observations,
        serviceStatus: record.serviceStatus,
        source: record.source,
        sourcePath: record.sourcePath,
        sourceReference: record.sourceReference,
        importedAt: new Date(record.importedAt),
        importedBy: record.importedBy,
        reliability: record.reliability,
        reviewStatus: record.reviewStatus,
        local: record.local,
        material: record.material
      }
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
