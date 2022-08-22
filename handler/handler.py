import boto3
import uuid

uuid = str(uuid.uuid4())
print('uuidGlobal===', uuid)

def lambda_handler(event, context):
    demoPythonApp = boto3.resource('dynamodb')
    table = demoPythonApp.Table('demoPythonApp')

    if event['info']['fieldName'] == "demoPythonApp":
        print('this is EventInfo==', event['info']['fieldName'])
        table.put_item(
            Item={
                'PK': uuid,
                'SK': uuid,
                'firstName': event['arguments']['input']['firstName'],
                'lastName': event['arguments']['input']['lastName'],
                'age': event['arguments']['input']['age'],
                'is_married': event['arguments']['input']['is_married']
            }
        )
        return {'message': 'Data inserted successfully!!'}

    elif event['info']['fieldName'] == "demoUpdatePythonApp":
        table.update_item(
            Key={
                'PK': event['arguments']['input']['PK'],
                'SK': event['arguments']['input']['PK'],
                # 'firstName': event['arguments']['input']['firstName'],
                # 'lastName': event['arguments']['input']['lastName'],
                # 'age': event['arguments']['input']['age'],
                # 'is_married': event['arguments']['input']['is_married']
            },
            UpdateExpression='SET firstName = :firstName, lastName = :lastName, age = :age, is_married = :is_married',
            ExpressionAttributeValues={
                ':firstName': event['arguments']['input']['firstName'],
                ':lastName': event['arguments']['input']['lastName'],
                ':age': event['arguments']['input']['age'],
                ':is_married': event['arguments']['input']['is_married']
            }
        )
        return {"message": "Data updated successfully!!"}

    elif event['info']['fieldName'] == "deleteUser":
        table.delete_item(
            Key={
                'PK': event['arguments']['PK'],
                'SK': event['arguments']['PK'],
            }
        )
        return {"PK": event['arguments']['PK']}

