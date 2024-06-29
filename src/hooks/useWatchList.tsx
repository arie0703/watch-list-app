import { AttributeValue, DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { useEffect, useState } from "react";

const getWatchList = async() => {

  const command = new ScanCommand({
    TableName: "items",
  });

  const dynamoDBClient = new DynamoDBClient({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
    }
  })
  const result = await dynamoDBClient.send(command)
  return result.Items
}

export const useWatchList = () => {
  const [watchList, setWatchList] = useState<Record<string, AttributeValue>[] | undefined | []>([]);

  useEffect(() => {
    (async() => {
      const result = await getWatchList();
      setWatchList(result)
    })();
  },[])

  return [watchList];
};
