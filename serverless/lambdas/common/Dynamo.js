const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(params) {
    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(
        `There was an error fetching the data from ${params.TableName}`
      );
    }

    return data.Item;
  },

  async getAll(params) {
    const data = await documentClient.scan(params).promise();

    if (!data || !data.Items) {
      throw Error(
        `There was an error fetching the data from ${params.TableName}`
      );
    }

    return data.Items;
  },

  async query(params) {
    const data = await documentClient.query(params).promise();
    console.log('data:', data);
    if (!data || !data.Items) {
      throw Error(
        `There was an error fetching the data from ${params.TableName}`
      );
    }

    return data.Items;
  },

  async write(data, TableName) {
    if (!data.BMSHWRSN) {
      throw Error('no BMSHWRSN on the data');
    }

    const params = {
      TableName,
      Item: data
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error insertion BMSHWRSN of ${data.BMSHWRSN} in table ${TableName}`
      );
    }

    return data;
  },

  async writeConnection(data, TableName) {
    if (!data.ConnectionId) {
      throw Error('no ConnectionId on the data');
    }

    const params = {
      TableName,
      Item: data
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was a write connection error of ${data.ConnectionId} in the table ${TableName}`
      );
    }

    return data;
  },

  async deleteConnection(ConnectionId, TableName) {
    const params = {
      TableName,
      Key: {
        ConnectionId
      }
    };

    return documentClient.delete(params).promise();
  }
};

module.exports = Dynamo;
