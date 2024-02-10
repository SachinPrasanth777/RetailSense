import boto3
from aws_obj_count import count_objects_in_folder
def download_video_from_s3(object_name, local_file_path):
    ACCESS_KEY = 'AKIATCKARKXVX3H754FK'
    SECRET_KEY  = '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'
    s3 = boto3.client("s3",
                aws_access_key_id=ACCESS_KEY,
                aws_secret_access_key=SECRET_KEY)
    bucket_name = "zircon-retailsense"
    folder_in_aws = 'raw_vid/'
    s3_object_key = folder_in_aws + object_name    
    s3.download_file(bucket_name, s3_object_key, local_file_path)
 
bucket_name = 'zircon-retailsense'
folder = 'raw_vid'
obj_counts = count_objects_in_folder(bucket_name, folder)
for i in range(1,1+obj_counts):
    obj_name = f"{(i)}.mp4"
    print("Downloading: ", i)
    local_file_path = f'raw_vid\{i}.mp4'
    download_video_from_s3(obj_name, local_file_path)
    print("Downloaded: ", i)