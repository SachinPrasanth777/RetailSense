import boto3
from pprint import pprint
import pathlib
import os
import logging

def upload_file_using_client(file_location, object_name):

    ACCESS_KEY = 'AKIATCKARKXVX3H754FK'
    SECRET_KEY  = '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'
    s3 = boto3.client("s3",
                aws_access_key_id=ACCESS_KEY,
                aws_secret_access_key=SECRET_KEY)    
    bucket_name = "zircon-retailsense"
    folder_in_aws = 'raw_vid/'
    s3_object_key = folder_in_aws + object_name
    response = s3.upload_file(file_location, bucket_name, s3_object_key)
    #pprint(response)
    URL = f"https://d2kzg5cjizpi8q.cloudfront.net/{object_name}"
    return URL

def count_objects_in_folder(folder_path):
    object_count = 0
    for _, _, files in os.walk(folder_path):
        object_count += len(files)
    return object_count

# Example usage
path = r'C:\Users\arulk\OneDrive\Desktop\RetailSense\flow_1\raw_vid\1.mp4'
url = upload_file_using_client(path, '1.mp4')
print(url)
URLs = []
def upload():
    folder_path = r'processed_vid'
    object_count = count_objects_in_folder(folder_path)
    for i in range(object_count):
        file_location = f"raw_vid\{(i+1)}.mp4"
        obj_name = f"{(i+1)}.mp4"
        print('Uploading :', i+1)
        URL = upload_file_using_client(file_location, obj_name)
        print("Uploaded", i+1)
        URLs.append(URL)
    print(URLs)
    return URLs

#upload()
