:root{
  --bg:#121212;
  --card:#1f1f1f;
  --accent:#ff80df;
  --muted:#bdbdbd;
  --text:#ffffff;
}
*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;
  background:var(--bg);
  color:var(--text);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
}

/* app container */
.app{
  width:100%;
  max-width:540px;
  background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius:14px;
  padding:20px;
  box-shadow:0 10px 30px rgba(0,0,0,0.6);
}

/* header */
.app__header{ text-align:center; margin-bottom:18px }
.app__header h1{ margin:0; font-size:24px; color:var(--accent) }
.subtitle{ margin:6px 0 0; color:var(--muted); font-size:13px }

/* input area */
.todo-input{
  display:flex;
  gap:8px;
  margin-bottom:12px;
}
#taskInput{
  flex:1;
  padding:12px 14px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.04);
  background:var(--card);
  color:var(--text);
  outline:none;
  font-size:15px;
}
#taskInput::placeholder{ color:rgba(255,255,255,0.35) }

#addBtn{
  background:var(--accent);
  color:#fff;
  border:none;
  padding:10px 14px;
  border-radius:10px;
  font-weight:600;
  cursor:pointer;
}

/* controls */
.todo-controls{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-bottom:12px;
}
.filters{ display:flex; gap:8px; }
.filter-btn{
  background:transparent;
  color:var(--muted);
  border:1px solid rgba(255,255,255,0.03);
  padding:8px 10px;
  border-radius:8px;
  cursor:pointer;
}
.filter-btn.active{ background:rgba(255,255,255,0.03); color:var(--text) }
.clear-btn{
  background:transparent;
  color:var(--muted);
  border:none;
  cursor:pointer;
  font-size:13px;
}

/* task list */
.task-list{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px }
.task{
  display:flex;
  align-items:center;
  gap:12px;
  background:var(--card);
  padding:12px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.02);
}
.task .text{
  flex:1;
  color:var(--text);
  font-size:15px;
  word-break:break-word;
}
.task.completed .text{
  text-decoration:line-through;
  color:rgba(255,255,255,0.4);
}

.icon-btn{
  background:transparent;
  border:none;
  color:var(--muted);
  cursor:pointer;
  padding:8px;
  border-radius:8px;
}
.icon-btn:hover{ color:var(--accent) }

/* edit input */
.edit-input{
  flex:1;
  padding:8px 10px;
  border-radius:8px;
  border:1px solid rgba(255,255,255,0.04);
  background:#111;
  color:var(--text);
}

/* footer */
.app__footer{ text-align:center; margin-top:16px; color:var(--muted); font-size:13px }

/* responsiveness */
@media (max-width:420px){
  .app{ padding:16px }
  .subtitle{ display:none }
  #addBtn{ padding:10px }
}
