  import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom" 
  import { Registration } from "./pages/Registration";
  import { Login } from "./pages/Login";
  import { ErrorPage } from "./pages/ErrorPage"
  import { ProtectedRoute } from "./components/ProtectedRoute";
  import { SeekerDashboard } from "./pages/SeekerDashboard";
  import { EmployerDashboard } from "./pages/EmployerDashboard";
  import { EmployerProfile } from "./pages/EmployerProfile";
  import { SeekerProfile } from "./pages/SeekerProfile";
  import { PublicRoute } from "./components/PublicRoute";
  import { HomePage } from "./pages/HomePage";
  import AOS from "aos";
  import "aos/dist/aos.css";
  import { CreateJob } from "./pages/CreateJob";
  import { MyJobs } from "./pages/MyJobs";
  import { EditJobs } from "./pages/EditJobs";
  import { JobList } from "./pages/JobList";
  import { JobDetails } from "./pages/JobDetails";
  import { SavedJobs } from "./pages/SavedJobs";
  import { AppliedJobs } from "./pages/AppliedJobs";
  import { ApplicantsList } from "./pages/ApplicantsList";

  AOS.init({
    duration: 800,
    once: true,
  });

  const Router = createBrowserRouter([

    { 
      path: "/",
      element: <HomePage/>,
      errorElement: <ErrorPage />
    },

    {
      path: "/register",
      element: <PublicRoute><Registration/></PublicRoute>,
      errorElement: <ErrorPage />
    },
    
    {
      path: "/login",
      element: <PublicRoute><Login/></PublicRoute>,
      errorElement: <ErrorPage/>
    },

    {
      path: "/seeker/dashboard",
      element: (
        <ProtectedRoute allowedRole="job_seeker">
          <SeekerDashboard/>
        </ProtectedRoute>
      ),
    },
    
    {
      path: "/employer/dashboard",
      element: (
        <ProtectedRoute allowedRole="employer">
          <EmployerDashboard/>
        </ProtectedRoute>
      ),
    },

    {
      path: "/employer/profile",
      element: (
        <ProtectedRoute allowedRole="employer">
          <EmployerProfile/>
        </ProtectedRoute>
      ),
    },

    {
      path: "/seeker/profile",
      element: (
        <ProtectedRoute allowedRole="job_seeker">
          <SeekerProfile/>
        </ProtectedRoute>
      ),
    },

    {
      path: "/employer/jobs/new",
      element: (
      <ProtectedRoute allowedRole="employer">
        <CreateJob/>
      </ProtectedRoute>
      ),
    },
    
    {
      path: "/employer/jobs",
      element: (
      <ProtectedRoute allowedRole="employer">
        <MyJobs/>
      </ProtectedRoute>
      ),
    },
    
    {
      path: "/employer/jobs/edit/:id",
      element: (
      <ProtectedRoute allowedRole="employer">
        <EditJobs />
      </ProtectedRoute>
      ),
    },

    {
      path: "/jobs",
      element: (
        <ProtectedRoute allowedRole="job_seeker">
          <Navigate to="/jobs?page=1" replace />
          <JobList />
        </ProtectedRoute>
      )
    },

    {
    path: "/jobs/:id",
    element: <JobDetails />,
  },

  {
    path: "/saved-jobs",
    element: (
      <ProtectedRoute allowedRole="job_seeker">
        <SavedJobs />
      </ProtectedRoute>
    ),
  },

  {
    path: "/applications",
    element: (
      <ProtectedRoute allowedRole="job_seeker">
        <AppliedJobs />
      </ProtectedRoute>
    ),
  },

  {
    path: "/employer/jobs/:jobId/applicants",
    element: (
      <ProtectedRoute allowedRole="employer">
        <ApplicantsList />
      </ProtectedRoute>
    ),
  }
  ])

  const App = () => {
    return <RouterProvider router={Router}></RouterProvider>
  }

  export default App;