import { unzipSync } from "zlib";
import assert, { throws, deepStrictEqual, doesNotThrow, strictEqual } from "node:assert";
import { readFileSync } from "node:fs";
import { decode, encode, parse, stringify } from "#lib";
import test from "node:test";
import { join } from "node:path";

const bigtestBuffer = unzipSync(readFileSync(join(import.meta.dirname, "../../examples/bigtest.nbt")));

test("NBT", () => {
	const { name, value } = decode(bigtestBuffer);
	assert(encode(name, value).equals(bigtestBuffer));

	throws(() => encode(null, [1, "a"]));
	throws(() => decode(Buffer.from("99", "hex"), { unnamed: true }));
	throws(() => decode(Buffer.from("00000b00000001", "hex").subarray(2), { unnamed: true }));

	decode(Buffer.from([0]), { unnamed: true });
});

test("SNBT", () => {
	const { value } = decode(bigtestBuffer);
	deepStrictEqual(value, parse(stringify(value!)));
	deepStrictEqual(value, parse(stringify(value, { pretty: true })));

	doesNotThrow(() => {
		parse("{ a: 1f, b: 2.0, }");
		parse("[1, 2,]");
	}, "trailing comma");

	doesNotThrow(() => {
		parse(`'"'`);
		parse(`{'a': 1, "b": 'c'}`);
	}, "single quotes");

	throws(() => parse(`{a: `));
	throws(() => parse(`{,a: 1}`));
	throws(() => parse(`[1,,]`));
	throws(() => parse(`[,""]`));

	strictEqual(typeof parse("1bb"), "string");
	strictEqual(typeof parse("1.0.0"), "string");
});
