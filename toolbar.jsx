
import {Component} from 'elt/controller';
import {elt} from 'elt/node';

import './toolbar.styl';

export class Toolbar extends Component {

  view(attrs, children) {

    return <div class='eltm-toolbar'>
        {children}
      </div>;

  }

}
