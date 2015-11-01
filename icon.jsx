
import {elt} from 'elt/node';
import {Component} from 'elt/controller';

export function Icon(attrs, content) {
  return <i class='material-icons'>{attrs.name}</i>;
}
