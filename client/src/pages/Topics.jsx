import { useEffect, useState } from "react";

export default function Topics({
  topics,
  skills,
  onAddTopic,
  onToggleTopic,
  onDeleteTopic,
}) {
  const [name, setName] = useState("");
  const [skillId, setSkillId] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Select first available skill
  useEffect(() => {
    if (skills.length === 0) {
      setSkillId("");
      return;
    }

    const selectedSkillExists = skills.some(
      (skill) => skill._id === skillId
    );

    if (!selectedSkillExists) {
      setSkillId(skills[0]._id);
    }
  }, [skills, skillId]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Topic name is required.");
      return;
    }

    if (!skillId) {
      setError("Please select a skill.");
      return;
    }

    setSaving(true);

    const message = await onAddTopic(name.trim(), skillId);

    setSaving(false);

    if (message) {
      setError(message);
      return;
    }

    setName("");
    setError("");
  }

  async function handleToggle(topic) {
    const message = await onToggleTopic(topic._id, topic.done);

    if (message) {
      setError(message);
    } else {
      setError("");
    }
  }

  async function handleDelete(topicId) {
    const message = await onDeleteTopic(topicId);

    if (message) {
      setError(message);
    } else {
      setError("");
    }
  }

  return (
    <div className="page-content">
      <section className="section-heading">
        <div>
          <h2>Learning Topics</h2>
          <p>Add topics and track what you have completed.</p>
        </div>

        <span className="category-chip">{topics.length} topics</span>
      </section>

      <form className="skill-form" onSubmit={handleSubmit}>
        <h3>Add Learning Topic</h3>

        <label htmlFor="topic-name">Topic Name</label>
        <input
          id="topic-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. React useContext"
        />

        <label htmlFor="topic-skill">Related Skill</label>
        <select
          id="topic-skill"
          value={skillId}
          onChange={(e) => setSkillId(e.target.value)}
          disabled={skills.length === 0}
        >
          {skills.map((skill) => (
            <option key={skill._id} value={skill._id}>
              {skill.name}
            </option>
          ))}
        </select>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button
            className="primary-btn"
            type="submit"
            disabled={skills.length === 0 || saving}
          >
            {saving ? "Adding..." : "Add Topic"}
          </button>
        </div>

        {skills.length === 0 && (
          <p className="info-note">
            Add a skill first before creating topics.
          </p>
        )}
      </form>

      <div className="task-list">
        {topics.map((topic) => (
          <div className="topic-row" key={topic._id}>
            <button
              className={`status-dot ${topic.done ? "done" : ""}`}
              type="button"
              aria-label={
                topic.done
                  ? `Mark ${topic.name} as pending`
                  : `Mark ${topic.name} as completed`
              }
              onClick={() => handleToggle(topic)}
            >
              {topic.done ? "✓" : ""}
            </button>

            <div className="topic-info">
              <strong>{topic.name}</strong>
              <span>{topic.skill?.name || "Unknown skill"}</span>
            </div>

            <span className={`status-label ${topic.done ? "complete" : ""}`}>
              {topic.done ? "Completed" : "Pending"}
            </span>

            <button
              className="delete-btn"
              type="button"
              onClick={() => handleDelete(topic._id)}
              aria-label={`Delete ${topic.name}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {topics.length === 0 && (
        <p className="info-note">
          No topics yet. Add your first learning topic above.
        </p>
      )}
    </div>
  );
}