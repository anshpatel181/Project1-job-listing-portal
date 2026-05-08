const BASE_URL = import.meta.env.VITE_BACKEND_URL + '/api/profile';

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(BASE_URL+'/get-profile', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

export const updateEmployerProfile = async (profileData) => {

  console.log(profileData.get("companyLogo"));
  console.log(profileData.get("companyName"));
  console.log(profileData.get("industry"));
  console.log(profileData.get("size"));
  console.log(profileData.get("companyEmail"));
  console.log(profileData.get("phoneNo"));
  console.log(profileData.get("website"));
  console.log(profileData.get("description"));
  
  
  const token = localStorage.getItem("token");  
  
  try {
    const response = await fetch(BASE_URL+'/update-employer-profile', {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: profileData
    });
  
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
  
    return response.json();
  } catch (error) {
    console.log(error.message);
    throw error    
  }
};

export const updateSeekerProfile = async (profileData) => {  
  
  const token = localStorage.getItem("token");  
  
  try {
    const response = await fetch(BASE_URL+'/update-seeker-profile', {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: profileData
    });
  
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
  
    return response.json();
  } catch (error) {
    console.log(error.message);
    throw error    
  }
};
