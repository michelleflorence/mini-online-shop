// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { dummyUsers, User } from "../data/users";
import { useNavigate } from "react-router-dom";
import LoadingContent from "../components/LoadingContent/LoadingContent";

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (newUser: User) => void;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([...dummyUsers]);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on app startup
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse and set the saved user
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, isInitialized]);

  // Handle login
  const login = (email: string, password: string) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setUser(foundUser); // This sets the logged-in user
    } else {
      alert("Invalid credentials");
    }
  };

  const register = (newUser: User) => {
    // simple check: email must be unique
    if (users.some((u) => u.email === newUser.email)) {
      alert("An account with that email already exists.");
      return;
    }
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
  };

  // Handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user data from localStorage
    navigate("/login");
  };

  // If the app is still initializing (loading from localStorage), return a loading state
  if (!isInitialized) {
    return <LoadingContent />;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
