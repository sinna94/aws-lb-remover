import {Command} from "commander";
import {LoadBalancerRemover} from "./LoadBalancerRemover";

const program = new Command();

program
  .requiredOption("--subnetIds <subnetIds>", "AWS Subnet Ids joined by comma(,)")
  .requiredOption("--region <region>", "AWS region")
  .parse();

export interface Arguments {
  subnetIds: string;
  region: string;
}

new LoadBalancerRemover(program.opts()).run();
