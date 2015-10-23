
import {elt} from 'elt/node';
import {Component} from 'elt/controller';

export class Icon extends Component {
  view(attrs, content) {
    // should need something done about forwarded classes.
    return <i class='material-icons'>{attrs.name}</i>;
  }

  link() {

  }

}
