# NBT

An easy to use encoder and decoder for the [NBT format](https://wiki.vg/NBT).

NBT compound tags are represented as plain JavaScript objects. Some types
are wrapped in custom classes since JavaScript does not support different integer
types directly, e.g. `Byte`, `Short`, `Int`, `Float`.

Node 10.4 or higher is required for BigInts, which are used to represent 64 bit integers.

## Example

```js
const { encode, decode, Int, Float } = require("nbt-ts")

const buffer = encode("root tag name", {
    int: new Int(123456),
    long: 1040120600380n,
    float: new Float(0.75),
    double: 0.1 + 0.2,
    text: "Hello world",
    list: ["item 1", "item 2"],
    nested: {
        byteArray: Buffer.from([0x80, 0x40, 0x20])
    },
    intArray: new Int32Array([1, 2, 3, 4]),
    longArray: new BigInt64Array([1n, 2n, 3n, 4n])
})

decode(Buffer.from("02000973686F7274546573747FFF", "hex"))
// ⮡ { name: 'shortTest', value: Short { value: 32767 }, offset: 14 }

// unnamed tag
encode(null, "a") // ⮡ <Buffer 00 00 01 61>

// decode unnamed tag
decode(Buffer.from([0x00]), false) // ⮡ { name: null, value: null, offset: 1 }

// decode at offset
decode(Buffer.from("0000010000ff", "hex"), true, 2)
// ⮡ { name: '', value: Byte { value: -1 }, offset: 6 }
```
