import inquirer from 'inquirer';
import { navigate } from '.';
import { NodeComponent, NodeName } from '../types';
import { Database } from '../services';
import { env } from '../config';
import path from 'path';
import { spawnSync } from 'child_process';

export enum ConfigNodeChoice {
  BACK = 'BACK',
  VIM = 'VIM',
  VSCODE = 'VSCODE',
}

const ConfigNode: NodeComponent = () => {
  const name: NodeName = 'ConfigNode';

  return {
    name,
    childrens: [],
    render: async () => {
      return {
        name,
        answers: await inquirer.prompt<Record<string, ConfigNodeChoice>>([
          {
            name,
            type: 'list',
            message: 'Select editor.',
            choices: [
              {
                name: 'Back',
                key: ConfigNodeChoice.BACK,
                value: ConfigNodeChoice.BACK,
              },
              new inquirer.Separator(),
              {
                name: 'Vim',
                key: ConfigNodeChoice.VIM,
                value: ConfigNodeChoice.VIM,
              },
              {
                name: 'VSCode',
                key: ConfigNodeChoice.VSCODE,
                value: ConfigNodeChoice.VSCODE,
              },
            ],
          },
        ]),
      };
    },
    answer: (answer: ConfigNodeChoice) => {
      switch (answer) {
        case ConfigNodeChoice.VIM:
          spawnSync('vim', [path.resolve(env.DB_SOURCE)], { stdio: 'inherit' });
          break;
        case ConfigNodeChoice.VSCODE:
          spawnSync('code', ['-n', path.resolve(env.DB_SOURCE)], { stdio: 'inherit' });
          break;
        case ConfigNodeChoice.BACK:
          navigate.parentOf(name);
          break;
      }
    },
  };
};

export default ConfigNode;
