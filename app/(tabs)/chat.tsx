import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { main } from "@/services/AiModel";

export default function Chat() {
    const [question, setQuestion] = useState<string>("");
    const [geminiResponse, setGeminiResponse] = useState<string>("");

    const handleSend = async () => {
        if (!question.trim()) return;

        try {
            const response = await main(question);
            setGeminiResponse(response);
        } catch (error) {
            console.error("Error al obtener respuesta de Gemini:", error);
        }
    };

    return (
        <View className="flex-1 bg-dark-200 px-2 py-4 pb-36">
            <Text className="text-white text-6xl mb-4">Chat</Text>

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

            {geminiResponse ? (
                <View className="bg-white rounded-xl p-4">
                    <Text className="text-black">{geminiResponse}</Text>
                </View>
            ) : null}
        </View>
    );
}
