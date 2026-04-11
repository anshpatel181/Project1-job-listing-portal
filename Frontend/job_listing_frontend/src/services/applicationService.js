const API_URL = "http://localhost:5000/api/applications";

export const applyToJob = async (jobId) => {
  const res = await fetch(`${API_URL}/${jobId}/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to apply");
  }

  return data;
};

export const checkApplied = async (jobId) => {
  const res = await fetch(`${API_URL}/check/${jobId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  return data;
};

export const getMyApplications = async () => {
  const res = await fetch(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  return data;
};
