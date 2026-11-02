
function ProgressBar({ value, color = "#7567f8" }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="progress-fill"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

function SkillCard({ skill }) {
  const total = skill.total || 0;
  const completed = skill.completed || 0;

  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <article className="skill-card">
      <div className="skill-card-top">
        <div className="skill-symbol" style={{ color: skill.color }}>
          {skill.name.charAt(0)}
        </div>

        <span className="category-chip">{skill.category}</span>
      </div>

      <h3>{skill.name}</h3>

      <div className="skill-progress-label">
        <span>{completed} of {total} topics</span>
        <strong>{percentage}%</strong>
      </div>

      <ProgressBar value={percentage} color={skill.color} />
    </article>
  );
}

export default function Dashboard({ skills, topics }) {
  const totalTopics = skills.reduce(
    (sum, skill) => sum + (skill.total || 0),
    0
  );

  const completedTopics = skills.reduce(
    (sum, skill) => sum + (skill.completed || 0),
    0
  );

  const overallProgress =
    totalTopics === 0
      ? 0
      : Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="page-content">
      <section className="welcome-banner">
        <div>
          <p className="banner-label">YOUR NEXT LEVEL STARTS HERE</p>
          <h2>Progress over perfection.</h2>
          <p>Every topic you finish is a step towards your goals.</p>
        </div>

        <div className="banner-art" aria-hidden="true">
          ↗
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon purple">◈</div>
          <p>Total Skills</p>
          <h2>{skills.length}</h2>
          <span>Skills in your workspace</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon green">✓</div>
          <p>Topics Completed</p>
          <h2>
            {completedTopics}
            <small> / {totalTopics}</small>
          </h2>
          <span>Across all tracked skills</span>
        </article>

        <article className="stat-card">
          <div className="stat-icon orange">↗</div>
          <p>Overall Progress</p>
          <h2>{overallProgress}%</h2>
          <ProgressBar value={overallProgress} />
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Your skills</h2>
            <p>See how far you have come.</p>
          </div>

          <span className="subtle-label">
            {skills.length} skills tracked
          </span>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>

        {skills.length === 0 && (
          <p className="info-note">
            Add your first skill to get started.
          </p>
        )}
      </section>

      <section className="section-block recent-section">
        <div className="section-heading">
          <div>
            <h2>Learning checklist</h2>
            <p>A preview of your current learning topics.</p>
          </div>
        </div>

        <div className="task-list">
          {topics.slice(0, 4).map((topic) => (
            <div className="topic-row" key={topic._id}>
              <span className={`status-dot ${topic.done ? "done" : ""}`}>
                {topic.done ? "✓" : ""}
              </span>

              <div className="topic-info">
                <strong>{topic.name}</strong>
                <span>{topic.skill?.name || "Unknown skill"}</span>
              </div>

              <span className={`status-label ${topic.done ? "complete" : ""}`}>
                {topic.done ? "Completed" : "Pending"}
              </span>
            </div>
          ))}
        </div>

        {topics.length === 0 && (
          <p className="info-note">
            Your learning topics will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
