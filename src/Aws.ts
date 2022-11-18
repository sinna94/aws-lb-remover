import AWS, { ELB } from "aws-sdk";

export class Aws {
  private elb;
  public constructor(region: string) {
    this.setConfig(region);
    this.elb = new ELB();
  }

  private setConfig(region: string) {
    AWS.config.getCredentials(function (err) {
      if (err) console.log(err.stack);
      // credentials not loaded
    });

    AWS.config.update({ region })
  }

  public describeLoadBalancers = () => {
    return this.elb.describeLoadBalancers().promise()
  }

  public removeLoadBalancers = (names: string[]) => {
    names.forEach(name => {
      this.elb.deleteLoadBalancer({ LoadBalancerName: name }).promise()
        .then(() =>
          console.log(`remove: ${name}`)
        )
        .catch(e => console.error(e));
    })
  }
}
