import inquirer from 'inquirer';
import { navigate } from '.';
import { getPackageDetails, getSourcePath } from '../utils';
import { NodeComponent, NodeName } from '../types';
import { selectSource, setState, useSelector } from '../store';
import { Database } from '../services';

const SourceNode: NodeComponent = () => {
  const name: NodeName = 'SourceNode';

  return {
    name,
    childrens: [],
    render: async () => {
      const source = useSelector(selectSource);
      const packageList = getPackageDetails(getSourcePath(Database.getSource()));

      return {
        name,
        answers: await inquirer.prompt<Record<string, string>>([
          {
            name,
            type: 'list',
            message: 'Select the source.',
            default: source,
            choices: packageList.map((item) => {
              return {
                name: item.name,
                key: item.path,
                value: item.path,
              };
            }),
          },
        ]),
      };
    },
    answer: (answer: string) => {
      setState((draft) => {
        draft.source = answer;
      });

      navigate.parentOf(name);
    },
  };
};

export default SourceNode;
