export type NodeComponent = () => Omit<Node, 'parent'>;

export type NodeName = 'RootNode' | 'SourceNode' | 'TargetsNode' | 'ConfigNode';

export type Node = {
  parent?: Node | null;
  name: NodeName;
  render: () => Promise<{
    name: string;
    answers: Record<string, unknown>;
  }>;
  answer: (answer: any, answers: Record<string, any>) => Promise<void> | void;
  childrens: Array<Node>;
};
