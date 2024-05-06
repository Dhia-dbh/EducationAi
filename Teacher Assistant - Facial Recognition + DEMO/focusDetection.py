import cv2
import mediapipe as mp
import numpy as np
import time

mp_face_mesh= mp.solutions.face_mesh
face_mesh=mp_face_mesh.FaceMesh(min_detection_confidence=0.5,min_tracking_confidence=0.5,max_num_faces=5)

mp_drawing=mp.solutions.drawing_utils

drawing_spec =mp_drawing.DrawingSpec(thickness=1,circle_radius=1)

cap=cv2.VideoCapture(0)

while cap.isOpened():
    ret,image=cap.read()
    start =time.time()
    image=cv2.cvtColor(cv2.flip(image,1),cv2.COLOR_BGR2RGB)
    image.flags.writeable=False
    result=face_mesh.process(image)
    image.flags.writeable=True

    image=cv2.cvtColor(image,cv2.COLOR_RGB2BGR)
    img_h,img_w,img_c=image.shape
    face_3d=[]
    face_2d=[]
    nbfocus = 0

    if result.multi_face_landmarks:
        for face_landmarks in result.multi_face_landmarks:
            face_3d = []
            face_2d = []
            for idx,lm in enumerate(face_landmarks.landmark):
                if idx in [33,263,1,61,291,199]:
                    if idx==1:
                        nose_2d=(lm.x * img_w,lm.y * img_h)
                        nose_3d=(lm.x * img_w,lm.y*img_h,lm.z *3000)
                    x,y=int(lm.x*img_w),int(lm.y * img_h)

                    face_2d.append([x,y])
                    face_3d.append([x,y,lm.z])


            face_2d=np.array(face_2d,dtype=np.float64)
            face_3d=np.array(face_3d,dtype=np.float64)

            focal_length = 1 * img_w

            cam_matrix =np.array([[focal_length,0,img_h/2],[0,focal_length,img_w/2],[0,0,1]])

            dist_matrix = np.zeros((4,1),dtype=np.float64)

            success,rot_vec,trans_vec=cv2.solvePnP(face_3d,face_2d,cam_matrix,dist_matrix)

            rmat,jac=cv2.Rodrigues(rot_vec)

            angles,mtxR,mtxQ,Qx,Qy,Qz=cv2.RQDecomp3x3(rmat)

            x=angles[0]*360
            y=angles[1]*360
            z=angles[2]*360
            if (y<-10):
                text="looking Left"
            elif (y>10):
                text="looking right"
            elif(x<-10):
                text="Looking down"
            else:
                nbfocus+=1
                text="forword"
            face_region = np.array([
                [lm.x * img_w, lm.y * img_h] for lm in face_landmarks.landmark
            ], dtype=np.int64)

            # Calculate bounding box coordinates based on minimum and maximum x/y values
            min_x = np.min(face_region[:, 0])
            max_x = np.max(face_region[:, 0])
            min_y = np.min(face_region[:, 1])
            max_y = np.max(face_region[:, 1])
            cv2.putText(image, text, (min_x-5,min_y-5), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

            # Draw the square around the face
            cv2.rectangle(image, (min_x, min_y), (max_x, max_y), (0, 255, 0), 2)
        end=time.time()
        totaltime=end-start
        fps=1/totaltime
        #kan 3adad el nass mrakza a9al men noss
        if nbfocus<(len(result.multi_face_landmarks)/2):
            cv2.rectangle(image, (0, 0), (img_w, img_h), (0, 0, 255), 8)
            cv2.putText(image, "aleart :majorety of students unfocused", (10,30), cv2.FONT_HERSHEY_PLAIN, 1.3, (0, 0, 255), 2)

        cv2.putText(image,f'FPS:{int(fps)}',(20,450),cv2.FONT_HERSHEY_PLAIN,1.5,(0,255,0),2)
        cv2.putText(image,f'focused:{nbfocus}/{len(result.multi_face_landmarks)}',(450,450),cv2.FONT_HERSHEY_PLAIN,1.5,(0,255,0),2)


    cv2.imshow("Directoin of Gaze Tracker",image)
    if cv2.waitKey(1)  & 0xFF==27:
        break
cap.release()














