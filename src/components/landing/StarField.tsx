"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StarField() {
    const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);
    const [shootingStars, setShootingStars] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

    useEffect(() => {
        // Generate random stars
        const generatedStars = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
        }));
        setStars(generatedStars);

        // Generate shooting stars
        const generatedShootingStars = Array.from({ length: 3 }, (_, i) => ({
            id: i,
            x: Math.random() * 80 + 20,
            y: Math.random() * 30,
            delay: Math.random() * 10 + i * 5,
        }));
        setShootingStars(generatedShootingStars);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
                overflow: "hidden",
            }}
        >
            {/* Twinkling Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="star-particle"
                    initial={{ opacity: 0.3, scale: 1 }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut",
                    }}
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        position: "absolute",
                        background: "white",
                        borderRadius: "50%",
                    }}
                />
            ))}
            {/* Shooting Stars */}
            {shootingStars.map((star) => (
                <div
                    key={`shooting-${star.id}`}
                    className="shooting-star"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}
