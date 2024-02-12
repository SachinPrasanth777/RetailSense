import boto3

def count_objects_in_folder(bucket_name, folder_name):
    ACCESS_KEY = 'YOUR ACCESS KET'
    SECRET_KEY  = 'your secret key'
    s3 = boto3.client("s3",
                aws_access_key_id=ACCESS_KEY,
                aws_secret_access_key=SECRET_KEY)  
    paginator = s3.get_paginator('list_objects_v2')
    count = 0
    
    # Pagination to list all objects in the folder
    for result in paginator.paginate(Bucket=bucket_name, Prefix=folder_name):
        if 'Contents' in result:
            count += len(result['Contents'])
    
    return count-1

# Example usage
bucket_name = 'zircon-retailsense'
folder_name = 'raw_vid'
object_count = count_objects_in_folder(bucket_name, folder_name)
print("Number of objects in folder '{}': {}".format(folder_name, object_count))
