
import {c, o, cls} from 'carbyne';

export function Icon(attrs, content) {
  let res = <i class='zmdi'></i>;

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
