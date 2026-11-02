import { useState } from "react";

const COLORS = ["#7567f8", "#e9a23b", "#27ae8b", "#e97891"];

export default function Skills({ skills, onSaveSkill, onDeleteSkill }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function resetForm() {
    setName("");
    setCategory("");
    setColor(COLORS[0]);
    setEditingId(null);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanCategory = category.trim();

    if (!cleanName || !cleanCategory) {
      setError("Skill name and category are required.");
      return;
    }

    const duplicate = skills.some(
      (skill) =>
        skill.name.toLowerCase() === cleanName.toLowerCase() &&
        skill._id !== editingId
    );

    if (duplicate) {
      setError("This skill already exists.");
      return;
    }

    setSaving(true);

    const message = await onSaveSkill(
      {
        name: cleanName,
        category: cleanCategory,
        color,
      },
      editingId
    );

    setSaving(false);

    if (message) {
      setError(message);
      return;
    }

    resetForm();
  }

  function handleEdit(skill) {
    setEditingId(skill._id);
    setName(skill.name);
    setCategory(skill.category);
    setColor(skill.color);
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    const message = await onDeleteSkill(id);

    if (message) {
      setError(message);
      return;
    }

    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <div className="page-content">
      <section className="section-heading">
        <div>
          <h2>My Skills</h2>
          <p>Add, edit and manage your learning progress.</p>
        </div>

        <span className="category-chip">{skills.length} skills</span>
      </section>

      <form className="skill-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Skill" : "Add New Skill"}</h3>

        <label htmlFor="skill-name">Skill Name</label>
        <input
          id="skill-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. React.js"
        />

        <label htmlFor="skill-category">Category</label>
        <input
          id="skill-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Frontend"
        />

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button className="primary-btn" type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : editingId
                ? "Save Changes"
                : "Add Skill"}
          </button>

          {editingId && (
            <button
              className="secondary-btn"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="skills-grid">
        {skills.map((skill) => {
          const total = skill.total || 0;
          const completed = skill.completed || 0;

          const progress =
            total === 0 ? 0 : Math.round((completed / total) * 100);

          return (
            <article className="skill-card" key={skill._id}>
              <div className="skill-card-top">
                <div
                  className="skill-symbol"
                  style={{ color: skill.color }}
                >
                  {skill.name.charAt(0)}
                </div>

                <span className="category-chip">{skill.category}</span>
              </div>

              <h3>{skill.name}</h3>

              <p className="muted">
                {completed} completed of {total} topics
              </p>

              <div className="skill-progress-label">
                <span>Completion</span>
                <strong>{progress}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: skill.color,
                  }}
                />
              </div>

              <div className="form-actions">
                <button
                  className="secondary-btn"
                  type="button"
                  onClick={() => handleEdit(skill)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  type="button"
                  onClick={() => handleDelete(skill._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {skills.length === 0 && (
        <p className="info-note">
          No skills yet. Add your first skill above.
        </p>
      )}
    </div>
  );
}