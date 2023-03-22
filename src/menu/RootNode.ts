import inquirer from 'inquirer';
import { navigate } from '.';
import { colorize, Colors, getPackageDetails, getSourcePath, publish } from '../utils';
import { PackageDetail } from '../types/package';
import { NodeComponent, NodeName } from '../types';
import { selectSource, selectTargets, useSelector } from '../store';
import { Database } from '../services';
import TargetsNode from './TargetsNode';
import SourceNode from './SourceNode';
import ConfigNode from './ConfigNode';

export enum RootNodeChoice {
  TARGETS = 'TARGETS',
  SOURCE = 'SOURCE',
  PUBLISH = 'PUBLISH',
  CONFIG = 'CONFIG',
}

const RootNode: NodeComponent = () => {
  const name: NodeName = 'RootNode';

  const renderTargetsName = (packageList: Array<PackageDetail>): string => {
    const packageNameList = packageList.map((item) => item.name);
    const selectedPackages = colorize(`(${packageNameList.length ? packageNameList.join(', ') : 'none'})`, Colors.Dim);

    return `Targets ${selectedPackages}`;
  };

  const renderSourceName = (pgk: PackageDetail | null): string => {
    const packageName = pgk?.name;
    const selectedPackage = colorize(`(${packageName ? packageName : 'none'})`, Colors.Dim);

    return `Source ${selectedPackage}`;
  };

  const renderPublish = (isPublishAvailable: boolean): string => {
    const availalbe = colorize('OK', Colors.FgGreen);
    const notAvailable = colorize('KO', Colors.FgRed);
    const label = isPublishAvailable ? availalbe : notAvailable;

    return `Publish ${colorize('(', Colors.Dim)}${label}${colorize(')', Colors.Dim)}`;
  };

  return {
    name,
    childrens: [SourceNode(), TargetsNode(), ConfigNode()],
    render: async () => {
      const targets = useSelector(selectTargets);
      const source = useSelector(selectSource);

      const targetsPackageList = getPackageDetails(targets);
      const sourcePackage = source ? getPackageDetails(getSourcePath(source)) : null;

      const isPublishAvailable = !!(targets.length > 0 && source);

      return {
        name,
        answers: await inquirer.prompt<Record<string, RootNodeChoice>>([
          {
            name,
            type: 'list',
            message: 'Select the source and the targets',
            choices: [
              {
                type: 'choice',
                key: RootNodeChoice.PUBLISH,
                value: RootNodeChoice.PUBLISH,
                name: renderPublish(isPublishAvailable),
                disabled: !isPublishAvailable,
              },
              new inquirer.Separator(),
              {
                type: 'choice',
                key: RootNodeChoice.SOURCE,
                value: RootNodeChoice.SOURCE,
                name: renderSourceName(sourcePackage),
                disabled: Database.getSource().length === 0,
              },
              {
                type: 'choice',
                key: RootNodeChoice.TARGETS,
                value: RootNodeChoice.TARGETS,
                name: renderTargetsName(targetsPackageList),
                disabled: Database.getTargers().length === 0,
              },
              {
                type: 'choice',
                key: RootNodeChoice.CONFIG,
                value: RootNodeChoice.CONFIG,
                name: 'Config',
              },
            ],
          },
        ]),
      };
    },
    answer: async (answer: RootNodeChoice, _answers: Record<string, Array<string>>): Promise<void> => {
      if (answer === RootNodeChoice.SOURCE) {
        navigate.to('SourceNode');
      }

      if (answer === RootNodeChoice.TARGETS) {
        navigate.to('TargetsNode');
      }

      if (answer === RootNodeChoice.CONFIG) {
        navigate.to('ConfigNode');
      }

      if (answer === RootNodeChoice.PUBLISH) {
        const targets = useSelector(selectTargets);
        const source = useSelector(selectSource);

        if (source && !!targets.length) {
          await publish(source, targets);
        }
      }
    },
  };
};

export default RootNode;
