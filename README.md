# WebRTC Chat

WebRTC Chat is a simple video chat application built using WebRTC technology. It allows users to have real-time video communication and exchange chat messages with each other.

## Features

-   Real-time video communication using WebRTC.
-   Exchange chat messages during the video call.
-   Display local and remote video streams.
-   Name input for identifying users.
-   Responsive design for various devices.

## Technologies Used

-   Front-end: React
-   Back-end: Express.js, WebSocket
-   WebRTC: Real-Time Communication API for video streaming and peer-to-peer communication.

## Prerequisites

To run the WebRTC Chat application locally, you need to have the following software installed on your machine:

-   Node.js (version 12 or higher)
-   npm (Node Package Manager)

## Getting Started

Follow these steps to set up and run the WebRTC Chat application:

1.  Clone the repository:
        
    `git clone https://github.com/KohanTorabi/webrtc-react.git` 
    
2.  Navigate to the project directory:
        
    `cd webrtc-app` 
    
3.  Install dependencies:
        
    `npm install` 
    
4.  Start the React development server:
       
    `npm start` 
    
5.  Open another terminal window and navigate to the server directory:
        
    `cd webrtc-server` 
    
6.  Install server dependencies:
        
    `npm install` 
    
7.  Start the server:
        
    `npm start` 
    
8.  Access the WebRTC Chat application in your browser at [http://localhost:3000](http://localhost:3000/).
    

## Usage

1.  Open the WebRTC Chat application in two identical tabs or windows.
    
2.  In each tab, enter your name in the name input field.
    
3.  Click on the "Call" button in both tabs to initiate the video call.
    
4.  Grant access to your camera and microphone when prompted.
    
5.  You should now see your local video stream in one tab and the remote video stream in the other tab.
    
6.  Exchange chat messages by typing in the input field and pressing Enter or clicking the send button.
    
7.  To end the video call, simply close one of the tabs or click the "Call" button again.
   
   ## Contribution

Contributions to the WebRTC Chat project are always welcome! If you have any ideas, improvements, or bug fixes, please follow these steps:

1.  Fork the repository.
    
2.  Create a new branch for your feature or bug fix:
        
    `git checkout -b feature/your-feature-name` 
    
3.  Make the necessary changes and commit them:
        
    `git commit -m "Add your commit message"` 
    
4.  Push the changes to your forked repository:
        
    `git push origin feature/your-feature-name` 
    
5.  Open a pull request on the original repository and provide a detailed description of your changes.
    
6.  Your contribution will be reviewed, and once approved, it will be merged into the main codebase.