from moviepy.editor import *



def count_objects_in_folder(folder_path):
    object_count = 0
    for _, _, files in os.walk(folder_path):
        object_count += len(files)
    return object_count

output_codec = 'libx264'
r'''folder_path = r'C:\Users\arulk\OneDrive\Desktop\RetailSense\flow_1\processed_vid\1.mp4'
obj_count = count_objects_in_folder(folder_path)

for i in range(obj_count):
    video_path = f'raw_vid_unencoded\{i+1}.mp4'
    video = VideoFileClip(video_path)
    output_path = 'raw_vid_ml_out.mp4'
    video.write_videofile(output_path, codec=output_codec)'''
video_path = r"C:\Users\arulk\OneDrive\Desktop\midnight_eval\src1.mp4"
video = VideoFileClip(video_path)
output_path = r"C:\Users\arulk\OneDrive\Desktop\midnight_eval\src3.mp4"
video.write_videofile(output_path, codec=output_codec)
