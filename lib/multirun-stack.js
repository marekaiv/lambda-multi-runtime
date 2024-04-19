const { Stack, Duration } = require('aws-cdk-lib');

lambda = require('aws-cdk-lib/aws-lambda');
path = require('path');
// const sqs = require('aws-cdk-lib/aws-sqs');

class MultirunStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const usEast1Region = this.node.tryGetContext('aws:region') === 'us-east-1';

    const lambdaFunction = new lambda.Function(this, 'HelloWorldFunction', {
       functionName: 'HelloWorldFunction',
       runtime: usEast1Region ? lambda.Runtime.PYTHON_3_9 : lambda.Runtime.NODEJS_18_X,
      // runtime: lambda.Runtime.NODEJS_18_X,
       code: usEast1Region
            ? lambda.Code.fromAsset(path.join(__dirname, 'lambda_python'))
            : lambda.Code.fromAsset(path.join(__dirname, 'lambda_nodejs')),
       handler: usEast1Region ? 'index.handler' : 'index.handler',
    });
  }
}

module.exports = { MultirunStack }
