import { useState, useEffect } from "react";

const HttpErrorHandler = (httpClient) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        let requestInterceptors = httpClient.interceptors.request.use((req) => {
            setError(null);
            return req;
        });
        let responseInterceptors = httpClient.interceptors.response.use(
            (res) => res,
            (error) => {
                setError(error);
            }
        );
        return () => {
            httpClient.interceptors.request.eject(requestInterceptors);
            httpClient.interceptors.response.eject(responseInterceptors);
        };
    }, []);

    const closeModalHandler = () => {
        setError(null);
    };

    return [error, closeModalHandler];
};

export default HttpErrorHandler;
