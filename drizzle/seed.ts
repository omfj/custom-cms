import "dotenv/config";
import { db } from "@/db/drizzle";
import {
  companies,
  eventTypes,
  events,
  groupTypes,
  groups,
  jobTypes,
  jobs,
  locations,
  posts,
  profiles,
} from "@/db/schemas";
import { faker } from "@faker-js/faker";
import { slugify } from "@/lib/slugify";

async function seed() {
  /**
   * Insert fake posts
   */
  await db.insert(posts).values(
    Array.from({ length: 40 }).map(() => ({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(3),
    }))
  );

  /**
   * Insert companies
   */
  await db.insert(companies).values([
    {
      id: slugify("Bekk"),
      name: "Bekk",
      website: "https://bekk.no",
    },
    {
      id: slugify("Sopra Steria"),
      name: "Sopra Steria",
      website: "https://soprasteria.no",
    },
    {
      id: slugify("Kantega"),
      name: "Kantega",
      website: "https://kantega.no",
    },
  ]);

  /**
   * Insert job types
   */
  await db.insert(jobTypes).values([
    {
      id: "internship",
      name: "Internship",
    },
    {
      id: "fulltime",
      name: "Fulltidsstilling",
    },
    {
      id: "parttime",
      name: "Deltidsstilling",
    },
  ]);

  /**
   * Insert jobs
   */
  await db.insert(jobs).values([
    {
      slug: slugify("Bekk internship"),
      title: "Bekk internship",
      body: faker.lorem.paragraphs(3),
      applicationUrl: "https://bekk.no",
      jobTypeId: "internship",
      companyId: "bekk",
    },
    {
      slug: slugify("Nyutdannet utvikler"),
      title: "Nyutdannet utvikler",
      body: faker.lorem.paragraphs(3),
      applicationUrl: "https://soprasteria.no",
      jobTypeId: "fulltime",
      companyId: "sopra-steria",
    },
    {
      slug: slugify("Kantega internship"),
      title: "Kantega internship",
      body: faker.lorem.paragraphs(3),
      applicationUrl: "https://kantega.no",
      jobTypeId: "internship",
      companyId: "kantega",
    },
  ]);

  /**
   * Insert profiles
   */
  await db.insert(profiles).values([
    {
      name: "Ole Magnus Johnsen",
    },
    {
      name: "Torger Kielland",
    },
    {
      name: "Martin Gammelsæter",
    },
    {
      name: "Marte Løge",
    },
    {
      name: "Eirik Berg",
    },
    {
      name: "Aurora Klæboe Berg",
    },
    {
      name: "Oscar A. Fredriksen",
    },
  ]);

  /**
   * Insert locations
   */
  await db.insert(locations).values([
    {
      name: "Lesesalen",
    },
    {
      name: "Store Auditorium",
    },
    {
      name: "Hector's Hybel",
    },
  ]);

  /**
   * Insert group types
   */
  await db.insert(groupTypes).values([
    {
      id: "board",
      name: "Hovedstyret",
    },
    {
      id: "subgroup",
      name: "Undergruppe",
    },
    {
      id: "intgroup",
      name: "Interessegruppe",
    },
    {
      id: "suborg",
      name: "Underorganisasjon",
    },
    {
      id: "committee",
      name: "Komité",
    },
  ]);

  /**
   * Insert event types
   */
  await db.insert(eventTypes).values([
    {
      id: "bedpres",
      name: "Bedriftspresentasjon",
    },
    {
      id: "event",
      name: "Arrangement",
    },
    {
      id: "workshop",
      name: "Workshop",
    },
  ]);

  /**
   * Insert groups
   */
  await db.insert(groups).values([
    {
      id: "webkom",
      name: "Webkom",
      groupTypeId: "subgroup",
    },
    {
      id: "bedkom",
      name: "Bedkom",
      groupTypeId: "subgroup",
    },
    {
      id: "tilde",
      name: "Tilde",
      groupTypeId: "subgroup",
    },
    {
      id: "hyggkom",
      name: "Hyggkom",
      groupTypeId: "subgroup",
    },
    {
      id: "gnist",
      name: "Gnist",
      groupTypeId: "subgroup",
    },
    {
      id: "programmerbar",
      name: "Programmerbar",
      groupTypeId: "suborg",
    },
    {
      id: "hovedstyret",
      name: "Hovedstyret",
      groupTypeId: "board",
    },
    {
      id: "makerspace",
      name: "Makerspace",
      groupTypeId: "subgroup",
    },
    {
      id: "esc",
      name: "ESC",
      groupTypeId: "subgroup",
    },
  ]);

  /**
   * Insert events
   */
  await db.insert(events).values([
    {
      slug: slugify("Bekk bedpres"),
      title: "Bekk bedpres",
      body: faker.lorem.paragraphs(3),
      date: new Date(),
      registrationStart: new Date(),
      registrationEnd: new Date(),
      groupId: "bedkom",
      eventTypeId: "bedpres",
      locationId: "lesesalen",
      companyId: "bekk",
    },
    {
      slug: slugify("Sopra Steria bedpres"),
      title: "Sopra Steria bedpres",
      body: faker.lorem.paragraphs(3),
      date: new Date(),
      registrationStart: new Date(),
      registrationEnd: new Date(),
      groupId: "bedkom",
      eventTypeId: "bedpres",
      locationId: "store-auditorium",
      companyId: "sopra-steria",
    },
    {
      slug: slugify("Kantega bedpres"),
      title: "Kantega bedpres",
      body: faker.lorem.paragraphs(3),
      date: new Date(),
      registrationStart: new Date(),
      registrationEnd: new Date(),
      groupId: "bedkom",
      eventTypeId: "bedpres",
      locationId: "store-auditorium",
      companyId: "kantega",
    },
    {
      slug: slugify("Workshop med Webkom"),
      title: "Workshop med Webkom",
      body: faker.lorem.paragraphs(3),
      date: new Date(),
      registrationStart: new Date(),
      registrationEnd: new Date(),
      groupId: "webkom",
      eventTypeId: "workshop",
      locationId: "hectors-hybel",
    },
  ]);
}

seed()
  .then(() => {
    console.log("🌱 Done seeding.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("🚨 Seeding failed! Error:", err);
    process.exit(1);
  });
