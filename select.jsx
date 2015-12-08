
var {o, c, bind, cls, click} = require('carbyne');
import './select.styl';

export function Select(attrs, children) {

	let model = o(attrs.model);
	let options = o(attrs.options || []);

	let _select = o(-1);

	let node = <label class='carbm-select-label'>
		<select class='carbm-select' $$={bind(_select)}>
			{options.transform((opts) => opts.map((o, i) => <option value={i}>{o.name}</option>))}
		</select>
	</label>

	let mod = false;

	node.observe(model, (v) => {
		if (mod) return;

		mod = true;
		console.log(options.get().indexOf(v));
		_select.set(''+ options.get().indexOf(v));
		requestAnimationFrame(() => { mod = false; })
	});

	node.observe(_select, (v) => {
		if (mod) return;
		mod = true;

		model.set(options.get()[v]);
		requestAnimationFrame(() => { mod = false; })
	});

	// node.observe(o(_select, model, options, function (_select, model, options) {
	// 	console.log(arguments);

	// 	let idx = options.indexOf(model);
	// 	if (idx > -1 && idx !== _select) {
	// 		console.log('???');
	// 		_select.set(idx);
	// 	}
	// 	// console.log(_select, model, options);
	// }));

	// node.observe(_select, (v) => {
	// 	//
	// });

	// node.observe(model, (mod) => {

	// });

	return node;
}
