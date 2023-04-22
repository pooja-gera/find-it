import cv2

# Load the image
img = cv2.imread('./wardrobe.jpg')

# Convert the image to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply a threshold to the image
_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

# Find contours in the binary image
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Draw bounding boxes around the contours
for contour in contours:
    x,y,w,h = cv2.boundingRect(contour)
    cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0), 2)

# Display the image with bounding boxes
cv2.imshow('Wardrobe with Bounding Boxes', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
