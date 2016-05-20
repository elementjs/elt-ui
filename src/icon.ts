
import {c, o, cls, BaseAtom} from 'carbyne';

export function Icon(attrs, content) : BaseAtom {
  let res: Atom = c('i.zmdi')

  res.on('mount', function () {
    let old_value = null;
    res.observe(attrs.name, (v) => {
      v = `zmdi-${v}`;
      if (old_value) res.element.classList.remove(old_value);
      res.element.classList.add(v);
      old_value = v;
    });
  });

  return res;
}
