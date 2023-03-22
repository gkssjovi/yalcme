import { Node, NodeName } from '../types';
import RootNode from './RootNode';

const list = {} as Record<NodeName, Node>;

const createNodeList = (node: Node) => {
  if (node.name in list) {
    throw new Error(`Duplicate node name "${node.name}".`);
  }

  list[node.name] = node;
  node.childrens.forEach((child) => {
    child.parent = node;
    createNodeList(child);
  });
};

const root: Node = RootNode();
root.parent = null;

createNodeList(root);

const node = {
  current: list.RootNode,
};

const setNode = (nodeName: NodeName) => {
  if (!(nodeName in list)) {
    throw new Error(`Node "${nodeName}" not in the list.`);
  }

  node.current = list[nodeName];
};

const setParentNode = (nodeName: NodeName) => {
  if (!(nodeName in list)) {
    throw new Error(`Node "${nodeName}" not in the list.`);
  }

  const parent = list[nodeName]?.parent;

  if (!parent) {
    throw new Error(`Node "${nodeName}" don't have a parent.`);
  }

  node.current = parent;
};

export const navigate = {
  parentOf: setParentNode,
  to: setNode,
};

export default node;
