"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const program = new commander_1.Command();
program
    .requiredOption("--cidr_blocks <cidr_blocks>", "AWS Subnet CIDR Blocks joined by comma(,)")
    .option("--vpc_id <vpc_id>", "AWS VPC ID")
    .requiredOption("--region <region>", "AWS region")
    .parse();
const main = () => {
    aws_sdk_1.default.config.getCredentials(function (err) {
        var _a;
        if (err)
            console.log(err.stack);
        // credentials not loaded
        else {
            console.log("Access key:", (_a = aws_sdk_1.default.config.credentials) === null || _a === void 0 ? void 0 : _a.accessKeyId);
        }
    });
    const opts = program.opts();
    console.log(opts);
    aws_sdk_1.default.config.update({ region: opts.region });
    const ec2 = new aws_sdk_1.default.EC2();
    const request = {
        Filters: [{ Name: "CidrBlock", Values: opts.cidr_blocks.split(",").map((cidr) => cidr.trim()) }]
    };
    ec2.describeSubnets(request).promise().then((result) => {
        var _a;
        (_a = result.Subnets) === null || _a === void 0 ? void 0 : _a.forEach(subnet => console.log(subnet));
    });
};
main();
