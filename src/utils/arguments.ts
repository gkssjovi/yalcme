import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const getArguments = async () => {
  return await yargs(hideBin(process.argv))
    .option('help', {
      alias: 'h',
      type: 'boolean',
      default: false,
      description: 'Help',
    })
    .parse();
};
