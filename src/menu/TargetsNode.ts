import inquirer from 'inquirer';
import { navigate } from '.';
import { getPackageDetails } from '../utils';
import { NodeComponent, NodeName } from '../types';
import { selectTargets, setState, useSelector } from '../store';
import { Database } from '../services';

const TargetsNode: NodeComponent = () => {
  const name: NodeName = 'TargetsNode';

  return {
    name,
    childrens: [],
    render: async () => {
      const targets = useSelector(selectTargets);
      const packageList = getPackageDetails(Database.getTargers());

      return {
        name,
        answers: await inquirer.prompt<Record<string, Array<string>>>([
          {
            name,
            type: 'checkbox',
            message: 'Select the targets.',
            default: null,
            choices: packageList.map((item) => {
              const value = item.path;

              return {
                name: item.name,
                key: value,
                value,
                checked: targets.includes(value),
              };
            }),
          },
        ]),
      };
    },
    answer: (answer: Array<string>) => {
      setState((draft) => {
        draft.targets = answer;
        navigate.parentOf(name);
      });
    },
  };
};

export default TargetsNode;
