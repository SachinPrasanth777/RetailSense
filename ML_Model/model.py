from ultralytics import YOLO
import cv2
import math 
from datetime import datetime
import numpy as np
import time
from mongo import conn
#from aws_processed_upload import upload_file_using_client

#video capture
cap = cv2.VideoCapture(r"C:\Users\arulk\OneDrive\Desktop\midnight_eval\src5.mp4")
frame_rate = cap.get(cv2.CAP_PROP_FPS)
cap.set(3, 640)
cap.set(4, 480)
section_names = ['cookware', 'sanitary', 'snacks', 'stationary']
section_dict = {}
# model
model = YOLO("yolo-Weights/yolov8n.pt")
classNames = ["person"]
start_time = time.time()


def calculate_counts(sections):
    n = len(sections)
    section_counts_per_hour = {f"Section{i+1}": {} for i in range(n)}
    frame_counts = [[] for _ in range(n)]
    minute_counts = [[] for _ in range(n)]
    return section_counts_per_hour, frame_counts, minute_counts

sections = [np.array([[147,471],[151,431],[164,359],[181,319],[189,268],[191,237],[198,213],[212,205],[221,203],[237,198],[248,198],[259,198],[265,219],[274,249],[273,300],[277,359],[277,389],[277,424],[277,449],[277,463],[277,470],[221,473],[181,472]]),
            np.array([[260,36],[278,39],[284,59],[290,80],[290,100],[288,124],[288,135],[255,136],[232,132],[220,127],[222,95],[233,58]]),
            np.array([[328,37],[346,44],[354,61],[357,82],[373,93],[377,106],[361,100],[349,103],[342,115],[332,115],[325,79]]),
            np.array([[378,472],[414,473],[467,473],[485,468],[502,453],[484,410],[474,385],[469,356],[464,330],[455,307],[449,285],[446,262],[437,241],[429,221],[429,191],[424,166],[421,143],[406,127],[400,124],[388,123],[366,119],[349,122],[339,125],[337,142],[329,167],[327,219],[329,295],[340,379]])]

for i in range(len(sections)):
    sections[i] = sections[i].reshape((-1,1,2))
section_counts_per_hour, frame_counts, minute_counts = calculate_counts(sections)



def point_inside_polygon(x, y, poly):
    return cv2.pointPolygonTest(poly, (x, y), False) > 0

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
output_video = cv2.VideoWriter(r"C:\Users\arulk\OneDrive\Desktop\midnight_eval\src1.mp4", fourcc, frame_rate, (640, 480))

while True:
    success, img = cap.read()
    if img is None:
        print("End of video reached.")
        break
    img = cv2.resize(img, (640, 480))
    results = model(img, stream=True)
    section_counts = [0] * len(sections)

    for r in results:
        boxes = r.boxes
        for box in boxes:
            if int(box.cls[0]) == classNames.index("person"):
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 2)
                x, y = (x1 + x2) / 2, (y1 + y2) / 2

                for i, roi in enumerate(sections):
                    if point_inside_polygon(x, y, roi):
                        section_counts[i] += 1
                        break
                    
                org = [x1, y1]
                font = cv2.FONT_HERSHEY_SIMPLEX
                fontScale = 1
                color = (255, 0, 0)
                thickness = 1
                cv2.putText(img, classNames[0], org, font, fontScale, color, thickness)

    for i, count in enumerate(section_counts):
        frame_counts[i].append(count)
    elapsed_time = time.time() - start_time

    if elapsed_time >= 1:
        for i, counts_list in enumerate(frame_counts):
          minute_avg = np.mean(counts_list)
          minute_counts[i].append(minute_avg)
          start_time = time.time()
        for counts_list in frame_counts:
          counts_list.clear()

    for i in sections:
        cv2.polylines(img, [i], isClosed=True, color=(0, 255, 0), thickness=2)
        #cv2.putText(img, f"Count inside {i+1}" , (10, 30*(i+1)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow('Webcam', img)
    output_video.write(img)
    if cv2.waitKey(1) == ord('q'):
      break
output_video.release()
cap.release()
cv2.destroyAllWindows()

#for i in range(len(minute_counts)):
    #print("Minute counts for ", i+1, " is : ", minute_counts[i])



for i in range(len(section_names)):
    section_dict[f"Section_{i+1}"] = section_names[i]

def calculate_means(data):
    n = len(sections)
    means = [[] for _ in range(n)]
    for i, nested_array in enumerate(data):
        current_sum = 0
        count = 0
        for number in nested_array:
            current_sum += number
            count += 1
            if count % 60 == 0:
                mean = current_sum / count
                means[i].append(mean)  # Store the mean in the corresponding means list
                current_sum = 0
                count = 0

    return means

all_means = calculate_means(minute_counts)
print(minute_counts)
for i in range(len(sections)):
    print(f"{section_names[i]} : {all_means[i]} \n")


Footfall = []
section_name_dict = {}
for i in range(len(section_names)):
    section_name_dict[f"Section{i+1}"] = section_names[i]

out = len(all_means[0])
inn = len(all_means)
for i in range(out):
    dict = {}  # Create a new dictionary for each time
    dict['time'] = i + 1
    dict['URL'] = 'https://d2kzg5cjizpi8q.cloudfront.net/processed_vid/src2.mp4'
    dict['SectionNames'] = section_name_dict
    for j in range(inn):
        dict[f"Section{j+1}"] = format(all_means[j][i], ".2f")
    Footfall.append(dict)
    conn.Zircon.footfall.insert_one(dict)

print(Footfall)
url = r"https://d2kzg5cjizpi8q.cloudfront.net/processed_vid/src2.mp4"

'''pr_vid = r'processed_vid\1.mp4'
ob_name = '1.mp4'
url = upload_file_using_client(pr_vid,ob_name)
print(url)'''


