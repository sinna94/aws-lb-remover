import {EC2, ELB} from "aws-sdk";
import {Arguments} from "./main";
import {Aws} from "./Aws";

/**
 * check cidr blocks usable
 */
export class LoadBalancerRemover {
  private readonly args: Arguments;
  private readonly subnetIdSet: Set<string>;
  private readonly aws: Aws;

  constructor(args: Arguments) {
    this.args = args;
    this.subnetIdSet = this.getCidrSet(args.subnetIds);
    this.aws = new Aws(this.args.region);
  }

  private getCidrSet(subnetIds: string) {
    const cidrs = subnetIds.split(",").map(s => s.trim());
    return new Set(cidrs);
  }

  /**
   * @return
   * ex)
   * {
   *   '172.31.34.0/24': false,
   *   '172.31.35.0/24': false,
   *   '172.31.36.0/24': true
   * }
   */
  public run = () => {
    this.aws.describeLoadBalancers()
      .then(this.removeLoadBalancers)
      .catch(err => console.error(err));
  }

  private removeLoadBalancers = (result: ELB.DescribeAccessPointsOutput) => {
    const lbNames = (result.LoadBalancerDescriptions ?? [])?.filter(lbDescription => {
      const {Subnets} = lbDescription;
      if(!Subnets){
        return false;
      }
      
      const result = Subnets.some(id => this.subnetIdSet.has(id))
      return result
      
    }).map(lbDecription => lbDecription.LoadBalancerName)
    .filter(this.isString);

    this.aws.removeLoadBalancers(lbNames);
  }

  private isString(value: string | undefined): value is string {
    return value !== undefined;
  }
}
