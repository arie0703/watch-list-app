import { AttributeValue, DeleteItemCommand, DynamoDBClient, PutItemCommand, PutItemCommandOutput, ScanCommand } from "@aws-sdk/client-dynamodb";
import { useEffect, useState } from "react";

const tableName = import.meta.env.VITE_DYNAMODB_TABLE_NAME;

const dynamoDBClient = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
})

const generateUniqueId = () => {
  return Math.random().toString(32).substring(2);
}

const getWatchList = async() => {
  const command = new ScanCommand({
    TableName: tableName,
  });

  const result = await dynamoDBClient.send(command)
  return result.Items
}

export const addWatchList: (itemName: string, comment: string) => Promise<PutItemCommandOutput> = async(itemName: string, comment: string) => {

  const uuid = generateUniqueId();
  const command = new PutItemCommand({
    TableName: tableName,
    Item: {
      uuid: {
        S: uuid
      },
      name: {
        S: itemName
      },
      comment: {
        S: comment
      }
    }
  })

  const response = await dynamoDBClient.send(command)
  console.log(response);
  return response;
}

export const deleteWatchList: (uuid: string) => Promise<PutItemCommandOutput> = async(uuid: string) => {

  const command = new DeleteItemCommand({
    TableName: tableName,
    Key: {
      uuid: {
        S: uuid
      }
    }
  })

  const response = await dynamoDBClient.send(command)
  console.log(response);
  return response;
}

export const useWatchList = () => {
  const [watchList, setWatchList] = useState<Record<string, AttributeValue>[] | undefined | []>([]);

  useEffect(() => {
    (async() => {
      const result = await getWatchList();
      setWatchList(result)
    })();
  },[watchList])

  return {watchList} ;
};
