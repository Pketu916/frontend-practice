// src/pages/Messages.js
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { messageAPI, userAPI } from "../http";
import { useAuth } from "../context/AuthContext";
import { ImSpinner2 } from "react-icons/im";
import { RiSendPlaneFill } from "react-icons/ri";

const Messages = () => {
  const { userId: otherUserId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [otherUser, setOtherUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);
  
  // Message suggestions
  const messageSuggestions = [
    "Hi, I'm interested in your property. Is it still available?",
    "Hello! I'd like to schedule a viewing for this property.",
    "What's the best time to visit and see this property?",
    "Are utilities included in the price?",
    "Is the price negotiable?"
  ];

  const messagesEndRef = useRef(null);
  const conversationsRef = useRef(null);
  const messagesRef = useRef(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const data = await messageAPI.getUserConversations(user.id);
        // Filter out self-conversations
        const filteredData = data.filter(conv => conv.userId !== user.id);
        setConversations(filteredData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch conversations");
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  // Fetch other user details if provided in URL
  useEffect(() => {
    const fetchOtherUserDetails = async () => {
      if (!otherUserId || !user) return;
      
      // Prevent messaging yourself
      if (parseInt(otherUserId) === user.id) {
        navigate('/messages');
        return;
      }

      try {
        const data = await userAPI.getUser(parseInt(otherUserId));
        setOtherUser(data);
        setSelectedConversation({
          userId: data.id,
          name: data.name,
          avatar: data.avatar,
        });
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchOtherUserDetails();
  }, [otherUserId, user, navigate]);

  // Store references to prevent infinite loops
  useEffect(() => {
    conversationsRef.current = conversations;
    messagesRef.current = messages;
  }, [conversations, messages]);

  // Fetch messages when conversation is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation || !user) return;

      try {
        const data = await messageAPI.getConversation(user.id, selectedConversation.userId);
        
        // Only update if messages have changed
        if (JSON.stringify(data) !== JSON.stringify(messagesRef.current)) {
          setMessages(data);
        }

        // Mark unread messages as read
        const unreadMessageIds = data
          .filter((msg) => msg.toUserId === user.id && !msg.read)
          .map((msg) => msg.id);

        if (unreadMessageIds.length > 0) {
          await messageAPI.markAsRead(unreadMessageIds);
          
          // Update conversation list to reflect read messages
          const updatedConversations = conversationsRef.current.map(conv => {
            if (conv.userId === selectedConversation.userId) {
              return { ...conv, unreadCount: 0 };
            }
            return conv;
          });
          
          setConversations(updatedConversations);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();

    // Set up polling for new messages - every 10 seconds
    const intervalId = setInterval(fetchMessages, 10000);

    return () => clearInterval(intervalId);
  }, [selectedConversation, user]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !selectedConversation || sendingMessage) {
      return;
    }

    try {
      setSendingMessage(true);

      const messageData = {
        fromUserId: user.id,
        toUserId: selectedConversation.userId,
        content: newMessage,
      };

      // Send the message and get the response with server-generated ID
      const sentMessage = await messageAPI.sendMessage(messageData);

      // Add message to the list using the server response
      setMessages(prevMessages => [...prevMessages, sentMessage]);

      setNewMessage("");
      setSendingMessage(false);
    } catch (err) {
      console.error("Failed to send message:", err);
      setSendingMessage(false);
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " " + date.toLocaleDateString();
  };

  if (loading && !otherUser) {
    return (
      <div className="container mx-auto mt-10 flex justify-center">
        <ImSpinner2 className="animate-spin text-4xl text-violet-700" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4 max-w-6xl mb-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Conversations List */}
          <div className="md:col-span-1 border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-800">Conversations</h2>
            </div>

            <div className="overflow-y-auto h-[500px]">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No conversations yet</div>
              ) : (
                conversations
                  // Filter out conversations with yourself
                  .filter(conversation => conversation.userId !== user.id)
                  .map((conversation) => (
                    <div
                      key={conversation.userId}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                        selectedConversation?.userId === conversation.userId ? "bg-violet-50" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <img
                          src={conversation.avatar || "/placeholder.svg"}
                          alt={conversation.name}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-800">{conversation.name}</h3>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-violet-600 text-white text-xs px-2 py-1 rounded-full">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                          {conversation.lastMessage && (
                            <p className="text-sm text-gray-500 truncate">
                              {conversation.lastMessage.fromUserId === user.id ? "You: " : ""}
                              {conversation.lastMessage.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="md:col-span-3 flex flex-col h-[600px]">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b flex items-center">
                  <img
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <h2 className="font-semibold text-gray-800">{selectedConversation.name}</h2>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">No messages yet. Start the conversation!</div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${message.fromUserId === user.id ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.fromUserId === user.id
                              ? "bg-violet-600 text-white"
                              : "bg-white text-gray-800 border"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.fromUserId === user.id ? "text-violet-200" : "text-gray-500"
                            }`}
                          >
                            {formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  {/* Message suggestions for first message */}
                  {messages.length === 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Start the conversation with:</p>
                      <div className="space-y-2">
                        {messageSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setNewMessage(suggestion)}
                            className="block w-full text-left p-2 bg-gray-100 hover:bg-violet-100 rounded text-sm"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                      type="submit"
                      disabled={sendingMessage || !newMessage.trim()}
                      className={`bg-violet-700 text-white p-3 rounded-r-md hover:bg-violet-800 transition ${
                        sendingMessage || !newMessage.trim() ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      <RiSendPlaneFill className={sendingMessage ? "animate-pulse" : ""} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="mb-4">Select a conversation or start a new one</p>
                {conversations.length === 0 && (
                  <p>You don't have any conversations yet. Browse properties to contact owners!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;