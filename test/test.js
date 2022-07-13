const { parse } = require("../lib");

console.log(
	parse(
		'{HideFlags:254,SkullOwner:{Id:"5b4c9145-6fa9-343a-b964-0cc1f936fcba",Properties:{textures:[{Value:"eyJ0aW1lc3RhbXAiOjE1NzQ1NjU2Njc0MDgsInByb2ZpbGVJZCI6IjIzZjFhNTlmNDY5YjQzZGRiZGI1MzdiZmVjMTA0NzFmIiwicHJvZmlsZU5hbWUiOiIyODA3Iiwic2lnbmF0dXJlUmVxdWlyZWQiOnRydWUsInRleHR1cmVzIjp7IlNLSU4iOnsidXJsIjoiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9kMTc4YWUwM2Q4NDIyN2YyMWZhMjM2ODJkOWM2MjAxMzEwMDBmZmI3NjczMzk1NTMzYjI3NDBmYTgzYWIxMDM3In19fQ=="}]}},display:{Lore:["§7§7This Minion skin changes","§7your minion\'s appearance to","§7a §eSanta§7.","","§7§7You can place this item","§7in any minion of your","§7choice!","","§f§lCOMMON COSMETIC"],Name:"§fSanta Minion Skin"},ExtraAttributes:{id:"SANTA_PERSONALITY"}}'
	)
);

console.dir("========================");

const str =
	'{HideFlags:254,SkullOwner:{Id:"5b4c9145-6fa9-343a-b964-0cc1f936fcba",Properties:{textures:[0:{Value:"eyJ0aW1lc3RhbXAiOjE1NzQ1NjU2Njc0MDgsInByb2ZpbGVJZCI6IjIzZjFhNTlmNDY5YjQzZGRiZGI1MzdiZmVjMTA0NzFmIiwicHJvZmlsZU5hbWUiOiIyODA3Iiwic2lnbmF0dXJlUmVxdWlyZWQiOnRydWUsInRleHR1cmVzIjp7IlNLSU4iOnsidXJsIjoiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9kMTc4YWUwM2Q4NDIyN2YyMWZhMjM2ODJkOWM2MjAxMzEwMDBmZmI3NjczMzk1NTMzYjI3NDBmYTgzYWIxMDM3In19fQ=="}]}},display:{Lore:[0:"§7§7This Minion skin changes",1:"§7your minion\'s appearance to",2:"§7a §eSanta§7.",3:"",4:"§7§7You can place this item",5:"§7in any minion of your",6:"§7choice!",7:"",8:"§f§lCOMMON COSMETIC"],Name:"§fSanta Minion Skin"},ExtraAttributes:{id:"SANTA_PERSONALITY"}}';

try {
	console.log(parse(str));
} catch (e) {
	const regex = /Unexpected character (.) at position (\d*)/;
	console.log(e.message);
	if (e instanceof Error && regex.test(e.message)) {
		const [, char, pos_] = e.message.match(regex);
		const pos = parseInt(pos_);

		console.dir([char, pos]);

		const amount = 15;

		console.log(
			str.substring(pos > amount ? pos - amount : 0, pos + amount + 1)
		);
		console.log(" ".repeat(amount) + "^");
	}
	console.log("oops");
}
