import { BrowserRouter,Routes,Route } from "react-router-dom"
// import { AuthProvider } from "./contexts/authContext"
import { AuthProvider } from "@/contexts/AuthContext"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import DashboardPage from "./pages/Dashbord"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/NotFound"
import { Toaster } from "./components/ui/sonner"
import HomePage from "./pages/HomePage"
import FilesPage from "./pages/FilesPage"
import SettingsPage from "./pages/SettingsPage"
import SharedPage from "./pages/SharedPage"
import FilesDetailsPage from "./pages/FilesDetailsPage"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route element={<ProtectedRoute><HomePage /></ProtectedRoute>}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/files" element={<FilesPage />} />
        <Route path="/files/:id/*" element={<FilesDetailsPage />} />
        <Route path="/shared" element={<SharedPage />} />
        <Route path="/setting" element={<SettingsPage />} />
      </Route>


        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Toaster  position="top-right" richColors closeButton />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
