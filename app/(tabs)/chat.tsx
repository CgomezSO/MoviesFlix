import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { main } from "@/services/AiModel";
import Markdown from "react-native-markdown-display";

type Message = {
    question: string;
    answer: string;
};

export default function Chat() {
    const [question, setQuestion] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>();
    const scrollViewRef = useRef<ScrollView>(null);

    const handleSend = async () => {
        if (!question.trim()) return;

        setLoading(true);
        try {
            const response = await main(question);
            const newMessage: Message = {
                question: question,
                answer: response ?? "",
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setQuestion("");
        } catch (error) {
            console.error("Error al obtener respuesta de Gemini:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-dark-200 px-2 py-4 pb-36">
            <Text className="text-white text-6xl mb-4">Chat</Text>

            <ScrollView
                className="flex-1 mb-4"
                ref={scrollViewRef}
                onContentSizeChange={() =>
                    scrollViewRef.current?.scrollToEnd({ animated: true })
                }
            >
                {messages.map((msg, index) => (
                    <View key={index} className="mb-4 bg-white rounded-xl p-4">
                        <View className="bg-gray-300 rounded-md p-2 mb-2">
                            <Text className="text-black mb-2">
                                {msg.question}
                            </Text>
                        </View>

                        <Markdown
                            style={{
                                body: { color: "black", fontSize: 16 },
                                heading1: {
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    color: "black",
                                },
                                strong: { fontWeight: "bold" },
                            }}
                        >
                            {msg.answer}
                        </Markdown>
                    </View>
                ))}

                {loading && (
                    <View className="my-8 items-center justify-center">
                        <ActivityIndicator size="large" color="#3B82F6" />
                        <Text className="text-white mt-2">Loading...</Text>
                    </View>
                )}
            </ScrollView>

            <TextInput
                multiline
                numberOfLines={4}
                placeholder="Escribe tu pregunta"
                value={question}
                onChangeText={setQuestion}
                className="text-black bg-white rounded-xl p-3 mb-2"
            />

            <TouchableOpacity
                onPress={handleSend}
                className="bg-blue-600 rounded-xl px-4 py-2 mb-4"
            >
                <Text className="text-white text-center">Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}
