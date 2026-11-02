import { practiceTasks } from "../data/sampleData";

export default function Practice() {
  return (
    <div className="page-content">
      <div className="section-heading">
        <div>
          <h2>Practice & Revision</h2>
          <p>Keep practice and revision visible in one place.</p>
        </div>
        <span className="category-chip">{practiceTasks.length} tasks</span>
      </div>

      <div className="task-list">
        {practiceTasks.map((task) => (
          <div className="topic-row" key={task.id}>
            <span className={`status-dot ${task.done ? "done" : ""}`}>
              {task.done ? "✓" : ""}
            </span>
            <div className="topic-info">
              <strong>{task.title}</strong>
              <span>{task.type}</span>
            </div>
            <span className={`status-label ${task.done ? "complete" : ""}`}>
              {task.done ? "Completed" : "Pending"}
            </span>
          </div>
        ))}
      </div>

      <p className="info-note">
        Task creation and completion controls will be implemented in a later step.
      </p>
    </div>
  );
}