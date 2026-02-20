import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, we can stop observing for a one-time animation
                    if (!options.repeat) {
                        observer.unobserve(element);
                    }
                } else if (options.repeat) {
                    setIsVisible(false);
                }
            },
            {
                threshold: options.threshold || 0.15,
                rootMargin: options.rootMargin || "0px",
            }
        );

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [options.threshold, options.rootMargin, options.repeat]);

    return { ref, isVisible };
}
