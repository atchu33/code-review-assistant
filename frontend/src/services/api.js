import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const reviewCode = async (code, language) => {
  const response = await api.post('/review', { code, language });
  return response.data;
};

export const getHistory = async (language = null, limit = 20, offset = 0) => {
  const params = { limit, offset };
  if (language) params.language = language;
  
  const response = await api.get('/history', { params });
  return response.data;
};

export const getReviewById = async (reviewId) => {
  const response = await api.get(`/history/${reviewId}`);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/history/${reviewId}`);
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

// For streaming support (future enhancement)
export const reviewCodeStream = (code, language, onChunk, onComplete, onError) => {
  const eventSource = new EventSource(
    `${API_BASE_URL}/review/stream?code=${encodeURIComponent(code)}&language=${language}`
  );

  eventSource.onmessage = (event) => {
    if (event.data === '[DONE]') {
      eventSource.close();
      onComplete();
    } else {
      const data = JSON.parse(event.data);
      if (data.error) {
        onError(data.error);
        eventSource.close();
      } else {
        onChunk(data.chunk);
      }
    }
  };

  eventSource.onerror = (error) => {
    onError(error);
    eventSource.close();
  };

  return eventSource;
};

export default api;
