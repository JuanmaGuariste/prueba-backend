import { Command } from 'commander';

const program = new Command();

program.version('0.0.1')
    .option('--mode <env>', 'Set your enviroment', 'dev')
    .option('--storage <env>', 'Set your storage type: "MONGO" or "FILE"', 'MONGO');

program.parse(process.argv);

export default program;