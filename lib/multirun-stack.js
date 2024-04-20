const { Stack, CfnCondition, Fn } = require('aws-cdk-lib');

lambda = require('aws-cdk-lib/aws-lambda');
path = require('path');
core = require('aws-cdk-lib/core');

class MultirunStack extends Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const usEast1Condition = new CfnCondition(this, 'IsUsEast1', {
      expression: Fn.conditionEquals(core.Aws.REGION, 'us-east-1'),
    });

    const condRuntime = new lambda.Runtime(Fn.conditionIf(
      usEast1Condition.logicalId,
      'nodejs18.x',
      'nodejs20.x'
    ), lambda.RuntimeFamily.NODEJS, { supportsInlineCode: true });

    const lambdaFunction = new lambda.Function(this, 'HelloWorldFunction', {
      functionName: 'HelloWorldFunction',
      runtime: condRuntime,
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda_nodejs')),
      handler: 'index.handler',
    });
  }
}

module.exports = { MultirunStack }
