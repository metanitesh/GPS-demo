import { MongoClient } from "mongodb";
import { getPlaces, addPlace } from "./db";

jest.mock("mongodb", () => {
  return {
    MongoClient: {
      connect: jest.fn().mockImplementation((param) => {
        if (param === "error") {
          return Promise.reject(new Error("error"));
        }
        return Promise.resolve({
          db: jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue({
              find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([
                  { name: "place1", loc: [1, 2] },
                  { name: "place2", loc: [3, 4] },
                ]),
              }),
              insertOne: jest.fn().mockResolvedValue({
                insertedId: "some-id",
                result: { ok: 1, n: 1 },
              }),
            }),
          }),
        });
      }),
    },
  };
});

describe("getPlaces", () => {
  it("should return an array of places", async () => {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const places = await getPlaces(client);
    expect(places).toEqual([
      { name: "place1", loc: [1, 2] },
      { name: "place2", loc: [3, 4] },
    ]);
  });

  it("should add a new place", async () => {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const place = { name: "place3", loc: [5, 9] };
    const result = await addPlace(client, place);
    expect(result).toEqual({ insertedId: "some-id", result: { ok: 1, n: 1 } });
  });
});
