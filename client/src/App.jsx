
import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "./services/skillService";

import {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "./services/topicService";

import { useAuth } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Topics from "./pages/Topics";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const { user } = useAuth();

  const [skills, setSkills] = useState([]);
  const [learningTopics, setLearningTopics] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshData = useCallback(async () => {
    try {
      const [skillsResult, topicsResult] = await Promise.all([
        getSkills(),
        getTopics(),
      ]);

      setSkills(skillsResult.data);
      setLearningTopics(topicsResult.data);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load data. Please try again."
      );
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setSkills([]);
        setLearningTopics([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      await refreshData();
      setLoading(false);
    };

    loadData();
  }, [user, refreshData]);

  async function handleSaveSkill(skillData, editingId = null) {
    try {
      if (editingId) {
        await updateSkill(editingId, skillData);
      } else {
        await createSkill(skillData);
      }

      await refreshData();
      return "";
    } catch (error) {
      return (
        error.response?.data?.message ||
        "Unable to save skill. Please try again."
      );
    }
  }

  async function handleDeleteSkill(skillId) {
    try {
      await deleteSkill(skillId);
      await refreshData();
      return "";
    } catch (error) {
      return (
        error.response?.data?.message ||
        "Unable to delete skill. Please try again."
      );
    }
  }

  async function handleAddTopic(topicName, skillId) {
    try {
      await createTopic({
        name: topicName,
        skill: skillId,
        done: false,
      });

      await refreshData();
      return "";
    } catch (error) {
      return (
        error.response?.data?.message ||
        "Unable to add topic. Please try again."
      );
    }
  }

  async function handleToggleTopic(topicId, currentStatus) {
    try {
      await updateTopic(topicId, {
        done: !currentStatus,
      });

      await refreshData();
      return "";
    } catch (error) {
      return (
        error.response?.data?.message ||
        "Unable to update topic. Please try again."
      );
    }
  }

  async function handleDeleteTopic(topicId) {
    try {
      await deleteTopic(topicId);
      await refreshData();
      return "";
    } catch (error) {
      return (
        error.response?.data?.message ||
        "Unable to delete topic. Please try again."
      );
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/*"
          element={
            <div className="app-shell">
              <Sidebar />

              <main className="main-area">
                <Header />

                {loading ? (
                  <div className="page-content">
                    <p>Loading your SkillSprint data...</p>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="page-content">
                        <p className="form-error" role="alert">
                          {error}
                        </p>

                        <button
                          className="primary-btn"
                          onClick={refreshData}
                        >
                          Retry
                        </button>
                      </div>
                    )}

                    <Routes>
                      <Route
                        path="/"
                        element={
                          <Dashboard
                            skills={skills}
                            topics={learningTopics}
                          />
                        }
                      />

                      <Route
                        path="/skills"
                        element={
                          <Skills
                            skills={skills}
                            onSaveSkill={handleSaveSkill}
                            onDeleteSkill={handleDeleteSkill}
                          />
                        }
                      />

                      <Route
                        path="/topics"
                        element={
                          <Topics
                            topics={learningTopics}
                            skills={skills}
                            onAddTopic={handleAddTopic}
                            onToggleTopic={handleToggleTopic}
                            onDeleteTopic={handleDeleteTopic}
                          />
                        }
                      />
                    </Routes>
                  </>
                )}
              </main>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
