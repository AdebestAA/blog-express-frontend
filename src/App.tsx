import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./lib/queryClient";
import { useAuthStore } from "./stores/authStore";
import BlogLayout from "./components/layout/BlogLayout";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import PostsList from "./pages/blog/PostsList";
import PostDetail from "./pages/blog/PostDetail";
import CreatePost from "./pages/blog/CreatePost";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to="/blog" replace />;
  }
  return <>{children}</>;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public home */}
          <Route path="/" element={<PublicLayout />} />

          {/* Auth routes — guests only */}
          <Route
            path="/auth/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/auth/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/auth/verify-email"
            element={
              <GuestRoute>
                <VerifyEmail />
              </GuestRoute>
            }
          />

          {/* Blog routes — protected */}
          <Route
            element={
              <ProtectedRoute>
                <BlogLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/blog" element={<PostsList />} />
            <Route path="/blog/create" element={<CreatePost />} />
            <Route path="/blog/:id" element={<PostDetail />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1a0a08",
              color: "#fff",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
