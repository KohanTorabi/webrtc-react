import { useEffect, useRef, useState } from "react";
import { Error } from "../components/errorMessage";

type ChatMessage = {
  name: string;
  text: string;
  timestamp: number;
};

export const useWebRTC = (serverUrl: string) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [inputText, setInputText] = useState<string>("");

  const [isInitiator, setIsInitiator] = useState<boolean>(false);

  const socketRef = useRef<WebSocket | null>(null);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const [name, setName] = useState<string>("");

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Get local media stream (audio and video)
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setLocalStream(stream);
      } catch (error) {
        setError({
          type: "mediaAccess",
          message: "Error accessing media devices.",
        });
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (localStream && !isInitiator) {
      // Create the RTCPeerConnection when the local stream is available
      createPeerConnection();
    }
  }, [localStream, isInitiator]);

  const createPeerConnection = () => {
    try {
      const configuration: RTCConfiguration = {
        iceServers: [
          { urls: "stun:stun.stunserver.org:3478" }, // STUN server for NAT traversal
        ],
      };

      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;

      // Add local stream tracks to the peer connection
      localStream?.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, localStream);
      });

      // Event handlers for peer connection events

      // Handle incoming ice candidates
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          // Send the ICE candidate to the remote peer
          socketRef.current?.send(
            JSON.stringify({ iceCandidate: event.candidate })
          );
        }
      };

      // Handle changes in the connection state
      peerConnectionRef.current.oniceconnectionstatechange = () => {
        console.log(
          "ICE connection state:",
          peerConnectionRef.current?.iceConnectionState
        );
      };

      // Handle remote tracks being added to the connection
      peerConnectionRef.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };
    } catch (error) {
      setError({
        type: "peerConnection",
        message: "Error creating peer connection.",
      });
    }
  };

  const handleSignalingMessage = (message: string | Blob) => {
    if (typeof message === "string") {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.offer) {
        // Handle offer from remote peer
        handleOffer(parsedMessage.offer);
      } else if (parsedMessage.answer) {
        // Handle answer from remote peer
        handleAnswer(parsedMessage.answer);
      } else if (parsedMessage.iceCandidate) {
        // Add ICE candidate received from remote peer
        peerConnectionRef.current?.addIceCandidate(parsedMessage.iceCandidate);
      } else if (parsedMessage.chatMessage) {
        // Handle chat message from remote peer
        handleChatMessage(parsedMessage.chatMessage);
      }
    } else if (message instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result as string;
        handleSignalingMessage(data);
      };
      reader.readAsText(message);
    }
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!isInitiator) {
      try {
        await peerConnectionRef.current?.setRemoteDescription(
          new RTCSessionDescription(offer)
        );

        const answer = await peerConnectionRef.current?.createAnswer();

        await peerConnectionRef.current?.setLocalDescription(answer);

        socketRef.current?.send(JSON.stringify({ answer }));
      } catch (error) {
        setError({
          type: "setLocalDescription",
          message: "Error setting local description.",
        });
      }
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    try {
      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    } catch (error) {
      setError({
        type: "setRemoteDescription",
        message: "Error setting remote description.",
      });
    }
  };

  const handleChatMessage = (message: ChatMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendChatMessage = () => {
    const message: ChatMessage = {
      name,
      text: inputText,
      timestamp: Date.now(),
    };

    setChatMessages((prevMessages) => [...prevMessages, message]);
    setInputText("");

    try {
      socketRef.current?.send(JSON.stringify({ chatMessage: message }));
    } catch (error) {
      setError({ type: "socketSend", message: "Error sending chat message." });
    }
  };

  // Create offer and set it as the local description
  const createOffer = async () => {
    const offer = await peerConnectionRef.current?.createOffer();
    await peerConnectionRef.current?.setLocalDescription(offer);

    // Send the offer to the remote peer
    socketRef.current?.send(JSON.stringify({ offer }));
  };

  const initiateCall = () => {
    if (!name) {
      setError({
        type: "initiateCall",
        message: "Please enter your name before initiating the call.",
      });
      return;
    }

    setIsInitiator(true);
    try {
      // Create the RTCPeerConnection when initiating the call
      createPeerConnection();

      createOffer();
    } catch (error) {
      setError({ type: "createOffer", message: "Error creating offer." });
    }
  };

  useEffect(() => {
    socketRef.current = new WebSocket(serverUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    socketRef.current.onmessage = (event) => {
      handleSignalingMessage(event.data);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current?.close();
    };
  }, [serverUrl]);

  return {
    localStream,
    remoteStream,
    chatMessages,
    inputText,
    setInputText,
    sendChatMessage,
    initiateCall,
    setName,
    name,
    error,
    setError,
  };
};
