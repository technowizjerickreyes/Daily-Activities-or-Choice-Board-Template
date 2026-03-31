import { BOARD_SLIDE_ID, REVIEW_SLIDE_ID } from '../deckData'

function ModePill({ modeLabel, playMode }) {
  return <span className={`mode-pill mode-pill--${playMode}`}>{modeLabel}</span>
}

function SummaryTag({ children }) {
  return <span className="summary-tag">{children}</span>
}

function IntroSlide({ slide, onOpen }) {
  return (
    <section className="hero-slide">
      <div className="hero-slide__badge">Daily Activities</div>

      <div className="hero-slide__content">
        <div className="hero-slide__copy">
          <p className="hero-slide__eyebrow">{slide.subtitle}</p>
          <h1>{slide.title}</h1>
          <p className="hero-slide__description">{slide.description}</p>

          <div className="hero-slide__actions">
            <button className="primary-button" onClick={() => onOpen(BOARD_SLIDE_ID)} type="button">
              Open Activity Board
            </button>
            <button className="secondary-button" onClick={() => onOpen(REVIEW_SLIDE_ID)} type="button">
              Go to Review
            </button>
          </div>
        </div>

        <div className="hero-slide__art" aria-hidden="true">
          <div className="hero-card hero-card--teal" />
          <div className="hero-card hero-card--green" />
          <div className="hero-card hero-card--purple" />
          <div className="hero-bubbles">
            {slide.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChoiceBoardSlide({ slide, onOpen }) {
  return (
    <section className="board-slide">
      <div className="section-heading">
        <p className="section-heading__eyebrow">Choice Board</p>
        <h2>{slide.title}</h2>
        <p>{slide.description}</p>
        <div className="summary-tags">
          <SummaryTag>{slide.items.length} activities</SummaryTag>
          <SummaryTag>Student activity list</SummaryTag>
        </div>
      </div>

      <div className="board-grid">
        {slide.items.map((item) => (
          <button
            key={item.id}
            className="activity-card"
            onClick={() => onOpen(item.id)}
            style={{ '--card-accent': item.accent, '--card-soft': item.soft }}
            type="button"
          >
            <div className="activity-card__top">
              <span className="activity-card__icon">{item.icon}</span>
              <span className="activity-card__number">0{item.number}</span>
            </div>

            <div className="activity-card__meta-row">
              <ModePill modeLabel={item.modeLabel} playMode={item.playMode} />
              <span className="activity-card__count">
                {item.assignedCount} {item.assignedCount === 1 ? 'student' : 'students'}
              </span>
            </div>

            <strong>{item.label}</strong>
            <p>{item.headline}</p>
            <p className="activity-card__mode-copy">{item.modeDescription}</p>
            <span className="activity-card__link">Open activity</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function ActivitySlide({ slide, onOpen }) {
  return (
    <section className="activity-slide" style={{ '--activity-accent': slide.accent }}>
      <div className="activity-slide__hero">
        <div className="activity-slide__badge">
          <span>{slide.icon}</span>
          <strong>0{slide.number}</strong>
        </div>

        <div className="activity-slide__intro">
          <p className="section-heading__eyebrow">{slide.title}</p>
          <h2>{slide.headline}</h2>
          <p>{slide.summary}</p>

          <div className="summary-tags">
            <ModePill modeLabel={slide.modeLabel} playMode={slide.playMode} />
            <SummaryTag>
              {slide.playMode === 'single-player' ? 'Independent task flow' : 'Pair or small-group flow'}
            </SummaryTag>
          </div>
        </div>

        <button className="secondary-button" onClick={() => onOpen(BOARD_SLIDE_ID)} type="button">
          Back to Board
        </button>
      </div>

      <div className="activity-slide__layout">
        <div className="activity-mainstack">
          <article className="activity-panel">
            <div className="panel-heading">
              <span>Instructions</span>
              <strong>What to do</strong>
            </div>

            <div className="steps-list">
              {slide.content.map((item, index) => (
                <div key={`${slide.id}-${index}`} className="step-item">
                  <span className="step-item__number">0{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="activity-panel">
            <div className="panel-heading">
              <span>Mini Tutorial</span>
              <strong>Quick play guide</strong>
            </div>

            <div className="tutorial-list">
              {slide.miniTutorial.map((item, index) => (
                <div key={`${slide.slug}-tutorial-${index}`} className="tutorial-item">
                  <span className="tutorial-item__number">{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="activity-sidecard">
          <div className="activity-sidecard__visual">
            <span>{slide.icon}</span>
          </div>

          <div className="activity-sidecard__meta">
            <div>
              <span>Mode</span>
              <strong>{slide.modeLabel}</strong>
              <p className="activity-sidecard__detail">{slide.modeDescription}</p>
            </div>
            <div>
              <span>Focus</span>
              <strong>{slide.focus}</strong>
            </div>
            <div>
              <span>Goal</span>
              <strong>{slide.goal}</strong>
            </div>
            <div>
              <span>Reminder</span>
              <strong>{slide.reminder}</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function ReviewSlide({ slide, onOpen }) {
  return (
    <section className="review-slide">
      <div className="section-heading section-heading--center">
        <p className="section-heading__eyebrow">Reflection</p>
        <h2>{slide.title}</h2>
        <p>{slide.description}</p>
        <div className="summary-tags summary-tags--center">
          <SummaryTag>{slide.count} student records</SummaryTag>
        </div>
      </div>

      <div className="review-grid">
        {slide.students.map((student) => (
          <button
            key={student.id}
            className="student-link-card"
            onClick={() => onOpen(student.id)}
            style={{ '--student-accent': student.accent }}
            type="button"
          >
            <span className="student-link-card__label">Student reflection</span>
            <strong>{student.label}</strong>
            <p className="student-link-card__meta">{student.section}</p>
            <p className="student-link-card__preview">{student.preview}</p>
            <p className="student-link-card__assignment">{student.assignedActivityTitle}</p>

            <div className="student-link-card__footer">
              <ModePill modeLabel={student.modeLabel} playMode={student.playMode} />
              <span className="student-link-card__status">{student.status}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

function StudentSlide({ slide, note, onNote, onOpen }) {
  const wordCount = note.trim() ? note.trim().split(/\s+/).length : 0

  return (
    <section className="student-slide" style={{ '--student-accent': slide.accent }}>
      <div className="student-slide__header">
        <div>
          <p className="section-heading__eyebrow">Reflection Journal</p>
          <h2>{slide.title}</h2>
          <p>{slide.prompt}</p>

          <div className="summary-tags">
            <SummaryTag>{slide.section}</SummaryTag>
            <ModePill modeLabel={slide.modeLabel} playMode={slide.playMode} />
          </div>
        </div>

        <div className="student-slide__actions">
          <div className="student-stat">
            <span>Words</span>
            <strong>{wordCount}</strong>
          </div>
          <button className="secondary-button" onClick={() => onOpen(REVIEW_SLIDE_ID)} type="button">
            Back to Review
          </button>
        </div>
      </div>

      <article className="reflection-panel">
        <div className="student-overview">
          <div className="student-overview__item">
            <span>Assigned task</span>
            <strong>{slide.assignedActivityTitle}</strong>
          </div>
          <div className="student-overview__item">
            <span>Status</span>
            <strong>{slide.status}</strong>
          </div>
          <div className="student-overview__item">
            <span>Mini goal</span>
            <strong>{slide.goal}</strong>
          </div>
        </div>

        <label className="reflection-panel__label" htmlFor={`reflection-${slide.id}`}>
          Share your ideas clearly and use complete sentences.
        </label>
        <textarea
          id={`reflection-${slide.id}`}
          onChange={(event) => onNote(slide.id, event.target.value)}
          placeholder={slide.placeholder}
          value={note}
        />
      </article>
    </section>
  )
}

const slideRenderers = {
  intro: (slide, props) => <IntroSlide onOpen={props.onOpen} slide={slide} />,
  board: (slide, props) => <ChoiceBoardSlide onOpen={props.onOpen} slide={slide} />,
  activity: (slide, props) => <ActivitySlide onOpen={props.onOpen} slide={slide} />,
  review: (slide, props) => <ReviewSlide onOpen={props.onOpen} slide={slide} />,
  student: (slide, props) => (
    <StudentSlide
      note={props.notes[slide.id] ?? ''}
      onNote={props.onNote}
      onOpen={props.onOpen}
      slide={slide}
    />
  ),
}

export default function SlideContent(props) {
  const renderSlide = slideRenderers[props.slide.kind] ?? slideRenderers.student
  return renderSlide(props.slide, props)
}
