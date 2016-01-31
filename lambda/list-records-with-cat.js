function listRecordsWithCat(dynamo, params, context) {
    if (!params.catName) {
        context.fail('Missing param');
        return;
    }
    
    var opts = {};
    opts.TableName = "test-for-rcrd";
    opts.ScanFilter = dynamo.Condition("raw", "CONTAINS", params.catName);
    dynamo.scan(opts, context.done);
}

module.exports = listRecordsWithCat;
