export const baseUrl =  process.env.NODE_ENV !== "development"
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` //deploy on vercel
        : "http://localhost:3000";
