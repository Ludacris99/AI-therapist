'use client'
import { useEffect, useState } from "react";

const QuoteBox = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const res = await fetch("/api/quote");
                const data = await res.json();

                setQuote(data[0].q);
                setAuthor(data[0].a);

            } catch (err) {
                setQuote("Failed to fetch quote.");
                setAuthor("");
            }
        };

        fetchQuote();
    }, [clicked]);

    return (
        <div className="h-screen px-50 max-md:px-20 flex flex-col items-center justify-center">
            <div>

            <p className="text-5xl font-semibold italic">"{quote}"</p>
            <p className="text-2xl text-right mt-4 soft-green">— {author}</p>
            </div>


            <button
                className="mx-auto mt-10 cursor-pointer"
                onClick={() => setClicked(prev => !prev)}
            >
                <img src="/dice.svg" alt="dice" height={150} width={150} />
            </button>
        </div>
    );
};

export default QuoteBox;
