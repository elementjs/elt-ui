
import {elt} from '../node';
import {Component} from '../controller';
import {SVGNode} from '../svg';

export class Icon extends Component {
  view(attrs, content) {
    // should need something done about forwarded classes.
    return <i class='material-icons'>{attrs.name}</i>;
  }

  link() {

  }

}
