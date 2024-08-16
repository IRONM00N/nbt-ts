import { decode, encode } from "#lib";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { unzipSync } from "zlib";

console.log(decode(readFileSync(join(import.meta.dirname, "../../examples/hello_world.nbt"))));

const bigTestBuffer = unzipSync(readFileSync(join(import.meta.dirname, "../../examples/bigtest.nbt")));
const result = decode(bigTestBuffer);

console.log(result);

// Buffer should be the same after encoding again.
console.log(encode(result.name, result.value).equals(bigTestBuffer));

console.log(decode(Buffer.from("01ff", "hex"), { unnamed: true }));

console.log(decode(Buffer.from("0a0000010000ff00", "hex"), { useMaps: true }));
